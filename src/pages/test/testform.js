import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { withTranslate, T } from '@/components/Language'
import withSCSS from 'withsass.macro';
import withForm from 'react-collections/withForm';
import ImagePreview from 'react-collections/ImagePreview';
import FileField from 'react-collections/FileField'
import withSuperForm from 'react-collections/withSuperForm'
import SelectField from 'react-collections/SelectField'
import { Grid, Button, Tooltip, IconButton, TextField } from '@material-ui/core'
import device from '@/utils/device'
import ValidateFunction from '@/utils/validate.new'
import { mapValues, omit, fromPairs, isEqual } from 'lodash'
import { memoize, bind } from 'lodash-decorators';


const ValidateFileArray = ValidateFunction.validateArray(
  ValidateFunction.validateFile({ min: 100 * 1024, max: 1024 * 1024 * 5 }),
);
const formValidate = {
  'firstname': ValidateFunction.validateNotEmpty(),
  'lastname': ValidateFunction.validateNotEmpty(),
  'dob': ValidateFunction.validate([
    [e => !!e, T.error_field_required],
    [e => (Date.now() - new Date(e)) / (1000 * 3600 * 24 * 365) >= 18, T.kyc_error_old],
  ]),
  'street': ValidateFunction.validateNotEmpty(),
  'city': ValidateFunction.validateNotEmpty(),
  'state': ValidateFunction.validateNotEmpty(),
  'country': ValidateFunction.validateNotEmpty(),
  'postal': ValidateFunction.validateNotEmpty(),
  'ethaddr': ValidateFunction.validateEthaddr(),
  'amount': ValidateFunction.validate([
    [e => !!e, T.error_field_required],
    [e => e >= 0, T.kyc_amount_error_zero],
    [e => e <= 10000, T.kyc_amount_error_max],
  ]),
  'passport': ValidateFunction.validateNotEmpty(),
  'nationality': ValidateFunction.validateNotEmpty(),
  "identity-image": ValidateFunction.validateCondition(
    [[
      (value, state, { updating, data: { identityimage } = {} }) => (!updating || !identityimage),
      ValidateFunction.validateNotEmpty(),
    ], [
      (value, state, props) => !!state['identity-image'],
      ValidateFileArray,
    ]],
  ),
  "extra-image": ValidateFunction.validateCondition(
    [[
      (value, { amount }, { updating, data: { extraimage } = {} }) => (!updating || !extraimage) && amount >= 1000,
      ValidateFunction.validateNotEmpty()
    ], [
      (value, state, props) => !!state['extra-image'],
      ValidateFileArray,
    ]],
  ),
  'capcha': ValidateFunction.validateCapcha,
}


function getTextHeight(text = '', cols = 40) {
  return (text || '')
    .split('\n')
    .map(e => (e.length / 40 | 0) + 1)
    .reduce((e, f) => e + f, 0)
}


const IdentityTooltips = ({ classes, _ }) => <Tooltip title={<img src="/images/blockchain-dlt-1024x682.png" width="200" />} placement="right">
  <IconButton color="inherit" aria-label="Delete" className={classes.tooltipicon} >
    <i className='material-icons' style={{ fontSize: "0.7em" }}>help</i>
  </IconButton>
</Tooltip>

const ErrorLine = ({ error }) => error && <p style={{ marginTop: "1.2em" }}></p>

class LightFormInput extends React.PureComponent {
  render() {
    const { name, value, onChange, onBlur, error, helpText } = this.props
    return <div>
      <textarea cols={40} style={{ height: `${1.3 * getTextHeight(value) + 0.5}em`, lineHeight: "1.3em", overflow: 'hidden' }} value={value} onChange={onChange} />
    </div>
  }
}

@withForm(formValidate)
@withSuperForm
class TestForm extends React.PureComponent {

  ExtraImage = ({ amount, ...props }) => {
    const { _ } = this.props
    return amount > 1000
      && <React.Fragment>
        <br />
        <small>{_(T.kyc_idenimg_des)}</small>
        <br />
        <small> {_(T.kyc_upload_des)}</small>
      </React.Fragment>
  }

  render() {
    console.log('rd')
    const { classes, formfield, formref, formgetter, submit, data, updating, values, _, Field, Obser } = this.props
    return <Grid container className={classes.form} spacing={16}>

      <Grid item xs={12} sm={12} md={12} >
       

      </Grid>
      {
          new Array(1000).fill(0)
            .map((e, i) => <Grid xs={3} sm={3} md={3}>
              <Field
                Com={LightFormInput}
                {...formfield('testform' + i)}
                subs={'testform' + i}
                key={'testform' + i}
              />
            </Grid>)
        }

      <Grid item xs={12} sm={12} md={12} >
        test
        <Field
          Com={({ state }) => <pre>{JSON.stringify(state, null, 2)}</pre>}
          state={values} pure
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12} >
        <Field subs="firstname lastname" Com={({ firstname, lastname }) => <span>{firstname} - {lastname}</span>} firstname={values.firstname} lastname={values.lastname} pure />
      </Grid>

      <Grid item xs={12} sm={12} md={6} >
        <Field subs="firstname" Com={TextField} {...formfield('firstname')} label={_(T.kyc_name, _, 0)} fullWidth inputProps={{ maxLength: "25" }} />
      </Grid>
      <Grid item xs={12} sm={12} md={6} >
        <Field subs="lastname" Com={TextField} {...formfield('lastname')} label={_(T.kyc_name, _, 1)} fullWidth inputProps={{ maxLength: "25" }} />
      </Grid>

