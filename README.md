# Mahindra_test

To run this app, complete the following steps:
1.  clone the repo to you machine.
2.  initialize two terminals on the the directory you cloned to. On Vs code, simply split terminal.
3.  On the first terminal, change directory to eivents and run "npm install" then "npm run dev"
4.  Spin your mySQL database server running.
5.  On the second terminal, change directory to database and run the following:
    a.) npm install
    b.) npm run migrate
    c.) npm run seed
    d.) npm run dev.
    Without a database connection, you will get an error while running some of these.
    
Once coonection is established, you are up on running.

# Contents

Although, the project is incomplete. It contains the following:

1. A designed screen on the frontend.
2. A signIn option with Facebook
3. A signIn option with github
4. A route that leads to an interface that allows admin to post events.
5. A basic REST api endpoint to store user data upon successful signin
6. A basic REST api endpoint for storing events.
7. Middlewares on the backend to check for user and admin authorization

It also contains some interesting rough work commented out like:
1.    An endPoint that allows user to signUp with credentials including password.
2.    A login option with credentials.
And more...

