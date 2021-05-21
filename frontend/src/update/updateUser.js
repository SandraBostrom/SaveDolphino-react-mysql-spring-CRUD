import React, { useState } from "react";
import axios from "axios";
import CreateUser from "../create/createUser";

// Why is the update-code so slow??

class viewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      id: 0,
      email: "",
      message:"",
      password: "",
    };
  }
  componentDidMount() {
    axios.get("http://localhost:8080/api/").then((res) => {
      this.setState({
        users: res.data,
        id: 0,
        email: "",
        message:"",
        password: "",
      });
    });
  }
  submit(event, id) {
    event.preventDefault();
    if (id === 0) {
      axios
        .post("http://localhost:8080/api/", {
        id:this.state.id,
          email: this.state.email,
          message:this.state.message,
          password: this.state.password,
        })
        .then((res) => {
          this.componentDidMount();
        });
    } else {
      axios
        .put("http://localhost:8080/api/", {
          id: this.state.id,
          email: this.state.email,
          message:this.state.message,
          password: this.state.password,
        })
        .then(() => {
          this.componentDidMount();
        });
    }
  }
  delete(id) {
    axios.delete(`http://localhost:8080/api/${id}`).then(() => {
      this.componentDidMount();
    });
  }

  edit(id) {
    axios.get(`http://localhost:8080/api/${id}`).then((res) => {
      this.setState({
        id: res.data.id,
        email: res.data.email,
        message:res.data.message,
        password: res.data.password,
      });
    });
    this.componentDidMount();
  }

  render() {
    return (
      <div className="col s6">
        <form
          className="updateClass"
          onSubmit={(e) => this.submit(e, this.state.id)}
        >
          <input
            onChange={(e) => this.setState({ email: e.target.value })}
            value={this.state.email}
            type="email"
            id="autocomplete-input"
            className="autocomplete"
          />
          <label for="autocomplete-input">email</label>

          <input
            onChange={(e) => this.setState({ message: e.target.value })}
            value={this.state.message}
            type="text"
            id="autocomplete-input"
            className="autocomplete"
          />
          <label for="autocomplete-input">Message</label>

          <button
            className="btn waves-effect waves-light right"
            type="submit"
            name="action"
          >
            Submit
            <i className="material-icons right">send</i>
          </button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Message</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {this.state.users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.message}</td>

                <td>
                  <button
                    className="editBtn"
                    onClick={(e) => this.edit(user.id)}
                    value={this.state.email}
                    class="btn waves-effect waves-light"
                    type="submit"
                    name="action"
                  >
                    <i class="material-icons">edit</i>
                  </button>
                </td>
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
                    <i class="material-icons">delete</i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="container"></div>
      </div>
    );
  }
}

export default viewUser;
