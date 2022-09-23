import { ConnectButton } from "@rainbow-me/rainbowkit";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [animateHeader, setAnimateHeader] = useState(false);

  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 120) {
        setAnimateHeader(true);
      } else {
        setAnimateHeader(false);
      }
    };
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [animateHeader]);

  //OG Nav bar
  //<nav className="flex bg-transparent  py-3 px-1 justify-between w-full items-center  fixed top-0 z-50 "> {/* absolute or fixed*/}

  return (
    <nav
      className={`flex bg-transparent pt-3 pb-1 px-1 w-full justify-between items-center fixed top-0 z-50 duration-500 ease-in-out lg:py-0 lg-px-0 ${
        animateHeader &&
        " backdrop-filter backdrop-blur-lg bg-black/25 trasition shadow-xl"
      }`}
    >
      <div className="container px-1 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          {/* Logo - Title */}

          <Link href="/">
            <a className="text-lg font-bold text-white inline-block whitespace-nowrap uppercase ">
              Flor de Loto
            </a>
          </Link>

          {/*  Hamburger Menu  */}
          <button
            className="text-black cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <FontAwesomeIcon
              icon={faBars}
              width="24px"
              className="text-black"
            />
          </button>
        </div>

        <div
          className={
            "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
            (navbarOpen ? " block rounded shadow-lg" : " hidden")
          }
          id="nav-drop"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="flex items-center">
              <a
                className="py-2 text-sm uppercase px-6 font-bold leading-snug text-gray-800 lg:text-base lg:text-white hover:opacity-75 lg:px-3"
                href="https://vote.nfbeez.xyz/#/"
                target="_blank"
                rel="noreferrer"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <i className=" leading-lg opacity-75"></i>
                <span>Vote</span>
              </a>
            </li>
            {/*  
            <li className="flex items-center">
              <a
                className="py-2 text-sm uppercase px-6 font-bold leading-snug text-gray-800 lg:text-base lg:text-black hover:opacity-75 lg:px-3"
                href="#footer"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <i className=" leading-lg  opacity-75"></i>
                <span>socials</span>
              </a>
            </li>
            */}
            <li className="flex items-center">
              <a
                className="py-2 text-sm uppercase px-6 font-bold leading-snug text-gray-800 lg:text-base lg:text-white hover:opacity-75 lg:px-3"
                href="https://thecubeweb-git-comingsoon-billyjitsu.vercel.app/"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <i className=" leading-lg  opacity-75"></i>
                <span>The Cube</span>
              </a>
            </li>

            <li className="py-2 flex items-center mb-3 px-3 lg:mb-0 lg:px-0 lg:ml-2">
              <ConnectButton showBalance={false} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;