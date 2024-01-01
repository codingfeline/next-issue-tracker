import React from 'react'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
} from '@radix-ui/themes'
import Link from 'next/link'
import { prisma } from '@/prisma/client'
import IssueStatusBadge from '../components/IssueStatusBadge'
import delay from 'delay'
import IssueActions from '../api/issues/IssueActions'

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany()
  await delay(2000)

  return (
    <>
      <IssueActions />

      <TableRoot variant="surface">
        <TableHeader>
          <TableRow>
            <TableColumnHeaderCell>Issue</TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell">
              Status
            </TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell">
              Created
            </TableColumnHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map(issue => (
            <TableRow key={issue.id}>
              <TableCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {' '}
                <IssueStatusBadge status={issue.status} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </>
  )
}

export default IssuesPage
