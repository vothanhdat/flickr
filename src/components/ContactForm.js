import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import withForm from 'react-collections/withForm'
import ValidateFunction from '../utils/validate.new'
import { popupWatingBox, popupMessageBox } from './Popup'
import { withTranslate, RegisterLanguage, T } from '../components/Language'


@withTranslate
@withForm({
  contact_mail: ValidateFunction.validateEmail(),
  contact_message: ValidateFunction.validateNotEmpty('Please leaver your message'),
})
class ContactForm extends React.Component {

  onSubmit = () => {
    try {
      this.props.validate();
      const data = new FormData()
      Object
        .entries(this.props.getCleanValues())
        .forEach(([key, value]) => data.append(key, value));

      popupWatingBox(fetch("https://thanhdat.gifto.io/server/contact_us.php", {
        method: 'POST',
        body: data
      }))
        .then(e => {
          this.props.onSubmit()
          return popupMessageBox({ title: 'Success', message: 'Your email has been sent successfully!' })
        })
    } catch (error) { }
  }


  render() {
    const { onClose, onSubmit, open, formfield, values, classes, loading, _ } = this.props
    return <form autoComplete="off" encType="multipart/form-data" onSubmit={this.onSubmit}>

      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{_(T.contact_signup)}</DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          <DialogContentText></DialogContentText>
          <img src="/images/contact_icon.svg" alt="Contact Us Icon" />
          <TextField {...formfield('contact_mail')} label={_(T.contact_email)} fullWidth />
          <TextField {...formfield('contact_message')} label={_(T.contact_message)} fullWidth multiline rows={4} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="raised" color="secondary">
            {_(T.cancel)}
          </Button>
          <Button onClick={this.onSubmit} variant="raised" color="secondary" type="submit">
            {_(T.subscribe)}
          </Button>
        </DialogActions>
      </Dialog>
    </form>


  }
}

export default ContactForm