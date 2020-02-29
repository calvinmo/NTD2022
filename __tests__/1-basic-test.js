import Rabbit from '../lib/rabbit';

describe('basic', () => {
  let rabbit;

  beforeAll(async () => {
      rabbit = new Rabbit();
      await rabbit.reset();
      await rabbit.assertQueue('queue');
  });

  afterAll(() => rabbit.close());

  test('test 1', async () => {
    const message = { message: 'hello' };
    await rabbit.queue.sendMessage(message, 'test');
    const returnedMessage = await rabbit.queue.readUntilAnyOf('queue');
    expect(returnedMessage === message);
  });
});
