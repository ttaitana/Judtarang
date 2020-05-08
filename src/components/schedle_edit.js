import React from "react";
import firebase from "firebase";

/* eslint react/prop-types: 0 */
class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventName: props.location.state.name,
      activity: "",
      place: "",
      start_time: "",
      duration: 0,
      minutes: 0,
      action: props.location.state.action,
      ref_id: props.location.state.ref_id,
      id: props.location.state.id,
    };
    this.goBack = this.goBack.bind(this);
  }
  goBack() {
    this.props.history.goBack();
  }
  onChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  async getAll() {
    const { id } = this.state;
    const db = firebase.firestore();
    try{
    db.collection("sub_event")
      .doc(id)
      .get()
      .then((e) => {
        this.setState({
          activity: e.data().activity,
          place: e.data().place,
          start_time: e.data().start_time,
          duration: e.data().duration,
        });
      });
    }catch{
      //pass
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    const {
      ref_id,
      activity,
      place,
      start_time,
      duration,
      action,
      id,
    } = this.state;

    if (action == "add") {
      db.collection("sub_event")
        .doc()
        .set({
          ref: ref_id,
          activity: activity,
          place: place,
          start_time: start_time,
          duration: duration,
        })
        .then(() => {
          this.props.history.goBack();
        });
    } else if (action == "edit") {
      db.collection("sub_event")
        .doc(id)
        .update({
          activity: activity,
          place: place,
          start_time: start_time,
          duration: duration,
        })
        .then(() => {
          this.props.history.goBack();
        });
    }
  };

  componentDidMount() {
    this.getAll();
  }

  render() {
    return (
      <div className="mobile-container custom-form">
        <div className="describtion">
          <p className="func-link" onClick={this.goBack}>
            <i class="fas fa-long-arrow-alt-left"></i> &ensp; Go Back
          </p>
          <h1 className="title">{this.state.eventName}</h1>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="field">
            <p className="control has-icons-right">
              <label class="label">กิจกรรม</label>
              <input
                className="input"
                type="text"
                name="activity"
                value={this.state.activity}
                onChange={this.onChange}
              />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <label className="label">สถานที่</label>
              <input
                className="input"
                type="text"
                name="place"
                value={this.state.place}
                onChange={this.onChange}
              />
            </p>
          </div>
          <div className="field">
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <label className="label">เวลาเริ่ม</label>
                  <input
                    className="input"
                    type="time"
                    name="start_time"
                    value={this.state.start_time}
                    onChange={this.onChange}
                  />
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <label className="label">ระยะเวลากิจกรรม(ชั่วโมง)</label>
                  <input
                    className="input"
                    type="number"
                    name="duration"
                    value={this.state.duration}
                    onChange={this.onChange}
                  />
                </p>
              </div>
              {/* <div className="field">
                <p className="control has-icons-right">
                  <label className="label">ระยะเวลากิจกรรม(นาที)</label>
                  <input
                    className="input"
                    type="number"
                    name="minutes"
                    min={0}
                    max={60}
                    value={this.state.minutes}
                    onChange={this.onChange}
                  />
                </p>
              </div> */}
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                type="submit"
                className="button is-fullwidth is-black"
                value="Save"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
