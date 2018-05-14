import ReactGA from 'react-ga';
import {isProd} from '../pageconfig'

ReactGA.initialize('UA-111631750-2',{
    debug : !isProd
});

const trackEvent = function({category,action,label,value=undefined,nonInteraction=undefined,transport=undefined}){
    ReactGA.event({
        category,action,label,value,nonInteraction,transport
    });
}

const trackException = function({description,fatal=true}){
    ReactGA.exception({
        description : (typeof description == 'string') ? description : JSON.stringify(description),
        fatal,
    });
}

const trackTimming = function({category,variable,value,label}){
    ReactGA.timing({
        category,variable,value,label,
    });
}

export {
    trackEvent,
    trackException,
    trackTimming,
}