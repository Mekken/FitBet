import React from "react";
import Cards from "../Cards";
import data from "../fakeRaceData"


class CardsContainer extends React.Component {
    state ={
        currentRaces : [],
        allStepsInOneRace: [],
        user: "Annette",
        prize:null
    }

    componentDidMount() {
        //AXIOS call to get data, here I used dummy data,
        //suppose Annette is the user here.

        const myRaces = data.filter(race => race.userName === this.state.user);
        this.setState({currentRaces:myRaces})  
        console.log(myRaces);
    }

    findRanking= (userSteps, whichRace) => {
        const participantsArray = data.filter(runner => runner.challengeName === whichRace)
        console.log(participantsArray)
        const stepsArray = participantsArray.map(runner => runner.steps);
        stepsArray.sort(function(a, b) {
            return b - a;
          });
          console.log(stepsArray);
          const ranking = stepsArray.indexOf(userSteps) + 1;
          console.log(ranking);
        return ranking;
    }
    showDetails= () => {
    /* click on the details button will show prize of the challenge, each runner's steps, and live chat with teammates */
    console.log("I am here")
       this.setState({prize:"$1000"})
    }

    hideDetails = () => {
        console.log("hiding details from user")
        this.setState({prize:null})
    }
render(){
    return(
        <div>
            {this.state.currentRaces.map(race => {  
              return (
                <Cards raceTitle={race.challengeName} ranking={this.findRanking(race.steps, race.challengeName)} 
                stepCount={race.steps} showDetails={this.showDetails} hideDetails={this.hideDetails}>
                {this.state.prize}
                </Cards>
              )
              })}
        </div>
    )
}
}

export default CardsContainer;