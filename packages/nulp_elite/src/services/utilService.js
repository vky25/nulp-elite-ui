export const userId = () => {
  const userIdElement = document.getElementById("userId");
  const userId = userIdElement ? userIdElement.value : "";
  return userId;
};

export const userSid = () => {
  const userSidElement = document.getElementById("userSid");
  const userSid = userSidElement ? userSidElement.value : "";
  return userSid;
};

export const sessionId = () => {
  const sessionIdElement = document.getElementById("sessionId");
  const sessionId = sessionIdElement ? sessionIdElement.value : "";
  return sessionId;
};
