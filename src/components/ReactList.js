import React from 'react'
import ReactList from 'react-list'
import { ReactListProps, ItemSizeGetter } from 'react-list'
import { debounce } from 'lodash-decorators';



const SIZE_KEYS = { x: 'width', y: 'height' };

/**
 * @extends {React.Component<ReactListProps & { onScrollEnd?: any}> }}
 */
class HighPerfomanceList extends ReactList {

    constructor(...args) {
        super(...args)
        this.keyIndex = {}
        this.keyHadIndex = {}
        this.uniqueIndex = 0
        this.childRefs = {}
        this.childDOMRefs = {}
    }

    beforeRender() {
        const { keyHadIndex } = this
        const { from, size } = this.state
        const nextKeyIndex = {}
        const end = from + size;
        const listRecycle = []

        let counter = 0;
        //Reuse from previoust list
        for (let i = from; i < end; i++) {
            if (keyHadIndex[i]) {
                nextKeyIndex[i] = keyHadIndex[i]
                keyHadIndex[i] = undefined
            }
        }
        //Get list will be remove
        for (let i in keyHadIndex)
            if (keyHadIndex[i])
                listRecycle.push(keyHadIndex[i])

        //Recycle from remove list to new items will be render

        for (let i = from; i < end; i++) {
            if (!nextKeyIndex[i]) {
                if (listRecycle.length > 0)
                    // Get from recycle
                    nextKeyIndex[i] = listRecycle.shift()
                else {
                    // Create new
                    nextKeyIndex[i] = { value: this.uniqueIndex++ }
                    counter++;
                }

            }
        }

        // Clear history render
        this.keyHadIndex = {}

        // Swap list keyIndex to new
        this.keyIndex = nextKeyIndex

        console.info(`Create new items ${counter}`)
    }

    /**
     *
     */
    getBestKey(index) {
        let result = this.keyIndex[index].value
        this.keyHadIndex[index] = { value: result }
        return result
    }

    //Overide renderItems method by adding this.getBestKey

    renderItems() {
        const { itemRenderer, itemsRenderer } = this.props;
        const { from, size } = this.state;
        const items = [];
        this.beforeRender()
        for (let i = 0; i < size; ++i) {
            let key = this.getBestKey(from + i);
            items.push(itemRenderer(from + i, key))
        }
        return itemsRenderer(items, c => this.items = c);
    }

    getItemSizeAndItemsPerRow(...args) {
        const { itemMargin } = this.props
        var { itemSize, itemsPerRow } = super.getItemSizeAndItemsPerRow(...args)
        if (itemMargin && itemMargin > 0)
            itemSize += itemMargin
        return { itemSize, itemsPerRow }
    }

    // @debounce(500)
    onScrollEnd(p) {
        let onScrollEnd = this.props.onScrollEnd
        if (onScrollEnd)
            onScrollEnd()
    }

    componentDidUpdate(oldProps, oldState, oldContext) {
        let onScrollEnd = this.props.onScrollEnd
        let currentState = this.state
        if (onScrollEnd) {
            if (currentState.from > oldState.from
                && currentState.from + currentState.size >= (this.props.length || Infinity)) {

                this.onScrollEnd(null)
            }
        }

        super.componentDidUpdate(oldProps, oldState, oldContext)
    }

}



/**
 * @extends {React.Component<ReactListProps & { onScrollEnd?: any, limitrow?: number }>}}
 */
class HighPerfomanceListWithLimitRow extends HighPerfomanceList {

    constrain(from, size, itemsPerRow, { length, minSize, type }) {
        const { limitrow } = this.props;
        if (limitrow) {
            let maxSize = itemsPerRow * limitrow
            length = Math.min(maxSize, length)
        }
        return super.constrain(from, size, itemsPerRow, { length, minSize, type })
    }

    getSpaceBefore(index, cache) {
        const { limitrow } = this.props;

        if (limitrow) {
            const { itemsPerRow } = this.state;
            index = Math.min(index, itemsPerRow * limitrow);
            return super.getSpaceBefore(index, cache)
        } else {
            return super.getSpaceBefore(index, cache)
        }
    }
}


export default HighPerfomanceList
//ReactListLimitRow, ReactList 
export {
    HighPerfomanceList as ReactList,
    HighPerfomanceListWithLimitRow as ReactListLimitRow,
}
