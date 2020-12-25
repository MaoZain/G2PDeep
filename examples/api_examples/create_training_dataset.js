/*

Input
{
    "localstorage_id": "test_localstorage_id",
    "dataset_name": "Training dataset",
    "dataset_type_key": "snp",
    "training_dataset_url": "https://raw.githubusercontent.com/shuaizengMU/AI_backend/dev/examples/datasets/height.test.csv?token=AD63QA3HQDAHN3O3ASCBC6274XZXQ",
    "description": "for testing",
    "test_dataset_url": ""
}

Output
{
    "message": "/usr/src/app/media/datasets/1608082636.csv",
    "status": "SUCCESS"
}

*/
var myHeaders = new Headers();
myHeaders.append("Access-Control-Allow-Origin", "*");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"localstorage_id":"test_localstorage_id","dataset_name":"Training dataset","dataset_type_key":"snp","training_dataset_url":"https://raw.githubusercontent.com/shuaizengMU/test_cases/main/Book1.csv","description":"for testing","test_dataset_url":""});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://trbil.missouri.edu:8000/api/datasets/create_training_dataset/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));