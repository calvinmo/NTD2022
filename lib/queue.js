export default class Queue {

  constructor(queueName, channel) {
    this.name = queueName;
    this.channel = channel;
  }

  sendMessage(message) {
    return this.channel.sendToQueue(this.name, Buffer.from(JSON.stringify(message)), messageOptions)
  }
}

const messageOptions = ({
  contentType: 'application/octet-stream',
});
