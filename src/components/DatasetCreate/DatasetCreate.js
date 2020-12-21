import React, { Component } from 'react'
import Style from './datasetCreate.module.css'
import { Select } from 'antd';
import { Input, Button, message } from 'antd';
import { withRouter } from 'react-router-dom'

const { Option } = Select;
const { TextArea } = Input;

class DatasetCreate extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            loading:false,
            datasetName:'',
            dataType:'',
            dataTrainUrl:'',   
            description:'',
            urlExample:'',
        };
    }
    
    onChangeDatasetName = ({ target: { value } }) => {
        this.setState({
            datasetName:value
        })
    };

    onChangeDataType = (value) =>{
        // console.log(`selected ${value}`);
        this.setState({
            dataType:value,
        })
    }

    onChangeDataUrl = ({ target: { value } }) => {
        this.setState({
            dataTrainUrl:value
        })
    };


    onChangeDescription = ({ target: { value } }) => {
        this.setState({
            description:value
        })
    };

    fetchToCreate = () => {
        let myHeaders = new Headers();
        myHeaders.append("Access-Control-Allow-Origin", "*");
        myHeaders.append("Content-Type", "application/json");
        let raw = JSON.stringify({
            "localstorage_id":localStorage.getItem('G2PDeep'),
            "dataset_name":this.state.datasetName,
            "dataset_type_key":'snp',
            "training_dataset_url":this.state.dataTrainUrl,
            "description":this.state.description,
            "test_dataset_url":''
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
        .catch(error => {message.warning('create fail'); console.log(error)});
    }

    checkCreate = (result) => {
        console.log(result)
        let status = JSON.parse(result).status;
        if (status === 'SUCCESS') {
            this.setState({
                loading:false,
            })
            this.props.fetchDatasetInfo();
            this.props.history.push("/datasets/summary");
        } else {
            message.warning(JSON.parse(result).message)
        }
    }

    create = () => {
        // console.log(this.state.dataType,this.state.datasetName,
        //     this.state.description,this.state.dataTrainUrl)
        if ( this.state.datasetName !== '' &&  this.state.dataTrainUrl !== '' ) 
        {
            this.fetchToCreate();
            this.setState({
                loading:true,
            })
        }else{
            message.warning('Invalid creation')
        }
    };

    urlExample = () => {
        this.setState({
            urlExample:'asdfasdfafd'
        })
    }

    render() {
        // console.log(this.context)
        let datasetName = (
            <div id = 'datasetName'>
                <label className={Style.title}>Dataset Name<span style={{color:'red'}}>*</span> :</label>
                <br></br>
                <Input placeholder="input your dataset's name" 
                    allowClear 
                    onChange={this.onChangeDatasetName} 
                    className = {Style.inputDatasetName} />
            </div>
        )
        let dataType = (
            <div id = 'dataType' style={{paddingTop:'30px'}}>
                <label className={Style.title}>Data Type <span style={{color:'red'}}>*</span>:</label>
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
                    <Option value="jacDNA Mathylationk">DNA Mathylation</Option>
                    <Option value="snp">SNPs</Option>
                </Select>
            </div>
        );
        let dataUrl = (
            <div id = 'dataUrl' style={{paddingTop:'30px'}}>
                <label className={Style.title}>
                    Link to training and validation dataset<span style={{color:'red'}}>*</span> : 
                    <a className={Style.a_example} onClick={this.urlExample} >Example</a>
                </label>
                <br></br>
                <Input placeholder="https://de.cyverse.org/dl/d/2FFA3458-2DDF-4FCB-B1FE-DF5C08A0BD28/protein.train.csv" 
                    defaultValue={this.state.urlExample}
                    allowClear 
                    onChange={this.onChangeDataUrl} 
                    className = {Style.dataUrl} />
            </div>
        );
        let Description=(
            <div style={{paddingTop:'30px'}}>
                <div className={Style.title}>
                    <label >Description :</label>
                </div>
                <TextArea
                    className={Style.description}
                    onChange={this.onChangeDescription}
                    placeholder=""
                    autoSize={{ minRows: 6}}
                />
            </div>
        )
        return (
            <div>
                {datasetName}
                {/* {dataType} */}
                {dataUrl}
                {Description}
                <div style={{paddingTop:'40px'}}>
                    <Button type="primary" size={'large'} 
                        onClick = {this.create}
                        loading={this.state.loading}
                        >Create</Button>
                </div>
            </div>
        )
    }
}

export default withRouter(DatasetCreate)
