import React, { Component } from "react";
import "../style/main.scss";
import data_item from "./mock_data.json";

export default class Schedle extends Component {
  constructor(){
    super()
    this.state = {
      is_admin : false
    }
  }
  render() {
    return (
      <mobile>
        {/* <div className="mobile-status-bar">
        <img src="https://i.imgur.com/XSqz2K4.png" alt="" />
      </div> */}
        <div className="mobile-container">
          <ul className="main" id="show">
            <div className="event-wrapper">
              <br />
              <h1 className="title">{data_item["1"].event_name}</h1>
            </div>
            {data_item["1"]["schedle"].map(sch => (
              <div className="event-wrapper">
                <li className="date">
                  <h3>{sch.date}</h3>
                  <p>Schedule of Events</p>
                  {/* <button className="button is-warning">แก้ไขข้อมูล</button> */}
                </li>
                <li className="events">
                  <ul className="events-detail">
                    {sch.events.map(ev => (
                      <li>
                        <a href="#">
                          <span className="event-time">{ev.start_time}</span>
                          <span className="event-name">{ev.title}</span>
                          <br />
                          <span className="event-location">{ev.place}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </mobile>
    );
  }
}
