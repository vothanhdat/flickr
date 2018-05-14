import React from 'react'
import StreamList from './StreamList'
import { Paper, Typography } from 'material-ui';
import withSCSS from "withsass.macro";


@withSCSS('./StreamListPaper.scss')
class StreamListPaper extends React.Component {
    render() {
        const { tagname, title, limitrow, classes } = this.props
        return <Paper className={classes.paper}>
            <h3 >{title} : {tagname}>></h3>
            <StreamList tagname={tagname} limitrow={limitrow} />
        </Paper>
    }
}

export default StreamListPaper