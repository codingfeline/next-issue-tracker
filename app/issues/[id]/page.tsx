import React from 'react'
import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'

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
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </>
  )
}

export default IssueDetail
