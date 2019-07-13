import React from 'react';
import { connect } from 'react-redux';
import EventListItem from './EventListItem';
import selectEvents from '../selectors/events';

export const EventList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Events</div>
      <div className="show-for-desktop">Event</div>
      <div className="show-for-desktop">Symptoms</div>
    </div>
    <div className="list-body">
      {
        props.events.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No Events</span>
          </div>
        ) : (
            props.events.map((event) => {
              return <EventListItem key={event.id} {...event} />;
            })
          )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    events: selectEvents(state.events, state.filters)
  };
};

export default connect(mapStateToProps)(EventList);
