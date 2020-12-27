import React, { Component } from 'react'
import { Table, Tag, Space, Empty } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from './experimentCompare.module.css'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


class ExperimentCompare extends Component {
    constructor(props){
        super(props);
        this.state={
            compareInfo:props.compareInfo,
            loading:props.loading,
            compareChartOfdata:props.compareChartOfdata,
        }
        this.tableColumns = [
            {
                title: 'Experoment Name',
                width: 160,
                dataIndex: 'properties',
                key: 'name',
                fixed: 'left',
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key:'description',
            },
            {
                title: 'Dataset name',
                dataIndex: 'dataset_name',
                key:'dataset_name'
            },
            {
                title:'Person Correlation Coefficient(train metric)',
                dataIndex:'PEARSON_CORRELATION_COEFFICIENT_train',
                key:'PEARSON_CORRELATION_COEFFICIENT_train'
            },
            {
                title: 'Mean Absolute Error(train metric)',
                dataIndex: 'MEAN_ABSOLUTE_ERROR_train',
                key:'MEAN_ABSOLUTE_ERROR_train'
            },
            {
                title:'Mean Squared Error(train metric)',
                dataIndex:'MEAN_SQUARED_ERROR_train',
                key:'MEAN_SQUARED_ERROR_train'
            },
            {
                title:'Person Correlation Coefficient(valid metric)',
                dataIndex:'PEARSON_CORRELATION_COEFFICIENT_valid',
                key:'PEARSON_CORRELATION_COEFFICIENT_valid'
            },
            {
                title:'Mean Absolute Error(valid metric)',
                dataIndex:'MEAN_ABSOLUTE_ERROR_valid',
                key:'MEAN_ABSOLUTE_ERROR_valid'
            },
            {
                title:'Mean Squared Error(valid metric)',
                dataIndex:'MEAN_SQUARED_ERROR_valid',
                key:'MEAN_SQUARED_ERROR_valid'
            },
            {
                title:'Loss',
                dataIndex:'loss',
                key:'loss'
            },
            {
                title:'Epochs',
                dataIndex:'epochs',
                key:'epochs'
            },
            {
                title:'Metrics',
                dataIndex:'metrics',
                key:'metrics'
            },
            {
                title:'Optimizer',
                dataIndex:'optimizer',
                key:'optimizer'
            },
            {
                title:'Batch Size',
                dataIndex:'batch_size',
                key:'batch_size'
            },
            {
                title:'Learning Rate',
                dataIndex:'learning_rate',
                key:'learning_rate'
            },
        ]
    }

    componentWillReceiveProps = (nextProps) => {
        // console.log(nextProps.compareInfo)
        this.setState({
            compareInfo:nextProps.compareInfo,
            loading:nextProps.loading,
            compareChartOfdata:nextProps.compareChartOfdata
        })
    }

    afterChartCreated=(chart)=> {
        // console.log(chart)
        this.internalChart=chart
    }

    render() {
        let compareData =[]
        let chartOption = {
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
          tooltip: {
            valueDecimals: 3
          },
          series: this.state.compareChartOfdata,
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
        let compareTable = (
            <div id ='empty' style = {{paddingTop:'50px'}}>
                <Empty />
            </div>
        )
        if(this.state.compareInfo.length > 0){
            this.state.compareInfo.forEach((element, index) => {
                compareData.push(
                    {
                        key:index,
                        properties:element.experiment_name,
                        dataset_name:element.dataset_name,
                        MEAN_ABSOLUTE_ERROR_train:element.train_metric.MEAN_ABSOLUTE_ERROR.toFixed(3),
                        MEAN_SQUARED_ERROR_train:element.train_metric.MEAN_SQUARED_ERROR.toFixed(3),
                        PEARSON_CORRELATION_COEFFICIENT_train:element.train_metric.PEARSON_CORRELATION_COEFFICIENT.toFixed(3),
                        MEAN_ABSOLUTE_ERROR_valid:element.valid_metric.MEAN_ABSOLUTE_ERROR.toFixed(3),
                        MEAN_SQUARED_ERROR_valid:element.valid_metric.MEAN_SQUARED_ERROR.toFixed(3),
                        PEARSON_CORRELATION_COEFFICIENT_valid:element.valid_metric.PEARSON_CORRELATION_COEFFICIENT.toFixed(3),
                        loss:element.experimental_parameters.loss,
                        epochs:element.experimental_parameters.epochs,
                        metrics:element.experimental_parameters.metrics,
                        optimizer:element.experimental_parameters.optimizer,
                        batch_size:element.experimental_parameters.batch_size,
                        learning_rate:element.experimental_parameters.learning_rate,
                    }
                )
            });
            compareTable =(
                <Table columns={this.tableColumns} dataSource={compareData} scroll={{ x: 2300 }} />
            ) 
        }
        return (
            <div>
                 <label className={Style.title}>Summary of experiments: </label>
                 {compareTable}
                <br></br>
                <label className={Style.title} style={{display:this.state.compareInfo.length>0 ? 'block':'none'}}>Observation Chart:</label>
                <HighchartsReact 
                    // style ={{width:'900px'}}
                    highcharts={Highcharts}
                    options={chartOption}
                    callback={ this.afterChartCreated }
                />
            </div>
        )
    }
}

export default ExperimentCompare
