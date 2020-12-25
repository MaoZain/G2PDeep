/*
Input:
  {
    "localstorage_id": "test_localstorage_id",
    "experiment_name": "Training dataset",
    "dataset_info_id": "1",
    "description": "for testing",
    "experimental_parameters": {
                "learning_rate": 0.001,
                "epochs": 1,
                "batch_size": 128
    },
    "model_hyperparameters": {
                "left_tower_filters_list": [10, 10],
                "left_tower_kernel_size_list": [4, 20],
                "right_tower_filters_list": [10],
                "right_tower_kernel_size_list": [4],
                "central_tower_filters_list": [10],
                "central_tower_kernel_size_list": [4],
                "dnn_size_list": [1]
    }
  }

Output:
{
    "message": 8,
    "status": "SUCCESS"
}

*/

var myHeaders = new Headers();
myHeaders.append("Access-Control-Allow-Origin", "*");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"localstorage_id":"test_localstorage_id","experiment_name":"Training dataset","dataset_info_id":"1","description":"for testing","experimental_parameters":{"learning_rate":0.001,"epochs":1,"batch_size":128},"model_hyperparameters":{"left_tower_filters_list":[10,10],"left_tower_kernel_size_list":[4,20],"right_tower_filters_list":[10],"right_tower_kernel_size_list":[4],"central_tower_filters_list":[10],"central_tower_kernel_size_list":[4],"dnn_size_list":[1]}});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://trbil.missouri.edu:8000/api/operation/conduct_experiment/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));