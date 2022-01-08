import React, { useState, useEffect, createContext, useContext } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

const obj: any = {};
export const TransactionContext = React.createContext(obj);

// @ts-ignore
const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<any>([]);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );

  const [formData, setFromData] = useState<any>({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleChange = (e: any, name: any) => {
    setFromData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getTransactions = async () => {
    try {
      if (!ethereum) return alert("Please install metamask!");

      const transactionContract = getEthereumContract();
      const availableTransactions =
        await transactionContract.getAllTransactions();
      const structuredTransactions = availableTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18, // All values returned in hexadecimal GWEI which is the sub unit of ethereum. So we have to multiply large to get ethereum value
        })
      );
      setTransactions(structuredTransactions);
    } catch (error) {}
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask!");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getTransactions();
      }
    } catch (error) {}
  };

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();
      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (error) {}
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask!");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {}
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install metamask!");
      // Get the data from the from
      setIsLoading(true);
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", // in hexadecimal but converted to 2100 GWEI
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockChain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      await transactionHash;
      
      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
      setFromData({
        addressTo: "",
        amount: "",
        keyword: "",
        message: "",
      })
      setIsLoading(false);
      getTransactions();
    } catch (error) {}
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        sendTransaction,
        handleChange,
        transactions,
        isLoading,
      }}>
      {children}
    </TransactionContext.Provider>
  );
};
