import React from "react";

const EventsToJoin = props => (
    <div className="container">
    <h1>Events</h1>
       <div className="card-body">
       {
        props.events.map(result => (
            <li className="list-group-item" key={result._id}>
            <h3>Event name: {result.title}</h3>
            <h3>Event description: {result.desc}</h3>
            <h3>Stakes: {result.stakes}</h3>
            <h3>Start date: {result.startDate}</h3>
            <h3>End date: {result.endDate}</h3>
            { 
                result.players.map(res => (
                    <h3 key={res._id}>Participants: {res.name} </h3>
            ))
            }   
            <button onClick={ () => props.handleJoinClick(result._id)}>Join</button>            
            </li>
        ))
       }
       </div>
    </div>
);
  
export default EventsToJoin;
