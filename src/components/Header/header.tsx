import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import MobileNav from './mobile-nav';

//
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-[60px] w-full items-center justify-center text-white backdrop-blur">
      <div className="container flex w-full max-w-6xl items-center justify-between px-4">
        <div className="justify-start sm:flex sm:flex-1">Blockchain</div>
        <MainNavLinks />
        <div className="hidden flex-1 justify-end lg:flex">
          <nav className="flex items-center space-x-4">
            <Link
              href=""
              className={cn(
                buttonVariants({ size: 'default' }),
                'rounded-lg rounded-bl-none rounded-tr-none border-2 border-purple-600 bg-black text-white hover:bg-black/80',
              )}>
              Log IN
            </Link>
            <Link
              href=""
              className={cn(
                buttonVariants({ size: 'default' }),
                'rounded-lg rounded-bl-none rounded-tr-none bg-purple-600 text-white hover:bg-purple-600/80',
              )}>
              SIGN UP
            </Link>
          </nav>
        </div>
        <div className="block lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export function MainNavLinks() {
  return (
    <nav className="hidden items-center justify-center gap-6 lg:flex">
      <Link href="/" className="">
        Exchange
      </Link>
      <Link href="/" className="hover:underline">
        Last Transactions
      </Link>
      <Link href="/" className="hover:underline">
        Invite Friend
      </Link>
      <Link href="" className="hover:underline">
        Notifications
      </Link>
    </nav>
  );
}
