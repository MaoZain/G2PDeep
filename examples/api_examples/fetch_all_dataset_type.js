/*
Returns
[
    {
        "id": 1,
        "dataset_type_key": "snp",
        "dataset_type_name": "SNP - homozygous and heterozygous",
        "description": null
    }
]
*/

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://trbil.missouri.edu:8000/api/information/fetch_all_dataset_type/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));