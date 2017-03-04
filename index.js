const http = require('http')
const fs = require('fs')
const index = fs.readFileSync(__dirname + '/index.html')
const midi = require('midi')

// serve up index.html
const app = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end(index)
})

// start socket.io
const io = require('socket.io').listen(app)

// create MIDI output and open virtual port for outside connections
const midiOutput = new midi.output()
midiOutput.openVirtualPort('MIDI Stream Output')

// on socket connection
io.on('connection', socket => {
  // send welcome message with unique ID
  socket.emit('welcome', { message: 'Welcome!', id: socket.id })

  // on 'midi' socket message send MIDI message to virtual output
  socket.on('midi', data => {
    console.log('trigger', data)
    midiOutput.sendMessage([144,48,100])
  })
})

app.listen(3000)
