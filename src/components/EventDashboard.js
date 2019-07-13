import React from 'react';
import EventList from './EventList';
import EventListFilters from './EventListFilters';
import EventSummary from './EventSummary';

const EventDashboardPage = () => (
  <div>
    <EventSummary />
    <EventListFilters />
    <EventList />
  </div>
);

export default EventDashboardPage;
