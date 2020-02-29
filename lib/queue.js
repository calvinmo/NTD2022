import promiseWhile from 'promise-while-loop';

export default class Queue {

  constructor(queueName, channel) {
    this.name = queueName;
    this.channel = channel;
  }

  sendMessage(message) {
    return this.channel.sendToQueue(this.name, Buffer.from(JSON.stringify(message)), messageOptions)
  }

  async readUntilAnyOf(routingKeys) {
    let polling = true;
    let messageOfInterest = undefined;
    const consumer = await this.channel.consume(
      this.name,
      (message) => {
        polling = polling && !routingKeys.includes(message.fields.routingKey);
        if (routingKeys.includes(message.fields.routingKey)) {
            messageOfInterest = message;
        }
      },
      {noAck: true, exclusive: true},
    );

    await promiseWhile(() => polling,
      async () => {
        await new Promise(timer => setTimeout(timer, 25));
      }
    );

    await this.channel.cancel(consumer.consumerTag);
    return messageOfInterest;
  };
}

const messageOptions = ({
  contentType: 'application/octet-stream',
});
