import React, { Component } from 'react'
import { Descriptions, Badge, Empty, Spin } from 'antd';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default class ExperimentDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            showIndex:props.showIndex,
            showDetails_id:props.showDetails_id,
            experimentInfo:props.experimentInfo,
            detail:props.detail,
            chartOfVsData:props.chartOfVsData,
            chartOfCurveData:props.chartOfCurveData,
            loadDetailStatus:props.loadDetailStatus,
        }
    }

    componentWillReceiveProps = (nextProps) => { 
        this.setState({
            experimentInfo:nextProps.experimentInfo,
            showIndex:nextProps.showIndex,
            showDetails_id:nextProps.showDetails_id,
            detail:nextProps.detail,
            chartOfVsData:nextProps.chartOfVsData,
            chartOfCurveData:nextProps.chartOfCurveData,
            loadDetailStatus:nextProps.loadDetailStatus,
        })
    }

    afterChartOfCurveCreated = (chart) => {
        // console.log(chart)
        this.internalChartOfCurve=chart
    }

    afterChartOfVsCreated = (chart) => {
      // console.log(chart)
      this.internalChartOfVs=chart
    }

    render() {
      let chartVsOption = {
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
        tooltip: {
          formatter: function() {
            return '<b>'+ this.point.x.toFixed(3) + ' ' + this.point.y.toFixed(3) +'</b>';
         }
        },
        series: this.state.chartOfVsData
      }
      let chartOfCurveOption = {
        chart:{
          width:900
        },
        title: {
          text: 'Learning Curve'
        },
        yAxis: {
          title: {
            text: 'Metric'
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
        tooltip: {
          valueDecimals: 3
        },
        series: this.state.chartOfCurveData,
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
      console.log(this.state.loadDetailStatus)

      let detailsDes = (
          <div id ='empty' style = {{paddingTop:'50px'}}>
              <Empty />
          </div>
      )
      if(this.state.loadDetailStatus){
        detailsDes =(
          <Spin></Spin>
        )
        
      }
      if (!this.state.loadDetailStatus && this.state.detail.length>0) {
          detailsDes = (
            <div>
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
              <br></br>
              <p>Model Details:</p>
              <br></br>
              <img src = {this.state.detail[0].model_plot_url}
                  style={{width:'60%'}}></img>
                  <br></br>
            </div>
          )
        }
        return (
            <div >
                {detailsDes}
                <br></br>
                <div style={{display:this.state.detail.length>0 ? 'block':'none'}}>
                  <p>Learning Curve:</p>
                  <div>
                  <HighchartsReact 
                      highcharts={Highcharts}
                      options={chartOfCurveOption}
                      callback={ this.afterChartOfCurveCreated }
                  />
                  </div>
                  <br></br>
                  <p>Predicted VS True:</p>
                  <HighchartsReact 
                      highcharts={Highcharts}
                      options={chartVsOption}
                      callback={ this.afterChartOfVsCreated }
                  />
                </div>
            </div>
        )
    }
}
