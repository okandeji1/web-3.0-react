import Navbar from "../partials/navbar.container";
import Welcome from '../../components/welcome.component'
import Footer from "../partials/footer.container";
import Services from "../../components/services.component";
import Transactions from "../../components/transactions.component";

const DefaultLayout = (props) => {
  const { children } = props;

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
        {children}
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
