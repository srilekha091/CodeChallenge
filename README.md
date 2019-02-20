# MicroSense&trade;
MicroSense is a (super) micro implementation of ItemSense that:
 1) doesn't do anything and
 2) doesn't expose an api that is anything like ItemSense's.

 It is, however, _themed_ like ItemSense, which is what counts.

 The ItemSense UI team uses it for take-home and in-person code challenges when considering candidates for our team.

 ## Getting Started
 1. Make sure you have node (at least the latest LTS) installed
 2. Run `npm install` or `yarn` (we like Yarn) to install the massive set of dependencies.
 3. `node index.js` to launch the server.

 ## Overview

- `GET /readers` => a collection of all the readers in the system
- `GET /health` => a collection of health issues currently in the system
- `GET /operations` => each of the operations available to be run
- `POST /jobs` => how to start a `job`. Your body should be a json object with two parameters:
  - `operation [String]` one of the operations available to be run
  - `readers [Array]` an array of reader names that should begin running this operation

## Challenge
For instructions on the code challenge that consumes Microsense, see [challenge.md](challenge.md)
