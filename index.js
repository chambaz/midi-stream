var http = require('http'),
  fs = require('fs'),
    // NEVER use a Sync function except at start-up!
  index = fs.readFileSync(__dirname + '/index.html')

// Send index.html to all requests
var app = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end(index)
})

// Socket.io server listens to our app
var io = require('socket.io').listen(app)

// Emit welcome message on connection
io.on('connection', function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
  socket.emit('welcome', { message: 'Welcome!', id: socket.id })

  socket.on('midi', console.log)
})

app.listen(3000)
