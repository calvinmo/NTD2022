import Rabbit from '../lib/rabbit';

describe('basic sync', () => {
  let rabbit, queue;

  beforeAll(async () => {
      rabbit = new Rabbit();
      await rabbit.reset();
      queue = await rabbit.assertQueue('queue');
  });

  afterAll(async () => {
    await rabbit.channel.deleteQueue(queue.name);
    await rabbit.close();
  });

  test('test 1', async () => {
    const message = { message: 'hello' };
    await queue.sendMessage(message);
    const returnedMessage = JSON.parse((await rabbit.channel.get('queue')).content.toString());
    expect(returnedMessage).toEqual(message);
  });
});
