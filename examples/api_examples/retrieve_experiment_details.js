/*

Input:
  {
    "localstorage_id": "test_localstorage_id",
    "experiment_info_id_list": [11]
  }

Output:
{
    "message": [
        {
            "experiment_name": "Training dataset",
            "dataset_name": "Training dataset",
            "experimental_parameters": {
                "loss": "mse",
                "epochs": 5,
                "metrics": "mae",
                "optimizer": "adam",
                "batch_size": 128,
                "learning_rate": 0.001
            },
            "learning_curve_series_data": [
                {
                    "name": "Training dataset: train loss",
                    "data": [
                        2.4451346397399902,
                        1.9516032934188843,
                        1.695474624633789,
                        1.576974868774414,
                        1.5339159965515137
                    ]
                },
                {
                    "name": "Training dataset: validation loss",
                    "data": [
                        1.358521580696106,
                        1.3029674291610718,
                        1.2679880857467651,
                        1.2411470413208008,
                        1.221661925315857
                    ]
                },
                {
                    "name": "Training dataset: train metric",
                    "data": [
                        1.1105625629425049,
                        0.9579770565032959,
                        0.8765981793403625,
                        0.8559929728507996,
                        0.8396007418632507
                    ]
                },
                {
                    "name": "Training dataset: validation metric",
                    "data": [
                        0.7220026850700378,
                        0.7083120942115784,
                        0.7021886110305786,
                        0.6986086964607239,
                        0.6974907517433167
                    ]
                }
            ],
            "train_metric": {
                "MEAN_ABSOLUTE_ERROR": 0.7787411054750379,
                "MEAN_SQUARED_ERROR": 0.9581947523219686,
                "PEARSON_CORRELATION_COEFFICIENT": 0.47150217277999223
            },
            "valid_metric": {
                "PEARSON_CORRELATION_COEFFICIENT": 0.2840841545755427,
                "MEAN_ABSOLUTE_ERROR": 0.6974907329399236,
                "MEAN_SQUARED_ERROR": 0.8032490142516882
            }
        }
    ],
    "status": "SUCCESS"
}

*/

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"localstorage_id":"test_localstorage_id","experiment_info_id_list":[11]});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://trbil.missouri.edu:8000/api/operation/retrieve_experiment_details/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));