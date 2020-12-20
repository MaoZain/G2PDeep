import React, { Component } from 'react'
import { Table, Tag, Space, Empty } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from './experimentCompare.module.css'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const options = {
    chart: {
      width: 900
  },
  title: {
    text: ''
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

class ExperimentCompare extends Component {
    constructor(props){
        super(props);
        this.state={
            compareInfo:props.compareInfo
        }
        this.tableColumns = [
            {
                title: 'Properties',
                width: 100,
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
                title: 'dataset_name',
                dataIndex: 'dataset_name',
                key:'dataset_name'
            },
            {
                title: 'Mean Absolute Error(train_metric)',
                dataIndex: 'MEAN_ABSOLUTE_ERROR_train',
                key:'MEAN_ABSOLUTE_ERROR_train'
            },
            {
                title:'Mean Squared Error(train_metric)',
                dataIndex:'MEAN_SQUARED_ERROR_train',
                key:'MEAN_SQUARED_ERROR_train'
            },
            {
                title:'Person Correlation Coefficient(train_metric)',
                dataIndex:'PEARSON_CORRELATION_COEFFICIENT_train',
                key:'PEARSON_CORRELATION_COEFFICIENT_train'
            },
            {
                title:'Person Correlation Coefficient(valid_metric)',
                dataIndex:'PEARSON_CORRELATION_COEFFICIENT_valid',
                key:'PEARSON_CORRELATION_COEFFICIENT_valid'
            },
            {
                title:'Mean Absolute Error(valid_metric)',
                dataIndex:'MEAN_ABSOLUTE_ERROR_valid',
                key:'MEAN_ABSOLUTE_ERROR_valid'
            },
            {
                title:'Mean Squared Error(valid_metric)',
                dataIndex:'MEAN_SQUARED_ERROR_valid',
                key:'MEAN_SQUARED_ERROR_valid'
            },
            {
                title:'loss',
                dataIndex:'loss',
                key:'loss'
            },
            {
                title:'epochs',
                dataIndex:'epochs',
                key:'epochs'
            },
            {
                title:'metrics',
                dataIndex:'metrics',
                key:'metrics'
            },
            {
                title:'optimizer',
                dataIndex:'optimizer',
                key:'optimizer'
            },
            {
                title:'batch_size',
                dataIndex:'batch_size',
                key:'batch_size'
            },
            {
                title:'learning_rate',
                dataIndex:'learning_rate',
                key:'learning_rate'
            },
        ]
    }

    componentWillReceiveProps = (nextProps) => {
        console.log(nextProps.compareInfo)
        this.setState({
            compareInfo:nextProps.compareInfo,
        })
    }

    afterChartCreated=(chart)=> {
        // console.log(chart)
        this.internalChart=chart
    }

    render() {
        if (this.state.compareInfo.length > 0) {
            console.log(this.state.compareInfo)
              let learning_curve_series_data = [];
              this.state.compareInfo.forEach(element => {
                learning_curve_series_data = learning_curve_series_data.concat(element.learning_curve_series_data)
              })
              for( let data of learning_curve_series_data) {
                  this.internalChart.addSeries(data);
                  // console.log(data)
                }
          }
        const compareData =[]
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
                        MEAN_ABSOLUTE_ERROR_train:element.train_metric.MEAN_ABSOLUTE_ERROR,
                        MEAN_SQUARED_ERROR_train:element.train_metric.MEAN_SQUARED_ERROR,
                        PEARSON_CORRELATION_COEFFICIENT_train:element.train_metric.PEARSON_CORRELATION_COEFFICIENT,
                        MEAN_ABSOLUTE_ERROR_valid:element.valid_metric.MEAN_ABSOLUTE_ERROR,
                        MEAN_SQUARED_ERROR_valid:element.valid_metric.MEAN_SQUARED_ERROR,
                        PEARSON_CORRELATION_COEFFICIENT_valid:element.valid_metric.PEARSON_CORRELATION_COEFFICIENT,
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
                <label className={Style.title}>Observation Chart:</label>
                <HighchartsReact 
                    // style ={{width:'900px'}}
                    highcharts={Highcharts}
                    options={options}
                    callback={ this.afterChartCreated }
                />
            </div>
        )
    }
}

export default ExperimentCompare
