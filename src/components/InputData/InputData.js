import React, { Component } from 'react';
import Style from './inputdata.module.css'
import { Select } from 'antd';
import { Input, Button, message } from 'antd';
import { Next } from 'react-bootstrap/esm/PageItem';
import { Typography } from 'antd';
const { Title } = Typography;

const { Option } = Select;
const { TextArea } = Input;

export default class InputData extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataType:'snp',
            model:'',
            inputData:'',
            SNPsInfo:'',
            experimentInfo:[],
            loading:props.loading,
        };
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            loading:nextProps.loading
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
    
    onChangeDataType = (value) =>{
        console.log(`selected ${value}`);
        this.setState({
            dataType:value,
        })
    }

    onChangeModel = (value) =>{
        console.log(`selected ${value}`);
        this.setState({
            model:value,
        })
    }

    onChangeInputData = ({ target: { value } }) => {
        this.setState({
            inputData:value
        })
    };

    onChangeSNPsInfo = ({ target: { value } }) => {
        this.setState({
            SNPsInfo:value
        })
    };

    submit = () => {
        if (this.state.inputData!='' && this.state.medel!='') {
            this.props.submit(this.state.dataType, this.state.model, this.state.inputData)
        }else{
            message.warning("Invalid Input")
        } 
    };

    render() {
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
        let model = (
            <div style={{paddingTop:'30px'}}>
                <label className={Style.title}>Model<span style={{color:'red'}}>*</span>:</label>
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
            </div>
        )

        let inputData=(
            <div style={{clear:'both',paddingTop:'30px'}}>
                <div className={Style.title}>
                    <label >Input Data<span style={{color:'red'}}>*</span> :</label>
                    <a href = '###' className = {Style.inputData_a} >example</a>
                    {/* <a href = '###' className = {Style.inputData_a} >upload</a> */}
                </div>
                <TextArea
                className={Style.inputData}
                onChange={this.onChangeInputData}
                placeholder="Iinput your data"
                rows={6}
                wrap="off"
                />
            </div>
        )
        let SNPsInfo=(
            <div style={{clear:'both',paddingTop:'30px'}}>
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
                {/* {dataType} */}
                {model}
                {inputData}
                {/* {SNPsInfo} */}
                <div style={{paddingTop:'40px'}}>
                    <Button type="primary" size={'large'} 
                       onClick = {this.submit}
                       loading = {this.state.loading}
                       >Submit</Button>
                </div>
            </div>
        )
    }
}
