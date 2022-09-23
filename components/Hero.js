import Image from "next/image";
import heroImage from "../images/bg.webp";
import beezImg from "../images/banner.png";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import {
  useAccount,
  useConnect,
  useContract,
  useContractRead,
  useProvider,
  useSigner,
} from "wagmi";
//contract location
import contractInterface from "../contracts/NFT.json";

const contractConfig = {
  addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  contractInterface: contractInterface.abi,
};

const Intro = () => {
  const [totalBought, setTotalBought] = useState(0);
  const [numToMint, setNumToMint] = useState(1);
  const [loading, setLoading] = useState(false);
  const [nftMinted, setNFTMinted] = useState(false);
  const [txn, setTxn] = useState();

  const { address } = useAccount();
  const { isConnected } = useConnect();
  const provider = useProvider();
  const { data: signerData } = useSigner();

  const handleChange = (e) => {
    setNumToMint(e.target.value);
  };

  //Using useContract only (instead of useContractWrite)
  const buyBees = useContract({
    ...contractConfig,
    signerOrProvider: signerData,
  });

  // Group Click Function
  const buyToken = async () => {
    try {
      let totalSupply = totalBuyData.toNumber();
      //If sold out, notify
      if (totalSupply === 2525) {
        alert("Sold Out!");
        return;
      }

      let payment = String(numToMint * 39); // UPDATE THIS PRICE
      console.log("payment:", payment);
      console.log("Total Supply Data:", totalSupply);

      let totalGas;
      if (numToMint < 2) {
        totalGas = String(numToMint * 2400000);
      } else {
        totalGas = String(4085000);
      }

      let nftTxn = await buyBees.mint(numToMint, {
        gasLimit: totalGas,
        value: ethers.utils.parseEther(payment),
      });

      setLoading(true);
      setNFTMinted(false);
      //console.log("Mining...please wait.");
      await nftTxn.wait();
      setLoading(false);
      setTxn(nftTxn.hash);
      setNFTMinted(true);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const resetMinter = async () => {
    setNFTMinted(false);
  };

  const { data: totalBuyData } = useContractRead({
    ...contractConfig,
    functionName: "totalSupply",
    watch: true,
  });

  useEffect(() => {
    if (totalBuyData) {
      setTotalBought(totalBuyData.toNumber());
    }
  }, [totalBuyData]);

  /*
  useEffect(() => {
    console.log("contract", process.env.NEXT_PUBLIC_CONTRACT_ADDRESS )
  }, []);
 */

  return (
    <section className="hero">
      <div className="">
        <div className="relative flex w-full h-screen content-center items-center justify-center md:h-screen z-10 bg-black">
          <div className="">
            <Image
              src={heroImage}
              alt="heroBanner"
              layout="fill"
              objectFit="cover"
              className="opacity-20"
            />
          </div>

          <div className="container relative mx-auto p-16 md:p-0">
            <div className="flex flex-wrap items-center ">
              <div className="w-full md:max-w-lg mt-10 px-4 ml-auto mr-auto text-center">
                <Image src={beezImg} alt="beezImg" className="" />
                <div className="">
                  <h1 className="text-white font-bold text-3xl leading-tighter tracking-tighter drop-shadow-md md:text-4xl">
                    Web3 Pitching In
                  </h1>
                  <p className="mt-4 mb-5 text-md font-bold drop-shadow-md  text-white md:text-lg">
                    Many across Puerto Rico still have no power or running
                    water. Flor de Loto Montessori was extremely damaged during
                    Hurricane Fiona and needs help. 100% of you mint will go to
                    rebuilding the school to show the power of crypto and
                    community.
                  </p>

                  <p className="mt-4 mb-8 text-md font-bold  text-white md:text-lg">
                    Mint your support for 0.004 ETH (~5 bucks)
                  </p>
                </div>

                {/* container to hold text and buttons next/under image */}
                {/*    Minter     */}
                <div>
                  {/* container to hold text and buttons next/under image */}
                  <div className="flex flex-col items-center font-bold text-black space-y-2 mb-14 lg:-mb-0">
                    {!loading && !nftMinted && (
                      <>
                        <div>
                          <h3 className="text-sm text-white">Choose your amount</h3>
                        </div>
                        <input
                          type="number"
                          name="tokenID"
                          placeholder=" Amount"
                          min="1"
                          max="10"
                          className="w-1/4 mb-2 text-black shadow-sm rounded-lg text-center pl-2"
                          onChange={handleChange}
                          value={numToMint}
                        />
                        <button
                          onClick={() => buyToken()}
                          className="bg-blue-700 hover:bg-blue-600 text-white rounded-full px-12 py-2 sm:w-auto"
                        >
                          Mint NFTs
                        </button>
                      </>
                    )}

                    {loading && (
                      <>
                        <h3 className="animate-pulse">Processing...</h3>
                        <p className="animate-pulse">
                          Your tokens are minting. Please wait a few minutes.
                          This message will be replaced with your transaction
                          once minted.
                        </p>
                      </>
                    )}

                    {nftMinted && !loading && (
                      <>
                        <h3 className="text-lg font-semibold text-gray-700">
                          Your NFTs have been minted!
                        </h3>
                        <a
                          href={`https://gnosisscan.io/tx/${txn}`}
                          rel={"noreferrer"}
                          target="_blank"
                          className="text-lg text-decoration-line: underline text-gray-700"
                        >
                          View transaction
                        </a>
                        <a
                          href={`https://epor.io/${address}`}
                          rel={"noreferrer"}
                          target="_blank"
                          className="text-lg text-decoration-line: underline text-gray-700"
                        >
                          Visit Epor to view
                        </a>
                        <button
                          className="bg-btnYellow hover:bg-yellow-400 rounded-full px-12 py-2 sm:w-auto"
                          onClick={() => resetMinter()}
                        >
                          Go Back
                        </button>
                      </>
                    )}

                    <div>
                      <h3 className="text-lg text-white font-semibold mt-6">
                        Minted so far
                      </h3>
                      <h3 className="text-lg text-white font-semibold">
                        {totalBought}/2525
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
