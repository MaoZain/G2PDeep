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
var reload_time = Date.now();

export default class ExperimentSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: props.loading,
            experimentInfo: props.experimentInfo,
            reloadTimer:15,
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

    componentDidMount = () => {
        setInterval(()=>this.timer(),1000)
    }

    timer(){
        // console.log(this.state.reloadTimer)
        if(this.state.reloadTimer > 0 ){
            this.setState({
                reloadTimer:this.state.reloadTimer - 1
            })
        }else{
            this.setState({
                reloadTimer:15
            })
            this.props.fetchExperimentInfo();
        }
    }

    componentWillReceiveProps = (nextProps) => {
        // console.log(nextProps.datasetsInfo)
        this.setState({
            experimentInfo: nextProps.experimentInfo,
            loading: nextProps.loading
        });
    }

    compare = () => {  
        //ajax request after empty completing
        
        if (this.state.selectedRowKeys.length < 2) {
            message.warning("Please select at least two projects.")
        }
        else {
            this.setState({
                selectedRowKeys: [],
                loading: true,
            });
            let anchorElement = document.getElementById("test11");
            if (anchorElement) {
                anchorElement.scrollIntoView()
            }
            this.props.compare(this.state.selectedRowKeys)
            this.props.fn_showCompare()
        }
        // console.log(this.state.selectedRowKeys)
    };

    reloadThrotle = () => {
        let time = Date.now();
        if(time - reload_time >= 5000){
            console.log("reload");
            this.setState({
                reloadTimer:15
            })
            this.props.fetchExperimentInfo();
            reload_time = Date.now();
        }else{
            let warnning = "Please try it " + Math.round(5-(time - reload_time)/1000)+" second later"
            message.warning(warnning)
        }
    }

    onSelectChange = selectedRowKeys => {
        //get the value of status based on the exactly key
        let status = this.state.experimentInfo.filter( function(item){
            return item.experiment_info_id == selectedRowKeys[selectedRowKeys.length -1 ]
            // console.log(selectedRowKeys[selectedRowKeys.length-1])
        } )
        //reassign selectedRowKey
        if (selectedRowKeys.length <= 4 && selectedRowKeys.length>0) {
            console.log('selectedRowKeys changed: ', selectedRowKeys);
            if(status[0].experiment_status == "SUCCESS"){
                this.setState({ selectedRowKeys: selectedRowKeys });
            }else{
                message.warning("Only seccessed Items can be compared with others")
            }
        }else if(selectedRowKeys.length == 0){
            this.setState({ selectedRowKeys: selectedRowKeys });
        }else {
            message.warning('Choose up to 4 !')
        }
        
    };

    showDetails = (index, id) => {
        // console.log(index,id)
        let anchorElement = document.getElementById("test11");
        if (anchorElement) {
            anchorElement.scrollIntoView()
        }
        this.props.showDetails(index, id);
        const element  = document.getElementById('test').offsetHeight
        this.props.fn_showDetail()
    }

    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const data_table = []
        // console.log(this.state.experimentInfo)
        // let test = [];
        // test.forEach((e,v) => {
        //     console.log("OK")
        // })
        // console.log(Array.isArray(this.state.experimentInfo))
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
                        <li>Status of project are list below. Hovering the mouse over the status to check details.
                            <ul>
                                <li><Tag icon={<ClockCircleOutlined />} color="default"> PENDING</Tag>: Loading the dataset.</li>
                                <li><Tag icon={<ClockCircleOutlined />} color="processing">RUNNING</Tag>: Training the model.</li>
                                <li><Tag icon={<CheckCircleOutlined />} color="success">SUCCESS</Tag>: Project is done.</li>
                                <li><Tag icon={<CloseCircleOutlined />} color="error">FAILURE</Tag>: Fail to create project. </li>
                            </ul>
                        </li>
                    </ul>

                </div>
                <Divider />
                <div id='experiment_summary_content' style={{ width: '850px' }}>
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary" onClick={this.compare} loading={loading}>
                           
                            Compare (up to 4)
                        </Button>
                        <Button type="primary" onClick={this.reloadThrotle} style={{ background:'1890ff', marginLeft:'10px' }}>
                            Project status auto refresh in {this.state.reloadTimer} seconds
                        </Button>
                        <span style={{ marginLeft: 8 }}>
                            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                        </span>
                    </div>
                    <Table rowSelection={rowSelection} columns={this.tableColumns} dataSource={data_table} bordered />
                </div>
                <div id="test" ></div>
            </div>

        )
    }
}
