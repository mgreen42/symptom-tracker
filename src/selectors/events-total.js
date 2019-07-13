export default (events) => {
  return events
      .map((event) => event.amount)
      .reduce((sum, value) => sum + value, 0);
};
