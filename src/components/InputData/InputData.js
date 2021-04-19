import React, { Component } from 'react';
import Style from './inputdata.module.css'
import { Select } from 'antd';
import { Input, Button, message, Drawer } from 'antd';
import { Next } from 'react-bootstrap/esm/PageItem';
import { Typography, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { Alert } from 'antd';
import dataset_example_img from './prediction_dataset_example.png'
const { Title } = Typography;

const { Option } = Select;
const { TextArea } = Input;

var _SERVER_UPLOAD_FILE_NAME = '';
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

export default class InputData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataType: 'snp',
            model: '',
            inputData: '',
            SNPsInfo: '',
            experimentInfo: [],
            loading: props.loading,
            keyOfSNPExampleData: 0,
            dataset_type_name: '',
            uploadMethod: ''
        };
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            loading: nextProps.loading
        })
    }

    componentWillMount = () => {
        this.fetchExperimentInfo();
    }

    fetchExperimentInfo = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(`/api/operation/retrieve_experiment_summary/?localstorage_id=${localStorage.getItem('G2PDeep')}`, requestOptions)
            .then(response => response.text())
            .then(result => this.getExperimentInfo(result))
            .catch(error => console.log('error', error));
    }


    getExperimentInfo = (result) => {
        let info = JSON.parse(result).message;
        // console.log(dataInfo)
        this.setState({
            experimentInfo: info,
        })
    }

    onChangeDataType = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            dataType: value,
        })
    }

    onChangeModel = (value) => {
        let tempInfo = this.state.experimentInfo
        // console.log(`selected ${value}`);
        // console.log(this.state.experimentInfo)
        let selectedItem = tempInfo.filter(function (item) {
            return item.experiment_info_id == value;
        })
        // console.log(test)
        // let dataset_type_name = tempInfo[value-this.state.experimentInfo[0].experiment_info_id].dataset_type_name;
        this.setState({
            model: value,
            dataset_type_name: selectedItem[0].dataset_type_name,
        })

    }

    onChangeInputData = ({ target: { value } }) => {
        this.setState({
            inputData: value
        })
    };

    onChangeSNPsInfo = ({ target: { value } }) => {
        this.setState({
            SNPsInfo: value
        })
    };

    onChangeUploadMethod = (value) => {
        console.log(value);
        this.setState({
            uploadMethod: value,
            inputData: '',
        })
        _SERVER_UPLOAD_FILE_NAME = '';

    }


    fetchExampleSNPdata = () => {

        var url = "";
        if (this.state.dataset_type_name == "Zygosity - homozygous, heterozygous, and reference homozygous") {
            url = "https://de.cyverse.org/dl/d/8F6ECCAE-CABF-44BA-B39A-E77B0FAA623B/test_data.txt";
        }
        else if (this.state.dataset_type_name == "SNP - adenine (A), thymine (T), cytosine (C) and guanine (G)") {
            url = "https://de.cyverse.org/dl/d/932F9D34-1D84-4B5D-A5D5-595408D42BEB/scn_example_top3.txt"
        }
        // console.log(this.state.uploadMethod); 
        // console.log(url); 

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => this.addExampleSNPData(result))
            .catch(error => console.log('error', error));
    }

    addExampleSNPData = (result) => {
        this.setState({
            inputData: result,
            keyOfSNPExampleData: this.state.keyOfSNPExampleData + 1,
        })
        // console.log(this.state);
    };

    submit = () => {
        // alert(this.state.medel)
        if ((this.state.inputData != '' || _SERVER_UPLOAD_FILE_NAME != '') && this.state.model != '') {
            console.log(_SERVER_UPLOAD_FILE_NAME)
            this.props.submit(this.state.dataType, this.state.model, this.state.inputData, _SERVER_UPLOAD_FILE_NAME)
        } else {
            message.warning("Invalid Input")
        }
    };

    // drawer
    showDrawer = () => {
        this.setState({
            drawer_visible: true
        })
    };
    onDrawerClose = () => {
        this.setState({
            drawer_visible: false
        })
    };

    render() {
        let instructions = (
            <div>
                <p>Instructions:</p>
                <ul>
                    <li>Please check your data format before predicting the quantitative phenotype. <a className={Style.a_example} onClick={this.showDrawer}>Show data format</a>.</li>
                    <li>Choose a well-trained model.</li>
                    <li>Provide a data copied from Excel or upload CSV file direct.</li>
                    <li>Please wait for a while. The system validates data format and predicts the quantitative phenotype.</li>
                </ul>
            </div>
        )

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
                <p>Followings are restrictions to input dataset.</p>
                <b>For uploaded files:</b>
                <ul>
                    <li>The file must be a comma-separated values (CSV) file.</li>
                </ul>
                <b>For input field:</b>
                <ul>
                    <li>The input field must be a tab-separated values.</li>
                    <li>The data copied and pasted from excel is great. (Note: the Excel might ignores some columns if the data is large)</li>
                </ul>
                <b>For data format:</b>
                <ul>
                    <li>Zygosity data in the file must be coded as -1, 0, 1, or 2 to represent missing genotypes, homozygous, heterozygous, and reference homozygous, respectively.</li>
                    <li>SNP data in the file must be coded as IUPAC.</li>
                </ul>
                <p>Following is an axample of valid data:</p>
                <img src={dataset_example_img} style={{ width: '70%' }}></img>

            </Drawer>
        );

        // Error message
        let error_alert = (
            <div style={{ width: '40%' }}>
            <Alert
                description="Error Description Error Description Error Description Error Description Error Description Error Description"
                type="error"
                closable
            />
            </div>
        );


        // console.log(this.state.experimentInfo)
        let dataType = (
            <div>
                <label className={Style.title}>DataType :</label>
                <br></br>
                <Select
                    className={Style.selectData}
                    showSearch
                    placeholder="Select a DataType"
                    optionFilterProp="children"
                    onChange={this.onChangeDataType}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="jacDNA Mathylationk">DNA Mathylation</Option>
                    <Option value="SNPs">SNPs</Option>
                </Select>
            </div>
        )

        let typeOfDataset = (
            <p></p>
        )
        if (this.state.dataset_type_name !== '') {
            typeOfDataset = (
                <p>Type of training data: {this.state.dataset_type_name}</p>
            )
        }

        // choose upload method
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
                <div>
                    <a className={Style.inputData_a} onClick={this.fetchExampleSNPdata}>Load an example</a>
                    <br></br>
                    <TextArea
                        key={this.state.keyOfSNPExampleData}
                        defaultValue={this.state.inputData}
                        className={Style.inputData}
                        onChange={this.onChangeInputData}
                        placeholder="Input your data"
                        rows={6}
                        wrap="off"
                        allowClear
                    />
                </div>

            )
        }

        let model = (
            <div style={{ paddingTop: '30px' }}>
                <label className={Style.title}>Model<span style={{ color: 'red' }}>*</span>:</label>
                <br></br>
                <Select
                    className={Style.selectModel}
                    showSearch
                    placeholder="Select a Model"
                    optionFilterProp="children"
                    onChange={this.onChangeModel}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        this.state.experimentInfo.map(element => {
                            // console.log(element)
                            return <Option value={element.experiment_info_id}>{element.experiment_name}</Option>
                        })
                    }
                </Select>
                <br></br>
                {typeOfDataset}
            </div>
        )

        let inputData = (
            <div style={{ clear: 'both', paddingTop: '30px' }}>
                <div className={Style.title}>
                    <label >Input Data<span style={{ color: 'red' }}>*</span> :</label>
                    {/* <a href = '###' className = {Style.inputData_a} >upload</a> */}
                    <br></br>
                    <Select
                        className={Style.chooseUploadMethod}
                        showSearch
                        placeholder="Choose upload method"
                        optionFilterProp="children"
                        onChange={this.onChangeUploadMethod}
                    >
                        <Option value="input">Paste data from Excel</Option>
                        <Option value="upload">Upload file from local machine</Option>
                    </Select>
                </div>
                {UploadField}
            </div>
        )
        let SNPsInfo = (
            <div style={{ clear: 'both', paddingTop: '30px' }}>
                <div className={Style.title}>
                    <label >Additional SNPs Information :</label>
                </div>
                <TextArea
                    className={Style.inputData}
                    onChange={this.onChangeSNPsInfo}
                    placeholder="Iinput your SNPsInfo"
                    rows={6}
                />
            </div>
        )
        return (
            <div>
                <Title level={2}>Prediction and discovery</Title>
                {instructions}
                <Divider />
                {/* {dataType} */}
                {model}
                {inputData}
                {/* {SNPsInfo} */}
                <div style={{ paddingTop: '40px' }}>
                    <Button type="primary" size={'large'}
                        onClick={this.submit}
                        loading={this.state.loading}
                    >Submit</Button>
                </div>
                {drawer_data_format}
            </div>
        )
    }
}
