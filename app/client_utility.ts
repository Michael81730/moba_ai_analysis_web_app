'use-client'

export function getCookie(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
  
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
        console.log("c:", c);
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function validateUsername(username: string) {
    return true;
}

export function validatePassword(password: string) {
    return true;
}