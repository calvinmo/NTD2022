import amqp from 'amqplib';

describe('real world', () => {
  let connection, channel;
  const incomingQueueName = 'incoming'
  const outgoingQueueName = 'outgoing'

  beforeAll(async () => {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
      channel.assertQueue(incomingQueueName);
      channel.assertQueue(outgoingQueueName);
      await channel.bindQueue(outgoingQueueName, 'amq.topic', '#')
  });

  afterAll(async () => {
    await channel.deleteQueue(outgoingQueueName);
    await connection.close()
  });

  test('real world', done => {
    let count = 0;
    const message1 = 'message1';
    const message2 = 'message2';
    channel.sendToQueue(incomingQueueName, Buffer.from(message1));
    channel.sendToQueue(incomingQueueName, Buffer.from(message2));
    channel.consume(outgoingQueueName, received => {
      if (received) {
        channel.ack(received);
        expect([message1, message2]).toContainEqual(received.content.toString());
        expect(received.properties.headers.processed).toBeTruthy();
        count++;
        count === 2 && done();
      }
    });
  });
});
