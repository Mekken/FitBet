import React from 'react'
import styled from 'react-emotion'

const EventsPageWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const Events = () => (
  <EventsPageWrapper>
    Hello, welcome to my Events page!
  </EventsPageWrapper>
)

export default Events