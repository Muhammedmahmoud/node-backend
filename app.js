const forecast = require('./utils/forecast')
const express = require('express');
const http = require("http");
const app = express()
const server = http.createServer(app);

const port = process.env.PORT || 3000

const io = require('socket.io')(server, {
   cors: {
           /* origin: "http://localhost:8080",
            methods: ["GET", "POST"]*/
            origin: "http://34.121.91.100",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
});

io.on('connection', (socket) => {
    console.log("User Connected")
    socket.on("Public", (data) => {
        forecast(data, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            io.emit("weather", forecastData)
        })
    });
})


server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.send('Hello');
});
