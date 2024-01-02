import { Skeleton } from '@/app/components'
import { Box, Card, Flex } from '@radix-ui/themes'

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
