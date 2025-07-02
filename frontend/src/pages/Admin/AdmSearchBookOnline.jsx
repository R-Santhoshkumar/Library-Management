import React from "react";
import { motion } from "framer-motion";
import "../../index.css";

import amazonLogo from "../../assets/images/amazon_logo.png";
import flipkartLogo from "../../assets/images/Flipkart_logo1.png";
import pearsonLogo from "../../assets/images/Pearson_logo1.png";
import TataMcGrawHillLogo from "../../assets/images/Tata_Mc_GrawHill_logo.png";
import OreillyLogo from "../../assets/images/Oreilly_logo.png";
import OxfordLogo from "../../assets/images/Oxford_University_Press_Logo.png";
import PHILogo from "../../assets/images/PHI_Logo.png";
import SultanLogo from "../../assets/images/Sultan_Books_Logo.png";
import BPBLogo from "../../assets/images/BPB_logo.png";
import CengageLogo from "../../assets/images/Cengage_Logo.png";
import IndiaMartLogo from "../../assets/images/Indiamart_Logo.png"; 
import WileyLogo from "../../assets/images/Wiley_Logo.png"; 
import TPLogo from "../../assets/images/Thomsonpress_Logo.png"; 
import PenguinLogo from "../../assets/images/Penguin_Logo.png"; 
import HBRLogo from "../../assets/images/HBR_Logo.png";
import NAILogo from "../../assets/images/NewAgeInternational_Logo.webp";

const platforms = [
  {
    name: "Amazon",
    logo: amazonLogo,
    url: "https://www.amazon.in/books-used-books-textbooks/b?ie=UTF8&node=976389031",
  },
  {
    name: "Flipkart",
    logo: flipkartLogo,
    url: "https://www.flipkart.com/books",
  },
  {
    name: "Pearson",
    logo: pearsonLogo,
    url: "https://in.pearson.com/",
  },
  {
    name: "Tata McGraw-Hill",
    logo: TataMcGrawHillLogo,
    url: "https://www.mheducation.co.in/",
  },
  {
    name: "O'Reilly",
    logo: OreillyLogo,
    url: "https://www.oreilly.com/search/?q=*&order_by=_oreilly_popularity&rows=100",
  },
  {
    name: "Oxford University Press",
    logo: OxfordLogo,
    url: "https://india.oup.com/",
  },
  {
    name: "PHI Learning",
    logo: PHILogo,
    url: "https://www.phindia.com/",
  },
  {
    name: "Sultan Chand & Sons",
    logo: SultanLogo,
    url: "https://www.sultanchandandsons.com/",
  },
  {
    name: "BPB",
    logo: BPBLogo,
    url: "https://in.bpbonline.com/",
  },
  {
    name: "Cengage",
    logo: CengageLogo,
    url: "https://www.cengage.co.in/",
  },
  {
    name: "IndiaMART",
    logo: IndiaMartLogo,
    url: "https://dir.indiamart.com/impcat/books.html",
  },
  {
    name: "Wiley",
    logo: WileyLogo,
    url: "https://www.wileyindia.com/",
    },
    {
        name: "ThomsonPress",
        logo:TPLogo,
        url: "https://www.thomsonpress.com/books.html",
    },
    {
        name: "Penguin",
        logo:PenguinLogo,
        url: "https://www.penguin.co.in/",
    },
    {
        name: "Harvard Business Review (HBR)",
        logo:HBRLogo,
        url: "https://store.hbr.org/books/",
    },
    {
        name: "New Age International",
        logo: NAILogo,
        url: "https://newagepublishers.com/servlet/nasublist?flag=B",
    },
    
];

function AdmSearchBookOnline() {

  return (
    <motion.div
      className="w-full h-full flex flex-1 flex-col gap-6 bg-white p-6 rounded-2xl overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-3xl font-bold text-gray-800 ">
        Online Book Search
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {platforms.map((platform, index) => (
          <motion.a
            key={index}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-400 transition duration-300 ease-in-out"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-white flex items-center justify-center overflow-hidden mb-4">
                <img
                  src={platform.logo}
                  alt={`${platform.name} Logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {platform.name}
              </h3>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

export default AdmSearchBookOnline;
