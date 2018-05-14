import * as React from 'react'
import StreamList from './StreamList'
import { Paper, Typography } from 'material-ui';


class StreamListPaper extends React.Component {
    render() {
        const { tagname, title, limitrow } = this.props
        return <div>
            <Typography type="headline" component="h3">
                {title} >>
            </Typography>
            <StreamList tagname={tagname} limitrow={limitrow} />
        </div>
    }
}



export default StreamListPaper