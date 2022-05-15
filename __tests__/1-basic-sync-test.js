import amqp from 'amqplib';

describe('basic sync', () => {
  let connection, channel;
  const queueName = 'asyncworkshop';

  beforeAll(async () => {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    channel.assertQueue(queueName);
  });

  afterAll(async () => {
    await channel.deleteQueue(queueName);
    await connection.close()
  });

  test('test 1', async () => {
    const message = 'hello ntd friends';
    channel.sendToQueue(queueName, Buffer.from(message));
    const returnedMessage = (await channel.get(queueName)).content.toString();
    expect(returnedMessage).toEqual(message);
  });
});
