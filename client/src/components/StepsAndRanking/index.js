import React from "react"

const StepsAndRanking = (props) => (
    <div>
    <h2>You are at {props.ranking} place</h2>
    <h2>Your Steps: {props.stepCount}</h2>
    </div>
)

export default StepsAndRanking;