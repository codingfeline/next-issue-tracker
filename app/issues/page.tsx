import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const IssuesPage = () => {
  return (
    <>
      <Button>Add Issue</Button>
      <Link href="/issues/new">New Issue</Link>
    </>
  )
}

export default IssuesPage
