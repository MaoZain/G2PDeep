/*

Input
localstorage_id=test_localstorage_id

Output
{
    "message": [
        {
            "experiment_info_id": 6,
            "experiment_name": "Training dataset",
            "description": "for testing",
            "created_at": "2020-12-19T13:20:38.092Z",
            "updated_at": "2020-12-19T13:20:38.092Z",
            "experiment_status": "SUCCESS"
        },
        {
            "experiment_info_id": 7,
            "experiment_name": "Training dataset",
            "description": "for testing",
            "created_at": "2020-12-19T13:24:12.630Z",
            "updated_at": "2020-12-19T13:24:12.630Z",
            "experiment_status": "SUCCESS"
        },
        {
            "experiment_info_id": 8,
            "experiment_name": "Training dataset",
            "description": "for testing",
            "created_at": "2020-12-19T13:26:36.167Z",
            "updated_at": "2020-12-19T13:26:36.167Z",
            "experiment_status": "SUCCESS"
        },
        {
            "experiment_info_id": 9,
            "experiment_name": "Training dataset",
            "description": "for testing",
            "created_at": "2020-12-19T13:33:39.460Z",
            "updated_at": "2020-12-19T13:33:39.460Z",
            "experiment_status": "SUCCESS"
        }
    ],
    "status": "SUCCESS"
}
*/

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://trbil.missouri.edu:8000/api/operation/retrieve_experiment_summary/?localstorage_id=test_localstorage_id", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));