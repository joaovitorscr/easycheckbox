'use client'

import { LogOutIcon, MousePointerSquare, User2, UserCog } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function LoggedUserButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost">
          <User2 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex justify-between items-center">
          <span className="mr-4">My Account</span>
          <Button
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: `${window.location.origin}/sign-in`,
              })
            }
            title="Sign out"
            variant="ghost"
          >
            <LogOutIcon className="w-4 h-6" />
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <UserCog className="mr-2 w-5 h-5" />
          <Link href="/settings">Edit profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <MousePointerSquare className="mr-2 w-5 h-5" />
          <Link href="/boxes">My boxes</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
