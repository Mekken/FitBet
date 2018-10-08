import React from 'react'
import styled from 'react-emotion'

const ChallengeEventPageWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const Challenge = () => (
  <ChallengeEventPageWrapper>
    Hello, welcome to my Challenge Event page!
  </ChallengeEventPageWrapper>
)

export default Challenge