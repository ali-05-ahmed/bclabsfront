import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import Link from 'next/link';

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="default"
          className="rounded-lg rounded-bl-none rounded-tr-none border-2 border-purple-600 bg-black text-white hover:bg-black/80"
          size={'icon'}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="border-purple-600 bg-black">
        <MainNavLinks />
        <nav className="my-8 flex items-center space-x-4">
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
      </SheetContent>
    </Sheet>
  );
}

export function MainNavLinks() {
  return (
    <nav className="flex flex-col gap-6">
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
