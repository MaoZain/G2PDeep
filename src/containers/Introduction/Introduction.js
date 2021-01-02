import React, { Component } from 'react'
import IntroductionToG2PDeep from '../../components/IntroductionToG2PDeep/IntroductionToG2PDeep';


export default class Introduction extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return(
    <div id='introduction'>
      <IntroductionToG2PDeep/>
    </div>)
  }

}