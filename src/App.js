import './App.css';
import Style from "./App.module.css";
import React from 'react';
import {Route} from 'react-router-dom';
import Navigator from './components/Navigator/Navigator';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'
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
    //console.log('userId in setUserId is ',this.state.userId)
  }

  componentDidMount = () => {
    if(!localStorage.getItem('G2PDeep')){
      this.setUserId();
    }
  }

  render(){
    // console.log(this.props.match)
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
                  <Route exact path="/" component={Prediction}/>
                  <Route path="/prediction" component={Prediction}/>
                  <Route path="/datasets/:menu" component={Datasets}/>
                  <Route path="/experiment/:menu" component={Expriments}/>
              </div>
            </Content>
          </Layout>
          
        </Layout>
        <div >
          <Footer></Footer>
        </div>
      </Layout>
    );
  }
}

export default App;
