import React, { Component } from 'react';
import Style from "./navigator.module.css";
import { Layout, Menu } from 'antd';
import { BulbOutlined, LaptopOutlined, FundOutlined, CloudOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
const { SubMenu } = Menu;
const { Sider } = Layout;

const selectedStyle = {
    display:'inline-block',
    color:'rgb(24, 144, 255)',
    backgroundColor:'rgb(24 144 255 / 19%)',
    width:'252px',
    borderRight:'3px rgb(24, 144, 255) solid'
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
                <Menu.Item key="introduction" icon={<BulbOutlined />}><NavLink to="/introduction" activeStyle = {selectedStyle}>Introduction</NavLink></Menu.Item>
                <SubMenu key="datasets" icon={<CloudOutlined />} title="Datesets">
                    <Menu.Item key="summary">
                        <NavLink to="/datasets/summary" activeStyle = {selectedStyle} >Summary</NavLink>
                    </Menu.Item>  
                    <Menu.Item key="details"><NavLink to="/datasets/details" activeStyle = {selectedStyle}>Details</NavLink></Menu.Item>
                    <Menu.Item key="createDataset"><NavLink to="/datasets/createDataset" activeStyle = {selectedStyle}>Create</NavLink></Menu.Item>
                </SubMenu>
                <SubMenu key="experiment" icon={<FundOutlined />} title="Projects">
                    <Menu.Item key="experimentsSummary"><NavLink to="/experiment/summary" activeStyle = {selectedStyle}>Summary</NavLink></Menu.Item>
                    {/* <Menu.Item key="experimentsDetail"><NavLink to="/experiment/detail" activeStyle = {selectedStyle}>Details</NavLink></Menu.Item>
                    <Menu.Item key="compareExperiment"><NavLink to="/experiment/compare" activeStyle = {selectedStyle}>Compare</NavLink></Menu.Item> */}
                    <Menu.Item key="createExperiment"><NavLink to="/experiment/create" activeStyle = {selectedStyle}>Create</NavLink></Menu.Item>
                </SubMenu>
                <Menu.Item key="prediction" icon={<LaptopOutlined />}><NavLink to="/prediction" activeStyle = {selectedStyle}>Predition & discovery</NavLink></Menu.Item>
                <Menu.Item key="user_manual" icon={<QuestionCircleOutlined />}><NavLink to="/user_manual" activeStyle = {selectedStyle}>User Guide</NavLink></Menu.Item>
                </Menu>
            </Sider>
        )
    }
}
