import React, { Component } from 'react'
import CreateDataset from '../../components/DatasetCreate/DatasetCreate'
import Summary from '../../components/DatasetSummary/DatasetSummary'
import Details from '../../components/DatasetDetails/DatasetDetails'
import {message} from 'antd'

export default class Datasets extends Component {
    constructor(props){
        super(props);
        // console.log(this.props.match.params.menu)
        this.state = {
            // currentPage:'summary',
            datasetsInfo:[],
            showDetails_index:0,
            showDetails_id:0,
        }
    }

    componentWillReceiveProps = (nextProps) => {
        // console.log(nextProps.match.params.menu)
        this.setState({
            currentPage:nextProps.match.params.menu
        })
    }

    // showSummary = () => {
    //     this.setState({
    //         currentPage:'summary'
    //     })
    // }

    showDetails = (index, datasetId) => {
        // console.log(datasetId);
        this.setState({
            showDetails_index:index,
            showDetails_id:datasetId,
            // currentPage:'details'
        })
    }

    updateDetail = (index, percent_train, percent_valid) => {
        // console.log(index)
        this.fetchUpdateDetail(index, percent_train, percent_valid)
    }

    fetchUpdateDetail = (index, percent_train, percent_valid) => {
        // console.log(this.state.showDetails_id)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(
            {
                "dataset_info_id":index,
                "ratio_training_dataset":percent_train,
                "ratio_validation_dataset":percent_valid,
            }
        );
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        fetch("/api/datasets/update_dataset_info/", requestOptions)
        .then(response => response.text())
        .then(result => this.checkUpdate(result))
        .catch(error => console.log('error', error));
    }

    checkUpdate = (result) => {
        // console.log(result)
        let status = JSON.parse(result).status;
        if (status === "SUCCESS") {
            message.success("success to update !")
            this.fetchDatasetInfo();
        }else{
            message.warning(JSON.parse(result.message))
        }
    }

    fetchDatasetInfo = () => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        fetch(`/api/datasets/retrieve_dataset_info/?localstorage_id=${localStorage.getItem('G2PDeep')}`, requestOptions)
          .then(response => response.text())
          .then((result) => this.getDatasetInfo(result))
          .catch(error => console.log('error', error));
      }
    
    //set datasets_info as a global parameter 
    getDatasetInfo = (result) => {
        let dataInfo = JSON.parse(result).message;
        // console.log(dataInfo)
        this.setState({
            datasetsInfo: dataInfo,
        })
    }

    componentWillMount = () => {
        this.fetchDatasetInfo();
    }

    render() {
        
        return (
            <div id = 'datasets'>
                <div id = 'summary'
                  style = {{display: this.props.history.location.pathname === '/datasets/summary' ? 'block':'none'}}
                  >
                    <Summary datasetsInfo = {this.state.datasetsInfo} 
                      showDetails = {this.showDetails}/>
                </div>
                <div id = 'createDataset'
                  style = {{display: this.props.history.location.pathname === '/datasets/createDataset' ? 'block':'none'}}
                  >
                    <CreateDataset fetchDatasetInfo = {this.fetchDatasetInfo}
                      showSummary ={this.showSummary} />
                </div>
                <div id = 'showDetails'
                  style = {{display: this.props.history.location.pathname === '/datasets/details' ? 'block':'none'}}
                  >
                    <Details showIndex = {this.state.showDetails_index}
                      showDetails_id = {this.state.showDetails_id}
                      datasetsInfo = {this.state.datasetsInfo} 
                      updateDetail = {this.updateDetail} />
                </div>
            </div>
        )
    }
}
