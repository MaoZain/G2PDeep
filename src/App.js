import './App.css';
import Style from "./App.module.css";
import React from 'react';
import {Route} from 'react-router-dom';
import Navigator from './components/Navigator/Navigator';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'
import Introduction from './containers/Introduction/Introduction';
import UserManual from './containers/UserManual/UserManual';
import Prediction from './containers/Prediction/Prediction';
import Datasets from './containers/Datasets/Datasets';
import Expriments from './containers/Expriments/Expriments';

import { Layout } from 'antd';
const { Content } = Layout;

class App extends React.PureComponent {

  setUserId = () => {
    let randomId = Number(Math.random().toString().substr(2)).toString(36);
    let time = new Date().toISOString();
    let userId = time + randomId;
    //console.log("current userid is"+userId);
   	localStorage.setItem('G2PDeep', userId);
    //  localStorage.setItem('G2PDeep', "debug");
     console.log(localStorage)
    //console.log('userId in setUserId is ',this.state.userId)
  }

  componentDidMount = () => {
    if(!localStorage.getItem('G2PDeep')){
      this.setUserId();
    }else{
      console.log(localStorage.getItem('G2PDeep')); 
    }
    // this.setUserId();
  }

  render(){
    console.log(!localStorage.getItem('G2PDeep'))
    return (
      <Layout className={Style.container}>
        <Header></Header>
        <Layout className={Style.main}>
          <div className={Style.submenu}>
            <Navigator></Navigator>
          </div>
          <Layout>
            <Content className={Style.content}>
              <div>
                  <Route exact path="/" component={Introduction}/>
                  <Route path="/introduction" component={Introduction}/>
                  <Route path="/prediction" component={Prediction}/>
                  <Route path="/datasets/:menu" component={Datasets}/>
                  <Route path="/experiment/:menu" component={Expriments}/>
                  <Route path="/user_manual" component={UserManual}/>
              </div>
            </Content>
          </Layout>
          
        </Layout>
     
          <Footer></Footer>

      </Layout>
    );
  }
}

export default App;
