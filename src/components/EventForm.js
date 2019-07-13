import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.event ? props.event.name : '',
      description: props.event ? props.event.description : '',
      symptoms: props.event ? props.event.symptoms : '',
      temperature: props.event ? (props.event.amount / 100).toString() : '',
      createdAt: props.event ? moment(props.event.createdAt) : moment(),
      calendarFocused: false,
      error: ''
    };
  }
  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onSymptomChange = (e) => {
    const symptoms = e.target.value;
    this.setState(() => ({ symptoms }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.name) {
      this.setState(() => ({ error: 'Please provide a name and description.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        name: this.state.name,
        description: this.state.description,
        symptoms: this.state.symptoms,
        amount: this.state.temperature,
        createdAt: this.state.createdAt.valueOf(),
      });
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          placeholder="Name"
          autoFocus
          className="text-input"
          value={this.state.name}
          onChange={this.onNameChange}
        />
        <input
          type="text"
          placeholder="Description"
          className="text-input"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="text"
          placeholder="Amount"
          className="text-input"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          placeholder="Add any symptoms here (optional)"
          className="textarea"
          value={this.state.symptoms}
          onChange={this.onSymptomChange}
        >
        </textarea>
        <div>
          <button className="button">Save Event</button>
        </div>
      </form>
    )
  }
}
