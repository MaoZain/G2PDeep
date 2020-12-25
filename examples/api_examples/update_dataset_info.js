/*
Input
{
"dataset_info_id": 1,
"ratio_training_dataset": 0.6,
"ratio_validation_dataset": 0.4
}

Output:
{
    "message": {
        "dataset_info_id": 1,
        "ratio_training_dataset": 0.6,
        "ratio_validation_dataset": 0.4
    },
    "status": "SUCCESS"
}

*/

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"id":1,"ratio_training_dataset":0.6,"ratio_validation_dataset":0.4});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://trbil.missouri.edu:8000/api/datasets/update_dataset_info/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));