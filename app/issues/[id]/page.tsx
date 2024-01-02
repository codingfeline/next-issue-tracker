import React from 'react'
import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import ReactMarkDown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'

interface Props {
  params: { id: string }
}

const IssueDetail = async ({ params }: Props) => {
  if (params.id.length !== 24) notFound()

  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  })

  if (!issue) notFound()

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap="2" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt="4">
          {/*  the above is to overcome tailwind h1 issue, after adding 
         require('@tailwindcss/typography') */}
          <ReactMarkDown>{issue.description}</ReactMarkDown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  )
}

export default IssueDetail
