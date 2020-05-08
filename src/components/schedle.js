import React, { Component } from "react";
import "../style/main.scss";
import data_item from "./mock_data.json";
import auth from "../firebase";
import firebase from "firebase";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

export default withRouter(
  class Schedle extends Component {
    constructor(props) {
      super(props);
      this.state = {
        is_admin: false,
        user: "1",
        currentUser: "",

        event_id: props.location.state.event_id,
        event_item: [],
        schedule: [],
        new_items: [],
        sub_event: [],
        event_date: "",
      };
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

    async getAll() {
      const db = firebase.firestore();
      const { event_id } = this.state;
      // console.log("member id: " + this.state.currentUser.uid);
      let data;
      let sche;
      try {
        data = await db.collection("events").doc(event_id).get();
      } catch {
        data = await db.collection("events").get();
      }
      try {
        sche = await db
          .collection("schedule")
          .where("refEvent", "==", event_id)
          .get();
      } catch {
        sche = [];
      }
      this.setState({
        event_item: data.data(),
      });

      let collection = [];
      let subevent_collection = [];
      sche.docs.map((inform) => {
        collection.push({ id: inform.id, data: inform.data() });
        db.collection("sub_event")
          .where("ref", "==", inform.id)
          .get()
          .then((e) => {
            e.docs.map((dat) => {
              subevent_collection.push({
                id: dat.id,
                ref: inform.id,
                data: dat.data(),
              });
            });
          })
          .then(() => {
            subevent_collection.sort(this.dateCompair);
            this.setState({
              schedule: collection,
              sub_event: subevent_collection,
            });
          });
      });
    }

    dateCompair = (a, b) => (a.data.start_time > b.data.start_time ? 1 : -1);

    addDate = () => {
      const db = firebase.firestore();
      const { event_date, event_id } = this.state;
      if (event_date !== "") {
        db.collection("schedule")
          .doc()
          .set({
            refEvent: event_id,
            date: event_date,
          })
          .then(() => {
            window.location.reload();
          });
      }
    };

    onDelete = (id) => {
      let result = window.confirm("Do you want to delete this activity?");
      if (result) {
        const db = firebase.firestore();
        db.collection("sub_event")
          .doc(id)
          .delete()
          .then(() => {
            alert("event deleted");
            window.location.reload();
          });
      }
    };

    onChange = (e) => {
      const { name, value } = e.target;
      this.setState({
        [name]: value,
      });
    };

    render() {
      let { password, event_item, schedule, sub_event } = this.state;
      return (
        <mobile>
          {/* <div className="mobile-status-bar">
        <img src="https://i.imgur.com/XSqz2K4.png" alt="" />
      </div> */}
          <div className="mobile-container">
            <ul className="main" id="show">
              <div className="event-wrapper">
                <br />
                <h1 className="title">{event_item.title}</h1>
                <br />
                {event_item.owner_ref == this.state.currentUser.uid ? (
                  <>
                    <h3 className="title is-4">
                      Event password : {event_item.password}
                    </h3>

                    <br />
                    <br />
                    <input
                      type="date"
                      name="event_date"
                      onChange={this.onChange}
                    />
                    <div className="button" onClick={this.addDate}>
                      Add day
                    </div>
                  </>
                ) : null}
              </div>
              {schedule.length > 0 ? (
                <div>
                  {schedule.map((sch) => (
                    <div className="event-wrapper">
                      <li className="date">
                        <h3>{sch.data.date}</h3>
                        <p>Schedule of Events</p>
                      </li>
                      <li className="events">
                        <ul className="events-detail">
                          {sub_event.map((ev) => (
                            <div>
                              {ev.ref == sch.id ? (
                                <li className="columns">
                                  {event_item.owner_ref ==
                                  this.state.currentUser.uid ? (
                                    <Link
                                    to={{
                                      pathname: "edit",
                                      state: {
                                        name: event_item.title,
                                        ref_id: sch.id,
                                        id: ev.id,
                                        action: "edit",
                                      },
                                    }}
                                    className="column"
                                  >
                                    <span className="event-time">
                                      {ev.data.start_time}
                                    </span>
                                    &ensp;
                                    <span className="event-name">
                                      {ev.data.activity}
                                    </span>
                                    <br />
                                    <span className="event-location">
                                      {ev.data.place}
                                    </span>
                                  </Link>
                                  ) : (
                                    <div
                                    className="column"
                                  >
                                    <span className="event-time">
                                      {ev.data.start_time}
                                    </span>
                                    &ensp;
                                    <span className="event-name">
                                      {ev.data.activity}
                                    </span>
                                    <br />
                                    <span className="event-location">
                                      {ev.data.place}
                                    </span>
                                  </div>
                                  )}
                                  
                                  {event_item.owner_ref ==
                                  this.state.currentUser.uid ? (
                                    <div
                                      className="column delete-icon func-link"
                                      onClick={() => this.onDelete(ev.id)}
                                    >
                                      <i className="far fa-times-circle" />
                                    </div>
                                  ) : null}
                                </li>
                              ) : null}
                            </div>
                          ))}
                          {event_item.owner_ref ==
                          this.state.currentUser.uid ? (
                            <li className="columns">
                              <Link
                                to={{
                                  pathname: "edit",
                                  state: {
                                    name: event_item.title,
                                    action: "add",
                                    id: "",
                                    ref_id: sch.id,
                                  },
                                }}
                                className="column"
                              >
                                <span href="#" className="add-icon">
                                  <i className="fas fa-plus-circle" />
                                </span>
                                &ensp;
                                <span className="event-time">
                                  Add more event
                                </span>
                                &ensp;
                              </Link>
                            </li>
                          ) : null}
                        </ul>
                      </li>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No items</p>
              )}
            </ul>
          </div>
        </mobile>
      );
    }
  }
);

// <div>
//                   {data_item["1"]["schedle"].map((sch) => (
//                     <div className="event-wrapper">
//                       <li className="date">
//                         <h3>{sch.date}</h3>
//                         <p>Schedule of Events</p>
//                         {/* <button className="button is-warning">แก้ไขข้อมูล</button> */}
//                       </li>
//                       <li className="events">
//                         <ul className="events-detail">
//                           {sch.events.map((ev) => (
//                             <li className="columns">
//                               <a href={`/edit`} className="column">
//                                 <span className="event-time">
//                                   {ev.start_time}
//                                 </span>
//                                 &ensp;
//                                 <span className="event-name">{ev.title}</span>
//                                 <br />
//                                 <span className="event-location">
//                                   {ev.place}
//                                 </span>
//                               </a>
//                               <a href="#" className="column delete-icon">
//                                 <i className="far fa-times-circle" />
//                               </a>
//                             </li>
//                           ))}
//                           <li className="columns">
//                             <a href={"/schedual"} className="column">
//                               <span href="#" className="add-icon">
//                                 <i className="fas fa-plus-circle" />
//                               </span>
//                               &ensp;
//                               <span className="event-time">Add more event</span>
//                               &ensp;
//                             </a>
//                           </li>
//                         </ul>
//                       </li>
//                     </div>
//                   ))}
//                 </div>
