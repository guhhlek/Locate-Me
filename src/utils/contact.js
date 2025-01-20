export const getUserContacts = (user) => {
  const users = JSON.parse(localStorage.getItem("users")) || {};
  return users[user]?.contacts || [];
};

export const saveUserContacts = (user, contacts) => {
  const users = JSON.parse(localStorage.getItem("users")) || {};
  users[user] = { ...users[user], contacts };
  localStorage.setItem("users", JSON.stringify(users));
};
