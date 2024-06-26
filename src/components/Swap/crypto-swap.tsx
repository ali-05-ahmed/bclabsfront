'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '../ui/input';
import { Bolt } from 'lucide-react';
import { FaBtc } from 'react-icons/fa6';
import { RiBnbFill } from 'react-icons/ri';
import { CryptoData } from '../Table/crypto-table';

export const fetchCryptoData = async (): Promise<CryptoData[]> => {
  try {
    const response = await fetch('/api/coinMarket');
    const data = await response.json();
    return data.filteredData;
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return [];
  }
};

export default function CryptoSwap() {
  const [payValue, setPayValue] = useState<number>(0);
  const [receiveValue, setReceiveValue] = useState<number>(0);
  const [btcToUsd, setBtcToUsd] = useState<number>(0);
  const [bnbToUsd, setBnbToUsd] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCryptoData();
      if (data.length > 0) {
        const btcData = data.find((crypto) => crypto.symbol === 'BTC');
        const bnbData = data.find((crypto) => crypto.symbol === 'BNB');
        setBtcToUsd(btcData?.quote.USD.price || 0);
        setBnbToUsd(bnbData?.quote.USD.price || 0);
      }
    };
    getData();
  }, []);

  const handlePayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPayValue = parseFloat(e.target.value);
    setPayValue(newPayValue);
    if (btcToUsd !== null && bnbToUsd !== null) {
      const bnbEquivalent = (newPayValue * btcToUsd) / bnbToUsd;
      setReceiveValue(parseFloat(bnbEquivalent.toFixed(3)));
    }
  };

  const handleReceiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newReceiveValue = parseFloat(e.target.value);
    setReceiveValue(newReceiveValue);
    if (btcToUsd !== null && bnbToUsd !== null) {
      const btcEquivalent = (newReceiveValue * bnbToUsd) / btcToUsd;
      setPayValue(parseFloat(btcEquivalent.toFixed(3)));
    }
  };

  return (
    <Card className="my-16 border-[#464646] bg-transparent lg:w-[800px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-white">SWAP TOKENS</CardTitle>
          <Bolt className="h-6 w-6 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex flex-col gap-0.5 lg:flex-row">
            <div className="relative flex items-center gap-4">
              <Input
                type="number"
                placeholder="0.00"
                min={0}
                step={0.01}
                className="h-28 rounded-md border-none bg-[#1E1E1E] pl-5 text-4xl font-bold text-white focus-visible:border-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                value={payValue}
                onChange={handlePayChange}
              />
              <p className="absolute left-5 top-[5rem] mt-0.5 text-sm text-gray-400">
                ${isNaN(payValue * btcToUsd) ? '0.00' : (payValue * btcToUsd).toFixed(2)}
              </p>
              <Button className="absolute right-5 flex items-center gap-2 rounded-none bg-black font-bold text-gray-400 hover:bg-black/80">
                <FaBtc className="h-6 w-6 text-white" /> BTC {'>'}
              </Button>
              <p className="absolute right-5 top-[5rem] mt-0.5 text-sm text-white">
                Balance <span className="text-blue-600">24,240</span>
              </p>
            </div>
            <div className="relative flex items-center gap-4">
              <Input
                type="number"
                placeholder="0.00"
                min={0}
                step={0.01}
                className="h-28 rounded-md border-none bg-[#1E1E1E] pl-5 text-4xl text-white focus-visible:border-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                value={receiveValue}
                onChange={handleReceiveChange}
              />
              <p className="absolute left-5 top-[5rem] mt-0.5 text-sm text-gray-400">
                ${isNaN(receiveValue * bnbToUsd) ? '0.00' : (receiveValue * bnbToUsd).toFixed(2)}
              </p>
              <Button className="absolute right-5 flex items-center gap-2 rounded-none bg-black font-bold text-gray-400 hover:bg-black/80">
                <RiBnbFill className="h-6 w-6 text-white" /> BNB {'>'}
              </Button>
              <p className="absolute right-5 top-[5rem] mt-0.5 text-sm text-white">
                Balance <span className="text-blue-600">24,240</span>
              </p>
            </div>
          </div>
          <Button
            variant={'default'}
            size={'lg'}
            className="w-full rounded-lg rounded-bl-none rounded-tr-none bg-purple-600 text-white hover:bg-purple-600/80 lg:w-1/4">
            Swap
          </Button>
        </div>
        <div className="my-2 flex flex-col items-center justify-center lg:flex-row lg:justify-between">
          <div>
            <p className="text-white">1 BTC = {btcToUsd && bnbToUsd ? (btcToUsd / bnbToUsd).toFixed(4) : '0.00'} BNB</p>
            <p className="text-center text-sm text-blue-600 lg:text-left">Free exchange</p>
          </div>
          <p className="text-sm text-gray-400">Updated 4s ago</p>
        </div>
      </CardContent>
    </Card>
  );
}
