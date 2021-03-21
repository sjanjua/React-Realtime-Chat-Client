const express  = require("express");
const http     = require("http");
const socketIo = require("socket.io");
const cors     = require( 'cors' );

const app = express();
app.use( cors() );

const server = http.createServer(app);

let messages = [];
let clients = [];

const io = socketIo( server, { 
    cors: {
        origin: '*',
        methods: [ 'GET', 'POST' ]
    }
});

const PORT = 3001;

// app.get( '/', ( req, res ) => {
//     res.send( 'Express server running!' );
// });

io.on( 'connection', ( socket ) => {
    
    console.log( `User connected: ${ socket.id }` );

    clients.push( socket.id );

    io.emit( 'newConnection', clients );

    socket.on( 'send', ( args ) => {
        console.log( `${args.ID}: ${args.message}` );

        messages.push( args );

        io.emit( 'messages', args )
    });

    socket.on( 'disconnect', () => {

        clients = clients.filter( ( client ) => client !== socket.id );

        io.emit( 'newConnection', clients );
    });  
});

server.listen( PORT, () => {
    console.log( `Server started on port: ${PORT}` );
});