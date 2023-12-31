import { prisma } from '@/prisma/client'
import IssueSummary from './IssueSummary'
import IssueChart from './IssueChart'

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } })
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } })

  return <IssueChart open={open} closed={closed} inProgress={inProgress} />
}
