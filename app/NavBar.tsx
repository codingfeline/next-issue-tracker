'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'
import { useSession } from 'next-auth/react'
import { Box } from '@radix-ui/themes'

export default function NavBar() {
  const currentPath = usePathname()
  const { status, data: session } = useSession() // get user's name email image

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ]
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map(link => (
          <li key={link.href}>
            <Link
              className={` ${
                link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'
              } hover:text-zinc-800 transition-colors`}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === 'authenticated' ? (
          <Link href="/api/auth/signout">Logout</Link>
        ) : (
          <Link href="/api/auth/signin">SignIn</Link>
        )}
      </Box>
    </nav>
  )
}
