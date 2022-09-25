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
import Footer from "./Footer";
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
      if (totalSupply === 10035) {
        alert("Sold Out!");
        return;
      }

      let payment = String(numToMint * 0.0001); // UPDATE THIS PRICE
      console.log("payment:", payment);
   //   console.log("Total Supply Data:", totalSupply);

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
        <div className="relative flex w-full  content-center items-center justify-center  z-10 bg-black">
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
              <div className="w-full md:max-w-2xl mt-10  md:mt-24 px-4 ml-auto mr-auto text-center">
                  <Image src={beezImg} alt="beezImg" className="" /> 
                <div className="">
                <h1 className="text-white font-bold text-3xl leading-tighter tracking-tighter drop-shadow-md md:text-4xl">
                  Fiona A Través De Los Ojos De Los Niños
                  </h1>
                  <h1 className="text-white font-bold text-3xl leading-tighter tracking-tighter drop-shadow-md md:text-4xl">
                  (Fiona Through {"Children's"} Eyes)
                  </h1>
                  <h3 className="mt-4 mb-3 text-md drop-shadow-md  text-white md:text-md">
                    On September 18, 2022 Hurricane Fiona devastated Puerto
                    Rico. Many across Puerto Rico, still have no
                    power or running water. Flor de Loto Montessori is a
                    non-profit school and community pillar in Ponce, PR, who is
                    providing support to the children, families, staff and
                    community members during this emergency. Now this community
                    asks for your support.
                  </h3>
                  <h3 className="mt-4 mb-3 text-md drop-shadow-md  text-white font-bold md:text-md"> 100% of your mint will go toward relief efforts in the school and nearby communities.</h3>

                  <h3 className="mt-4 mb-3 text-md drop-shadow-md  text-white md:text-md"> The children of Flor de Loto Montessori School in Ponce, Puerto Rico captured through their drawings their feelings, emotions and experiences lived during Hurricane Fiona. </h3>

                  <h3 className="mt-4 mb-3 text-md drop-shadow-md  text-white md:text-md"> These are works of art inspired by their reasoning and imaginative mind. Worked in a simple and pure way with colored pencils, crayons, markers on white paper canvases. Materials accessible at this time of national emergency. </h3>

                  <h3 className="mt-4 mb-3 text-md drop-shadow-md  text-white md:text-md"> Flor de Loto Montessori is a non-profit entity that works every day to serve children, families, team members and the community. In times of emergency and need we are present with different initiatives and this is one of them. Always thinking of our children who are the future of our country and the adults who accompany them in their process of self-building day by day.</h3>

                  <p className="mt-4 mb-4 text-md font-bold  text-white md:text-lg">
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
                          <h3 className="text-sm text-white">
                            Choose your amount
                          </h3>
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
                          className="bg-cyan-400 hover:bg-cyan-500 text-black rounded-full px-12 py-2 sm:w-auto"
                        >
                          Mint NFTs
                        </button>
                      </>
                    )}

                    {loading && (
                      <>
                        <h3 className="animate-pulse text-white">
                          Processing...
                        </h3>
                        <p className="animate-pulse text-white">
                          Your tokens are minting. Please wait a few minutes.
                          This message will be replaced with your transaction
                          once minted.
                        </p>
                      </>
                    )}

                    {nftMinted && !loading && (
                      <div className="border p-3 space-y-2">
                        <h3 className="text-lg font-semibold text-white">
                          Your NFTs have been minted!
                        </h3>
                        <a
                          href={`https://etherscan.io/tx/${txn}`}
                          rel={"noreferrer"}
                          target="_blank"
                          className="text-lg text-decoration-line: underline text-white"
                        >
                          View transaction
                        </a>
                        <br></br>
                        <a
                          href={`https://opensea.io/${address}`}
                          rel={"noreferrer"}
                          target="_blank"
                          className="text-lg text-decoration-line: underline text-white"
                        >
                          Check out your wallet
                        </a>
                        <br></br>
                        <button
                          className="bg-cyan-400 hover:bg-cyan-500 text-black rounded-full px-12 py-2 sm:w-auto"
                          onClick={() => resetMinter()}
                        >
                          Go Back
                        </button>
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg text-white font-semibold mt-3">
                        Minted so far
                      </h3>
                      <h3 className="text-lg text-white font-semibold mb-8">
                        {totalBought}/10,035
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
