import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import EventDashboard from "./EventDashboard.js";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      ready: false
    }
  }

  // Once the component's loaded, start querying an API for data.

  componentDidMount() {
    this.queryAllEventsToMemory("https://cors-anywhere.herokuapp.com/http://politicalpartytime.org/api/v1/event/", [])
  }

  // Recursively keep grabbing events while there's more to grab.
  // Optionally, stops grabbing events once the button next to the loading bar is pressed.

  queryAllEventsToMemory(url, events) {
    if(this.state.skipLoad) {
      return this.setState({
        events,
        ready: true
      });
    }
    fetch(url, {
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    }).then(res => {
      return res.json();
    }).then(jsonResults => {
      const percentageDone = (jsonResults.meta.offset / jsonResults.meta.total_count * 100).toFixed(2);
      this.setState({
        percentageDone,
        itemCount: jsonResults.meta.offset,
        total: jsonResults.meta.total_count
      });
      const values = jsonResults.objects;
      if(values.length == 0) {
        this.setState({
          events,
          ready: true
        });
        return true;
      }
      else {
        events = events.concat(jsonResults.objects);

        // Trying not to hammer a public API that doesn't use API keys.
        setTimeout(() => {
          this.queryAllEventsToMemory(`https://cors-anywhere.herokuapp.com/http://politicalpartytime.org${jsonResults.meta.next}`, events);
        }, 500);
      }
    })
  }

  // Loop through the events gathered and render them based on the PoliticalEvent Component.

  politicalEvents() {
    const events = this.state.events;
    if(events.length == 0) {
      return (
        <div>
          No events found!
        </div>
      )
    }
    return (
      <EventDashboard events={events} />
    );
  }

  // Loading bar to show current progress in terms of grabbing info. Has a skip button if you don't want to wait around.

  loadingBar() {
    const hasOver500 = (this.state.itemCount || 500) >= 50;
    return (
      <div className="loading-screen col center x-center">
        <h2 className="loading-title">
          PAC Stalker v0.0.1
        </h2>
        <div className="row" style={{marginBottom: 10}}>
          <div className="loading-bar">
            <div className="loading-fill" style={{width: this.state.percentageDone + "%"}}></div>
          </div>
          {
            this.state.itemCount && hasOver500 ? (
              <button className="loading-skip" onClick={() => { this.setState({ skipLoad: true }) }}>Skip Loading</button>
            ) : (
              null
            )
          }

        </div>
        <div className="loading-text">
          <span>{ this.state.itemCount } / { this.state.total } items loaded!&nbsp;</span>
          {
            hasOver500 ? (
              null
            ) : (
              <span>Skipping loading available in { (500 - this.state.itemCount) / 50 }...</span>
            )
          }
        </div>
      </div>
    )
  }

  render() {
    if(!this.state.ready) {
      return this.loadingBar();
    }
    return (
      <div>
        {
          this.politicalEvents()
        }
      </div>
    )
  }
}

export default App;
