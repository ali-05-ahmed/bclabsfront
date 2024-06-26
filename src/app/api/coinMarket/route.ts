import { CryptoData } from '@/components/Table/crypto-table';
import { NextResponse } from 'next/server';

const API_KEY = 'fad3c46a-34f5-408e-b9cb-720519b3cfad';
const URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

export async function GET() {
  try {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      },
    });
    const data = await response.json();

    const filteredData = data.data.filter((crypto: CryptoData) =>
      ['BTC', 'ETH', 'DOGE', 'ALGO', 'DOT', 'UNI', 'COMP', 'BNB'].includes(crypto.symbol),
    );

    return NextResponse.json({ filteredData });
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return NextResponse.error();
  }
}
