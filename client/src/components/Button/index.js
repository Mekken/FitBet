import React from 'react'
import MuiButton from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    buttonRoot: {
        borderRadius: '100px',
        color:'#f0f0f0',
        padding:0,
        background: 'linear-gradient(0deg, #f5f5f5 9%, #007cc3 10%)'
    }
}

const Button = ({ classes, ...rest }) => (
    <MuiButton classes={{ root: classes.buttonRoot }} { ...rest } />
)

export default withStyles(styles)(Button)