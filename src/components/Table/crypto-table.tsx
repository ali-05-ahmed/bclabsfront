'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '../ui/button';
import BTC from '/public/Icons/btc.png';
import ETH from '/public/Icons/eth.png';
import DOGE from '/public/Icons/dodge.png';
import ALGO from '/public/Icons/algo.png';
import DOT from '/public/Icons/dot.png';
import UNI from '/public/Icons/uni.png';
import COMP from '/public/Icons/comp.png';
import BNB from '/public/Icons/comp.png';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const images = {
  BTC,
  ETH,
  DOGE,
  ALGO,
  DOT,
  UNI,
  COMP,
  BNB,
};

export interface CryptoData {
  id: number;
  symbol: keyof typeof images;
  quote: {
    USD: {
      price: number;
      percent_change_24h: number;
      percent_change_7d: number;
    };
  };
}

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

export default function CryptoTable() {
  const [data, setData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchCryptoData();
      setData(data);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return (
      <section className="rounded-xl border border-[#464646] bg-black/60 p-5 backdrop-blur-lg backdrop-filter">
        <div className="overflow-x-auto">
          <Table className="w-full sm:w-[800px]">
            <TableHeader>
              <TableRow className="border-[#464646] hover:bg-transparent">
                <TableHead className="w-[200px] text-white">ASSETS</TableHead>
                <TableHead className="hidden text-white sm:table-cell">LAST TRADE</TableHead>
                <TableHead className="text-white">24H%</TableHead>
                <TableHead className="text-white">24H CHANGE</TableHead>
                <TableHead className="hidden text-right text-blue-600 sm:table-cell">MORE {'>'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-16 w-full" />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Skeleton className="h-16 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-16 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-16 w-full" />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Skeleton className="h-16 w-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-[#464646] bg-black/60 p-5 backdrop-blur-lg backdrop-filter">
      <div className="overflow-x-auto">
        <Table className="w-full sm:w-[800px]">
          <TableHeader>
            <TableRow className="border-[#464646] hover:bg-transparent">
              <TableHead className="w-[200px] text-white">ASSETS</TableHead>
              <TableHead className="hidden text-white sm:table-cell">LAST TRADE</TableHead>
              <TableHead className="text-white">24H%</TableHead>
              <TableHead className="text-white">24H CHANGE</TableHead>
              <TableHead className="hidden text-right text-blue-600 sm:table-cell">MORE {'>'}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((crypto: CryptoData) => (
              <TableRow key={crypto.id} className="border-none hover:bg-transparent">
                <TableCell className="flex items-center gap-1 font-medium">
                  <Image
                    src={images[crypto.symbol]}
                    alt={crypto.symbol}
                    height={1000}
                    width={1000}
                    className="h-8 w-8 sm:h-16 sm:w-16"
                  />
                  <div>
                    <span className="text-white">{crypto.symbol}/</span>USD
                  </div>
                </TableCell>
                <TableCell className="hidden text-white sm:table-cell">${crypto.quote.USD.price.toFixed(2)}</TableCell>
                <TableCell
                  className={`${
                    crypto.quote.USD.percent_change_24h < 0
                      ? 'text-red-500'
                      : crypto.quote.USD.percent_change_24h > 0
                        ? 'text-[#6DFFDC]'
                        : 'text-gray-500'
                  }`}>
                  {crypto.quote.USD.percent_change_24h < 0 ? '' : '+'}
                  {crypto.quote.USD.percent_change_24h.toFixed(2)}%
                </TableCell>
                <TableCell
                  className={`${
                    crypto.quote.USD.percent_change_7d < 0
                      ? 'text-red-500'
                      : crypto.quote.USD.percent_change_7d > 0
                        ? 'text-[#6DFFDC]'
                        : 'text-gray-500'
                  }`}>
                  {crypto.quote.USD.percent_change_7d < 0 ? '-' : '+'}$
                  {Math.abs(crypto.quote.USD.percent_change_7d).toFixed(2)}
                </TableCell>

                <TableCell className="hidden justify-end sm:flex">
                  <Button className="w-full rounded-none bg-green-500 text-gray-900 hover:bg-green-500/80 sm:w-1/2">
                    TRADE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
