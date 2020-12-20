import React, { Component } from 'react'
import Style from './result.module.css'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Collapse } from 'antd';

const { Panel } = Collapse;

export default class Result extends Component {
    constructor(props){
        super(props);
        this.state = {
            result:props.result
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            result:nextProps.result,
        })
    }

    render() {
        console.log(this.state.result)
        let options={}
        if(this.state.result !== undefined){
            let tableData = this.state.result.predicted_values;
            let categories =[];
            tableData.forEach((element, index) => {
                let temp = "Sample"+(index+1);
                categories.push(temp)
            });
            options = {
                chart: {
                    width:800,
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
                }, ]
            }
        }
        let res = (
            <div></div>
        )
        if(this.state.result !== undefined){
            res=(
                <div style={{clear:'both',paddingTop:'30px', width:'900px'}}>
                  
                        <label className={Style.title}>Result</label>
                        <Collapse defaultActiveKey={['1','2']} >
                        <Panel header="Predicted values for given input" key="1">
                        <HighchartsReact 
                            highcharts={Highcharts}
                            options={options}
                            />
                        </Panel>
                        <Panel header="Saliency Map" key="2">
                        <img src={this.state.result.saliency_map_url} style={{width:'800px'}}></img>
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
