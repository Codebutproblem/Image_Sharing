export const isUsernameValidated = (username) => {
  const regex = /^[0-9a-zA-Z]+$/;
  return regex.test(username);
};
