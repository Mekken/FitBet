import React from 'react'
import styled from 'react-emotion'
import EventsContainer from '../../components/EventsContainer'

const EventsPageWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const Events = () => (
  <EventsPageWrapper>
    This is where you can view and join events
    <EventsContainer />
  </EventsPageWrapper>
)

export default Events