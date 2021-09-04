export const getChatTime = date => {
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return `${hour}:${minutes} ${hour > 12 ? 'PM' : 'AM'}`;
};

export const setDateChat = dateold => {
  const year = dateold.getFullYear();
  const month = dateold.getMonth() + 1;
  const date = dateold.getDate();
  return `${year}-${month}-${date}`;
};
