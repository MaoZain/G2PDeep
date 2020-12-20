import React, { Component } from 'react'
import { Descriptions, Badge, Empty } from 'antd';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const options1 = {
        chart: {
          width: 900
      },
      title: {
        text: ''
      },
      yAxis: {
        title: {
          text: 'Metric/Loss'
        }
      },
      xAxis: {
        title: {
          text: 'Epochs'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 1
        }
      },
      series: [],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
}

const options2 ={
  chart: {
    width: 900,
    type: 'scatter',
    zoomType: 'xy'
  },
  title: {
    text: 'True v.s. predicted quantitative traits.'
  },
  xAxis: {
    title: {
      enabled: true,
      text: 'True quantitative traits'
    },
    startOnTick: true,
    endOnTick: true,
    showLastLabel: true
  },
  yAxis: {
    title: {
      text: 'Predicted quantitative traits'
    }
  },
  legend: {
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'top',
    x: 100,
    y: 70,
    floating: true,
    backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
    borderWidth: 1
  },
  plotOptions: {
    scatter: {
      marker: {
        radius: 5,
        states: {
          hover: {
            enabled: true,
            lineColor: 'rgb(100,100,100)'
          }
        }
      },
      states: {
        hover: {
          marker: {
            enabled: false
          }
        }
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x}, {point.y}'
      }
    }
  },
  series: []
}

export default class ExperimentDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            showIndex:props.showIndex,
            showDetails_id:props.showDetails_id,
            experimentInfo:props.experimentInfo,
            detail:props.detail,
        }
        
    }

    componentWillReceiveProps = (nextProps) => { 
      if (nextProps.detail.length>0) {
        this.fetchTableData(nextProps.experimentInfo[0].experiment_info_id)
      }
        // console.log(nextProps.detail)
        if (nextProps.detail.length > 0) {
            this.setState({
                experimentInfo:nextProps.experimentInfo,
                showIndex:nextProps.showIndex,
                showDetails_id:nextProps.showDetails_id,
                detail:nextProps.detail,
            })
        }else{
            this.setState({
                detail:nextProps.detail,
            })
        }
    }

    afterChartCreated1=(chart)=> {
        // console.log(chart)
        this.internalChart=chart
    }

    afterChartCreated2=(chart)=> {
      // console.log(chart)
      this.internalChart2=chart
    }

    fetchTableData = (id) => {
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
        .then(result => this.getTable2Data(result))
        .catch(error => console.log('error', error));
    }

    getTable2Data = (result) => {
      let tabledata = JSON.parse(result).message;
      for( let data of tabledata) {
        this.internalChart2.addSeries(data);
        // console.log(data)
      }
    }

    render() {
        if (this.state.detail.length > 0) {
          // console.log(this.state.detail)
            let learning_curve_series_data = this.state.detail[0].learning_curve_series_data;
            for( let data of learning_curve_series_data) {
                this.internalChart.addSeries(data);
                // console.log(data)
              }
        }
        var detailsDes = (
            <div id ='empty' style = {{paddingTop:'50px'}}>
                <Empty />
            </div>
        )
        if (this.state.detail.length > 0) {
            detailsDes = (
                <Descriptions 
                style = {{width:'950px'}}
                bordered
                column={2} 
                layout="vertical" 
                bordered
                >
                    <Descriptions.Item label="Dataset Name">{this.state.detail[0].dataset_name}</Descriptions.Item>
                    <Descriptions.Item label="Type of dataset">SNPs</Descriptions.Item>
                    
                    <Descriptions.Item label="Status" span = {2}>
                    {this.state.detail[0].experiment_status}
                    </Descriptions.Item>
                </Descriptions>
            )
        }
        return (
            <div >
                {detailsDes}
                <br></br>
                <div style={{display:this.state.detail.length>0 ? 'block':'none'}}>
                  <p>Learning Curve:</p>
                  <HighchartsReact 
                      // style ={{width:'900px'}}
                      highcharts={Highcharts}
                      options={options1}
                      callback={ this.afterChartCreated1 }
                  />
                  <br></br>
                  <p>Predicted VS True:</p>
                  <HighchartsReact 
                      // style ={{width:'900px'}}
                      highcharts={Highcharts}
                      options={options2}
                      callback={ this.afterChartCreated2 }
                  />
                </div>
                
            </div>
        )
    }
}
