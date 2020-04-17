import React from "react";
/* eslint react/prop-types: 0 */
class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventName: "WipWup Camp",
      activity: "เรียกรายงานตัว",
      place: "โถงคณะ",
      start_time: "09:00",
      duration: 1,
      minutes: 0,
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

  onSubmit = (e) => {
    //   alert(this.state);
  };

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
              <div className="field">
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
              </div>
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
