import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import ServiceCard from "./service-card.component";

const Services = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full gradient-bg-services">
      <div className="flex mf:flex:row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
            Services that we <br /> continue to improve
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-start flex-col">
        <ServiceCard
          color="bg-[#2952E3]"
          title="Security Guaranteed"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="Security is guaranteed. We always maitain privacy and the quality of our products."
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="Best exchange rate"
          icon={<BiSearchAlt fontSize={21} className="text-white" />}
          subtitle="Security is guaranteed. We always maitain privacy and the quality of our products."
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="Fastest transactions"
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
          subtitle="Security is guaranteed. We always maitain privacy and the quality of our products."
        />
      </div>
    </div>
  );
};

export default Services;
