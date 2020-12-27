import React, { Component } from 'react';
import { Descriptions, InputNumber, Button, Empty, message } from 'antd';
import Style from './datasetDetails.module.css'
import { Typography } from 'antd';
const { Title } = Typography;

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showIndex: props.showIndex,
            showDetails_id: props.showDetails_id,
            datasetsInfo: props.datasetsInfo,
            persent_train: null,
        }
    }

    onChangeTrain = (value) => {
        //debounce
        // console.log(typeof value)
        if (value != null && value !== "") {
            if (this.time) {
                clearTimeout(this.time)
                this.time = 0
            }
            this.time = setTimeout(() => {
                if (typeof value == "number" && value <= 1 && value >= 0) {
                    this.setState({
                        persent_train: Number(value),
                    })
                } else {
                    message.warning("Please input invalid number")
                }
            }, 1000);
        }

    }

    update = () => {
        console.log(this.state.persent_train)
        let percent_valid = (1000 - 1000 * this.state.persent_train) / 1000;
        this.props.updateDetail(this.state.showDetails_id, this.state.persent_train, percent_valid)
    }

    componentWillReceiveProps = (nextProps) => {
        // console.log(nextProps.datasetsInfo)
        if (nextProps.datasetsInfo.length > 0) {
            this.setState({
                datasetsInfo: nextProps.datasetsInfo,
                showIndex: nextProps.showIndex,
                showDetails_id: nextProps.showDetails_id,
                persent_train: nextProps.datasetsInfo[nextProps.showIndex].ratio_training_dataset,
            })
        } else {
            this.setState({
                datasetsInfo: nextProps.datasetsInfo,
            })
        }

    }

    render() {
        // console.log(this.state.datasetsInfo)
        var detailsDes = (
            <div id='empty' style={{ paddingTop: '50px' }}>
                <Empty />
            </div>
        )
        if (this.state.datasetsInfo.length > 0) {
            let showIndex = this.state.showIndex;
            let percent_valid = (1000 - 1000 * this.state.persent_train) / 1000;

            // Created time
            let num_milliseconds = Date.parse(this.state.datasetsInfo[showIndex].created_at);
            let date = new Date(num_milliseconds)
            let created_time = date.toLocaleString('en-US',);
            // console.log(this.state.persent_train)
            detailsDes = (
                <div>
                    <Descriptions
                        style={{ width: '850px' }}
                        bordered
                        column={2}
                    >
                        <Descriptions.Item label="Dataset Name" span={2}>
                            {this.state.datasetsInfo[showIndex].dataset_name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Data Type">
                            SNPs
                        </Descriptions.Item>
                        <Descriptions.Item label="Created time" style={{ width: '250px' }}>
                            {created_time}
                        </Descriptions.Item>
                        <Descriptions.Item label="Number of samples">
                            {this.state.datasetsInfo[showIndex].num_samples}
                        </Descriptions.Item>
                        <Descriptions.Item label="Number of Features">
                            {this.state.datasetsInfo[showIndex].num_features}
                        </Descriptions.Item>
                        <Descriptions.Item label="Number of training dataset">
                            {Math.round(this.state.datasetsInfo[showIndex].num_samples * this.state.persent_train)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Percentage of training dataset">
                            <InputNumber onChange={this.onChangeTrain}
                                className={Style.editInput}
                                min={0} max={1} step={0.01} precision={2}
                                defaultValue={this.state.persent_train} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Number of validation">
                            {Math.round(this.state.datasetsInfo[showIndex].num_samples * percent_valid)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Percentage of validation">
                            {percent_valid}
                        </Descriptions.Item>
                        <Descriptions.Item label="Description" span={2}>
                            {this.state.datasetsInfo[showIndex].description}
                        </Descriptions.Item>
                    </Descriptions>
                    <div style={{ paddingTop: '40px' }}>
                        <Button type="primary" size={'large'} onClick={this.update}>Update</Button>
                    </div>
                </div>
            )
        }
        return (
            <div id='details'>
                <Title level={2}>Dataset details</Title>
                <div style={{ paddingTop: '40px' }}>
                    {detailsDes}
                </div>

            </div>
        )
    }
}
