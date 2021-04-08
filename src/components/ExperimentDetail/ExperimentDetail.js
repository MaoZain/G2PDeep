import React, { Component } from 'react'
import { Descriptions, Badge, Tag, Empty, Spin, Collapse } from 'antd';
import Highcharts from 'highcharts'
import exporting from "highcharts/modules/exporting.js";
import HighchartsReact from 'highcharts-react-official'
import { Typography } from 'antd';
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const { Panel } = Collapse;

exporting(Highcharts);

export default class ExperimentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIndex: props.showIndex,
      showDetails_id: props.showDetails_id,
      experimentInfo: props.experimentInfo,
      detail: props.detail,
      chartOfVsData: props.chartOfVsData,
      chartOfCurveData: props.chartOfCurveData,
      loadDetailStatus: props.loadDetailStatus,
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      experimentInfo: nextProps.experimentInfo,
      showIndex: nextProps.showIndex,
      showDetails_id: nextProps.showDetails_id,
      detail: nextProps.detail,
      chartOfVsData: nextProps.chartOfVsData,
      chartOfCurveData: nextProps.chartOfCurveData,
      loadDetailStatus: nextProps.loadDetailStatus,
    })
  }

  afterChartOfCurveCreated = (chart) => {
    // console.log(chart)
    this.internalChartOfCurve = chart
  }

  afterChartOfVsCreated = (chart) => {
    // console.log(chart)
    this.internalChartOfVs = chart
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
        formatter: function () {
          return '<b>' + this.point.x.toFixed(3) + ' ' + this.point.y.toFixed(3) + '</b>';
        }
      },
      series: this.state.chartOfVsData
    }
    let chartOfCurveOption = {
      chart: {
        width: 900
      },
      title: {
        text: 'Learning curve'
      },
      yAxis: {
        title: {
          text: 'MSE(Loss)/MAE(Metric)'
        }
      },
      xAxis: {
        title: {
          text: 'Epochs'
        }
      },
      // legend: {
      //   layout: 'vertical',
      //   align: 'right',
      //   verticalAlign: 'middle'
      // },
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
    // console.log(this.state.loadDetailStatus)

    let detailsDes = (
      <div id='empty' style={{ paddingTop: '50px' }}>
        <Empty />
      </div>
    )

    if (this.state.loadDetailStatus) {
      detailsDes = (
        <Spin></Spin>
      )

    }
    if (!this.state.loadDetailStatus && this.state.detail.length > 0) {
      //status tag
      let status_tag = '';
      let training_performance = '';
      let validation_performance = '';
      let status = this.state.detail[0].experiment_status;
      if (status == 'PENDING' || status == 'RUNNING') {
        status_tag = (
          <Tag icon={<SyncOutlined spin />} color="processing">
            {status}
          </Tag>);
      }
      else if (status == 'SUCCESS') {
        status_tag = (
          <Tag icon={<CheckCircleOutlined />} color="success">
            {status}
          </Tag>
        );

        training_performance = (
          <div>
            Pearson's Correlation Coefficient (PCC): {this.state.detail[0].train_metric.PEARSON_CORRELATION_COEFFICIENT.toFixed(3)} <br/>
            R^2: {this.state.detail[0].train_metric.R2.toFixed(3)} <br/>
            Mean Squared Error (MSE): {this.state.detail[0].train_metric.MEAN_ABSOLUTE_ERROR.toFixed(3)} <br/>
            Mean Absolute Error (MAE): {this.state.detail[0].train_metric.MEAN_SQUARED_ERROR.toFixed(3)} <br/>
          </div>
        );

        validation_performance = (
          <div>
            Pearson's Correlation Coefficient (PCC): {this.state.detail[0].valid_metric.PEARSON_CORRELATION_COEFFICIENT.toFixed(3)} <br/>
            R^2: {this.state.detail[0].valid_metric.R2.toFixed(3)} <br/>
            Mean Squared Error (MSE): {this.state.detail[0].valid_metric.MEAN_ABSOLUTE_ERROR.toFixed(3)} <br/>
            Mean Absolute Error (MAE): {this.state.detail[0].valid_metric.MEAN_SQUARED_ERROR.toFixed(3)} <br/>
          </div>
        );
      }
      else {
        status_tag = (
          <Tag icon={<CloseCircleOutlined />} color="error">
            {status}
          </Tag>
        );
      }

      let model_hyperparameters_desc = ""
      this.state.detail[0].model_hyperparameters.forEach((element, index) => {
        model_hyperparameters_desc = <span>{model_hyperparameters_desc}{element}<br></br></span>
      })

      detailsDes = (
        <div>
          <Descriptions
            style={{ width: '1000px' }}
            bordered
            column={2}
            layout="vertical"
            bordered
          >
            <Descriptions.Item label="Dataset name">{this.state.detail[0].dataset_name}</Descriptions.Item>
            <Descriptions.Item label="Type of dataset">{this.state.detail[0].dataset_type_name}</Descriptions.Item>
            <Descriptions.Item label="Training parameters">
              Epochs: {this.state.detail[0].experimental_parameters.epochs}
              <br />
              Batch size: {this.state.detail[0].experimental_parameters.batch_size}
              <br />
              Learning rate: {this.state.detail[0].experimental_parameters.learning_rate}
              <br />
              Optimizer: {this.state.detail[0].experimental_parameters.optimizer}
              <br />
              Early stopping patience: {this.state.detail[0].experimental_parameters.early_stopping_patience}
            </Descriptions.Item>
            <Descriptions.Item label="Model hyperparameters">
              {model_hyperparameters_desc}
            </Descriptions.Item>
            <Descriptions.Item label="Performance on training dataset">
              {training_performance}
            </Descriptions.Item>
            <Descriptions.Item label="Performance on validation dataset">
              {validation_performance}
            </Descriptions.Item>
            <Descriptions.Item label="Training status" span={2}>
              {status_tag}
            </Descriptions.Item>
          </Descriptions>
          <br></br>
          <Collapse defaultActiveKey={['1', '2', '3']} >
            <Panel header="Model details" key="1">
              <img src={this.state.detail[0].model_plot_url}
                style={{ width: '50%' }}></img>
            </Panel>
            <Panel header="Learning curve" key="2">
              <HighchartsReact
                highcharts={Highcharts}
                options={chartOfCurveOption}
                callback={this.afterChartOfCurveCreated}
              />
            </Panel>
            <Panel header="Predicted v.s. True (Available when training process is done)" key="3">
              <HighchartsReact
                highcharts={Highcharts}
                options={chartVsOption}
                callback={this.afterChartOfVsCreated}
              />
            </Panel>
          </Collapse>
        </div>
      )
    }
    return (
      <div>
        <Title level={2}>Project details</Title>
        <div style={{ paddingTop: '40px' }}>
          {detailsDes}
          <br></br>
          <div style={{ display: this.state.detail.length > 0 ? 'block' : 'none' }}>
          </div>
        </div>
      </div>

    )
  }
}
