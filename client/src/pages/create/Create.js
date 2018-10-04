import React from 'react'
import styled from 'react-emotion'

const CreateEventPageWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const Create = () => (
  <CreateEventPageWrapper>
    Hello, welcome to my Create Event page!
  </CreateEventPageWrapper>
)

export default Create