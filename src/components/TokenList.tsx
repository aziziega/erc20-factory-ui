import { Token } from "./Container"

const TokenList = ({tokens} : {tokens: Token[]}) => {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Your Tokens</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-gray-700">
                <th className="p-2">Name</th>
                <th className="p-2">Symbol</th>
                <th className="p-2">Supply</th>
                <th className="p-2">Address</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="p-2">{token.name}</td>
                  <td className="p-2">{token.symbol}</td>
                  <td className="p-2">{token.supply.toFixed(0)}</td>
                  <td className="p-2">{token.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
  export default TokenList
  
  