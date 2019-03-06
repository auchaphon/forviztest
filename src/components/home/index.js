import React, { Component } from "react";
import "./index.css";
import Histogram from "./histogram";
import InputRange from "react-input-range";
import ReactDOM from "react-dom";
import "react-input-range/lib/css/index.css";

import "rheostat/initialize";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // max: 3000,
      value: {
        min: 0,
        max: 3000
      },
      height: 0,
      width: 0
    };
    this.max = 3000;
    this.min = 0;
    window.addEventListener("resize", this.update);
  }
  handleChange(value) {
    this.setState({ value: value });
    // this.setState({ value: event.target.value });
  }

  componentDidMount() {
    this.update();
  }

  update = () => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
  };

  handleDrag(e) {
    var dragX = e.pageX,
      dragY = e.pageY;
    //
    const slider = document.getElementById("slider");
    var n = ReactDOM.findDOMNode(slider);
    var realPosition = dragX - n.offsetLeft;
    console.log(314 / realPosition);
    console.log("X: " + dragX + " Y: " + dragY);
  }

  render() {
    return (
      <section>
        <h1>The average price of an experience is ฿1715.</h1>
        <section className="content-body">
          <Histogram />
          {/* <InputRange
            maxValue={this.max}
            minValue={this.min}
            value={this.state.value}
            onChange={value => this.handleChange(value)}
            onChangeComplete={value => console.log(value)}
          /> */}
          <div className="slider" id="slider">
            <div
              draggable="true"
              className="slider-left"
              id="slider-left"
              onDragEnd={this.handleDrag.bind(this)}
              style={{ zIndex: 1000 }}
            />
          </div>

          <p className="mt-2">
            ฿{this.state.value.min} - ฿{this.state.value.max}+
          </p>
        </section>
      </section>
    );
  }
}

export default Home;
