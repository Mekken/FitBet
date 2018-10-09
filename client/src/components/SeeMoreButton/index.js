import React from 'react'
import '../RedirectButton/index.css'

class SeeMoreButton extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        buttonDisplay:"Details"
    }
    }
    setTask = () => {
        if(this.state.buttonDisplay ==="Details"){
           this.setState({buttonDisplay:"Close"}) 
           return this.props.hideDetails
        }
        else{
            this.setState({buttonDisplay:"Details"}) 
            return this.props.showDetails
        }
        
    }

   /*  renderTask = () => {
            if(this.state.buttonDisplay === "Details") {
                return this.props.hideDetails
            }
            else{
                return this.props.showDetails
            }

    } */
    render(){
        return(
    <div className="button">
    <button onClick={this.setTask} showDetails={this.props.showDetails} hideDetails={this.props.hideDetails}>
    {this.state.buttonDisplay}
    {this.props.children}
    </button>
   </div>
   )
    }
}

export default SeeMoreButton;