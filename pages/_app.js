import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, darkTheme, lightTheme, midnightTheme } from "@rainbow-me/rainbowkit";
import { chain, configureChains, defaultChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from "wagmi/providers/public";


/* adding gnosis network */
const GnosisChain = {
  id: 100,
  name: 'Gnosis Chain',
  network: 'Gnosis',
  nativeCurrency: {
    decimals: 18,
    name: 'xDai',
    symbol: 'xDai',
  },
  rpcUrls: {
    default: 'https://rpc.ankr.com/gnosis',
  },
  blockExplorers: {
    default: { name: 'Gnosis Scan', url: 'https://gnosisscan.io/' },
  },
  iconUrls: ["https://images.prismic.io/koinly-marketing/16d1deb7-e71f-48a5-9ee7-83eb0f7038e4_Gnosis+Chain+Logo.png"],
  testnet: false,
}

const { chains, provider } = configureChains(
  [GnosisChain],
  [// alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
   jsonRpcProvider({ rpc: () => ({ http: 'https://rpc.ankr.com/gnosis' }) }), // Move this top top
   publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: "The NFBeez",
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
      accentColor: '#1d4ed8',  //color of wallet  try #703844
      accentColorForeground: 'white',
      borderRadius: 'large',
      fontStack: 'system',
    })}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;