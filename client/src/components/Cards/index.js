import React from "react";
import EventTitle from "../EventTitle";
import StepsAndRanking from "../StepsAndRanking";
import SeeMoreButton from "../SeeMoreButton"

import "./cards.css"

const Cards = (props) => (
    <div className="card">
    <EventTitle name={props.raceTitle} />
    <StepsAndRanking ranking={props.ranking} stepCount={props.stepCount}/>
    <SeeMoreButton showDetails={props.showDetails} hideDetails={props.hideDetails}>{props.children}</SeeMoreButton>
     {props.children}
    </div>
)

export default Cards;