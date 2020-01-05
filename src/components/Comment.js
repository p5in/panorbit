import React,{Component} from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

class Comment extends Component {
  constructor(props) {
  super(props);
  this.state={
    posts:[],
    newVal:'',
    newCmt:[],
    postId:'',
    filteredCmt:[]
  }
  }
componentDidMount(){
  let  id1  = this.props.match.params.id;

    const listuserPic=window.localStorage.getItem('listuser');
      this.setState({
        pic:listuserPic,
      })

  fetch('https://panorbit.in/api/comments.json').then(response=>response.json()).then(res=>{


    this.setState({
      posts:res.comments,
      postId:id1
    })
  }).catch(err=>{
    console.log(err);
  })


}

changeData = (e) => {
  this.setState({
    newVal:e.target.value,
  })
}
submitData = (e) =>{
  e.preventDefault();
  this.setState({
    newCmt:[...this.state.newCmt,this.state.newVal]
  })

}

render(){
  return(
    <div className="cmtClass">

<nav className="navbar navbar-light bg-light main-cmt">
  <a className="navbar-brand" href="/">
    <img src='../img/hamburger.png' />
    <img src='../img/logo.jpg' style={{paddingLeft:'5px'}} />
  </a>
</nav>

      <Link to="/" className='back-to-home'>
       <img src="../img/back.png" /><span>Comments</span>
     </Link>
     <br />
        {
          this.state.posts.map(data=>{
            return this.state.postId == data.id ?
            <div className="media border p-3" key={data.id}>
              <img src={data.profilePicture} className="mr-3 mt-3 rounded-circle" style={{width:'60px',height:'60px'}} />
              <p className=""><strong>Lorem Epsum</strong>{data.body}</p>
            </div>
            : null

          })
        }
        {this.state.newCmt != 0 ?
             this.state.newCmt.map((cmt,i)=>
          <div className="media border p-3" key={i} >
            <img src={this.state.pic} className="mr-3 mt-3 rounded-circle" style={{width:'60px',height:'60px'}} />
            <p className="">{cmt}</p>
          </div>
          )




        :null}



<div className="fixed-bottom">
  <form onSubmit={this.submitData}>
  <div className="form-group">
    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Write comment here'  onChange={this.changeData}></textarea>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

</div>

  </div>)
}

}

export default Comment;
