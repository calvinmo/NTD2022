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

  test('real world', async done => {
    const message = 'hello';
    channel.sendToQueue(incomingQueueName, Buffer.from(message));
    channel.consume(outgoingQueueName, received => {
      if (received) {
        channel.ack(received);
        expect(received.content.toString()).toEqual(message);
        expect(received.properties.headers.processed).toBeTruthy();
        done();
      }
    });
  }, 20000);
});
