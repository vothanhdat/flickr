import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import CircularProgress from 'material-ui/Progress/CircularProgress'
import purple from 'material-ui/colors/purple';
import HiddenLayout from '../layouts/HiddenLayout'
import Snackbar from 'material-ui/Snackbar';
import SnackbarContent from 'material-ui/Snackbar/SnackbarContent';


import { withTranslate, RegisterLanguage, T } from './Language'

const noop = e => e

const popupWatingBox = (promise, message = T.please_wating, minimumtime = 1000) => {

  const timeout = new Promise(e => setTimeout(e, minimumtime))

  const { close, submit } = HiddenLayout.addPopup(({ onClose, open, _ = noop }) => <Dialog open={open} >
    <DialogContent >
      <DialogContentText style={{ textAlign: 'center' }}>{_(message) || message}</DialogContentText>
      <CircularProgress style={{ color: purple[500], margin: '10px auto', display: "block" }} thickness={7} />
    </DialogContent>
  </Dialog>
  );

  const finalpromise = timeout.then(e => promise)

  finalpromise.then(submit);
  finalpromise.catch(close);

  return finalpromise;
}


const popupMessageBox = function ({ title = "", message = T.please_wating, error = false }) {

  const { close, popuppromise } = HiddenLayout.addPopup(({ onClose, onSubmit, open, _ = noop }) => <Dialog open={open} onBackdropClick={onClose}>
    <DialogTitle>{_(title) || title}</DialogTitle>
    <DialogContent >
      <DialogContentText style={{ textAlign: 'center' }}>{_(message) || message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant="raised" onClick={onSubmit} color="primary"> {_(T.OK) || 'OK'} </Button>
    </DialogActions>
  </Dialog>
  );
  return popuppromise;
}


const confirmBox = function ({ title = "", message, submitText = T.submit, cancelText = T.cancel }) {

  const { close, submitpromise } = HiddenLayout.addPopup(({ onClose, onSubmit, open, _ = noop }) => <Dialog open={open} onBackdropClick={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent >
      <DialogContentText style={{ textAlign: 'center' }}>{_(message) || message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant="raised" onClick={onClose} color="primary"> {_(cancelText) || cancelText || 'Cancel'} </Button>
      <Button variant="raised" onClick={onSubmit} color="primary"> {_(submitText) || submitText || 'Submit'} </Button>
    </DialogActions>
  </Dialog>
  );
  return submitpromise;
}

// const GiftCardViewWithClose = function(props){
//   return <React.Fragment>
//       <div onClick={props.onClose} style={{
//           position:" fixed",
//           float:" right",
//           alignSelf: "flex-end",
//           fontSize:" 3em",
//           color: "#fff",
//           zIndex:" 1",
//           cursor: "pointer",
//           transform: "translate(0.8em,-1em) rotate(45deg)"
//       }}>
//           <i class="material-icons" style={{fontSize: '40px'}}>add_circle_outline</i>
//       </div>
//       <GiftCardView {...props}/>
//   </React.Fragment> 
// }


const popupContent = function ({ title = "", Component, buttons = [], classes = {}, force = false, compact = false, props = {} }) {
  const { close, submitpromise } = HiddenLayout.addPopup(({ onClose, onSubmit, open, _ = noop }) => <Dialog open={open} onBackdropClick={force ? undefined : onClose} classes={classes}>
    {!compact && <DialogTitle>{title}</DialogTitle>}
    {!compact && <DialogContent><Component onClose={onClose} onSubmit={onSubmit} {...props} /></DialogContent>}
    {compact && <Component onClose={onClose} onSubmit={onSubmit} {...props instanceof Function ? props : props() } />}
    {!compact && <DialogActions>{buttons}</DialogActions>}
  </Dialog>
  );
  return submitpromise;
}

const snackBar = function ({
  message = '',
  action = [],
  className = '',
  allowClose = _ => true,
  anchorOrigin: { vertical = "bottom", horizontal = "right" } = {},
}) {
  const { close } = HiddenLayout.addPopup(({ onClose, open }) => <Snackbar
    className={className}
    anchorOrigin={{ vertical, horizontal }}
    open={open}
    action={action}
    onClose={() => allowClose() && onClose()}
    message={message}
  />
  );
  return close;
}

export {
  popupWatingBox,
  popupMessageBox,
  popupContent,
  confirmBox,
  snackBar,
}
