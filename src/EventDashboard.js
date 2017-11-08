import React, { Component } from "react";

import Recipient from "./Recipient";

export default class EventDashboard extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const events = this.props.events;
    var beneficiaries = {};
    events.forEach(e => {
      const organizer = e.make_checks_payable_to;
      const minEventDetails = {
        id: e.id,
        name: e.entertainment,
        date: e.start_date,
        contact: e.rsvp_info
      }
      e.beneficiaries.forEach(b => {
        var target = beneficiaries[b.id];
        if(target) {
          target.count++;
        }
        else {
          b.count = 1;
          b.sponsors = {};
          beneficiaries[b.id] = b;
          target = beneficiaries[b.id];
        }
        if(!target.sponsors[organizer]) {
          target.sponsors[organizer] = [minEventDetails];
        }
        else {
          target.sponsors[organizer].push(minEventDetails);
        }
      })
    });
    this.setState({
      beneficiaries: Object.values(beneficiaries)
    });
  }

  getContacts(str) {
    var phones = str.match(/\(?\d{3}\)?[-\s]{1}\d{3}[-\s]{1}\d{4}/gi) || [];
    var emails = str.match(/\w+@\w+\.\w{0,4}/gi) || [];
    return phones.concat(emails);
  }

  render() {

    const beneficiaries = (this.state.beneficiaries || []).sort((a, b) => {
      var contactA = Object.keys(a.sponsors).reduce((acc, k) => {
        var contacts = [];
        a.sponsors[k].forEach(e => {
          contacts = contacts.concat(this.getContacts(e.contact));
        });
        return acc + contacts.length;
      }, 0);
      var contactB = Object.keys(b.sponsors).reduce((acc, k) => {
        var contacts = [];
        b.sponsors[k].forEach(e => {
          contacts = contacts.concat(this.getContacts(e.contact));
        });
        return acc + contacts.length;
      }, 0);
      return contactA - contactB;
    })

    return (
      <div>
        <div className="row flex-wrap" style={{padding: 10}}>
          {
            (this.state.beneficiaries || []).map(b => {
              return (
                <Recipient recipient={b} />
              )
            })
          }
        </div>
      </div>
    )
  }
}
