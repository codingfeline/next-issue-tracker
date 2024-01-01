import React from 'react'
import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import ReactMarkDown from 'react-markdown'

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
    <>
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
    </>
  )
}

export default IssueDetail
