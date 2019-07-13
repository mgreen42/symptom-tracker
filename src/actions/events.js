import database from '../firebase/firebase';

// ADD_EVENT
export const addEvent = (event) => ({
  type: 'ADD_EVENT',
  event
});

export const startAddEvent = (eventData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      name = '',
      description = '',
      symptoms = '',
      temperature = 0,
      createdAt = 0
    } = eventData;
    const event = { name, description, symptoms, temperature, createdAt };

    return database.ref(`users/${uid}/events`).push(event).then((ref) => {
      dispatch(addevent({
        id: ref.key,
        ...event
      }));
    });
  };
};

// REMOVE_EVENT
export const removeEvent = ({ id } = {}) => ({
  type: 'REMOVE_EVENT',
  id
});

export const startRemoveEvent = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/events/${id}`).remove().then(() => {
      dispatch(removeEvent({ id }));
    });
  };
};

// EDIT_event
export const editEvent = (id, updates) => ({
  type: 'EDIT_EVENT',
  id,
  updates
});

export const startEditEvent = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/events/${id}`).update(updates).then(() => {
      dispatch(editEvent(id, updates));
    });
  };
};

// SET_EVENTS
export const setEvents = (events) => ({
  type: 'SET_EVENTS',
  events
});

export const startSetEvents = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/events`).once('value').then((snapshot) => {
      const events = [];

      snapshot.forEach((childSnapshot) => {
        events.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(setEvents(events));
    });
  };
};
