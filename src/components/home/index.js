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
      width: 0,
      sliderLeft: 0,
      sliderRight: 100
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

  componentWillUnmount() {
    window.removeEventListener("resize");
  }

  update = () => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
  };

  handleDragLeft(e) {
    var dragX = e.pageX;
    var positionDOM = ReactDOM.findDOMNode(
      this.refs["sliderMain"]
    ).getBoundingClientRect();
    const realPosition = dragX - positionDOM.x;
    let realPositionPercent = parseInt((realPosition / 314) * 100);

    if (realPositionPercent > this.state.sliderRight) {
      realPositionPercent = this.state.sliderRight + -10;
    } else if (realPositionPercent < 0) {
      realPositionPercent = 0;
    }
    const value = {
      min: (realPositionPercent * this.max) / 100,
      max: (this.state.sliderRight * this.max) / 100
    };
    this.setState({ sliderLeft: realPositionPercent, value: value });
    //
  }

  handleDragRight(e) {
    var dragX = e.pageX;
    var positionDOM = ReactDOM.findDOMNode(
      this.refs["sliderMain"]
    ).getBoundingClientRect();
    const realPosition = dragX - positionDOM.x;
    let realPositionPercent = parseInt((realPosition / 314) * 100);
    if (realPositionPercent < this.state.sliderLeft) {
      realPositionPercent = this.state.sliderLeft + 10;
    } else if (realPositionPercent > 100) {
      realPositionPercent = 100;
    }
    const value = {
      min: (this.state.sliderLeft * this.max) / 100,
      max: (realPositionPercent * this.max) / 100
    };
    this.setState({ sliderRight: realPositionPercent, value: value });
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

          <div className="slider" id="slider" ref="sliderMain">
            <div
              ref="sliderleftRef"
              draggable="true"
              className="slider-left"
              id="slider-left"
              onDragEnd={this.handleDragLeft.bind(this)}
              style={{ zIndex: 1000, left: `${this.state.sliderLeft}%` }}
            />
            <div
              ref="sliderrightRef"
              draggable="true"
              className="slider-right"
              id="slider-right"
              onDragEnd={this.handleDragRight.bind(this)}
              style={{ zIndex: 1000, left: `${this.state.sliderRight}%` }}
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
