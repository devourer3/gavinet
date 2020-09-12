export const setTokenCookie = (token: string) => {
  let expires: string;
  const tokens:string[] = token.split(';')
  // if (days) {
  const date = new Date();
  date.setTime(date.getTime() + (60 * 60));
  expires = "; expires=" + date.toUTCString();
  // }
  document.cookie = tokens[0] + expires + "; path=/";
};


export const getCookie = () => {
  const nameEQ = "Authorization=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const deleteCookie = function (name: string) {
  const date = new Date();
  document.cookie = name + "= " + "; expires=" + date.toUTCString() + "; path=/";
};
