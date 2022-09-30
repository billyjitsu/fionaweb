import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, darkTheme, lightTheme, midnightTheme } from "@rainbow-me/rainbowkit";
import { chain, configureChains, defaultChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [chain.goerli],
  [ 
  // jsonRpcProvider({ rpc: () => ({ http: 'https://rpc.ankr.com/eth' }) }), 
   alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
   publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: "Fiora",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolMode chains={chains} theme={lightTheme({
      accentColor: '#22d3ee',  
      accentColorForeground: 'black',
      borderRadius: 'large',
      fontStack: 'system',
    })}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;