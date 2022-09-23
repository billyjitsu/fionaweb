// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const Footer = () => {
  return (
    <section id="footer">
      <div className="section-container bg-gradient-to-b from-gray-900 to-black">
        <div className="flex flex-col  items-center space-y-3 justify-center w-full pt-3 pb-3 md:flex-row md:space-y-0 md:pb-1">
          <div>
            <h3 className="text-white text-xl border-b-2 md:border-b-0 md:mr-4 ">
              <Link href="/">Flor De Loto</Link>
            </h3>
          </div>

          <div className="flex flex-col space-y-2 items-center md:space-x-4 md:flex-row md:space-y-0 ">
            <a href="https://twitter.com/theweb3attorney" target="_blank" rel="noreferrer" >
              <FontAwesomeIcon
                icon={faTwitter}
                width="25px"
                className="text-white"
              />
            </a>
            <a href="https://www.facebook.com/FlorDeLotoMontessori" target="_blank" rel="noreferrer" >
              <FontAwesomeIcon
                icon={faFacebook}
                width="25px"
                className="text-white"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-col  items-center space-y-3 justify-center w-full pb-1 md:flex-row md:space-y-0">
            <a href="/Terms" target="_blank" rel="noreferrer"><p className="text-white text-xs md:border-b-0 md:mr-4 md:text-sm ">Terms and Conditions </p></a>
          </div>
      </div>
    </section>
  );
};

export default Footer;