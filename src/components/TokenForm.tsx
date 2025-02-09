import { useState } from "react"
import toast from "react-hot-toast"
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ERC20_FACTORY_ABI_JSON, ERC20_FACTORY_CONTRACT } from "../constants";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "../App";


const erc20FactoryContract = {
    address: ERC20_FACTORY_CONTRACT as `0x${string}`,
    abi: ERC20_FACTORY_ABI_JSON,
};

const TokenForm = () => {
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [tokenSupply, setTokenSupply] = useState("")
  const { isConnected, address } = useAccount();
  const { writeContractAsync } = useWriteContract();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Implement token creation logic here
//     console.log("Creating token:", { tokenName, tokenSymbol, tokenSupply })
//   }

  async function handleAddToken(e: React.FormEvent) {
    e.preventDefault()
    toast.loading("Submitting Form...", {
      style: {
        background: "#2B2F36",
        color: "#fff",
      },
    });
    const result = await writeContractAsync(
      {
        ...erc20FactoryContract,
        functionName: "createToken",
        args: [address, Number(tokenSupply), tokenName, tokenSymbol],
        account: address as `0x${string}`,
      },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.loading("Creating your token...", {
            style: {
              background: "#2B2F36",
              color: "#fff",
            },
          });
        },
        onError: () => {
          toast.dismiss();
          toast.error("Failed to create token", {
            style: {
              background: "#2B2F36",
              color: "#fff",
            },
          });
        },
      }
    );
    await waitForTransactionReceipt(config, {
      hash: result as `0x${string}`,
    })
      .then(async () => {
        toast.dismiss();
        toast.success("Token Successfully Created!", {
          style: {
            background: "#2B2F36",
            color: "#fff",
          },
        });
      })
      .catch(() => {
        toast.dismiss();
        toast.error("Failed to create token", {
          style: {
            background: "#2B2F36",
            color: "#fff",
          },
        });
      });

    setTokenName("");
    setTokenSupply("");
    setTokenSymbol("");
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Create New Token</h2>
      <form onSubmit={handleAddToken}>
        <div className="mb-4">
          <label htmlFor="tokenName" className="block text-sm font-medium mb-1">
            Token Name
          </label>
          <input
            type="text"
            id="tokenName"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tokenSymbol" className="block text-sm font-medium mb-1">
            Token Symbol
          </label>
          <input
            type="text"
            id="tokenSymbol"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tokenSupply" className="block text-sm font-medium mb-1">
            Initial Supply
          </label>
          <input
            type="number"
            id="tokenSupply"
            value={tokenSupply}
            onChange={(e) => setTokenSupply(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Create Token
        </button>
      </form>
    </div>
  )
}

export default TokenForm

