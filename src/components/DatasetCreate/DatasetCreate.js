import React, { Component, useState } from 'react'
import Style from './datasetCreate.module.css'
// import { Select } from 'antd';
import { Input, Button, message, Drawer } from 'antd';
import { withRouter } from 'react-router-dom'
import { Text } from "informed";
import { Typography } from 'antd';
import dataset_example_img from './dataset_example.png'
const { Title } = Typography;

// const { Option } = Select;
const { TextArea } = Input;


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
      "dataset_type_key": 'snp',
      "training_dataset_url": this.state.dataTrainUrl,
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
    var url = "https://de.cyverse.org/dl/d/2FFA3458-2DDF-4FCB-B1FE-DF5C08A0BD28/protein.train.csv";
    // this.ref_example_data_text.current.value = url
    this.setState({
      dataTrainUrl: url,
      keyOfInputUrl: this.state.keyOfInputUrl + 1,
    })
  };


  urlExample = () => {
    this.setState({
      urlExample: 'asdfasdfafd'
    })
  }

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
    // let dataType = (
    //   <div id='dataType' style={{ paddingTop: '30px' }}>
    //     <label className={Style.title}>Data Type <span style={{ color: 'red' }}>*</span>:</label>
    //     <br></br>
    //     <Select
    //       className={Style.dataType}
    //       showSearch
    //       placeholder="Select a Model"
    //       optionFilterProp="children"
    //       onChange={this.onChangeDataType}
    //       filterOption={(input, option) =>
    //         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    //       }
    //     >
    //       <Option value="jacDNA Mathylationk">DNA Mathylation</Option>
    //       <Option value="snp">SNPs</Option>
    //     </Select>
    //   </div>
    // );
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
    return (
      <div>
        <Title level={2}>Creating dataset</Title>
        <div style={{ paddingTop: '40px' }}>
          {datasetName}
          {/* {dataType} */}
          {dataUrl}
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
