import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const EventListItem = ({ id, name, description, symptoms, temperature, createdAt }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{name}: {description}</h3>
      <span className="list-item__sub-title">{moment(createdAt).format('MMMM Do, YYYY')}</span>
    </div>
    <h3 className="list-item__data">{temperature}</h3>
  </Link>
);

export default EventListItem;
