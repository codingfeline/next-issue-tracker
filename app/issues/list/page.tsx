import Pagination from '@/app/components/Pagination'
import { prisma } from '@/prisma/client'
import { Status } from '@prisma/client'
import IssueActions from './IssueActions'
import IssueTable, { IssueQuery, columnNames } from './IssueTable'
import { Box, Flex } from '@radix-ui/themes'
import { Metadata } from 'next'

interface Props {
  searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined
  const where = { status }

  const page = parseInt(searchParams.page) || 1
  const pageSize = 5

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  })

  const issueCount = await prisma.issue.count({ where })
  return (
    <Flex direction="column" gap="3" grow="1">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount} />
    </Flex>
  )
}

export default IssuesPage

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View all project issues',
}
