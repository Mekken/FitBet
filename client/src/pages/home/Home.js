import React from 'react'
import styled from 'react-emotion'

const HomePageWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const Home = () => (
  <HomePageWrapper>
    Hello, welcome to my Home page!
  </HomePageWrapper>
)

export default Home