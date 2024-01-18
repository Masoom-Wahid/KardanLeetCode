/*
It Takes The Token And Then Decodes the second parts of the token 
with Base64 , this is just simple decoding. for more of it read about 
how simplejwt is made
*/
export default function parseJwt(token) {
  if (!token) {
    // Token is null or undefined, handle accordingly
    console.error("Token is null or undefined.");
    return null; // or throw an error, or however you wish to handle this case
  }

  try {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    // Handle any other errors that might occur
    console.error("Error parsing JWT", e);
    return null; // or rethrow the error, or return a default value
  }
}