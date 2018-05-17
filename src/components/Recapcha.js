import React from 'react';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from '@material-ui/core/Form';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Recaptcha from 'react-recaptcha';
import withDelay from '../components/withDelay'



class Recapcha extends React.Component { 
    getClientKey=(e) => {
        try {
            if(document.domain=='localhost')
                return "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
            return this.props.invisible ? "6LfLXzcUAAAAABYENnjVLGx8JrWvw2pIT2EyjHF1"
            : "6LdcVjUUAAAAADIfibwCauXP2n4SDz7bbemRYGLs"
        } catch (error) {
            
        }
    }
    callback = e => {
        console.log(e)
        this.props.onChange({target:{value: e}})
        this.props.onNewCapcha && this.props.onNewCapcha(e)
    }
    expiredCallback = () =>{
        this.props.onChange({target:{value: ""}});
        this.props.onExpireCapcha && this.props.onExpireCapcha(e)
        this.props.invisible && setTimeout(this.greRender,500,0);
    }
    componentDidMount(){
        this.props.invisible && setTimeout(this.greRender,1000,0);

        if(this.props.invisible){
            window.addEventListener("click",this.onDocumentClick)
        }

    }
    componentWillUnmount(){
        if(this.props.invisible){
            window.removeEventListener("click",this.onDocumentClick)
            
        }
    }

    onDocumentClick = (e) => {
        if(this.props.invisible){
            setTimeout(function(){
                try {
                    this.refs.recapcha.execute();
                    // grecaptcha.execute()
                } catch (error) {}
            },1000)
        }
    }

    greRender = (count) => {
        if (this.refs.recapcha) {
            this.refs.recapcha.execute();
            console.log('Recapcha execute')
            // grecaptcha.execute()
        }
        else if(count < 3)
            setTimeout(this.greRender,1000,count+1)
    }
    render(){
        const { className = '', value,  helperText = "" , error, invisible = false } = this.props
        return  <FormControl required error={error} className={className}>
            <Recaptcha
                ref='recapcha'
                // invisible={invisible}
                size={invisible ? "invisible" : undefined} 
                sitekey={this.getClientKey()}
                verifyCallback={this.callback}
                expiredCallback={this.expiredCallback}
            />
            {helperText && <FormHelperText >{helperText}</FormHelperText>}
        </FormControl>
    }
}

export default withDelay(Recapcha)