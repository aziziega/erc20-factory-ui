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


const config = getDefaultConfig({
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
        <div className="min-h-screen bg-gray-900 text-white">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">ERC20 Token Factory</h1>
            <TokenForm />
            {/* <TokenList /> */}
          </main>
        </div>
      </RainbowKitProvider>
    </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
