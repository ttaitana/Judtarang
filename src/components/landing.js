import React, { Component } from "react";
import "../style/main.scss";
import { Link } from 'react-router-dom'


export default class Landing extends Component {
  render() {
    return (
      <div className="screen-wrapper">
        <div className="columns is-vcentered">
          <div className="column is-half">
            <div className="txt-title">
              <h1 className="has-text-weight-semibold">Make your event collaborate easier with Jud<span className="name-hilight">ta</span>rang</h1>
            </div>
            <p className="describtion">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              totam perferendis voluptatum, consequatur, iure illum provident
              debitis nesciunt odit laudantium facilis! Omnis quo deleniti iure
              quae doloremque reprehenderit placeat nesciunt.
            </p>
            <div className="buttons">
              <Link to="/schedual" class="button is-black">View your schedle</Link>
            </div>
          </div>
        </div>
        <img src="https://image.freepik.com/free-vector/blogging-concept-illustration_114360-1038.jpg" alt=""/>
      </div>
    );
  }
}
