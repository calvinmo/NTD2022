import amqp from 'amqplib';

describe('basic async', () => {
  let connection, channel;
  const queueName = 'test';

  beforeAll(async () => {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    channel.assertQueue(queueName);
  });

  afterAll(async () => {
    await channel.deleteQueue(queueName);
    await connection.close()
  });

  test('polling', async () => {
    const message = 'hello';
    new Promise(async () => {
      await new Promise(res => setTimeout(res, 1000));
      channel.sendToQueue(queueName, Buffer.from(message));
    })
    let receivedMessage;
    receivedMessage = await channel.get('test') || { content: ''};
    //while (!receivedMessage) { receivedMessage = await channel.get(queueName); }
    expect(receivedMessage.content.toString()).toEqual(message);
  });

  test('callback', done => {
    const message = 'hello';
    new Promise(async () => {
      await new Promise(res => setTimeout(res, 1000));
      channel.sendToQueue(queueName, Buffer.from(message));
    })
    channel.consume(queueName, received => {
      received && expect(received.content.toString()).toEqual(message);
      done();
    });
  });
});
