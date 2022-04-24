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

  test('callback', done => {
    let count = 0;
    const message1 = { id: 'message1' };
    const message2 = { id: 'message2' };
    queue.sendMessage(message1);
    queue.sendMessage(message2);
    rabbit.channel.consume(queue.name, received => {
      received && expect([message1, message2]).toContainEqual(JSON.parse(received.content.toString()));
      count++;
      count === 2 && done();
    });
  });
});
