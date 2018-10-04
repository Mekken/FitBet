import React from 'react'
import styled from 'react-emotion'

const ChallengePageWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const Challenge = () => (
  <ChallengePageWrapper>
    Hello, welcome to my Challenge page!
  </ChallengePageWrapper>
)

export default Challenge