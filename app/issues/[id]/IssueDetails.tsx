import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkDown from 'react-markdown'

const IssueDetails = ({ issue }: { issue: Issue }) => {
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

export default IssueDetails
