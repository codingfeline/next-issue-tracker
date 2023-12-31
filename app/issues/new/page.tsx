'use client'

import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import {
  TextArea,
  TextFieldRoot,
  TextFieldInput,
  Button,
  Callout,
  CalloutRoot,
  CalloutText,
} from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'
import { string } from 'zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface IssueForm {
  title: string
  description: string
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>()
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
        {/* <TextArea placeholder="Reply to comment…" /> */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
//
