import * as ReactGA from './GA'

const GetString = description => (typeof description == 'string') ? description : JSON.stringify(description)



/**

-User click “Upload” button
-User select a gift
-User press “Send” button
-User that have successfully sent a gift
-User press “Send” button and don’t have enough GIFTO(the “You don’t have enough GIFTO.” window pop up.
-User see the “You don’t have enough GIFTO” window and click “Get GIFTO at Binance” button.
-User that share their card to facebook

 * 
 */



const GAEvents = {

    uploadImage(){
        ReactGA.trackEvent({
            category: 'Home',
            action: 'uploadImage',
        });
    },

    uploadSkip(){
        ReactGA.trackEvent({
            category: 'Home',
            action: 'uploadSkip',
        });
    },

    chooseGift(){
        ReactGA.trackEvent({
            category: 'Home',
            action: 'chooseGift',
        });
    },

    choosedGiftAndNext(){
        ReactGA.trackEvent({
            category: 'Home',
            action: 'choosedGiftAndNext',
        });
    },

    sendButtonClick(){
        ReactGA.trackEvent({
            category: 'Home',
            action: 'sendButtonClick',
        });
    },

    sendButtonClickSuccess(){
        ReactGA.trackEvent({
            category: 'Home',
            action: 'sendButtonClickSuccess',
        });
    },

    sendButtonValidateFail(error){
        ReactGA.trackEvent({
            category: 'Home',
            action: 'sendValidateFail',
            label : GetString(error),
        });
    },

    transactionMetaMaskAccepted(_){
        ReactGA.trackEvent({
            category: 'Home',
            action: 'transactionMetaMaskAccepted',
            label: _,
        });
    },

    doTransactionFail(error){
        ReactGA.trackEvent({
            category: 'Home',
            action: 'doTransactionFail',
            label : GetString(error),
        });
    },

    doesntEnoughGifto(){
        ReactGA.trackEvent({
            category: 'Home',
            action: 'doenntEnoughGifto',
        });
    },

    previewClick(){
        ReactGA.trackEvent({
            category: 'Home',
            action: 'PreviewGiftCard',
        });
    },

    gotoBinance(){
        ReactGA.trackEvent({
            category: 'Home',
            action: 'GoBinance',
        });
    },


    shareClick(){
        ReactGA.trackEvent({
            category: 'ShareFacebook',
            action: "ShareClick"
        });
    },
    shareSuccess(){
        ReactGA.trackEvent({
            category: 'ShareFacebook',
            action: "shareSuccess"
        });
    },

    submitedTransaction(){
        ReactGA.trackEvent({
            category: 'Transaction',
            action: 'submitedTransaction',
        });
    },

    transferGiftoFailed(tx){
        ReactGA.trackEvent({
            category: 'Transaction',
            action: 'transferGiftoFailed',
            label: tx,
        });
    },


    transferGiftoDoneAndWaitSentGift(){
        ReactGA.trackEvent({
            category: 'Transaction',
            action: 'transferGiftoDoneAndWaitSentGift',
        });
    },

    sendGiftSuccess(){
        ReactGA.trackEvent({
            category: 'Transaction',
            action: 'sendGiftSuccess',
        });
    },

    transferVirtualGiftFailed(tx){
        ReactGA.trackEvent({
            category: 'Transaction',
            action: 'transferVirtualGiftFailed',
            label: tx,
        });
    },


    // makeMyOwnCardClick(){
    //     ReactGA.trackEvent({
    //         category: 'Home',
    //         action: 'makeMyOwnCardClick',
    //     });
    // },
    // sendGiftoOnClick(){
    //     ReactGA.trackEvent({
    //         category: 'SendForm',
    //         action: 'sendGiftoOnClick',
    //     });
    // },
    // sendGiftoOnClickFail(error){
    //     console.log("sendGiftoOnClickFail",GetString(error))
    //     ReactGA.trackEvent({
    //         category: 'SendForm',
    //         action: 'sendGiftoOnClickFail',
    //         label : GetString(error),
    //     });
    // },
    // doTransactionClick(){
    //     ReactGA.trackEvent({
    //         category: 'SendFormMetamask',
    //         action: 'doTransactionClick',
    //     });
    // },
    // doTransactionClickBinance(error){
    //     ReactGA.trackEvent({
    //         category: 'SendFormMetamask',
    //         action: 'doTransactionClickBinance',
    //     });
    // },
    // doTransactionCancel(){
    //     ReactGA.trackEvent({
    //         category: 'SendFormMetamask',
    //         action: 'doTransactionCancel',
    //     });
    // },
    // transactionMetaMaskAccepted(){
    //     ReactGA.trackEvent({
    //         category: 'MetaMask',
    //         action: 'doTransactionMetaMaskAccepted',
    //     });
    // },
    // transactionMetaMaskError(error){
    //     ReactGA.trackEvent({
    //         category: 'MetaMask',
    //         action: 'transactionMetaMaskError',
    //         label : GetString(error),
    //     });
    // },
    // transactionStatusSuccess(){
    //     ReactGA.trackEvent({
    //         category: 'MetaMask',
    //         action: 'transactionStatusSuccess',
    //     });
    // },
    // transactionStatusFail(){
    //     ReactGA.trackEvent({
    //         category: 'MetaMask',
    //         action: 'transactionStatusFail',
    //     });
    // },
    // transactionStatusSuccessAndContinue(){
    //     ReactGA.trackEvent({
    //         category: 'MetaMask',
    //         action: 'transactionStatusSuccessAndContinue',
    //     });
    // },
    // transactionStatusFailAndTryAgain(){
    //     ReactGA.trackEvent({
    //         category: 'MetaMask',
    //         action: 'transactionStatusFailAndTryAgain',
    //     });
    // },
    error(error,fatal = true){
        ReactGA.trackException({
            description: GetString(error),
            fatal,
        })
    }
}

export default GAEvents