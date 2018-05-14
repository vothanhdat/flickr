import React from 'react'

// import { withTranslate, RegisterLanguage, T } from './Language'

class HiddenLayout extends React.Component {
    static component = null
    static count = 105
    componentDidMount() {
        HiddenLayout.component = this
    }
    componentWillUnmount() {
        HiddenLayout.component = null
    }

    static addPopup(component,unique = Math.random(),props={}) {
        console.log('added component')
        if (HiddenLayout.component) {
            return HiddenLayout.component.addPopup(component,unique,props)
        }
        return {}
    }

    static removePopup(component) {
        if (HiddenLayout.component) {
            HiddenLayout.component.removePopup(component)
        }
    }

    addPopup(component, unique, props) {

        var prev = this.state.list.some(e => e.unique == unique)

        if(prev) return {
            close : prev.onClose,
            submit: prev.onSubmit,
            popuppromise : prev.lookpromise,
            submitpromise : prev.thenpromise,
        }

        var lookresolved = null,thenresolved = null,thenrejected = null
        var lookpromise = new Promise(r => lookresolved = r)
        var thenpromise = new Promise((resolve,reject) => (thenresolved = resolve,thenrejected = reject))
        var onClose = () => {
            console.log("onClose Fired")
            this.removePopup(component);
            lookresolved()
            thenrejected('Closed');
            return lookpromise
        }



        var onSubmit = (value) => {
            console.log("on Submited")
            this.removePopup(component);
            console.log(thenresolved)
            thenresolved(value)
            lookresolved()
            return thenpromise
        }


        this.setState({ list: [...this.state.list, {
            open : true, 
            key : HiddenLayout.count++,
            onClose,
            onSubmit,
            component, 
            unique, 
            lookpromise,
            thenpromise,
            props,
        }] })

        return {
            close : onClose,
            submit: onSubmit,
            popuppromise : lookpromise,
            submitpromise : thenpromise,
        }
    }

    removePopup(component) {
        
        this.setState({ 
            list: this.state.list.map(e => e.component == component
                ? {...e, open : false}
                : e
            )
        })

        setTimeout(this._cleanRemove.bind(this,component),500)
    }

    _cleanRemove(component) {
        this.setState({
            list: this.state.list.filter(e => e.component != component)
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            list: [],
        }
    }

    render() {

        return <React.Fragment>
            {this.state.list.map(
                ({component : Dialog,unique,lookpromise,thenpromise,props,...e}) => <Dialog key={unique} {...this.props} {...e} {...props} />)}
        </React.Fragment>
    }
}


export default HiddenLayout