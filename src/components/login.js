import React from "react";
import auth from "../firebase";
import firebase from "firebase";
import {Redirect, Route} from 'react-router-dom'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      currentUser: null,
      message: "",
      currentUser: null,
    };
  }

  onChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.setState({
          currentUser: res.user,
          message: "",
          redirect: true,
        });
      })
      .catch((error) => {
        this.setState({
          message: "Your email or password is incorrect, please try again",
        });
      });
  };

  popupSignin = (e) => {
    const db = firebase.firestore();
    let provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((resposnse) => {
        // db.collection('users').doc(resposnse.user.uid).set({
        //   username: username
        // })
        this.setState({ redirect: true });
      })
      .catch((error) => {
        // console.log(error);
        this.setState({
          message: error.message,
        });
      });
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          currentUser: user,
        });
      }
    });
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/events" />;
    }
    if (this.currentUser) {
      return (
        <div>
          <p>Hello {this.currentUser.email}</p>
          <button onClick={this.logout}>Logout</button>
        </div>
      );
    }
    return (
      <div className="mobile-container custom-form">
        <div className="describtion">
          <h1 className="title">Welcome back to Judtarang</h1>
          {this.state.currentUser ? null : (
            <p>Please login to use your schedle</p>
          )}
        </div>
        <div className="field">
          <div
            className="button is-link is-fullwidth"
            onClick={this.popupSignin}
          >
            <span className="icon is-small is-left">
              <i className="fab fa-google" />
            </span>
            &ensp; Login with Google
          </div>
        </div>
        <hr />
        <form action="" onSubmit={this.onSubmit}>
          <div className="field">
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
            <p className="control has-icons-left">
              <input
                className="input"
                name="password"
                type="password"
                placeholder="Password"
                onChange={this.onChange}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </p>
          </div>
          <div className="field">
            {/* {this.message ? ( */}
            <p className="control help is-danger">{this.state.message}</p>
            {/* ) : null} */}
          </div>
          <div className="field">
            <div className="control">
              <input
                type="submit"
                className="button is-fullwidth is-black"
                value="Login"
              />
            </div>
            <div className="field">
              <div className="mg-t">
                <p>
                  Not a member?<a href="/signup"> Sign up now</a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
