import React, {useState} from 'react';
import axios from "axios";
import CreateUser from '../create/createUser';


class viewUser extends React.Component {


  constructor(props){
    super(props);
    this.state ={
      users:[],
      id:0,
      email:'',
      message:'',
      password:''
    }

  }
  componentDidMount(){

    axios.get("http://localhost:8080/api/")
    .then((res)=>{
      this.setState({
        users:res.data,
        id:0,
        email:'',
        message:'',
        password:''
      })
      
    })
  }
  submit(event,id){
    event.preventDefault();
    if(id === 0){
                      
      axios.post("http://localhost:8080/api/",{
        email:this.state.email,
        password:this.state.password
      })
      .then((res)=>{
        this.componentDidMount();
      })
    }else{
      axios.put("http://localhost:8080/api/",{
        id:this.state.id,
        email:this.state.email,
        message:this.state.message,
        password:this.state.password
      }).then(()=>{
        this.componentDidMount();
      })

    }

  }
  delete(id){
    axios.delete(`http://localhost:8080/api/${id}`)
    .then(()=>{
      this.componentDidMount();
    })
  }

  render(){
    

  return (
    <div className="col s6">
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Message</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {/* FIXA MEDDELANDE-FÄLT MED. typ say something: Hellooo, i want to save dolphines */}
          {this.state.users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.message}</td>
              <td>
                <button
                  className="deleteBtn"
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                  onClick={(e) => {
                    if (
                      window.confirm(
                        "Are you sure about this? Think about the dolphines"
                      )
                    )
                      this.delete(user.id);
                  }}
                >
                  <i className="material-icons">delete</i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container">

      </div>
    </div>
  );
  }
}

export default viewUser;
