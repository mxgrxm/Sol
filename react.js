import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const fetchSolanaData = async (address) => {
  try {
    const response = await fetch(`/api/solana?address=${address}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default function SolanaApp() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchData = async () => {
    setLoading(true);
    const result = await fetchSolanaData(address);
    setData(result);
    setLoading(false);
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Solana Trades & Balance Viewer</h1>
      <input
        type="text"
        placeholder="Enter Solana Address"
        className="p-2 border rounded w-full max-w-md mb-4"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
        onClick={handleFetchData}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Load Data'}
      </button>

      {data && (
        <div className="w-full max-w-2xl">
          <Card className="mb-4">
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Balance</h2>
              <p>{data.balance} SOL</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Recent Trades</h2>
              <ul>
                {data.trades.map((trade, index) => (
                  <li key={index} className="mb-2">
                    <strong>Trade {index + 1}:</strong> {trade.details}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
