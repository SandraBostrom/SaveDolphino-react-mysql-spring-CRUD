import React, {Component} from 'react';
import axios from "axios";
import { Tabs } from "antd";
import { Layout, notification } from "antd";

import CreateUser from './create/createUser';
import ViewUsers from "./view/viewUsers";
import UpdateUser from "./update/updateUser";

import "./style.css";

const TabPane = Tabs.TabPane;
const { Content } = Layout;


class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      users:[],
      id:0,
      name:'',
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
        name:'',
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
        name:this.state.name,
        email:this.state.email,
        message:this.state.message,
        password:this.state.password
      })
      .then((res)=>{
        this.componentDidMount();
      })
    }else{
      axios.put("http://localhost:8080/api/",{
        id:this.state.id,
        name:this.state.name,
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
  edit(id){
    axios.get(`http://localhost:8080/api/${id}`)
    .then((res)=>{
      console.log(res.data);
      this.setState({
        id:res.data.id,
        name:res.data.name,
        email:res.data.email,
        message:res.data.message,
        password:res.data.password
      })
    })
          this.componentDidMount();
  }

  
  render(){
     const tabBarStyle = {
       textAlign: "center",
     };

  return (
    <Layout className="app-container">
      <Content className="app-content">
        <div className="container">
          <Tabs
            defaultActiveKey="1"
            animated={false}
            className="teams-tabs"
            tabBarStyle={tabBarStyle}
          >
            <TabPane tab={"View"} key="1" className="tab2">
              <ViewUsers username={ViewUsers} />
            </TabPane>

            <TabPane tab={"Create"} key="2">
              <CreateUser username={CreateUser} />
            </TabPane>

            <TabPane tab={"Update"} key="3" className="tab3">
              <UpdateUser username={UpdateUser} />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
  }
}

export default App;
