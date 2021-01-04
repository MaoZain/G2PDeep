# User Manual
## Getting Started
---
> This documnet is for both new and experienced users of Quantitative phenotypes prediction and genotype markers discovery. Here are four features available for this web server, as listed in the left side of the website -- **[`Introduction`](#Introduction)**, **[`Datasets`](#Datasets)**, **[`Experiments`](#Experiments)**, **[`Prediction & discovery`](#prediction)**.
---
## Introduction
> You can learn the workflow and basic introductions to each feature on this website. Please click the 4 steps consecutively as listed in the picture, for the basic introductions of this website.
![quick_start](https://de.cyverse.org/dl/d/F2085875-FF1A-462A-8E5A-DB172E1161D3/quick_start.png)
---
## Datasets
> You can create your own datasets here, or customize the existing SoyNAM dataset. Summary and Details of your created datasets are available in this section.
+ Summary
  + The created datasets are available here, with ID, name, number of samples and created date, as the picture below.
  + Search the datasets' name by clicking the search button.
  + Click the name of your dataset to see the details (in the picture, listed as SoyNAM) and you will jump to **[`Details`](#datasetdetails)** section.
  ![summary_of_datasets](https://de.cyverse.org/dl/d/EBBD4D0C-9679-48B2-AA33-057621BBC4F1/summary_of_datasets.png)
+ <span id="datasetdetails">Details</span>
  + The details of your created dataset are available here.
  + Change the ratio of training and validation dataset through **Percentage of training dataset**, and the Percentage of validation will be changed automatically. Don't foget to click **Update** button to complete changing process.
  ![dataset_detail](https://de.cyverse.org/dl/d/E25E69DA-125E-4542-B2DD-D4EF8B6BBEAD/dataset_detail.png)
+ Create
  + Name your dataset under Dataset Name.
  + Provide link to training and validation dataset. 
    + Refer to **Show data format** if you are confused about the format.
    + Only one link to your csv file is needed, the ratio between training and validation dataset is determined automatically. Or you can determine the ratio by yourself later in **[`Details`](#datasetdetails)**. You may also click **Link to example**, if you prefer using our publicly available dataset, SoyNAM - Protein quantitative protein trait. 
  + Write the description of your dataset, which is optional, for your own reference only.
  + Click on **Create** button to create your own dataset.
![create_dataset](https://de.cyverse.org/dl/d/B11748AB-5273-41A5-AEFA-8A194AD0226B/create_dataset.png)
---
## Experiments
> You can build and train deep learning models through your own genotype dataset or our publicly available SoyNAM dataset. You must **[`create a dataset`](#Datasets)** before starting an experiment.
---
+ <span id="summary">Summary</span>
  + The created experiments are available here, with name, status, created date, updated date and description. The status will be changed from <img src="https://de.cyverse.org/dl/d/8E8EAFCF-878E-43CC-89EA-F9C6E613D992/pending.png" width="60" align="top"> to <img src="https://de.cyverse.org/dl/d/5548B421-E815-4655-9824-8CDEB1E35D9B/success.png" width="70" align="top"> once the training is completed.
  ![experiments_summary](https://de.cyverse.org/dl/d/C47AD2A2-A0FE-4300-9B59-A858D723E880/experiments_summary.png)
  + Check the boxes of different experiments and compare them by clicking **Compare** button.
    + After clicking **Compare** button, you will jump to [`Compare`](#compare) section to see the summary of comparisons.
  + Click the name of your experiment to see the details (in the picture, listed as First trial of SoyNAM, or Second trial of SoyNAM) and you will jump to **[`Details`](#experimentdetails)** section.
+ <span id="experimentdetails">Details</span>
  + The details of your created experiment are available here, with some basic information, such as name and type of your dataset, status of experiment. The status will be changed from <img src="https://de.cyverse.org/dl/d/0225DCAF-0923-4804-AD43-4B3F70EEE8B9/running.png" width="60" align="top"> to <img src="https://de.cyverse.org/dl/d/5548B421-E815-4655-9824-8CDEB1E35D9B/success.png" width="70" align="top"> once the training is completed.
  ![experiment_details_1](https://de.cyverse.org/dl/d/3905DA09-26C3-49FF-B258-B507DC494B52/experiment_details_1.png)
  + Model details are listed as a chart below.
  ![experiment_details_2](https://de.cyverse.org/dl/d/A5273DF9-6B72-4175-8639-C593A6E8375C/experiment_details_2.png)
  + Check the **real-time** Learning Curve as listed below. You can also hover each curve in the picture to see the difference.
  ![experiment_details_3](https://de.cyverse.org/dl/d/F0E3C06D-FE23-4B12-AE8B-EC5934C9C585/experiment_details_3.png)
  + After the training ends, you can see the result of your experiment by the chart of Predicted VS True as listed below. You can also hover different-colored dots in the picture to see the difference.
  ![experiment_details_4](https://de.cyverse.org/dl/d/4CCCB87A-5866-4D81-875B-58E246200A08/experiment_details_4.png)
+ <span id="compare">Compare</span>
  + After comparison on different models, the summary of model parameters and chart metrics are available here. You can hover each curve in the picture to see the difference.
  ![experiments_comparison](https://de.cyverse.org/dl/d/008FAA0B-09C8-4C0C-A064-73CF1A0255B3/experiments_comparison.png)
+ Create
  + Name your experiment under Experiment Name.
  + Choose the dataset, or [`create your own`](#Datasets). 
  + Set the learning rate from the dropdown menu.
  + Write the description of your dataset, which is optional, for your own reference only.
  ![create_experiment_1](https://de.cyverse.org/dl/d/8338E0C4-AAA5-415A-BA49-2C3ECD064441/create_experiment_1.png)
  + Select proper Experiment parameters by draging the blue and red dots on each line.
    + Epoch: 200-2000, with default as 1000.
    + Batch size: 32-513, with default as 256.
  ![create_experiment_2](https://de.cyverse.org/dl/d/19C1F51C-B90C-4732-B618-E24A2B9EA4CF/create_experiment_2.png)
  + Select proper hyperparameters.
    + Left Tower: 
      + Add or delete layers (1-3) by clicking **Add Layer** or **Del Layer** button, with 1 layer as default.
      + Customize filters (3-12) and kernel size (4-30) for each layer, with 5 filters and 10 kernels as defsult.
    + Right Tower: 
      + Same as **Left Tower**
    + Fully connected neural network:
      + Add or delete layers (1-3) by clicking **Add Layer** or **Del Layer** button, with 1 layer as default.
      + In each layer, set size of neurons from 1-512, with 256 as default.
      + The size of neurons in last layer (or only 1 layer exists) can only be 1, due to its output nature.
  ![create_experiment_3](https://de.cyverse.org/dl/d/954E37C0-871F-42BF-B34C-D2FFDB51CAE5/create_experiment_3.png)
  + Click on **Create** button to train your own experiment, then you will be directed to [`Summary`](#summary). Please note the training time may take up to 1 hour.
---
## <span id="prediction">Prediction & discovery</span>
> You can use the pre-trained models and your own test dataset to make the prediction here. The model must be trained by yourself in [`Experiments`](#Experiments). The test genotype data can be copied directly from your own test csv file, then pasted in the Input Data.
+ Model
  + Use the dropdown menu to select which pre-trained model you want to use, or start from training a model by yourself in [`Experiments`](#Experiments).
  ![prediction](https://de.cyverse.org/dl/d/B68D2CE2-4FD8-46F0-A853-6897CADA0000/prediction.png)
+ Input Data
  + Click **Load an example** load the test dataset directly if you used our publicly available SoyNAM dataset for model training. Or simply learn which format can be accepted as input data.
  + Copy-paste your own test data in the Input Data textbox.
  + Click on **Submit** button to make the prediction.
+ Prediction Results
  + A bar chart to show the predicted values.
  + The Saliency map is performed to measure the differences between SNPs and the traits.
  ![prediction_result](https://de.cyverse.org/dl/d/5958B1F9-B366-4C06-AE61-5B703925BE5F/prediction_result.png)