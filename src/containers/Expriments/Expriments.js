import React, { Component } from 'react'
import Create from '../../components/ExperimentCreate/ExperimentCreate'
import Summary from '../../components/ExperimentSummary/ExperimentSummary'
import Detail from '../../components/ExperimentDetail/ExperimentDetail'
import Compare from '../../components/ExperimentCompare/ExperimentCompare'
import { withRouter } from 'react-router-dom'
import {message} from 'antd'

class Expriments extends Component {
    constructor(props){
        super(props);
        this.state = {
            experimentInfo: [],
            showDetails_index:null,
            showDetails_id:null,
            detail:[],
            chartOfVsData:[],
            chartOfCurveData:[],
            compareChartOfdata:[],
            compareInfo:[],
            loading:false,
            loadDetailStatus:false,
        }
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

    fetchChartOfVsData = (id) => {
        // console.log(id)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(
          {
            "localstorage_id":localStorage.getItem('G2PDeep'),
            "experiment_info_id":id,
          });
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        fetch("/api/operation/retrieve_experiment_true_predicted_values/", requestOptions)
          .then(response => response.text())
          .then(result => this.getChartOfVsData(result))
          .catch(error => console.log('error', error));
      }

    fetchExperimentDetail_compare = (list) => {
        return new Promise(( resolve, reject ) => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(
                {
                    "localstorage_id":localStorage.getItem('G2PDeep'),
                    "experiment_info_id_list":list,
                });
            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
            fetch("/api/operation/retrieve_experiment_details/", requestOptions)
            .then(response => response.text())
            .then(result => {resolve(result)})
            .catch(error => console.log('error', error));
        })
    }

    getExperimentInfo = (result) => {
        let info = JSON.parse(result).message;
        console.log(info)
        this.setState({
            experimentInfo: info,
        })
    }

    getChartOfVsData = (result) => {
        let chartdata = JSON.parse(result).message;
        this.setState({
            chartOfVsData:chartdata,
        })
      }

    showDetails = async(index, id) => {
        this.setState({
            loadDetailStatus:true,
        })
        this.fetchChartOfVsData(id)
        let detailJson = await this.fetchExperimentDetail_compare([id])
        let detail = JSON.parse(detailJson).message;
         console.log(detail)
        this.setState({
            showDetails_index:index,
            showDetails_id:id,
            detail:detail,
            chartOfCurveData:detail[0].learning_curve_series_data,
            loadDetailStatus:false,
        })
    }

    compare = async(list) => {
        let compareJson = await this.fetchExperimentDetail_compare(list);
        let compareInfo = JSON.parse(compareJson).message;
        let learning_curve_series_data = [];
        compareInfo.forEach(element => {
            learning_curve_series_data = learning_curve_series_data.concat(element.learning_curve_series_data)
        })
        let status = JSON.parse(compareJson).status;
        if (status === 'SUCCESS') {
            this.setState({
                compareInfo:compareInfo,
            })
            this.props.history.push("/experiment/compare");
        } else {
            message.warning(JSON.parse(compareJson).message)
        }
        this.setState({
            loading:false,
            compareChartOfdata:learning_curve_series_data
        })
    }

    render() {
        console.log(this.state.showDetails_index)
        return (
            <div id = 'experiment'>
                <div id = 'exSummary'
                  style = {{display: this.props.history.location.pathname === '/experiment/summary' ? 'block':'none'}}
                  >
                    <Summary 
                      loading = {this.state.loading}
                      experimentInfo = {this.state.experimentInfo}
                      showDetails = {this.showDetails}
                      compare = {this.compare}
                      history = {this.props.history} />
                </div>
                <div id = 'exCreateDataset'
                  style = {{display: this.props.history.location.pathname === '/experiment/create' ? 'block':'none'}}
                  >
                    <Create  
                        fetchExperimentInfo={this.fetchExperimentInfo} />
                </div>
                <div id = 'exDetails'
                  style = {{display: this.props.history.location.pathname === '/experiment/detail' ? 'block':'none'}}
                  >
                    <Detail showIndex = {this.state.showDetails_index}
                      showDetails_id = {this.state.showDetails_id} 
                      experimentInfo = {this.state.experimentInfo}
                      detail = {this.state.detail}
                      chartOfVsData = {this.state.chartOfVsData}
                      chartOfCurveData = {this.state.chartOfCurveData}
                      loadDetailStatus = {this.state.loadDetailStatus}
                      />
                </div>
                <div id = 'exCompare'
                  style = {{display: this.props.history.location.pathname === '/experiment/compare' ? 'block':'none'}}
                  >
                    <Compare 
                      compareInfo = {this.state.compareInfo} 
                      compareChartOfdata = {this.state.compareChartOfdata}
                      loading = {this.state.loading} />
                </div>
            </div>
        )
    }
}

export default  withRouter(Expriments)
