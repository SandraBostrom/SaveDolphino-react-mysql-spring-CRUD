import React from 'react';
import axios from "axios";
import {checkEmailAvailability} from '../util/APIutils';
import { notification } from "antd";


class createUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      id: 0,
      email: "",
      message:"",
      password: "",
    }; 

        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);

  }
  

  handleInputChange(event, validationFun) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;
    this.setState({
      [inputName]: {
        value: inputValue,
        ...validationFun(inputValue),
      },
    });
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
    if (this.state.email.value != null && this.state.password.value != null) {
      axios
        .post("http://localhost:8080/api/", {
          email: this.state.email,
          message: this.state.message,
          password: this.state.password,
        })
        .then((response) => {
          this.componentDidMount();
        });
    } else {
      alert("Ooopsie! You missed a spot");
    }
  }
  delete(id) {
    axios.delete(`http://localhost:8080/api/${id}`).then(() => {
      this.componentDidMount();
    });
  }
  edit(id) {
    axios.get(`http://localhost:8080/api/${id}`).then((res) => {
      console.log(res.data);
      this.setState({
        id: res.data.id,
        email: res.data.email,
        message:res.data.message,
        password: res.data.password,
      });
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s6">
            <form onSubmit={(e) => this.submit(e, this.state.id)}>
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input
                  onChange={(e) => this.setState({ email: e.target.value })}
                  value={this.state.email}
                  type="email"
                  id="autocomplete-input"
                  className="autocomplete"
                />
                <label for="autocomplete-input">Email</label>
              </div>

              <div className="input-field col s12">
                <i className="material-icons prefix">message</i>
                <input
                  onChange={(e) => this.setState({ message: e.target.value })}
                  value={this.state.message}
                  type="text"
                  id="autocomplete-input"
                  className="autocomplete"
                />
                <label for="autocomplete-input">Say hello</label>
              </div>

              {/*  Input for name, in progress    
              
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input
                  value={this.state.name.value}
                  type="text"
                  id="autocomplete-input"
                  className="autocomplete"
                  onChange={(event) =>
                    this.handleInputChange(event, this.validateName)
                  }
                />
                <label for="autocomplete-input">Namn</label>
              </div> */}

              <div className="input-field col s12">
                <i className="material-icons prefix">vpn_key</i>
                <input
                  onChange={(e) => this.setState({ password: e.target.value })}
                  value={this.state.password}
                  type="password"
                  id="autocomplete-input"
                  className="autocomplete"
                />
                <label for="autocomplete-input">Password</label>
              </div>
              <button
                className="btn waves-effect waves-light right"
                type="submit"
                name="action"
              >
                Submit
                <i className="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  validateName = (inputName) => {
    if (inputName.length <= 1) {
      return {
        validateStatus: "error",
        errorMsg: `Name is too short. Minimum 2 characters needed.)`,
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null,
      };
    }
  };

  validateEmail = (email) => {
    if (!email) {
      return {
        validateStatus: "error",
        errorMsg: "Email may not be empty",
      };
    }

    const EMAIL_REGEX = RegExp("[^@ ]+@[^@ ]+\\.[^@ ]+");
    if (!EMAIL_REGEX.test(email)) {
      return {
        validateStatus: "error",
        errorMsg: "Email not valid",
      };
    }

    return {
      validateStatus: null,
      errorMsg: null,
    };
  };

  validateEmailAvailability() {
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if(emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });    
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkEmailAvailability(emailValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'error',
                        errorMsg: 'This Email is already registered'
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }
  
  }

export default createUser;
