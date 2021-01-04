import React, { Component } from 'react';
import { Typography } from 'antd';
import { Steps } from 'antd';
import { Divider } from 'antd';

const { Title } = Typography;

const imgStyle = {
  border: '3px solid #555',
  width: '60%',
  marginBottom: '20px',
}

export default class InputData extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let user_manual_content = (
      <div>
        <p>
          This documnet is for both new and experienced users of Quantitative phenotypes prediction and genotype markers
          discovery. Here are four features available for this web server, as listed in the left side of the website --
          <strong><a href="#introduction"><code>Introduction</code></a></strong>,
          <strong><a href="#datasets"><code>Datasets</code></a></strong>,
          <strong><a href="#experiments"><code>Experiments</code></a></strong>,
          <strong><a href="#prediction"><code>Prediction &amp; discovery</code></a></strong>.
        </p>


        <Divider />
        <div>
          <h5 id="introduction">1. Introduction</h5>
          <p>You can learn the workflow and basic introductions to each feature on this website.
          Please click the 4 steps consecutively as listed in the picture, for the basic introductions of this website.</p>
          <img style={imgStyle} src="https://de.cyverse.org/dl/d/F2085875-FF1A-462A-8E5A-DB172E1161D3/quick_start.png" alt="quick_start" />
        </div>

        <Divider />
        <div>
          <h5 id="datasets">2. Datasets</h5>
          <p>You can create your own datasets here, or customize the existing SoyNAM dataset.
          Summary and Details of your created datasets are available in this section.
          </p>
          <ul>
            <li>Summary
              <ul>
                <li>The created datasets are available here, with ID, name, number of samples and created date, as the picture below.</li>
                <li>Search the datasets' name by clicking the search button.</li>
                <li>Click the name of your dataset to see the details (in the picture, listed as SoyNAM) and you will jump to <strong><a href="#datasetdetails"><code>Details</code></a></strong> section.</li>
                <img
                  style={imgStyle}
                  src="https://de.cyverse.org/dl/d/EBBD4D0C-9679-48B2-AA33-057621BBC4F1/summary_of_datasets.png"
                  alt="summary_of_datasets" />
              </ul>
            </li>


            <li id="datasetdetails">Details
              <ul>
                <li>The details of your created dataset are available here.</li>
                <li>Change the ratio of training and validation dataset through <strong>Percentage of training dataset</strong>, and the Percentage of validation will be changed automatically. Don't foget to click <strong>Update</strong> button to complete changing process.</li>
                <img
                  style={imgStyle}
                  src="https://de.cyverse.org/dl/d/E25E69DA-125E-4542-B2DD-D4EF8B6BBEAD/dataset_detail.png" alt="dataset_detail" />

              </ul>
            </li>


            <li>Create
              <ul>
                <li>Name your dataset under Dataset Name.</li>
                <li>Provide link to training and validation dataset.</li>
                <ul>
                  <li>Refer to Show data format if you are confused about the format.</li>
                  <li>Only one link to your csv file is needed, the ratio between training and validation dataset is determined automatically. Or you can determine the ratio by yourself later in <strong><a href="#datasetdetails"><code>Details</code></a></strong>. You may also click <strong>Link to example</strong>, if you prefer using our publicly available dataset, SoyNAM - Protein quantitative protein trait.</li>
                </ul>
                <li>Write the description of your dataset, which is optional, for your own reference only.</li>
                <li>Click on <strong>Create</strong> button to create your own dataset.</li>
                <img style={imgStyle} src="https://de.cyverse.org/dl/d/B11748AB-5273-41A5-AEFA-8A194AD0226B/create_dataset.png" alt="create_dataset" />
              </ul>
            </li>
          </ul>

          <Divider />
          <div>
            <h5 id="experiments">3. Experiments</h5>
            <p>You can build and train deep learning models through your own genotype dataset or our publicly available SoyNAM dataset.
              You must <strong><a href="#datasets">create a dataset</a></strong> before starting an experiment.
            </p>
            <ul>
              <li id="experimentsummary">Summary of Experiments
                <ul>
                  <li>The created experiments are available here, with name, status, created date, updated date and description. The status will be changed from <img
                    src="https://de.cyverse.org/dl/d/8E8EAFCF-878E-43CC-89EA-F9C6E613D992/pending.png" width="80" align="top"></img> to <img
                      src="https://de.cyverse.org/dl/d/5548B421-E815-4655-9824-8CDEB1E35D9B/success.png" width="80" align="top"></img> once the training is completed.</li>
                  <img
                    style={imgStyle}
                    src="https://de.cyverse.org/dl/d/C47AD2A2-A0FE-4300-9B59-A858D723E880/experiments_summary.png"
                    alt="experiments_summary" />
                  <li>Check the boxes of different experiments and compare them by clicking Compare button.
                    <ul>
                      <li>After clicking <strong>Compare</strong> button, you will jump to Compare section to see the summary of comparisons.</li>
                    </ul>
                  </li>
                  <li class="has-line-data" data-line-start="37" data-line-end="38">Click the name of your experiment to see the details (in the picture, listed as First trial of SoyNAM, or Second trial of SoyNAM) and you will jump to <strong><a href="#experimentdetails"><code>Experiment details</code></a></strong> section.</li>
                </ul>
              </li>

              <li id="experimentdetails">Experiment details
                <ul>
                  <li>The details of your created experiment are available here, with some basic information, such as name and type of your dataset, status of experiment. The status will be changed from <img
                    src="https://de.cyverse.org/dl/d/8E8EAFCF-878E-43CC-89EA-F9C6E613D992/pending.png" width="100" align="top"></img> to <img
                      src="https://de.cyverse.org/dl/d/5548B421-E815-4655-9824-8CDEB1E35D9B/success.png" width="100" align="top"></img>  once the training is completed.</li>
                  <img style={imgStyle} src="https://de.cyverse.org/dl/d/3905DA09-26C3-49FF-B258-B507DC494B52/experiment_details_1.png" alt="experiment_details_1" />

                  <li>Model details are listed as a chart below.</li>
                  <img style={imgStyle} src="https://de.cyverse.org/dl/d/A5273DF9-6B72-4175-8639-C593A6E8375C/experiment_details_2.png" alt="experiment_details_2" />

                  <li>Check the <strong>real-time</strong> Learning Curve as listed below. You can also hover each curve in the picture to see the difference.</li>
                  <img style={imgStyle} src="https://de.cyverse.org/dl/d/F0E3C06D-FE23-4B12-AE8B-EC5934C9C585/experiment_details_3.png" alt="experiment_details_3" />

                  <li>After the training ends, you can see the result of your experiment by the chart of Predicted VS True as listed below. You can also hover different-colored dots in the picture to see the difference.</li>
                  <img style={imgStyle} src="https://de.cyverse.org/dl/d/4CCCB87A-5866-4D81-875B-58E246200A08/experiment_details_4.png" alt="experiment_details_4" />
                </ul>
              </li>

              <li>Compare
                <ul>
                  <li>After comparison on different models, the summary of model parameters and chart metrics are available here. You can hover each curve in the picture to see the difference.</li>
                  <img style={imgStyle} src="https://de.cyverse.org/dl/d/008FAA0B-09C8-4C0C-A064-73CF1A0255B3/experiments_comparison.png" alt="experiments_comparison" />
                </ul>
              </li>

              <li>Create
                <ul>
                  <li>Name your experiment under Experiment Name.</li>
                  <li>Choose the dataset, or <strong><a href="#datasets">create your own</a></strong>.</li>
                  <li>Set the learning rate from the dropdown menu.</li>
                  <li>Write the description of your dataset, which is optional, for your own reference only.</li>
                  <img style={imgStyle} src="https://de.cyverse.org/dl/d/8338E0C4-AAA5-415A-BA49-2C3ECD064441/create_experiment_1.png" alt="create_experiment_1" />

                  <li>Select proper Experiment parameters by draging the blue and red dots on each line.
                    <ul>
                      <li>Epoch: 200-2000, with default as 1000.</li>
                      <li>Batch size: 32-513, with default as 256.</li>
                      <img style={imgStyle} src="https://de.cyverse.org/dl/d/19C1F51C-B90C-4732-B618-E24A2B9EA4CF/create_experiment_2.png" alt="create_experiment_2" />
                    </ul>
                  </li>

                  <li>Select proper hyperparameters.
                    <ul>
                      <li>Left Tower:
                        <ul>
                          <li>Add or delete layers (1-3) by clicking Add Layer or Del Layer button, with 1 layer as default.</li>
                          <li>Customize filters (3-12) and kernel size (4-30) for each layer, with 5 filters and 10 kernels as defsult.</li>
                        </ul>
                      </li>

                      <li>Right Tower:
                        <ul><li>Same as Left Tower</li></ul>
                      </li>

                      <li>Fully connected neural network:
                        <ul>
                          <li>Add or delete layers (1-3) by clicking <string>Add Layer</string> or <strong>Del Layer</strong> button, with 1 layer as default.</li>
                          <li>In each layer, set size of neurons from 1-512, with 256 as default.</li>
                          <li>The size of neurons in last layer (or only 1 layer exists) can only be 1, due to its output nature.</li>
                          <img style={imgStyle} src="https://de.cyverse.org/dl/d/954E37C0-871F-42BF-B34C-D2FFDB51CAE5/create_experiment_3.png" alt="create_experiment_3" />

                        </ul>
                      </li>

                    </ul>
                  </li>

                  <li>
                    Click on <strong>Create</strong> button to train your own experiment, then you will be directed to <strong><a href="#experimentsummary">Summary</a></strong>.
                  Please note the training time may take up to 1 hour.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <Divider />
        <div>
          <h5 id="prediction">4. Prediction & discovery</h5>
          <p>You can use the pre-trained models and your own test dataset to make the prediction here. The model must be trained by yourself in <strong><a href="#experiments">Experiments</a></strong>. The test genotype data can be copied directly from your own test csv file, then pasted in the Input Data.</p>
          <ul>
            <li>Model
              <ul>
                <li>Use the dropdown menu to select which pre-trained model you want to use, or start from training a model by yourself in <strong><a href="#experiments">Experiments</a></strong>.</li>
                <img style={imgStyle} src="https://de.cyverse.org/dl/d/B68D2CE2-4FD8-46F0-A853-6897CADA0000/prediction.png" alt="prediction" />

                <li>Input Data
                  <ul>
                    <li>Click <strong>Load an example</strong> load the test dataset directly if you used our publicly available SoyNAM dataset for model training. Or simply learn which format can be accepted as input data.</li>
                    <li>Copy-paste your own test data in the Input Data textbox.</li>
                    <li>Click on <strong>Submit</strong> button to make the prediction.</li>
                  </ul>
                </li>

                <li>Prediction Results
                  <ul>
                    <li>A bar chart to show the predicted values.</li>
                    <li>The Saliency map is performed to measure the differences between SNPs and the traits.</li>
                    <img style={imgStyle} src="https://de.cyverse.org/dl/d/5958B1F9-B366-4C06-AE61-5B703925BE5F/prediction_result.png" alt="prediction_result" />
                  </ul>
                </li>

              </ul>
            </li>
          </ul>
        </div>

      </div>
    )

    return (
      <div>
        <Title level={2}>User Guide</Title>
        <Divider />
        <div>
          {user_manual_content}
        </div>

      </div>
    );

  }

}