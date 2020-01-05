import React,{Component} from 'react';

class Users extends Component {

constructor(props){
  super(props);
  this.state={
   name:[],
  }
 }

componentDidMount(){
  fetch('https://panorbit.in/api/users.json').then(res=>res.json()).then(data1=>{
  }).catch(err=>{
    console.log(err);
  });
}

  render(){
    return(<h1>This is User Component</h1>)
  }
}

export default Users;
