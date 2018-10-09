import React from 'react'
import styled from 'react-emotion'
import CardsContainer from "../../components/CardsContainer"
import RedirectButton from '../../components/RedirectButton';

const HomePageWrapper = styled('div')({
  display: 'block',
  alignItems: 'center',
  justifyContent: 'center'
})

const Home = () => (
  <HomePageWrapper>
    <CardsContainer />
    <RedirectButton />
  </HomePageWrapper>
)

export default Home