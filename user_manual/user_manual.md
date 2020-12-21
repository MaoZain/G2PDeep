# User Manual
---
## Getting Started
---
> This documnet is for both new and experienced users of Geno-Pheno-type Predictor. Here are three features available for this web server, as listed in the left side of the website -- **[`Prediction`](#Prediction)**, **[`Datasets`](#Datasets)**, **[`Experiments`](#Experiments)**.
---
## <a id="Prediction">Prediction</a>
> You can use the pre-trained models and your own test dataset to make the prediction here. The models can be trained by yourself in [`Experiments`](#Experiments), or a pre-trained model of SoyNAM dataset is available to be used directly. The test genotype data can be copied directly from your own test csv file, then pasted in the Input Data.
+ Model
  + Use the dropdown menu under Model to select which pre-trained model you want to use, or start from training a model by yourself in [`Experiments`](#Experiments).
+ Input Data
  + Click on **example** tab to learn which format can be accepted as input data.
  + Copy-paste your own test data in the Input Data textbox.
  + Click on **Submit** button to make the prediction.
+ Prediction Results
  + A bar chart pops up to show the quantitative trait values when the prediction is finished.
  + Saliency map approach is performed to measure the differences between SNPs and the traits.
  + All results are downloadable.
---
## <a id="Datasets">Datasets</a>
> You can create your own datasets here, or customize the existing SoyNAM dataset. Summary and Details of your created datasets are also available in this section.
+ Summary
  + The created datasets are available here, with ID, name, number of samples and created date.
  + Search the dataset's name by clicking the search button.
+ Details
+ Create Datasets
  + Name your dataset under Dataset Name.
  + Provide link to training and validation dataset. 
    + Refer to **Example** if you are confused about the format.
    + Only one link to your csv file is needed, the ratio between training and validation dataset is determined automatically. Or you can determine the ratio by yourself.
  + Write the description of your dataset, for your own reference only.
  + Click on **Create** button to create your own dataset.
---
## <a id="Experiments">Experiments</a>
> You can build and train deep learning models through your own genotype data or the publicly available SoyNAM dataset.
---
+ Summary
  + The created experiments are available here, with name, description, created date, updated date and status.
  + Check the boxes of different experiments and compare them by clicking **Compare** button on the top left of the table.
    + After clicking **Compare** button, you will jump to [`Compare`](#compare) section to see the summary of comparisons.
+ Create
  + Name your experiment under Experiment Name.
  + Select the dataset, or [`create your own`](#Datasets). 
  + Set the learning rate for your model training.
  + Write the description of your dataset, for your own reference only.
  + Select proper Experiment parameters.
    + Epoch: 200-2000
    + Batch size: 32-513
  + Select proper hyperparameters.
    + Left Tower: 
      + Add or delete layers (1-3) by clicking **Add Layer** or **Del Layer** button.
      + Customize filters (3-12) and size of filter (4-30) for each layer
    + Right Tower: 
      + Add or delete layers (1-3) by clicking **Add Layer** or **Del Layer** button.
      + Customize filters (3-12) and size of filter (4-30) for each layer
    + Fully connected neural network:
      + Add or delete layers (1-3) by clicking **Add Layer** or **Del Layer** button.
      + In each layer, set size of neurons from 1-512.
      + The size of neurons in last layer (or only 1 layer exists) can only be 1, due to its output nature.
  + Click on **Create** button to train your own experiment.
+ Details
+ <a id="compare">Compare</a>
  + After comparison on different models, the summary of model parameters and chart metrics are available here.