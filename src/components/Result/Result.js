import React, { Component } from 'react'
import Style from './result.module.css'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import exporting from "highcharts/modules/exporting.js";
import exporting_data from "highcharts/modules/export-data.js";
import { Collapse } from 'antd';

const { Panel } = Collapse;

exporting(Highcharts);
exporting_data(Highcharts);

export default class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: props.result
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            result: nextProps.result,
        })
    }

    render() {
        console.log(this.state.result)
        let options = {}
        let saliency_map_scatter_plot = {}
        if (this.state.result !== undefined) {
            let tableData = this.state.result.predicted_values;
            let categories = [];
            tableData.forEach((element, index) => {
                let temp = "Sample" + (index + 1);
                categories.push(temp)
            });
            options = {
                chart: {
                    width: 800,
                    type: 'bar'
                },
                title: {
                    text: 'Predicted values for given input'
                },
                subtitle: {
                    text: ''
                },
                yAxis: {
                    min: -4,
                    title: {
                        text: '',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                xAxis: {
                    categories: categories,
                    title: {
                        text: null
                    },
                    labels: {
                        step: 1
                    }
                },
                series: [{
                    name: 'Predicted values',
                    data: tableData
                },],
                exporting: {
                    csv: {
                        itemDelimiter: ','
                    }
                }
            };

            saliency_map_scatter_plot = {
                chart: {
                    width: 800,
                    type: 'scatter',
                    zoomType: 'xy'
                },
                title: {
                    text: 'Saliency Result - Significant SNPs.'
                },
                xAxis: {
                    title: {
                        enabled: true,
                        text: 'SNP index'
                    },
                    min: 0,
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true
                },
                yAxis: {
                    title: {
                        text: 'Saliency value'
                    }
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
                    }
                },
                tooltip: {
                    formatter: function () {
                        return '<b>SNP Index ' + this.point.x + ', value ' + this.point.y.toFixed(3) + '</b>';
                    }
                },
                series: [{
                    name: 'Input data',
                    color: 'rgba(223, 83, 83, .5)',
                    data: this.state.result.saliency_top_values,
                }],
                exporting: {
                    csv: {
                        itemDelimiter: ','
                    }
                }
            }
        }
        let res = (
            <div></div>
        )
        if (this.state.result !== undefined) {
            res = (
                <div style={{ clear: 'both', paddingTop: '30px', width: '900px' }}>

                    <label className={Style.title}>Results</label>
                    <Collapse defaultActiveKey={['1', '2']} >
                        <Panel header="Predicted values for given input" key="1">
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options}
                            />
                        </Panel>
                        <Panel header="Saliency Map" key="2">
                            {/* <img src={this.state.result.saliency_map_url} style={{width:'800px'}}></img> */}
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={saliency_map_scatter_plot}
                            />
                            <p style={{ textAlign: "center" }}>The Saliency map measures individual marker effects and their associations with quantitative GWAS trait. The saliency values can be treated as a measurement of SNP contribution (1 represnting SNP has high effect, 0 representing SNP has low effect).</p>
                        </Panel>
                    </Collapse>


                </div>
            )
        }
        return (
            <div className={Style.mian}>
                {res}
            </div>
        )
    }
}
