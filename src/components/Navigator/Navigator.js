import React, { Component } from 'react';
import Style from "./navigator.module.css";
import { Layout, Menu } from 'antd';
import { LaptopOutlined, FundOutlined, CloudOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
const { SubMenu } = Menu;
const { Sider } = Layout;

const selectedStyle = {
    color:'rgb(24, 144, 255)',
}

export default class Navigator extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentMenu:''
        }
    }
    handleClick = e => {
        this.setState({
            currentMenu:e.key,
        })
    };
    render() {
        let current
        // console.log(this.match)
        if (this.props.match !== undefined ) {
            current = this.props.match.params.menu;
        }else{
            current = 'prediction'
        }
        return (
            <Sider width={300}>
                <Menu
                onClick={this.handleClick}
                mode="inline"
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['prediction']}
                className={Style.menu}
                selectedKeys = {['onther']}
                >
                <Menu.Item key="prediction" icon={<LaptopOutlined />}><NavLink to="/prediction" activeStyle = {selectedStyle}>Predition</NavLink></Menu.Item>
                <SubMenu key="datasets" icon={<CloudOutlined />} title="DateSets">
                    <Menu.Item key="summary"><NavLink to="/datasets/summary" activeStyle = {selectedStyle} >Summary</NavLink></Menu.Item>
                    <Menu.Item key="details"><NavLink to="/datasets/details" activeStyle = {selectedStyle}>Details</NavLink></Menu.Item>
                    <Menu.Item key="createDataset"><NavLink to="/datasets/createDataset" activeStyle = {selectedStyle}>Create DateSets</NavLink></Menu.Item>
                </SubMenu>
                <SubMenu key="experiment" icon={<FundOutlined />} title="Experiments">
                    <Menu.Item key="experimentsSummary"><NavLink to="/experiment/summary" activeStyle = {selectedStyle}>Summary</NavLink></Menu.Item>
                    <Menu.Item key="createExperiment"><NavLink to="/experiment/create" activeStyle = {selectedStyle}>Create</NavLink></Menu.Item>
                    <Menu.Item key="experimentsDetail"><NavLink to="/experiment/detail" activeStyle = {selectedStyle}>Details</NavLink></Menu.Item>
                    <Menu.Item key="compareExperiment"><NavLink to="/experiment/compare" activeStyle = {selectedStyle}>Compare</NavLink></Menu.Item>

                </SubMenu>
                </Menu>
            </Sider>
        )
    }
}
