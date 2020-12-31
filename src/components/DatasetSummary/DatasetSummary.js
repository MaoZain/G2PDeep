import React, { Component } from 'react'
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
const { Title } = Typography;

export default class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchedColumn: '',
      datasetsInfo: props.datasetsInfo,
    };
    this.columns_table = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '10%',
      },
      {
        title: 'Datasets\' Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        ...this.getColumnSearchProps('names'),
      },
      {
        title: 'Number of samples',
        dataIndex: 'NumberOfSamples',
        key: 'NumberOfSamples',
        width: '30%',
      },
      {
        title: 'Create Date',
        dataIndex: 'date',
        key: 'date',
        width: '30%',
      },
    ];
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        text
        // <Highlighter
        //   highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //   searchWords={[this.state.searchText]}
        //   autoEscape
        //   textToHighlight={text ? text.toString() : ''}
        // />
      ) : (
          text
        ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    console.log(dataIndex)
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  componentWillReceiveProps = (nextProps) => {
    // console.log(nextProps.datasetsInfo)
    this.setState({
      datasetsInfo: nextProps.datasetsInfo,
    });
  }

  showDetails = (index, datasetId) => {
    // console.log(this.state.datasetsInfo[index])
    this.props.showDetails(index, datasetId);
  }

  render() {
    const data_table = []
    this.state.datasetsInfo.forEach((element, index) => {
      let num_milliseconds = Date.parse(element.created_at);
      let date = new Date(num_milliseconds)
      let report_time = date.toLocaleString('en-US',);
      data_table.push(
        {
          id: index + 1,
          key: element.dataset_info_id,
          name: <a onClick={() => { this.showDetails(index, element.dataset_info_id) }}><Link to="/datasets/details">{element.dataset_name}</Link></a>,
          NumberOfSamples: element.num_samples,
          date: report_time,
          names:element.dataset_name,
        }
      )
    })

    return (
      <div>
        <Title level={2}>Summary of datasets</Title>
        <div id='dataTable' style={{ width: '850px', paddingTop:'40px' }}>
          <Table
            columns={this.columns_table} dataSource={data_table}
            bordered />
        </div>
      </div>
    )
  }
}
