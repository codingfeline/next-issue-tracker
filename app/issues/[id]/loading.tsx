import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Heading, Flex, Card, Box } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetail = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap="2" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        {/*  the above prose is to overcome tailwind h1 issue, after adding 
       require('@tailwindcss/typography') */}
        <Skeleton count={3} />
      </Card>
    </Box>
  )
}

export default LoadingIssueDetail
