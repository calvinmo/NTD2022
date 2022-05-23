import amqp from 'amqplib';

describe('multiple messages', () => {
  let connection, channel;
  const queueName = 'test';

  beforeAll(async () => {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    channel.assertQueue(queueName);
  });

  afterAll(async () => {
    await channel.deleteQueue(queueName);
    await connection.close();
  });

  test('callback', done => {
    let count = 0;
    const message1 = 'message1';
    const message2 = 'message2';
    channel.sendToQueue(queueName, Buffer.from(message1));
    channel.sendToQueue(queueName, Buffer.from(message2));
    channel.consume(queueName, received => {
      if (received) {
        channel.ack(received);
        expect([message1, message2]).toContainEqual(received.content.toString());
        count++;
        count === 2 && done();
      }
    });
  });
});
