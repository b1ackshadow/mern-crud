import React, { Component } from "react";
import { FormErrors } from "./FormErrors";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  FormFeedback
} from "reactstrap";
import register from "../registerServiceWorker";
import { registerUser } from "../reducers/ActionCreators";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      touched: {
        email: false,
        name: false,
        password: false,
        confirmPassword: false
      },
      redirectState: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validate = this.validate.bind(this);
  }
  validateEmail = email =>
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  validate(email, name, password, confirmPassword) {
    const errors = {
      email: "",
      name: "",
      password: "",
      confirmPassword: ""
    };

    // if (this.state.touched.email && email.length < 6)
    //   errors.email = "Username should have at least 6 characters";
    // else if (this.state.touched.email && email.length > 15)
    //   errors.email = "Username should have at most 15 characters";
    if (this.state.touched.name && name.length < 3)
      errors.name = "Name should have at least 3 characters";
    else if (this.state.touched.name && name.length > 15)
      errors.name = "Name should have at most 15 characters";

    if (this.state.touched.email && !this.validateEmail(email))
      errors.email = "Invalid email address";
    if (this.state.touched.password && password.length < 6)
      errors.password = "Password should be greater than 6 characters";
    else if (this.state.touched.password && password.length > 15)
      errors.password = "Password should be lesser than 15 characters";
    if (this.state.touched.confirmPassword) {
      if (password === confirmPassword) errors.confirmPassword = "";
      else
        errors.confirmPassword = "Password and Confirm password do not match";
    }
    return errors;
  }
  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    console.log("Current State is: " + JSON.stringify(this.state));
    this.props.dispatch(
      registerUser(this.state.email, this.state.name, this.state.password)
    );
    setTimeout(() => {
      if (this.props.user) {
        this.setState({
          redirectState: true
        });
      }
    }, 1500);

    event.preventDefault();
  }
  render() {
    const { from } = this.props.location.state || "/";
    const { redirectState } = this.state;
    const errors = this.validate(
      this.state.email,
      this.state.name,
      this.state.password,
      this.state.confirmPassword
    );
    return (
      <div className="container mt-6">
        <div className="row row-content">
          <div className="col-12">
            <h3>Enter Sing up details</h3>
          </div>
          <div className="col-12 col-md-9">
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label htmlFor="email" md={2}>
                  Email
                </Label>
                <Col md={10}>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@example.com"
                    value={this.state.email}
                    valid={errors.email === ""}
                    invalid={errors.email !== ""}
                    onBlur={this.handleBlur("email")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.email}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="name" md={2}>
                  Name
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={this.state.name}
                    valid={errors.name === ""}
                    invalid={errors.name !== ""}
                    onBlur={this.handleBlur("name")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="password" md={2}>
                  Password
                </Label>
                <Col md={10}>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    valid={errors.password === ""}
                    invalid={errors.password !== ""}
                    onBlur={this.handleBlur("password")}
                  />
                  <FormFeedback>{errors.password}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="confirmPassword" md={2}>
                  Confirm Password
                </Label>
                <Col md={10}>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Retype your password"
                    value={this.state.confirmPassword}
                    onChange={this.handleInputChange}
                    valid={errors.confirmPassword === ""}
                    invalid={errors.confirmPassword !== ""}
                    onBlur={this.handleBlur("confirmPassword")}
                  />
                  <FormFeedback>{errors.confirmPassword}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary">
                    Register
                  </Button>
                </Col>
              </FormGroup>
            </Form>

            {redirectState && <Redirect to={"/"} />}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Register);
