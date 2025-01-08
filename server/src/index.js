import { createServer } from "http";
import { Server } from "socket.io";
import {v4 as uuidv4} from "uuid";
const httpServer= createServer();
// input ouput connection from socket server 

const io= new Server(httpServer,{
    //this doesn't give any error later on 
    cors:{
        // this is client server 
        origin:"http://localhost:3006",
        methods: ["GET", "POST"],
    },
    transports: ['websocket'],
    debug:true
});
io.use((socket,next)=>{
    //it will bring user name from clint side 
    const username=socket.handshake.auth.username;
    if(!username){
        return next(new Error("Invalid username"));

    }
    socket.username= username;
    socket.userId= uuidv4();
    next();
}); 


// connection initialize 

io.on("connection",async (socket)=> {
    //all connected users
    const users=[];
    for(let [id,socket] of io.of("/").sockets){
        users.push({
            userId: socket.userId,
            username: socket.username,
        });
    }

    //all users event 
    socket.emit("users", users);
   
    //connected user details event
    socket.emit("session", {userId: socket.userId, username: socket.username});

    //new user event
    socket.broadcast.emit("user connected", {
        userId: socket.userId, 
        username: socket.username,
    });

    //new message event
   
    socket.on("new message",(message)=>{
        const newMessage={
            userId: socket.userId,
            username: socket.username,
            message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        socket.broadcast.emit("new message", newMessage);
    });
});
console.log("Listening to port...");
// as cliend is in port 3000 we put server listen to port 4000
// if i choose to run this to some diff port so i have writtten process.env.PORT
httpServer.listen(process.env.PORT || 4000 ,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT || 4000}`);
});