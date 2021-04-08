import React, { Component } from 'react'
import { Table, Tag, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { Progress } from 'antd';
import { Tooltip } from 'antd';
import {
    ClockCircleOutlined,
    CheckCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import { Divider } from 'antd';

const { Title } = Typography;

export default class ExperimentSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: props.loading,
            experimentInfo: props.experimentInfo,
        }
        this.tableColumns = [
            {
                title: 'Project name',
                dataIndex: 'name',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                render: (_, data) => {
                    // console.log(data);
                    let status = data.status;
                    let task_percentage = data.task_percentage;
                    let task_log = "";

                    if (data.task_log !== '') {
                        let idx = 1;
                        data.task_log.forEach((element, _) => {
                            task_log = <span>{task_log}Step {idx}: {element}<br></br></span>;
                            idx += 1;
                        })
                    }

                    let tag_str = '';
                    if (status == 'PENDING') {
                        tag_str = (
                            <Tag icon={<ClockCircleOutlined spin />} color="default">
                                {status}
                            </Tag>);
                    }
                    else if (status == 'RUNNING') {
                        tag_str = (
                            <Tooltip title={task_log} color='blue'>
                                <Tag icon={<ClockCircleOutlined spin />} color="processing">
                                    {status}
                                </Tag>
                                <Progress percent={task_percentage}  status="active" />
                            </Tooltip>
                        );
                    }
                    else if (status == 'SUCCESS') {
                        tag_str = (
                            <Tooltip title={task_log} color='green'>
                                <Tag icon={<CheckCircleOutlined />} color="success">
                                    {status}
                                </Tag>
                            </Tooltip >
                        );
                    }
                    else {
                        tag_str = (
                            <Tooltip title={task_log} color='red'>
                                <Tag icon={<CloseCircleOutlined />} color="error">
                                    {status}
                                </Tag>
                            </Tooltip >
                        );
                    }

                    return tag_str;
                },
            },
            {
                title: 'Estimated training time (hours)',
                dataIndex: 'estimated_training_time',
            },
            {
                title: 'Created date',
                dataIndex: 'createdDate',
            },

            {
                title: 'Description',
                dataIndex: 'description',
            },

        ]
    }

    // componentDidMount = () => {
    //     this.props.history.push("/datasets/summary")
    // }

    componentWillReceiveProps = (nextProps) => {
        // console.log(nextProps.datasetsInfo)
        this.setState({
            experimentInfo: nextProps.experimentInfo,
            loading: nextProps.loading
        });
    }

    compare = () => {
        //ajax request after empty completing
        this.setState({
            selectedRowKeys: [],
            loading: true,
        });
        this.props.compare(this.state.selectedRowKeys)
        // console.log(this.state.selectedRowKeys)
    };

    onSelectChange = selectedRowKeys => {
        if (selectedRowKeys.length <= 4) {
            console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.setState({ selectedRowKeys: selectedRowKeys });
        } else {
            message.warning('Choose up to 4 !')
        }
    };

    showDetails = (index, id) => {
        // console.log(index,id)
        this.props.showDetails(index, id);
    }

    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const data_table = []
        console.log(this.state.experimentInfo)
        // let test = [];
        // test.forEach((e,v) => {
        //     console.log("OK")
        // })
        console.log(Array.isArray(this.state.experimentInfo))
        this.state.experimentInfo.forEach((element, index) => {
            // created time
            let num_milliseconds = Date.parse(element.created_at);
            const date = new Date(num_milliseconds)
            const created_time = date.toLocaleString('en-US',);

            // success ruuning 
            if (element.experiment_status === 'SUCCESS' || element.experiment_status === 'RUNNING') {
                data_table.push(
                    {
                        name: <Tooltip title="Click to show details"><a onClick={() => { this.showDetails(index, element.experiment_info_id) }}><Link to="/experiment/detail">{element.experiment_name}</Link></a></Tooltip>,
                        description: element.description,
                        createdDate: created_time,
                        updatedDate: element.updated_at,
                        status: element.experiment_status,
                        task_percentage: element.task_percentage.toFixed(1),
                        task_log: element.task_log,
                        estimated_training_time: element.estimated_training_time,
                        key: element.experiment_info_id,
                    }
                )
            } else {
                data_table.push(
                    {
                        name: element.experiment_name,
                        description: element.description,
                        createdDate: created_time,
                        updatedDate: element.updated_at,
                        status: element.experiment_status,
                        task_percentage: element.task_percentage.toFixed(1),
                        task_log: element.task_log,
                        estimated_training_time: element.estimated_training_time,
                        key: element.experiment_info_id,
                    }
                )
            }
        })

        return (
            <div>
                <Title level={2}>Summary of projects</Title>
                <div>
                    <p>Instructions:</p>
                    <ul>
                        <li>Click project name to see detail of project.</li>
                        <li>Choose projects to compare performance.</li>
                    </ul>

                </div>
                <Divider />
                <div id='experiment_summary_content' style={{ width: '850px' }}>
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary" onClick={this.compare} loading={loading}>
                            Compare (up to 4)
                        </Button>
                        <span style={{ marginLeft: 8 }}>
                            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                        </span>
                    </div>
                    <Table rowSelection={rowSelection} columns={this.tableColumns} dataSource={data_table} bordered />
                </div>
            </div>

        )
    }
}
