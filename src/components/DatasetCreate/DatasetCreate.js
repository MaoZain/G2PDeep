import React, { Component, useState } from 'react'
import Style from './datasetCreate.module.css'
import { Select } from 'antd';
import { Input, Button, message, Drawer, Upload } from 'antd';
import { withRouter } from 'react-router-dom'
import { Text } from "informed";
import { Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dataset_example_img from './dataset_example.png'
const { Title } = Typography;

const { Option } = Select;
const { TextArea } = Input;

// TODO(ziting): change following code if you like.
var _SERVER_UPLOAD_FILE_NAME = '';
const props = {
  name: 'dataset_file',
  action: '/api/datasets/upload_dataset_file/',
  accept:".csv",
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
    this.state = {
      loading: false,
      datasetName: '',
      dataType: '',
      dataTrainUrl: '',
      description: '',
      urlExample: '',
      keyOfInputUrl: 0,
      drawer_visible: false,
    };
    this.ref_example_data_text = React.createRef();
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

  fetchToCreate = () => {
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
      "test_dataset_url": ''
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("/api/datasets/create_training_dataset/", requestOptions)
      .then(response => response.text())
      .then(result => this.checkCreate(result))
      .catch(error => { message.warning('create fail'); console.log(error) });
  }

  checkCreate = (result) => {
    console.log(result)
    let status = JSON.parse(result).status;
    if (status === 'SUCCESS') {
      this.props.fetchDatasetInfo();
      this.props.history.push("/datasets/summary");
    } else {
      message.warning(JSON.parse(result).message)
    }
    this.setState({
      loading: false,
    })
  }

  create = () => {
    // console.log(this.state.dataType,this.state.datasetName,
    //     this.state.description,this.state.dataTrainUrl)
    if (this.state.datasetName !== '' && this.state.dataTrainUrl !== '') {
      this.fetchToCreate();
      this.setState({
        loading: true,
      })
    } else {
      message.warning('Invalid creation')
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

  render() {
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
          placeholder="Select a Model"
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
      </Drawer>
    );

    let dataUrl = (
      <div id='dataUrl' style={{ paddingTop: '30px' }}>
        <label className={Style.title}>
          Link to training and validation dataset<span style={{ color: 'red' }}>*</span> :
          <a className={Style.a_example} onClick={this.addExampleUrl} >Link to example</a>,
          <a className={Style.a_example} onClick={this.showDrawer}>Show data format</a>
        </label>
        <br></br>
        {/* <Text
          // allowClear
          field="example_url"
          onChange={this.onChangeDataUrl}
          ref={this.ref_example_data_text}
          className={Style.dataUrl}
        /> */}
        <Input placeholder="input a link to your data"
          key={this.state.keyOfInputUrl}
          defaultValue={this.state.dataTrainUrl}
          allowClear
          onChange={this.onChangeDataUrl}
          className={Style.dataUrl} />
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
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    )
    return (
      <div>
        <Title level={2}>Creating dataset</Title>
        <div style={{ paddingTop: '40px' }}>
          {datasetName}
          {dataType}
          {dataUrl}
          {UploadField}
          {Description}
          <div style={{ paddingTop: '40px' }}>
            <Button type="primary" size={'large'}
              onClick={this.create}
              loading={this.state.loading}
            >Create</Button>
          </div>
          {drawer_data_format}
        </div>
      </div>
    )
  }
}

export default withRouter(DatasetCreate)
