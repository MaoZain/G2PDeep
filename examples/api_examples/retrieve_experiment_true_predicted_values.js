/*

Input
  {
    "localstorage_id": "test_localstorage_id",
    "experiment_info_id": 11
  }

Output
  {
  "message": [
      {
          "name": "training dataset",
          "data": [
              [
                  -2.54224956914173,
                  -0.19199131429195404
              ],
              [
                  -0.118981035777719,
                  -0.010711937211453915
              ],
          ]
      },
      {
          "name": "validation dataset",
          "data": [
              [
                  2.54224956914173,
                  0.19199131429195404
              ],
              [
                  0.118981035777719,
                  0.010711937211453915
              ],
          ]
      }
  ],
  "status": "SUCCESS"
}

*/

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"localstorage_id":"test_localstorage_id","experiment_info_id":11});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://trbil.missouri.edu:8000/api/operation/retrieve_experiment_true_predicted_values/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));