import React from "react";
import auth from "../firebase";
import firebase, { firestore } from "firebase";
import { Link } from "react-router-dom";

class FindEvents extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: "",
      events: [],
    };
  }

  async getAll() {
    const db = firebase.firestore();
    // console.log("member id: " + this.state.currentUser.uid);
    let data;
    let text = "Wip";
    try {
      data = await db
        .collection("events")
        .where("title", "array-contains-any", text)
        .get();
    } catch {
      data = await db.collection("events").get();
    }
    let collections = [];

    data.docs.map((inform) => {
      collections.push({
        id: inform.id,
        title: inform.data().title,
        member: inform.data().members,
        is_lock: inform.data().is_lock,
        password: inform.data().password
      });
    });
    this.setState({
      events: collections,
    });
    console.log(collections);
  }

  joinEvent = (id, lock, password) => {
    const db = firebase.firestore();
    let pw
    if(lock){
      pw = prompt('this event is locked') == password ? true: false
      if(!pw){
        alert("Wrong password")
        return false
      }
    }
    db.collection('events').doc(id).update({
      members:firebase.firestore.FieldValue.arrayUnion(this.state.currentUser.uid)
    }).then(()=>{
      window.location.href = "/events";
    })
    // console.log('====================================');
    // console.log(id);
    // console.log('====================================');
  }

  async componentDidMount() {
    await auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          currentUser: user,
        });
      }
      this.getAll();
    });
  }

  render() {
    return (
      <div>
        <div className="mobile-container" id="find-event">
          <div className="columns">
            <div className="column is-11">
              <input class="input" type="text" placeholder="Event name" />
            </div>
            <div className="column">
              <div className="button">Find</div>
            </div>
          </div>
          <div className="container">
            {this.state.events.length > 0 ? (
              <div className="table-container">
                <table className="table is-striped is-fullwidth">
                  <thead>
                    <tr>
                      <th>Event name</th>
                      <th>is lock</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.events.map((data) => (
                      <tr>
                        <td>{data.title}</td>
                        <td>{data.is_lock ? <i class="fas fa-lock" /> : (null)}</td>
                        <td><div className="button is-primary"
                        onClick={() => this.joinEvent(data.id, data.is_lock, data.password)}
                        >Join</div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div class="container text-centered">
                <p>No data</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default FindEvents;
