import React, { Component } from 'react';
import { Typography } from 'antd';
import { Steps } from 'antd';
import { Row, Col } from 'antd';
import { Divider } from 'antd';
import workflow_intro from './workflow_intro.png'
import workflow_datasets from './workflow_datasets.png'
import workflow_experiment from './workflow_experiment.png'
import workflow_prediction from './workflow_prediction.png'
import dataset_example_img from './dataset_example.png'
import deep_gwas_img from './deep_gwas.jpg'

const { Step } = Steps;
const { Title } = Typography;

export default class InputData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_step: 0,
    };
  }

  // onChange = current => {
  //   console.log('onChange:', current);
  //   this.setState({ current });
  // };

  onChangeSteps = current => {
    this.setState({
      current_step: current
    })
  };

  render() {
    const paper_url = 'https://www.frontiersin.org/articles/10.3389/fgene.2019.01091/full';
    const { current_step } = this.state;
    let step_comp = (
      <div>
        <Steps current={current_step} onChange={this.onChangeSteps}>
          <Step
            title="Introduction"
            description="Workflow of G2PDeep."
          />
          <Step
            title="Datasets"
            description="Upload and create dataset of SNP."
          />
          <Step
            title="Projects"
            description="Build, train, analysis state-of-the-art deep learning models."
          />
          <Step
            title="Prediction & discovery"
            description="Predict quantitative phenotype trait and detect genotype markers."
          />
        </Steps>
      </div>
    )
    let step_content = (
      <div style={{ paddingTop: '10px' }}>
        <div id='step_content_introduction' style={{ display: this.state.current_step == 0 ? 'block' : 'none' }}>
          <img src={workflow_intro} style={{ width: '100%' }}></img>
          <Title level={4} style={{ paddingTop: '40px' }} >Welcome to G2PDeep</Title>
          <p>
            Genomic selection uses single-nucleotide polymorphisms (SNPs) to predict quantitative phenotypes for enhancing traits in breeding populations and has been widely used to increase breeding efficiency for plants and animals.
            Existing statistical methods rely on a prior distribution assumption of imputed genotype effects, which may not fit experimental datasets. Emerging deep learning technology could serve as a powerful machine learning tool to predict quantitative phenotypes without imputation and also to discover potential associated genotype markers efficiently.
            We propose a deep-learning framework using convolutional neural networks (CNNs) to predict the quantitative traits from SNPs and also to investigate genotype contributions to the trait using saliency maps.
            The missing values of SNPs are treated as a new genotype for the input of the deep learning model.
            We tested our framework on experimental datasets of soybean.
          </p>
          <p>
            G2PDeep is a web server for phenotype prediction and genotype markers discovery.
            G2PDeep offers a customizable deep-learning framework for quantitative phenotypes prediction, Saliency for genotype markers discovery.
            The methods were introduced in our previous <a href={paper_url} target="_blank">paper</a>.
            Our work is a pioneer to perform quantitative phenotypes using deep learning.
          </p>
          <p>
            Followings are two options for users to predict the quantitative phenotypes traits and identify genotype markers:
          </p>
          <ul>
            <li>Option 1:
              <p>For SoyNAM SNP data, users can directly enter "Prediction" session on the left menu.
                And then choose a publicly pre-train model and input test samples perform prediction and markers identification.</p>
            </li>
            <li>Option 2:
              <p>
                For user's owned SNP data, users can utilize G2PDeep to build and train deep learning model on their data.
                And then use the model perform prediction and markers identification on their test samples.
              </p>
            </li>
          </ul>
        </div>
        <div id='step_content_datasets' style={{ display: this.state.current_step == 1 ? 'block' : 'none' }}>
          <img src={workflow_datasets} style={{ width: '100%' }}></img>
          <Title level={4} style={{ paddingTop: '40px' }} >Datasets</Title>
          <p>
            Users are able to create dataset on G2PDeep by a link to their owned SNP data. The dataset is visible only for the dataset owner.
            To transfer large-scale SNP dataset quickly and safely, the G2PDeep parses and transfers the dataset by the link provided by users.
            The created dataset is divided into training dataset and validation dataset automatically by G2PDeep, where users are able to determine the ratio between them.
          </p>
          <p>Followings are restrictions to create a dataset:
          <ul>
              <li>1. A valid link to data.</li>
              <li>2. The data must be a comma-separated values (CSV) file.</li>
              <li>3. Features (SNPs) in the file must be coded as -1, 0, 1, or 2 to represent missing genotypes, homozygous, heterozygous, and reference homozygous, respectively.</li>
              <li>4. Header of label (quantitative traits) column in the file must be indicated by a word "label".</li>
            </ul>
          </p>
          <p>
            Following is an axample of valid data:
            <img src={dataset_example_img} style={{ width: '80%' }}></img>
          </p>
        </div>
        <div id='step_content_experiments' style={{ display: this.state.current_step == 2 ? 'block' : 'none' }}>
          <img src={workflow_experiment} style={{ width: '100%' }}></img>
          <Title level={4} style={{ paddingTop: '40px' }} >Projects</Title>
          <p>
            G2PDeep allows users to build, train and analysis state-of-the-art deep learning models.
            It also provides a series of interactive charts to monitor the training processing and learning curve of the model.
            To get the best performance of the model for further use, G2PDeep also provides comparisons among models by showing summary of model parameters and chart metrics.
            All details of datasets and models can be retrieved by users.
            G2PDeep takes 50 minutes in average to train a customized model with 4000 training samples in 1000 epochs.
          </p>
        </div>
        <div id='step_content_prediction' style={{ display: this.state.current_step == 3 ? 'block' : 'none' }}>
          <img src={workflow_prediction} style={{ width: '100%' }}></img>
          <Title level={4} style={{ paddingTop: '40px' }} >Prediction & discovery</Title>
          <p>
            Users can paste their genotype from csv file to input area for prediction purpose only.
            G2PDeep currently includes SoyNAM dataset and pre-trained models by this dataset.
            Users are able to customize and train a model with this publicly available dataset and predict phenotype using the pre-trained models directly.
            Once the prediction is done, a bar chart appears to show predicted quantitative trait values.
            Saliency map approach is performed to measure the differences between SNPs and the traits.
            All results are downloadable.
          </p>
        </div>
      </div>
    )

    let performance = (
      <div>
        <img src={deep_gwas_img} style={{ width: '80%' }}></img>
        <p>
          For SoyNAM dataset, the our method (dualCNN) reaches a higher PCC than the other four statistical models and was less affected by the training population size in low heritability traits as yield, moisture, and protein.
          As long as the training size reached 1,500, our model showed a higher performance than statistical models.
        </p>
      </div>
    )

    let saliency_content = (
      <div>
        <img src={deep_gwas_img} style={{ width: '80%' }}></img>
        <p>
          Genotypes are one-hot coded and passed to the input processing block, which contains two streams of CNNs.
          The first stacked-CNN stream contains two feed-forward CNN layers with kernel sizes 4 and 20.
          The second single-CNN stream contains one CNN layer with kernel size 4, followed by an add-up layer to aggregate outputs from the two streams.
          The feature processing block contains another single convolution layer with kernel size 4. Processed features are then passed to the output processing block, which contains a flatten layer and a fully connected dense layer.
        </p>
      </div>
    )

    return (
      <div>
        <Title level={2}>Introduction to G2PDeep</Title>
        <Divider />
        <div>

          <Title level={3}>Quick start</Title>
          <div style={{ width: '900px' }}>
            <Row>
              <Col>
                {step_comp}
                {step_content}

              </Col>

            </Row>
          </div>
        </div>

      </div>
    );

  }

}