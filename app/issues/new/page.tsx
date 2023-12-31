'use client'

import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { TextArea, TextFieldRoot, TextFieldInput, Button } from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'
import { string } from 'zod'

interface IssueForm {
  title: string
  description: string
}

const NewIssuePage = () => {
  const { register, control } = useForm<IssueForm>()

  return (
    <>
      <h2>New Issue Page</h2>
      <form className="max-w-xl space-y-2">
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
    </>
  )
}

export default NewIssuePage
//
