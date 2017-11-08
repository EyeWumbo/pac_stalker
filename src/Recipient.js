import React, { Component } from "react";

export default class Recipient extends Component {

  sponsorItem() {
    const rec = this.props.recipient;
    return Object.keys(rec.sponsors).map(s => {
      const eventsRun = rec.sponsors[s];
      var contacts = [];
      eventsRun.forEach(e => {
        var phones = e.contact.match(/\(?\d{3}\)?[-\s]{1}\d{3}[-\s]{1}\d{4}/gi) || [];
        var emails = e.contact.match(/\w+@\w+\.\w{0,4}/gi) || [];
        console.log(phones, emails);
        contacts = contacts.concat(phones.filter(p => p)).concat(emails.filter(m => m));
      });
      var hashFilter = {};
      contacts.forEach(c => hashFilter[c] = 1);
      contacts = Object.keys(hashFilter);
      return (
        <div>
          <div className="recipient-contact-header">
            {
              s ? (
                <a href={`https://duckduckgo.com/?q=site:opensecrets.org+\"${s}\"&t=hg&ia=web`} target="_blank">
                  { s }
                </a>
              ) : (
                <i>No PAC Name Available</i>
              )
            } -&nbsp;
            <b>Possible Contacts</b>
          </div>
          <div>
            {
              contacts.length == 0 ? (
                <i>No Contacts Found</i>
              ) : (
                <ul>
                  {
                    contacts.map(c => {
                      return (
                        <li>{ c }</li>
                      )
                    })
                  }
                </ul>
              )
            }
          </div>
        </div>
      )
    })
  }

  render() {
    const rec = this.props.recipient;
    return (
      <div className="recipient">
        <b>{ rec.title } { rec.name } ({ rec.party || "I" } - { rec.state || "US" })</b>
        {
          this.sponsorItem()
        }
      </div>
    )
  }
}
