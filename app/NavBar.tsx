'use client'

import Link from 'next/link'
import { AiFillBug } from 'react-icons/ai'
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { usePathname } from 'next/navigation'
import { Skeleton } from '@/app/components'

export default function NavBar() {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}

const NavLinks = () => {
  const currentPath = usePathname()

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ]

  return (
    <ul className="flex space-x-6">
      {links.map(link => (
        <li key={link.href}>
          <Link
            className={` ${link.href === currentPath && '!text-zinc-900'} nav-link`}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession() // get user's name email image

  if (status === 'loading') return <Skeleton width="3rem" />

  if (status === 'unauthenticated')
    return (
      <Link className="nav-link" href="/api/auth/signin">
        SignIn
      </Link>
    )

  return (
    <Box>
      {status === 'authenticated' && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
              // * above is to combar Avatar not displaying.
              // * it works during dev without the above but just in case
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2"></Text>
              {session.user!.email}
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Logout</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  )
}
