import EventEmitter from 'events'

const eventEmitter = new EventEmitter()

// Call when we want to stop the stream
export const emitCloseStream = () => {
  eventEmitter.emit('closeStream')
}

// Listens for closeStream event and closes stream
export const onCloseStream = (listener) => {
  eventEmitter.on('closeStream', listener)
}
