import React from 'react'
import MuiButton from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    buttonRoot: {
        borderRadius: '0px',
        background: 'linear-gradient(360deg, #c6ff00 1%, rgba(198, 255, 0, 0.08) 40%);'
    }
}

const Button = ({ classes, ...rest }) => (
    <MuiButton classes={{ root: classes.buttonRoot }} { ...rest } />
)

export default withStyles(styles)(Button)