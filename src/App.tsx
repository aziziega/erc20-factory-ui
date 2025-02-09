import Header from './components/Header'
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { useReadContract, WagmiProvider } from 'wagmi';
import {
  mantaSepoliaTestnet
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import TokenForm from './components/Container';
import TokenList from './components/TokenList';
import { ERC20_FACTORY_ABI_JSON, ERC20_FACTORY_CONTRACT } from './constants';
import Container from './components/Container';


export const config = getDefaultConfig({
  appName: 'ERC20 HackerHouse',
  projectId: '390826dea2221e8d907f5db368e1ef30',
  chains: [mantaSepoliaTestnet],
  ssr: true,
});


export type Tokens = {
  name: string;
  symbol: string;
  supply: number;
  address: `0x${string}`
}

function App() {
  const queryClient = new QueryClient();
  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <div className="min-h-screen bg-gray-900 text-white">
          <Header />
          <Container />
          <Toaster position="top-center" />
        </div>
        
      </RainbowKitProvider>
    </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
