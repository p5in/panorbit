import React,{Component} from 'react';
import './App.css';
import NewsFeed from './components/NewsFeed';
import NewsFeedAll from './components/NewsFeedAll';
import Comment from './components/Comment';
import Users from './components/Users';
// react router dom
import {
  BrowserRouter as Router,
  Switch,
  useParams,
  Route,
  Link
} from "react-router-dom";


class App extends Component {

  constructor(props){
    super(props);
    this.state={
      userList:[],
      initialVal:false,
      user:'',
      userId:'0',
      userName:'',
      userPic:'',
      pic:'https://panorbit.in/wp-content/uploads/2019/hotlink-ok/1001.jpeg',
      posted:'https://panorbit.in/wp-content/uploads/2019/hotlink-ok/1005.jpeg'
    }
  }


  componentDidMount(){
    fetch('https://panorbit.in/api/users.json').then(res=>res.json()).then(data1=>{
      this.setState({
        userList:data1.users,

      })
    }).catch(err=>{
      console.log(err);
    });

       localStorage.setItem('listuser', this.state.pic);


  }

clicked=(s)=>{

  this.setState({
    pic:this.state.userList[s-1].profilepicture,
    userId:this.state.userList[s-1].id,
    userName:this.state.userList[s-1].name,
    userPic:this.state.userList[s-1].profilepicture,
    initialVal:!this.state.initialVal
  })


     localStorage.setItem('listuser', this.state.userList[s-1].profilepicture);

}

  render(){
  return (
    <Router>
    <div className="container-fluid App">

      <nav className="navbar navbar-dark bg-light">
        <a className="navbar-brand" href="/">
          <img src='img/hamburger.png' />
          <img src='img/logo.jpg' style={{paddingLeft:'5px'}} />
        </a>

        <a className="navbar-toggler" data-toggle="collapse" data-target="#navbarsExample01" aria-controls="navbarsExample01" aria-expanded="false" aria-label="Toggle navigation">
          <img src={this.state.pic} />

        </a>

        <div className="collapse navbar-collapse" id="navbarsExample01">
          <ul className="navbar-nav mr-auto list-group">

            {this.state.userList.map(user=>(
            <li className="nav-item list-group-item list-group-item-action list-group-item-light" key={user.id} value={user.id}>
                <a className="nav-link" href="#" onClick={()=>this.clicked(user.id)} >{user.name} <span className="sr-only">(current)</span></a>
              </li>

            ))}

          </ul>
        </div>
      </nav>


        <Switch>
          <Route path="/comment/:id" component={Comment} />
          <Route path="/" >
            { this.state.userId != 0 ?
            <NewsFeed user={this.state.pic}  posted={this.state.posted} userList={this.state.userList} userId={this.state.userId} userName={this.state.userName} userPic={this.state.userPic} initialVal={this.state.initialVal} />
            :
            <NewsFeedAll user={this.state.pic}  posted={this.state.posted} userList={this.state.userList} userId={this.state.userId} userName={this.state.userName} userPic={this.state.userPic} initialVal={this.state.initialVal} />
             }
          </Route>
        </Switch>
    </div>
     </Router>
  );
}
}
export default App;
