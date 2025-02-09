import { ConnectButton } from "@rainbow-me/rainbowkit"
// import { WalletIcon } from "lucide-react"

// interface HeaderProps {
//   isConnected: boolean
//   walletAddress: string
//   onConnect: () => void
// }

const Header = () => {
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold">Hacker House Indonesia</div>
        <ConnectButton />
      </div>
    </header>
  )
}

export default Header

