import React, { Component } from 'react';

import "./App.css"

import History from "./History"
import { compress } from "./encode"

import { isto } from "istoryh"

class App extends Component {

  constructor(props) {
    super(props)
    const ueIsto = isto(10, "ueisto");
    this.state = {
      source: "Bob -> Alice : Hello",
      label: "default",
      img: "http://www.plantuml.com/plantuml/img/SyfFKj2rKt3CoKnELR1Io4ZDoSa70000",
      ...ueIsto.top(),
      ueIsto
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-flex1 App-flexCol">
          <textarea
            onChange={(event) => this.onTextChangeUpdate(event.target.value)}
            value={this.state.source}
            cols={80}
            rows={44}
          />
          <button onClick={this.onSaveButtonClick} style={{ width: 140 }}>Save History</button>
          <History recover={this.onRecoverEditingText} isto={this.state.ueIsto} />
        </div>
        <div className="App-flex3">
          <img alt={this.state.label} src={this.state.img} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (window.location.search) {
      const params = new URLSearchParams(window.location.search);
      if (params.has("source")) {
        this.onTextChangeUpdate(decodeURIComponent(params.get("source")))
      }
    }
  }

  onTextChangeUpdate = (source) => {
    const state = {
      source,
      img: `http://www.plantuml.com/plantuml/img/${compress(source)}`,
      label: new Date().toLocaleString()
    }

    this.setState(state);
  }

  onSaveButtonClick = () => {
    const { source, img, label } = this.state;
    this.state.ueIsto.push({ source, img, label });
    this.setState({});
  }

  onRecoverEditingText = (state) => {
    this.setState({ ...state })
  }
}

export default App;
