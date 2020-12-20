import React, { Component } from 'react'
import { Table, Button, message } from 'antd';
import { Link } from 'react-router-dom';

export default class ExperimentSummary extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            experimentInfo:props.experimentInfo,
        }
        this.tableColumns = [
            {
                title: 'Name',
                dataIndex: 'name',
            },
            {
                title: 'Description',
                dataIndex: 'description',
            },
            {
                title: 'Created Date',
                dataIndex: 'createdDate',
            },
            {
                title: 'Updated Date',
                dataIndex: 'updatedDate',
            },
            {
                title:'Status',
                dataIndex:'status',
            }
        ]
    }

    // componentDidMount = () => {
    //     this.props.history.push("/datasets/summary")
    // }

    componentWillReceiveProps = (nextProps) => {
      // console.log(nextProps.datasetsInfo)
      this.setState({
        experimentInfo:nextProps.experimentInfo,
      });
    }

    compare = () => {
        this.setState({ loading: true });
        //ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
          });
        }, 3000);
        
        this.props.compare(this.state.selectedRowKeys)
        // console.log(this.state.selectedRowKeys)
      };
    
    onSelectChange = selectedRowKeys => {
        if(selectedRowKeys.length<=4){
            console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys:selectedRowKeys });
        }else{
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
        this.state.experimentInfo.forEach((element,index) => {
            // success ruuning 
            if(element.experiment_status === 'SUCCESS' ){
                data_table.push(
                    {
                      name: <a onClick = {() => {this.showDetails(index, element.experiment_info_id)}}><Link to="/experiment/detail">{element.experiment_name}</Link></a>,
                      description:element.description,
                      createdDate:element.created_at,
                      updatedDate:element.updated_at,
                      status:element.experiment_status,
                      key:element.experiment_info_id,
                    }
                  )
            }else{
                // failed
                console.log("Failed")
            }
        })
        return (
            <div id = 'experiment_summary_content' style = {{width:'850px'}}>
                <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={this.compare} disabled={!hasSelected} loading={loading}>
                    Compare
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
                </div>
                <Table rowSelection={rowSelection} columns={this.tableColumns} dataSource={data_table} bordered />
            </div>
        )
    }
}
