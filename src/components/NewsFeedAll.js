import React,{Component} from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

class NewsFeedAll extends Component {

  constructor(props){
    super(props);
    this.state={
      data1:[],
    }
  }

  componentDidMount(){

  fetch('https://panorbit.in/api/posts.json').then(response=>response.json()).then(prev=>{
    this.setState({
      data1:prev.posts
    })
  }).catch(err=>{
    console.log(err);
  });
  }

  render(){
    const {userList,userId,userPic,userName,user} = this.props;
    return (
      <div>
       {
         this.state.data1.map(data=> ( <div className="card mb-2" key={data.id}>
             <div className="card-body">

             <div className="user-posted">
                 <span className='other-cmt'>
                   {
                     userList.map(user=>(
                        user.id == data.userId ?
                        <div key={user.id}>
                        <img className="profile-img1" src={user.profilepicture} alt="not available" />
                        <span className="">{user.name}</span>
                        </div>

                        : null

                      ))}
                 </span>
              </div>

             <h5 className="card-title text-justify text-capitalize">{data.title}</h5>
               <p className="card-text"><small className="text-muted">updated {data.time}</small></p>
             </div>
             <img className="card-img-bottom" src={data.image} alt="Card image cap"/>
               <div className="card-footer text-muted">
                <span className='other-cmt'><img className='mr-3' src="img/like.png" alt="" />
                        <Link to={`/comment/${data.id}`} ><img src="img/comment.png" className="m-2" alt="" />comment
                </Link>
              </span>
                <span className='other-cmt1'>
                      <span className="">
                      <Link to={`/comment/${data.id}`} >
                      add a comment</Link>
                      </span>
                    <img className="profile-img1" src={user} alt="Generic placeholder image" />
                </span>
              </div>
           </div>



     ))}
  </div>
    )
  }
}
export default NewsFeedAll;
