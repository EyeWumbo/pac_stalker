Howdy.

To start this up, all you gotta do is run `npm start`. Make sure to install dependencies first with `npm install`.

Basically this project pulls info from http://politicalpartytime.org and does some manipulation of the information. In particular, this project grabs events from the open API, then creates a new list of events run for particular candidates or parties. Furthermore, any organizing party in charge of running the event (usually a PAC) is stored onto the candidate object. Then, when the collection stops running, a user can pop over to see the different PACs that are backing a particular candidate. The results page gives a link to query https://opensecrets.org for the PAC through DuckDuckGo. Beyond that, some simple parsing is done to extract possible contact information from the event organizers, which could be used in conjunction with other datasets.

Might keep working on this, and if I do, I'd probably look into
- Storing already captured results onto LocalStorage, so when a user refreshes or navigates away from the page, the already gathered info stays somewhat persistent.
- Filter and search functionality for the results page.
- Maybe give the UX on the results page another look over.

This project is meant to be a quick sample of my experience with React. I may have gotten carried away with the scope of the project here though.
