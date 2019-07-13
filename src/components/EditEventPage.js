import React from 'react';
import { connect } from 'react-redux';
import EventForm from './EventForm';
import { startEditEvent, startRemoveEvent } from '../actions/events';

export class EditEventPage extends React.Component {
  onSubmit = (event) => {
    this.props.startEditEvent(this.props.event.id, event);
    this.props.history.push('/');
  };
  onRemove = () => {
    this.props.startRemoveEvent({ id: this.props.event.id });
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Event</h1>
          </div>
        </div>
        <div className="content-container">
          <EventForm
            event={this.props.event}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.onRemove}>Remove Event</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  event: state.events.find((event) => event.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditEvent: (id, event) => dispatch(startEditEvent(id, event)),
  startRemoveEvent: (data) => dispatch(startRemoveEvent(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEventPage);
