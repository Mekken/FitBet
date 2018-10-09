/* This is the container for event cards */

import React from "react";
import data from "../fakeRaceData"


class EventsContainer extends React.Component {

    state ={
        race1Stats : [],
        race2Stats : []
    }

    componentDidMount() {
        //AXIOS call to get data, here I used dummy data,
        const race1 = data.filter(race => race.challengeName === "Annette's Challenge");
        this.setState({race1Stats:race1})  
        console.log(race1);
        const race2 = data.filter(race => race.challengeName === "Senyan's Challenge");
        this.setState({race2Stats:race2}) 
        
    }

render(){
    return(
        <div>
            <h1>Annette's challenge</h1>
            {this.state.race1Stats.map(race => {  
              return (
                <div>  
                  <h2>
                    {race.userName} : {race.steps}
                  </h2>
                </div>
              )
              })}
              <h1>Senyan's challenge</h1>
            {this.state.race2Stats.map(race => {  
              return (
                <div>  
                  <h2>
                    {race.userName} : {race.steps}
                  </h2>
                </div>
              )
              })}
        </div>
    )
}
}

export default EventsContainer;