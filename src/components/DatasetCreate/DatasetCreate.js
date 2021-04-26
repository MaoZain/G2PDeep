import React, { Component, useState } from 'react'
import Style from './datasetCreate.module.css'
import { Select } from 'antd';
import { Input, Button, message, Drawer, Upload, Modal, Tag } from 'antd';
import { withRouter } from 'react-router-dom'
import { Text } from "informed";
import { Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dataset_example_img from './dataset_example.png'
import { Divider } from 'antd';
import { Alert } from 'antd';
import YouTube from 'react-youtube'
import { Progress } from 'antd';
import { Tooltip } from 'antd';
import {
  ClockCircleOutlined
} from '@ant-design/icons';
const { Title } = Typography;

const { Option } = Select;
const { TextArea } = Input;

message.config({
  top: 100,
  duration: 5,
  maxCount: 5,
});

// TODO(ziting): change following code if you like.
var _SERVER_UPLOAD_FILE_NAME = '';
var videoE = null;
const props = {
  name: 'dataset_file',
  action: '/api/datasets/upload_dataset_file/',
  accept: ".csv",
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      _SERVER_UPLOAD_FILE_NAME = info.file.response.message;
      // console.log(_SERVER_UPLOAD_FILE_NAME); 
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class DatasetCreate extends Component {
  constructor(props) {
    super(props);

    var localstorage_id = localStorage.getItem('G2PDeep');
    var timestamp = new Date().toISOString();
    var task_id = localstorage_id + timestamp;

    this.state = {
      loading: false,
      datasetName: '',
      dataType: '',
      dataTrainUrl: '',
      description: '',
      urlExample: '',
      keyOfInputUrl: 0,
      drawer_visible: false,
      uploadMethod: '',
      error_feedback_msg: '',
      isModalVisible: false,
      task_id: task_id,
      task_percentage: 0,
      task_log: '',
    };
    this.ref_example_data_text = React.createRef();
  }

  componentDidMount = () => {
    setInterval(() => this.timer(), 1000)
  }

  timer() {
    // console.log(this.state.reloadTimer)
    if (this.state.reloadTimer > 0) {
      this.setState({
        reloadTimer: this.state.reloadTimer - 1
      })
    } else {
      this.setState({
        reloadTimer: 5
      })

      if (this.state.loading)
        this.fetchTaskInfo();
    }
  }

  onChangeDatasetName = ({ target: { value } }) => {
    this.setState({
      datasetName: value
    })
  };

  onChangeDataType = (value) => {
    // console.log(`selected ${value}`);
    this.setState({
      dataType: value,
    })
  }

  onChangeUploadMethod = (value) => {
    console.log(value);
    this.setState({
      uploadMethod: value,
      dataTrainUrl: '',
    })
    _SERVER_UPLOAD_FILE_NAME = '';
  }

  onChangeDataUrl = ({ target: { value } }) => {
    this.setState({
      dataTrainUrl: value,
      keyOfInputUrl: this.state.keyOfInputUrl + 1
    })
  };


  onChangeDescription = ({ target: { value } }) => {
    this.setState({
      description: value
    })
  };

  fetchTaskInfo = () => {
    // console.log("fetchEInfo")
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(`/api/datasets/retrieve_create_data_task_info/?task_id=${this.state.task_id}`, requestOptions)
      .then(response => response.text())
      .then(result => this.addStatus(result))
      .catch(error => console.log('error', error));
  }

  addStatus = (result) => {
    let status = JSON.parse(result).status;
    let message = JSON.parse(result).message;

    // console.log(message);
    if (status === 'SUCCESS' || status === 'PENDING' || status === 'RUNNING') {

      let task_log = '';
      if (message.task_log !== '') {
        let idx = 1;
        message.task_log.forEach((element, _) => {
          task_log = <span>{task_log}Step {idx}: {element}<br></br></span>;
          idx += 1;
        })
      }

      this.setState({
        task_log: task_log,
        task_percentage: message.task_percentage.toFixed(1),
      })
    } else {
      this.setState({
        task_log: 'Initializing',
        task_percentage: 0,
      })
    }
  }

  fetchToCreate = () => {

    var localstorage_id = localStorage.getItem('G2PDeep');
    var timestamp = new Date().toISOString();
    var task_id = localstorage_id + timestamp;
    this.setState({
      task_id: task_id,
    })

    let myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
      "localstorage_id": localStorage.getItem('G2PDeep'),
      "dataset_name": this.state.datasetName,
      "dataset_type_key": this.state.dataType,
      "training_dataset_url": this.state.dataTrainUrl,
      "training_dataset_server_path": _SERVER_UPLOAD_FILE_NAME,
      "description": this.state.description,
      "test_dataset_url": '',
      "task_id": task_id,
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    var promise = Promise.race([
      fetch('/api/datasets/create_training_dataset/', requestOptions),
      new Promise((resolve, reject) =>
        // 20*60*1000 second => 20 mins.
        setTimeout(() => reject(new Error('Timeout')), 20 * 60 * 1000)
      )
    ])
      .then(response => response.text())
      .then(result => this.checkCreate(result))
      .catch(error => { this.showErrorMessage(error); console.log(error) });

    // fetch("/api/datasets/create_training_dataset/", requestOptions)
    //   .then(response => response.text())
    //   .then(result => this.checkCreate(result))
    //   .catch(error => { message.warning('create fail'); console.log(error) });


  }

  checkCreate = (result) => {
    // console.log(result)
    let status = JSON.parse(result).status;
    if (status === 'SUCCESS') {
      this.props.fetchDatasetInfo();
      this.props.history.push("/datasets/summary");
    } else {
      // message.error(JSON.parse(result).message)
      this.setState({
        error_feedback_msg: JSON.parse(result).message
      })
    }
    this.setState({
      loading: false,
    })
  }

  showErrorMessage = (error) => {
    if (error.toString() == "Error: Timeout") {
      this.setState({
        error_feedback_msg: 'The dataset is still creating. It will be shown in summary page once it is done.',
        loading: false,
      })
    }
    else {
      this.setState({
        error_feedback_msg: 'Internal error. Please contact administrator.',
        loading: false,
      })
    }

  }

  create = () => {
    // console.log(this.state.dataType,this.state.datasetName,
    //     this.state.description,this.state.dataTrainUrl)
    if (this.state.datasetName !== '' && (this.state.dataTrainUrl !== '' || _SERVER_UPLOAD_FILE_NAME !== '') && this.state.dataType !== '') {
      this.fetchToCreate();
      this.setState({
        loading: true,
      })
    } else {
      var msg = '';
      if (this.state.datasetName == '') {
        msg = "Dataset name cannot be empty."
      }
      else if (this.state.dataType == '') {
        msg = "Please choose data type."
      }
      else if ((this.state.dataTrainUrl == '' || _SERVER_UPLOAD_FILE_NAME == '')) {
        msg = "Please provide a link to dataset or upload a CSV file."
      }

      // message.warning(msg)
      this.setState({
        error_feedback_msg: msg
      })
    }
  };

  addExampleUrl = () => {
    // set URL
    var url = ""
    if (this.state.dataType == "ZYGOSITY") {
      url = "https://de.cyverse.org/dl/d/2FFA3458-2DDF-4FCB-B1FE-DF5C08A0BD28/protein.train.csv"
    }
    else if (this.state.dataType == "SNP") {
      url = "https://de.cyverse.org/dl/d/3AB7C76F-F1C5-4C55-A6CA-0E2D77A8EEB4/scn_example.csv"
    }

    this.setState({
      dataTrainUrl: url,
      keyOfInputUrl: this.state.keyOfInputUrl + 1,
    })
  };

  // drawer
  showDrawer = () => {
    this.setState({
      drawer_visible: true
    })
    console.log(this.state.drawer_visible);
  };
  onDrawerClose = () => {
    this.setState({
      drawer_visible: false
    })
  };

  handleClose = () => {
    this.setState({
      isModalVisible: false
    })
  }

  playVedio = () => {
    this.setState({
      isModalVisible: true
    })
  }

  _onReady = (event) => {
    videoE = event
  }

  render() {
    if (!this.state.isModalVisible) {
      if (videoE !== null) {
        videoE.target.pauseVideo()
      }
    }

    let instructions = (
      <div>
        <p>Instructions:</p>
        <ul>
          <li>Please check your data format before creating dataset. <a className={Style.a_example} onClick={this.showDrawer}>Show data format</a>.</li>
          <li>Enter dataset name and choose the corresponding data type.</li>
          <li>Provide a link or upload a file to create dataset.</li>
          <li>Please wait for a while. The system validates data format and creates dataset afterward.</li>
          <li>A tutorial video is provided in<a className={Style.a_example} onClick={this.playVedio}>here</a>.</li>
        </ul>
        <p>NOTE: </p>
        <ul>
          <li>Zygosity and SNP data can be generated from VCf file, using PLINK2 and VCFTools respectively.</li>
          <li>The dataset larger than 500 MB might take more than 10 mins in average to be created.</li>
        </ul>

      </div>
    )

    // console.log(this.context)
    let datasetName = (
      <div id='datasetName'>
        <label className={Style.title}>Dataset Name<span style={{ color: 'red' }}>*</span> :</label>
        <br></br>
        <Input placeholder="input your dataset's name"
          allowClear
          onChange={this.onChangeDatasetName}
          className={Style.inputDatasetName} />
      </div>
    )
    let dataType = (
      <div id='dataType' style={{ paddingTop: '30px' }}>
        <label className={Style.title}>Data Type <span style={{ color: 'red' }}>*</span>:</label>
        <br></br>
        <Select
          className={Style.dataType}
          showSearch
          placeholder="Select data type"
          optionFilterProp="children"
          onChange={this.onChangeDataType}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="ZYGOSITY">Zygosity - homozygous, heterozygous, and reference homozygous</Option>
          <Option value="SNP">SNP - adenine (A), thymine (T), cytosine (C) and guanine (G)</Option>
        </Select>
      </div>
    );
    let drawer_data_format = (
      <Drawer
        title="Data type & data format"
        width={'50%'}
        placement="right"
        closable={false}
        onClose={this.onDrawerClose}
        visible={this.state.drawer_visible}
      // visible={"true"}
      >
        <p>Followings are restrictions to create a dataset:
          <ol>
            <li>Providing a valid link to data or upload a file..</li>
            <li>The data must be a comma-separated values (CSV) file.</li>
            <li>Zygosity data must be coded as -1, 0, 1, or 2 to represent missing genotypes, homozygous, heterozygous, and reference homozygous, respectively.</li>
            <li>SNP data must be coded as IUPAC.</li>
            <li>Header of label (quantitative traits) column in the file must be indicated by a word "label".</li>
          </ol>
        </p>
        <p>
          Following is an axample of valid data:
            <img src={dataset_example_img} style={{ width: '80%' }}></img>
        </p>
      </Drawer>
    );

    let dataUrl = (
      <div id='dataUrl' style={{ paddingTop: '30px' }}>
        <label className={Style.title}>
          Upload training and validation dataset<span style={{ color: 'red' }}>*</span> :

        </label>
        <br></br>
        {/* Choose upload method */}
        <Select
          className={Style.chooseUploadMethod}
          showSearch
          placeholder="Choose upload method"
          optionFilterProp="children"
          onChange={this.onChangeUploadMethod}
        >
          <Option value="input">Transfer file from shared link</Option>
          <Option value="upload">Upload file from local machine</Option>
        </Select>
        <br></br>
      </div>
    );

    let Description = (
      <div style={{ paddingTop: '30px' }}>
        <div className={Style.title}>
          <label >Description :</label>
        </div>
        <TextArea
          className={Style.description}
          onChange={this.onChangeDescription}
          placeholder=""
          autoSize={{ minRows: 6 }}
        />
      </div>
    )

    let UploadField = (
      <br></br>
    )

    if (this.state.uploadMethod == 'upload') {
      UploadField = (
        <Upload {...props} >
          <Button className={Style.uplodModel} icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      )
    } else if (this.state.uploadMethod == 'input') {
      UploadField = (
        <div style={{ marginTop: '8px' }}>
          <a className={Style.a_example2} onClick={this.addExampleUrl} >Link to example</a>
          <br></br>
          <Input placeholder="input a link to your data"
            key={this.state.keyOfInputUrl}
            defaultValue={this.state.dataTrainUrl}
            allowClear
            onChange={this.onChangeDataUrl}
            className={Style.dataUrl} />
        </div>

      )
    }

    let error_alert = (<div></div>);
    if (this.state.error_feedback_msg !== '') {
      error_alert = (
        <div style={{ width: '50%', paddingTop: '20px' }}>
          <Alert
            showIcon
            description={this.state.error_feedback_msg}
            type="error"
          />
        </div>
      );
    }

    let task_status_div = (<div></div>);
    if (this.state.loading == true) {
      task_status_div = (
        <div id="task_status">
          <Divider />
          <label className={Style.title}>Creating the dataset :</label>
          <p>Tips: Hovering the mouse over progress bar to show details</p>
          <div style={{ width: '50%', paddingTop: '20px' }}>
            <Tooltip title={this.state.task_log} color='blue'>
              <Progress percent={this.state.task_percentage} status="active" />
            </Tooltip>
          </div>
        </div>
      );
    }

    let video = (
      <div style={{ width: "100%" }}>
        <YouTube videoId="CXWwzV2hPSw"
          opts={
            { width: "100%" }
          }
          onReady={this._onReady}
        >
        </YouTube>
      </div>
    )

    let tutorial_modal = (
      <Modal title="vesdio model name"
        footer={null}
        visible={this.state.isModalVisible}
        onCancel={this.handleClose}
        width="50%"
      >
        {video}
      </Modal>
    );

    return (
      <div>
        <Title level={2}>Creating dataset</Title>
        {instructions}
        {tutorial_modal}
        <Divider />
        <div>
          {datasetName}
          {dataType}
          {dataUrl}
          {UploadField}
          {Description}
          {error_alert}
          <div style={{ paddingTop: '20px' }}>
            <Button type="primary" size={'large'}
              onClick={this.create}
              loading={this.state.loading}
              href="#task_status"
            >Create</Button>
          </div>
          {task_status_div}
          {drawer_data_format}
        </div>
      </div>
    )
  }
}

export default withRouter(DatasetCreate)
