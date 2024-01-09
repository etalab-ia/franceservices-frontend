import EventEmitter from "events"

const eventEmitter = new EventEmitter()

export const emitCloseStream = () => {
	eventEmitter.emit("closeStream")
}

export const onCloseStream = (listener) => {
	eventEmitter.on("closeStream", listener)
}
