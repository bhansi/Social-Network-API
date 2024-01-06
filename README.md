# Social Network API

## Description

This program uses MongoDB, Mongoose, and Express to serve a backend that mimics a social network. Routes for various GET, POST, PUT, and DELETE operations are available to manipulate the database.

## Table of Contents

[Installation](#installation)

[Usage](#usage)

[Questions](#questions)

## Installation

#### Install
1. Clone this repository to your directory of choice.
2. Change directory into the newly cloned repository.
3. Run 'npm i' in the command line to install the necessary packages and dependencies.
4. (optional) Install [Insomnia](https://insomnia.rest/download) to easily perform CRUD operations on the database.

#### Setup
1. Run 'npm run seed' to create and seed the database.

## Usage

[This video]() demonstrates the seeding process, running the server, and performing all of the CRUD operations outlined below.

#### Using the App
1. Run 'npm start' in the command line to start the server.
2. Open [Insomnia](https://insomnia.rest/download) (or your app of choice) to perform the following operations on the database:
  ##### GET Operations
    a. '/api/users' gets all users
    b. '/api/users/:id' gets one user
    c. '/api/thoughts' gets all thoughts
    d. '/api/thoughts/:id' gets one thought
  ##### POST Operations
    a. '/api/users' creates a new user
    b. '/api/users/:userId/friends/:friendId' adds a friend to a user's friend list
    c. '/api/thoughts' creates a new thought
    d. '/api/thoughts/:thoughtId/reactions/:reactionId' adds a reaction to the thought's reaction list
  ##### PUT Operations
    a. '/api/users/:id' updates a user
    b. '/api/thoughts/:id' updates a thought
  ##### DELETE Operations
    a. '/api/users/:id' deletes a user
    b. '/api/users/:userId/friends/:friendId' removes a friend from a user's friend list
    c. '/api/thoughts/:id' deletes a thought
    d. '/api/thoughts/:thoughtId/reactions/:reactionId' deletes a reaction from a thought's reaction list

## Questions
[GitHub](https://github.com/bhansi)

If you have any questions, you can reach me via my [email](mailto:baljotshansi@gmail.com).
