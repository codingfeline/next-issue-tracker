import {
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
} from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import IssueActions from '../api/issues/IssueActions'

const LoadingIssues = () => {
  const issues = [1, 2, 3, 4, 5]

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
            <TableRow key={issue}>
              <TableCell>
                <Skeleton />
                <div className="block md:hidden">
                  <Skeleton />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </>
  )
}

export default LoadingIssues