      <Grid item xs={12} sm={12} md={6} >
        <Field
          subs="dob"
          Com={TextField} {...formfield('dob')}
          label={_(T.kyc_dob)} fullWidth
          InputLabelProps={{ shrink: true }}
          type="date"
        />
      </Grid>

      <Grid item xs={12} sm={12} md={6} className={classes.helpcon}>
        <div className={classes.small}>{_(T.kyc_old_des)}</div>
        {(device.isIE || (!device.isiOS && device.isSafari)) &&
          <div className={classes.small}>{_(T.kyc_old_example)}</div>
        }
        <Field subs="dob:error" error={formfield('dob').error} Com={ErrorLine} />
      </Grid>


      <Grid item xs={12} sm={12} md={6} >
        <Field subs="street" Com={TextField} {...formfield('street')} label={_(T.kyc_address, _, 0)} fullWidth inputProps={{ maxLength: 50 }} />
      </Grid>

      <Grid item xs={12} sm={12} md={6} >
        <Field subs="city" Com={TextField} {...formfield('city')} label={_(T.kyc_address, _, 1)} fullWidth inputProps={{ maxLength: 30 }} />
      </Grid>

      <Grid item xs={12} sm={12} md={6} >
        <Field subs="state" Com={TextField} {...formfield('state')} label={_(T.kyc_address, _, 2)} fullWidth inputProps={{ maxLength: 30 }} />
      </Grid>

      <Grid item xs={12} sm={12} md={6} >
        <Field subs="postal" Com={TextField} {...formfield('postal')} label={_(T.kyc_postal)} fullWidth />
      </Grid>

      <Grid item xs={12} sm={12} md={12} />

      <Grid item xs={12} sm={12} md={6} >
        <Field subs="ethaddr" Com={TextField} {...formfield('ethaddr')} label={_(T.kyc_ethaddr)} fullWidth />
      </Grid>

      <Grid item xs={12} sm={12} md={6} className={classes.helpcon}>
        <div className={classes.small}> {_(T.kyc_eth_des)} </div>
        <Field subs="ethaddr:error" error={formfield('ethaddr').error} Com={ErrorLine} />
      </Grid>


      <Grid item xs={12} sm={12} md={6} >
        <Field Com={TextField}
          {...formfield('amount')}
          label={_(T.kyc_estimate)}
          fullWidth
          subs="amount"
          inputProps={{ min: 0, max: 10000, type: "number" }} />
      </Grid>

      <Grid item xs={12} sm={12} md={6} className={classes.helpcon}>
        <div className={classes.small}>
          {_(T.kyc_amount_des, _, 0)}
          <br />
          {_(T.kyc_amount_des, _, 1)}
        </div>
        <Field subs="amount:error" error={formfield('amount').error} Com={ErrorLine} />
      </Grid>


      <Grid item xs={12} sm={12} md={6} >
        <Field subs="passport" Com={TextField} {...formfield('passport')} label={_(T.kyc_passport)} fullWidth inputProps={{ maxLength: 20 }} />
      </Grid>

      <Grid item xs={12} sm={12} md={6} className={classes.helpcon}>
        <div className={classes.small}>
          {_(T.kyc_passport_des, _, 0)}
          <br />
          {_(T.kyc_passport_des, _, 1)}
        </div>
        <Field subs="passport:error" error={formfield('passport').error} Com={ErrorLine} />
      </Grid>


      <Grid item xs={12} sm={12} md={12} >
        <Field Com={FileField}
          {...formfield("identity-image")}
          defaultValue={data.identityimage}
          classes={classes}
          maxFile={3} multiple
          subs="identity-image"
          itemRender={ImagePreview}
          label={
            <React.Fragment>
              {_(T.kyc_idenimg)}
              <IdentityTooltips classes={classes} _={_} />
            </React.Fragment>
          } />
        <br />
        <small>{_(T.kyc_idenimg_des)} </small>
        <br />
        <small>{_(T.kyc_upload_des)}</small>
      </Grid>

      <Grid item xs={12} sm={12} md={12} >
        <Field Com={({ amount, ...props }) => amount > 1000 && <FileField {...props} />}
          {...formfield("extra-image")}
          pure
          amount={values.amount}
          subs="identity-image amount"
          defaultValue={data.extraimage}
          multiple classes={classes}
          maxFile={3}
          itemRender={ImagePreview}
          label={
            <React.Fragment>
              {_(T.kyc_idenimg)}
              <IdentityTooltips classes={classes} _={_} />
            </React.Fragment>
          } />

        <Field
          amount={values.amount}
          Com={this.ExtraImage} />

      </Grid>



      <Grid item xs={12} sm={12} md={12} lg={12}  >
        <Button variant="flat" type="submit" >{_(T.submit)}</Button>
      </Grid>

      {/* <Grid item xs={12} sm={12} md={12} lg={12} >
          <Recapcha {...formfield("capcha")} delay={500} />
        </Grid> */}

    </Grid>

  }
}

@withTranslate
@withSCSS('../common.scss', './form.scss')
class TestFormComponent extends React.Component {
  render() {
    const { classes } = this.props
    return <div className={classes.root}>
      <div className={classes.container}>
        <TestForm {...this.props} />
      </div>
    </div>
  }
}

export default TestFormComponent;
