import React from "react";
import auth from "../firebase";
import firebase from "firebase";
import { Route } from "react-router-dom";
import {Redirect} from 'react-router-dom'

class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      con_password: "",
      currentUser: null,
      message: "",
      username: "",
      length_valid: false,
      redirect: false,
    };
  }

  // methods
  onChange = (e) => {
    const { name, value } = e.target;
    if (name == "password") {
      // console.log(name + " : " + value.length);
      if (value.length > 5) {
        this.setState({
          length_valid: true,
        })
      } else {
        this.setState({
          length_valid: false,
        })
      }
    }

    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    const { email, password, con_password, username } = this.state;
    if (con_password != password) {
      this.setState({
        message: "Your password and confirm password does not match",
      });
    } else {
      // console.log(username)
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {          
          db.collection('users').doc(response.user.uid).set({
            username: username
          })
          auth.signInWithEmailAndPassword(email, password).then((res) => {
            this.setState({
              currentUser: res.user,
              message: "",
              redirect: true
            });
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            message: error.message,
          });
        });
    }
  };
  popupSignin = (e) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((resposnse) => {
        this.setState({ redirect: true });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          message: error.message,
        });
      });
  };

  // render
  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/events"/>;
    }
    return (
      <div className="mobile-container custom-form">
        <div className="describtion">
          <h1 className="title">Sign up to Judtarang</h1>
        </div>
        <div className="field">
          <div
            className="button is-link is-fullwidth"
            onClick={this.popupSignin}
          >
            <span className="icon is-small is-left">
              <i className="fab fa-google" />
            </span>
            &ensp; Sign up with Google
          </div>
        </div>
        <hr />
        <form onSubmit={this.onSubmit}>
        <div className="field">
            <label class="label">Username</label>
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                name="username"
                placeholder="Username"
                onChange={this.onChange}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </p>
          </div>
          <div className="field">
            <label class="label">Email</label>
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.onChange}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </p>
          </div>
          <div className="field">
            <label class="label">Password</label>
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.onChange}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
              <p>
                {this.state.length_valid ? (
                  <span>
                    <i class="far fa-check-circle" />
                  </span>
                ) : (
                  null
                )}
                {this.state.length_valid ? (
                  null
                ) : (
                  <span>
                    <i class="far fa-circle" />
                  </span>
                )}
                
                &ensp;Password should be at least 6 characters
              </p>
            </p>
          </div>
          <div className="field">
            <label class="label">Confirm Password</label>
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                name="con_password"
                onChange={this.onChange}
                placeholder="Confirm Password"
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </p>
          </div>
          <div className="field">
            <label class="checkbox">
              <input className="is-checkbox" type="checkbox" required />
              &ensp;&ensp;Creating an account means you’re okay with our{" "}
              <a href=""> Terms of Service,</a> <a href=""> Privacy Policy,</a>{" "}
              and our default <a href=""> Notification Settings.</a>
            </label>
          </div>
          <div className="field">
            <p className="control help is-danger">{this.state.message}</p>
          </div>
          <div className="field">
            <div className="control">
              <input
                type="submit"
                className="button is-fullwidth is-black"
                value="Sign up"
              />
            </div>
            <div className="field">
              <div className="mg-t">
                <p>
                  Already a member?<a href=""> Login now</a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;
