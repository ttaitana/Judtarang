import React from "react";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      currentUser: null,
      message: "",
    };
  }
  render() {
    return (
      <div className="mobile-container custom-form">
        <div className="describtion">
          <h1 className="title">Welcome back to Judtarang</h1>
          <p>Please login to use your schedle</p>
        </div>
        <form action="">
          <div className="field">
            <div className="button is-link is-fullwidth">
              <span className="icon is-small is-left">
                <i className="fab fa-google" />
              </span>
              &ensp; Login with Google
            </div>
          </div>
          <hr />
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="email"
                placeholder="Email"
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
                type="password"
                placeholder="Password"
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </p>
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
                <p>Not a member?<a href="/signup"> Sign up now</a></p>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
