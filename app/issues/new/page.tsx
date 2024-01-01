'use client'

import ErrorMessage from '@/app/components/ErrorMessage'
import { createIssueSchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  CalloutRoot,
  CalloutText,
  Text,
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

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  })
  const router = useRouter()
  const [error, setError] = useState('')

  return (
    <div className="max-w-xl">
      {error && (
        <CalloutRoot color="red" className="mb-2">
          <CalloutText>{error}</CalloutText>
        </CalloutRoot>
      )}
      <form
        className=" space-y-2"
        onSubmit={handleSubmit(async data => {
          try {
            await axios.post('/api/issues', data)
            router.push('/issues')
          } catch (error) {
            setError('Error occured')
          }
        })}
      >
        <TextFieldRoot>
          <TextFieldInput placeholder="Title" {...register('title')} />
        </TextFieldRoot>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
//
