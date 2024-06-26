import Hero from '@/components/Hero/hero';
import CryptoSwap from '@/components/Swap/crypto-swap';
import CryptoTable from '@/components/Table/crypto-table';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <Hero />

      <CryptoTable />
      <CryptoSwap />
    </main>
  );
}
