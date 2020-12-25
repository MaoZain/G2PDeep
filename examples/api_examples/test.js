/* 
http://trbil.missouri.edu:8000/test/

Returns
{
    "name": 11
}
*/
var myHeaders = new Headers();
myHeaders.append("Access-Control-Allow-Origin", "*");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"name":11});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://trbil.missouri.edu:8000/api/test/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));