import React, { Component } from 'react'
import InputData from '../../components/InputData/InputData.js';
import Result from '../../components/Result/Result.js';
import {message} from 'antd'
import { Alert } from 'antd';
// import Style from './prediction.module.css'

export default class Prediction extends Component {
    constructor(props){
        super(props);
        this.state = {
            result:undefined,
            loading:false,
            error_feedback_msg:'',
        }
    }



    submit = (dataType, model, inputData, _SERVER_UPLOAD_FILE_NAME) => {
        // console.log(_SERVER_UPLOAD_FILE_NAME);
        // alert(inputData)
        this.setState({loading:true})
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(
            {
                "experiment_info_id":model,
                "input_data":inputData,
                "test_dataset_server_path":_SERVER_UPLOAD_FILE_NAME,
                // "additional_information":SNPsInfo,
            });
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        var promise = Promise.race([
            fetch('/api/operation/run_model_prediction/', requestOptions),
            new Promise((resolve, reject) =>
              // 5*60*1000 second => 5 mins.
              setTimeout(() => reject(new Error('Timeout')), 5 * 60 * 1000)
            )
          ])
            .then(response => response.text())
            .then(result => this.getResult(result))
            .catch(error => { this.showErrorMessage(error); console.log(error) });

        // fetch("/api/operation/run_model_prediction/", requestOptions)
        // .then(response => response.text())
        // .then(result => this.getResult(result))
        // .catch(error => { this.showErrorMessage(error); console.log(error) });
    }

    getResult = (result) =>{
        if(JSON.parse(result).status === 'SUCCESS'){
            let res = JSON.parse(result).message;
            this.setState({
                result:res,
                loading:false,
                error_feedback_msg:'',
            })
        }else{
            this.setState({
                loading:false,
                error_feedback_msg:JSON.parse(result).message,
            })
        }
    }

    showErrorMessage = (error) => {
        this.setState({
            loading:false,
            error_feedback_msg:'Internal error. Please contact administrator.',
        })
    }



    render() {
        // Error message
        let error_alert = (<div></div>);
        if (this.state.error_feedback_msg !== '') {
            error_alert = (
                <div style={{ width: '60%' }}>
                <Alert
                    showIcon
                    description={this.state.error_feedback_msg}
                    type="error"
                />
                </div>
            );
        }

        return (
            <div id ='prediction'>
                
                <InputData submit = {this.submit} 
                    loading = {this.state.loading} />
                {error_alert}
                <Result result = {this.state.result} />
                
            </div>
        )
    }
}