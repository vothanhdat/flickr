//@ts-check
import React from 'react'
import { ReactListLimitRow, ReactList } from '../../components/ReactList'
import { bind } from 'lodash-decorators';
import withSCSS from "withsass.macro";
import StreamItem from './StreamItem'
import FeedConnect from '../../store/connects/feed'


@FeedConnect()
@withSCSS('./StreamList.scss')
class StreamList extends React.Component {



    componentDidMount() {
        const { data, state, fetch, fetchappend } = this.props
        fetch(this.props)
    }


    @bind()
    itemRender(index, key) {
        const { _, datas, classes } = this.props
        const item = datas[index]
        return <div className={classes.itemcontainer} key={key} >
            <StreamItem _={_} data={item} className={classes.item} />
        </div>
    }

    render() {
        const { _, language, datas, limitrow, classes } = this.props
        const Component = limitrow ? ReactListLimitRow : ReactList;

        return <div className={classes.list}>
            <Component
                limitrow={limitrow}
                onScrollEnd={this.props.onScrollEnd}
                length={datas.length}
                itemRenderer={this.itemRender}
                type='uniform'
                useTranslate3d
            />
        </div>
    }
}

export default StreamList