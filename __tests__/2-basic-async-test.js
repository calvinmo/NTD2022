import Rabbit from '../lib/rabbit';

describe('basic async', () => {
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

  test('test 2', async () => {
    const message = { message: 'hello' };
    new Promise(async () => {
      await new Promise(res => setTimeout(res, 1000));
      queue.sendMessage(message);
    })
    const returnedMessage = JSON.parse((await rabbit.channel.get('queue')).content.toString());
    //const returnedMessage = await queue.readUntilAnyOf('queue');
    expect(returnedMessage).toEqual(message);
  });
});
