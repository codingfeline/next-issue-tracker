'use client'

import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import { issueSchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Issue } from '@prisma/client'
import {
  Button,
  CalloutRoot,
  CalloutText,
  TextFieldInput,
  TextFieldRoot,
} from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor'
import { z } from 'zod'

// const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
//   ssr: false,
// })
// ? this is to disable SSR for loading MD editor as it is a client component

type IssueFormData = z.infer<typeof issueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  })
  const router = useRouter()
  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  const onSubmit = handleSubmit(async data => {
    try {
      setSubmitting(true)
      if (issue) await axios.patch('/api/issues/' + issue.id, data)
      else await axios.post('/api/issues', data)
      router.push('/issues/list')
      router.refresh()
    } catch (error) {
      setSubmitting(false)
      setError('Error occured')
    }
  })

  return (
    <div className="max-w-xl">
      {error && (
        <CalloutRoot color="red" className="mb-2">
          <CalloutText>{error}</CalloutText>
        </CalloutRoot>
      )}
      <form className=" space-y-2" onSubmit={onSubmit}>
        <TextFieldRoot>
          <TextFieldInput
            defaultValue={issue?.title}
            placeholder="Title"
            {...register('title')}
          />
        </TextFieldRoot>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm
//
