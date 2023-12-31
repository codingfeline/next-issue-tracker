// 'use cient'

import React from 'react'
import { TextArea, TextFieldRoot, TextFieldInput, Button } from '@radix-ui/themes'

const NewIssuePage = () => {
  return (
    <>
      <h2>New Issue Page</h2>
      <div className="max-w-xl space-y-2">
        <TextFieldRoot>
          <TextFieldInput placeholder="Title" />
        </TextFieldRoot>
        <TextArea placeholder="Reply to comment…" />
        <Button>Submit New Issue</Button>
      </div>
    </>
  )
}

export default NewIssuePage
//
