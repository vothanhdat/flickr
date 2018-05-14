import { hot } from 'react-hot-loader'
import React from 'react'
import withSCSS from 'withsass.macro'
import { withTranslate, T } from '../../components/Language'
import AutoVideo from 'react-collections/AutoVideo'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Calendar, { CalendarTileProperties } from 'react-calendar';
import Paper from 'material-ui/Paper';
import IcalExpander from 'ical-expander';
import { firstDayinMonth, lastDayinMonth } from '../../utils/time';
import { groupBy } from 'lodash'
import { memoize } from 'lodash-decorators'
import device from '../../utils/device'
import classNames from 'classnames'

function parseICS(text = "", startDate, endDate) {

  const icalExpander = new IcalExpander({ ics: text, maxIterations: 10 });
  const events = icalExpander.between(startDate, endDate);

  return events.events.map(({ startDate, summary, location }) => ({
    startDate: startDate.toJSDate(),
    summary,
    location
  }))
}


class EventRender extends React.PureComponent {

  @memoize()
  getEventsSorted(events) {

    return Object
      .entries(groupBy(events, e => e.startDate.toDateString()))
      .sort(([, [a1]], [, [a2]]) => a1.startDate - a2.startDate)
      .map(([key, array]) => [
        key,
        array.sort(
          (a1, a2) => (a1.startDate - a2.startDate) * 1000
            + ((a1.summary || '').localeCompare(a2.summary))
        )
      ])
  }

  render() {
    const { view, _, classes } = this.props

    const events = this.getEventsSorted(this.props.events)



    return <div className={classes.eventlist}>
      {
        events.length > 0
          ? events.map(
            ([key, array]) => <div key={key} >
              <span className={classes.dategr}>
                <b>{key}</b>
              </span>
              <span className={classes.eventgr}>
                {array.map((e, i) => <div key={i}> {e.summary} </div>)}
              </span>
            </div>
          )
          : <div style={{ justifyContent: 'center' }}>
            There are no event yet
              </div>
      }
    </div>

  }
}

@hot(module)
@withTranslate
@withSCSS('../common.scss', './Section15_Events.scss')
class Section15_Events extends React.PureComponent {
  state = {
    date: new Date(),
    startDate: firstDayinMonth(new Date()),
    view: 'month',
    events: [],
    ics: '',
  }

  onChange = date => this.setState((state, props) => ({
    date,
    events: state.ics && parseICS(
      state.ics,
      firstDayinMonth(date),
      lastDayinMonth(date)
    ) || state.events
  }))

  formatMonth = (e) => e.toLocaleString('en-us', { month: "long", year: "numeric" })

  onActiveDateChange = ({ activeStartDate, view }) => {
    console.log({ activeStartDate, view })
    this.setState((state, props) => ({
      startDate: activeStartDate,
      view: view,
      date: undefined,
      events: state.ics && parseICS(
        state.ics,
        firstDayinMonth(activeStartDate),
        lastDayinMonth(activeStartDate)
      ) || state.events
    }))
  }

  onNext = () => {
    var startDate = firstDayinMonth(this.state.startDate)
    startDate.setMonth(startDate.getMonth() + 1)
    this.onActiveDateChange({ activeStartDate: startDate, view: "month" })
  }

  onPrev = () => {
    var startDate = firstDayinMonth(this.state.startDate)
    startDate.setMonth(startDate.getMonth() - 1)
    this.onActiveDateChange({ activeStartDate: startDate, view: "month" })
  }

  componentDidMount() {
    if (device.isSPA)
      return;
    fetch('https://giftoproxy.herokuapp.com/https://calendar.google.com/calendar/ical/pengpengla.com_4n2cdn4tg9rv1un9v06es23388%40group.calendar.google.com/public/basic.ics')
      .then(e => e.text())
      .then(e => this.setState((state, props) => ({
        ics: e,
        events: parseICS(
          e,
          firstDayinMonth(state.startDate),
          lastDayinMonth(state.startDate)
        ),
      })))
  }

  @memoize()
  getDateIndex(events) {
    return events.reduce((o, e) => {
      var k = e.startDate.getDate();
      (o[k] || (o[k] = [])).push(e);
      return o
    }, {})
  }

  computeTileClassName = ({ date, view }) => {
    const { classes } = this.props
    if (date && this.getDateIndex(this.state.events)[date.getDate()])
      return [classes.cantile, classes.hasevent, classes.beforebg]
    else
      return classes.cantile
  }

  render() {
    const { classes, _ } = this.props
    return <div className={classes.root} id='events'>
      <div className={classes.container}>
        <h2>{_(T.menu_events)}</h2>
        <Paper className={classes.canlendarcontainer} elevation={20}>
          <div className={classes.head}>
            <span>{this.formatMonth(this.state.date || this.state.startDate)}</span>
            <img src='/images/logo-wide.png' height="50px" alt='Gifto by Uplive' />
          </div>
          <br />
          <Calendar
            locale="en-US"
            onChange={this.onChange}
            value={this.state.date}
            className={classes.canroot}
            tileClassName={this.computeTileClassName}
            onActiveDateChange={this.onActiveDateChange}
            activeStartDate={this.state.startDate}
            showNavigation={false}

          />
          <div className={classes.eventcontainer}>
            <Button variant="raised" color="primary" onClick={this.onPrev}><i className="material-icons">navigate_before</i> {_(T.prev)}</Button>
            <EventRender
              events={this.state.events}
              view={this.state.view}
              _={_}
              classes={classes}
            />
            <Button variant="raised" color="primary" onClick={this.onNext}>{_(T.next)} <i className="material-icons">navigate_next</i></Button>
          </div>
        </Paper>
      </div>
    </div>
  }
}



export default Section15_Events

