import React, { Component } from 'react'
import { Table, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
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
                title: 'Name',
                dataIndex: 'name',
            },
            {
                title: 'Status',
                dataIndex: 'status',
            },
            {
                title: 'Created Date',
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
        this.state.experimentInfo.forEach((element, index) => {
            // created time
            let num_milliseconds = Date.parse(element.created_at);
            const date = new Date(num_milliseconds)
            const created_time = date.toLocaleString('en-US',);

            // success ruuning 
            if (element.experiment_status === 'SUCCESS' || element.experiment_status === 'RUNNING' || element.experiment_status === 'PENDING') {
                data_table.push(
                    {
                        name: <a onClick={() => { this.showDetails(index, element.experiment_info_id) }}><Link to="/experiment/detail">{element.experiment_name}</Link></a>,
                        description: element.description,
                        createdDate: created_time,
                        updatedDate: element.updated_at,
                        status: element.experiment_status,
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
                        key: element.experiment_info_id,
                    }
                )
            }
        })
        return (
            <div>
                <Title level={2}>Summary of experiments</Title>
                <div id='experiment_summary_content' style={{ width: '850px', paddingTop:'40px' }}>
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary" onClick={this.compare} loading={loading}>
                            Compare
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
