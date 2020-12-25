/*
Input
http://trbil.missouri.edu:8000/api/datasets/retrieve_dataset_info/?localstorage_id=test_localstorage_id


{
    "message": [
        {
            "localstorage_id": "test_localstorage_id",
            "dataset_name": "Training dataset",
            "training_dataset_url": "https://raw.githubusercontent.com/shuaizengMU/AI_backend/dev/examples/datasets/height.test.csv?token=AD63QA3HQDAHN3O3ASCBC6274XZXQ",
            "training_dataset_path": "/usr/src/app/media/datasets/1608304594.csv",
            "test_dataset_url": "",
            "label_column": "label",
            "num_samples": 1028,
            "num_features": 4236,
            "ratio_training_dataset": 0.6,
            "ratio_validation_dataset": 0.4,
            "description": "for testing",
            "created_at": "2020-12-18T15:16:36.951Z",
            "updated_at": "2020-12-18T15:35:38.944Z",
            "dataset_type_name": "SNP - homozygous and heterozygous",
            "dataset_info_id": 1,
            "size_traning_dataset": 616,
            "size_validation_dataset": 412
        }
    ],
    "status": "SUCCESS"
}

*/

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://trbil.missouri.edu:8000/api/datasets/retrieve_dataset_info/?localstorage_id=test_localstorage_id", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
