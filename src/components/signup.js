import React from "react";

class SignupForm extends React.Component {
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
          <h1 className="title">Sign up to Judtarang</h1>
        </div>
        <form action="">
          <div className="field">
            <div className="button is-link is-fullwidth">
              <span className="icon is-small is-left">
                <i className="fab fa-google" />
              </span>
              &ensp; Sign up with Google
            </div>
          </div>
          <hr />
          <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input" type="text" placeholder="Username" required/>
              <span class="icon is-small is-left">
                <i class="fas fa-user" />
              </span>
              {/* <span class="icon is-small is-right">
                <i class="fas fa-check" />
              </span> */}
            </div>
          </div>
          <div className="field">
            <label class="label">Email</label>
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
            <label class="label">Password</label>
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
            <label class="checkbox">
              <input className="is-checkbox" type="checkbox" required />
              &ensp;&ensp;Creating an account means you’re okay with our <a href=""> Terms of
              Service,</a> <a href=""> Privacy Policy,</a> and our default <a href=""> Notification Settings.</a>
            </label>
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
