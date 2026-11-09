export const formatXp = (value) => Math.round(value || 0).toLocaleString();

export const formatDate = (date) =>
  new Date(date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
