import { shortenAddress } from "../utils/utility";
import useFetch from "../hooks/api";

const TransactionCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  amount,
    keyword,
  url,
}) => {
    const gifUrl = useFetch({keyword});

return (
  <div className="flex flex-1 m-4 bg-[#181918] flex-col p-3 rounded-md hover:shadow-2xl 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] v sm:max-w-[300px]">
    <div className="flex flex-col items-center mt-3 w-full">
      <div className="w-full mb-6 p-2">
        <a
          href={`https://ropsten.etherscan.io/address/${addressFrom}`}
          target="_blank"
          rel="noopener noreferrer">
          <p className="text-white text-base">
            From: {shortenAddress(addressFrom)}
          </p>
        </a>
        <a
          href={`https://ropsten.etherscan.io/address/${addressTo}`}
          target="_blank"
          rel="noopener noreferrer">
          <p className="text-white text-base">
            From: {shortenAddress(addressTo)}
          </p>
        </a>
        <p className="text-white text-base">Amount: {amount} ETH</p>
        {message && (
          <>
            <br />
            <p className="text-white text-base">Message: {message}</p>
          </>
        )}
      </div>
        <img src={gifUrl || url} alt="gif" className="w-full h-64 2x:h-96 rounded-md shadow-lg object-cover" />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
    </div>
  </div>
)};

export default TransactionCard;
