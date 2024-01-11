import { prisma } from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from '@/app/issues/[id]/DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/authOptions'
import AssigneeSelect from './AssigneeSelect'
import { Metadata } from 'next'
import { cache } from 'react'

interface Props {
  params: { id: string }
}

const fetchIssue = cache((issueId: string) =>
  prisma.issue.findUnique({ where: { id: issueId } })
)

const IssueDetail = async ({ params }: Props) => {
  const session = await getServerSession(authOptions)

  if (params.id.length !== 24) notFound()

  const issue = await fetchIssue(params.id)

  if (!issue) notFound()

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="3">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  )
}

export default IssueDetail

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(params.id)

  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id,
  }
}
