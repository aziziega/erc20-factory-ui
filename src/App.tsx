import Header from './components/Header'
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mantaSepoliaTestnet
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Container from './components/Container';


export const config = getDefaultConfig({
  appName: 'ERC20 HackerHouse',
  projectId: '390826dea2221e8d907f5db368e1ef30',
  chains: [mantaSepoliaTestnet],
  ssr: true,
});




function App() {
  const queryClient = new QueryClient();
  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <div className="h-screen bg-gray-900 text-white">
          <Header />
          <Container />
        </div>
        <Toaster position="top-center" />
      </RainbowKitProvider>
    </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
