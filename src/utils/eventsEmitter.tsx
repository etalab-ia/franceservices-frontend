import EventEmitter from 'events'

const eventEmitter = new EventEmitter()

// Call when wwe want to stop the stream
export const emitCloseStream = () => {
  eventEmitter.emit('closeStream')
}

// Listener
// for closeStream event and closes stream
export const onCloseStream = (listener) => {
  eventEmitter.on('closeStream', listener)
}
