import React, { Component } from 'react'
import UserManual from '../../components/UserManual/UserManual';

export default class Introduction extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return(
    <div id='user_manual'>
      <UserManual/>
    </div>)
  }

}