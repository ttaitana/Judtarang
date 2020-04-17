import React from "react";
import auth from "../firebase";
import firebase, { firestore } from "firebase";
import { Link } from "react-router-dom";

// class EventList extends React.Component {
//   render() {
//     return (
//       <tr>
//         <th>{this.props.item.name}</th>
//         <th>{this.props.item.color}</th>
//         <th>${this.props.item.price}</th>
//       </tr>
//     );
//   }
// }

export default class AllEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: "",
      schedule: [],
    };
    this.db = firebase.firestore();
  }

  async getAll() {
    const db = firebase.firestore();
    // console.log("member id: " + this.state.currentUser.uid);
    let data;
    try {
      data = await db
        .collection("events")
        .where("members", "array-contains", this.state.currentUser.uid)
        .get();
    } catch {
      data = await db.collection("events").get();
    }

    let collections = [];

    data.docs.map((inform) => {
      collections.push({
        id: inform.id,
        title: inform.data().title,
        owner: inform.data().owner,
      });
    });
    this.setState({
      schedule: collections,
    });
    // console.log(collections);
  }

  async componentDidMount() {
    await auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          currentUser: user,
        });
        this.getAll();
      }
    });
  }

  render() {
    return (
      <div className="mobile-container">
        <div className="columns">
          <div className="column">
            <Link to="/creteevent">
              <div className="button">Create Event</div>
            </Link>
          </div>
        </div>
        {this.state.schedule.length > 0 ? (
          <div className="table-container">
            <table className="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>Event name</th>
                  <th>owner</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.schedule.map((data) => (
                  <tr>
                    <td>{data.title}</td>
                    <td>{data.owner}</td>
                    <td>
                      <Link to="/schedual">
                        <div className="button is-warning">See Schedule</div>
                      </Link>
                      &ensp;
                      <div className="button is-danger">Delete</div>
                    </td>
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
    );
  }
}
