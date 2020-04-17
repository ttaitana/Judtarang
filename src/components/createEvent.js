import React from "react";
import auth from "../firebase";
import firebase from "firebase";
import { Redirect } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      message: "",
      title: "",
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
    const db = firebase.firestore();
    const { title, currentUser } = this.state;
    let username = "";
    let ref = db.collection("my_collection").doc();
    let myId = ref.id;
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((e) => (username = e.data().username))
      .then((e) => {
        db.collection("events")
          .doc(myId)
          .set({
            title: title,
            members: [currentUser.uid],
            owner: username,
            owner_ref: db.doc("users/" + currentUser.uid),
          })
          .then(() => {
            window.location.href = "/events";
          });
      });
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.setState({
          currentUser: user,
        });
      }
    });
  }

  render() {
    return (
      <div className="mobile-container custom-form">
        <div className="describtion">
          <h1 className="title">Create your event</h1>
          {/* <p>Please login to use your schedle</p> */}
        </div>
        <hr />
        <form onSubmit={this.onSubmit}>
          <div className="field">
            <label class="label">Event name</label>
            <p className="control">
              <input
                className="input"
                type="text"
                name="title"
                placeholder="Event name"
                onChange={this.onChange}
                required
              />
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
                value="Create Event"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
