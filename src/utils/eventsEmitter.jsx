import EventEmitter from "events"

const eventEmitter = new EventEmitter()

export const emitCloseStream = (isStreaming) => {
	eventEmitter.emit("closeStream", isStreaming)
}

export const onCloseStream = (listener) => {
	eventEmitter.on("closeStream", listener)
}
