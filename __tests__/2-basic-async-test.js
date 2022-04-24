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

  test('naive approach', async () => {
    const message = { message: 'hello' };
    new Promise(async () => {
      await new Promise(res => setTimeout(res, 1000));
      queue.sendMessage(message);
    })
    JSON.parse((await rabbit.channel.get('queue')).content.toString());
    /*let receivedMessage;
    while (!receivedMessage) {
      receivedMessage = await rabbit.channel.get('queue');
    }
    expect(JSON.parse(receivedMessage.content.toString())).toEqual(message);*/
  });

  test('callback', done => {
    const message = { message: 'hello' };
    new Promise(async () => {
      await new Promise(res => setTimeout(res, 1000));
      queue.sendMessage(message);
    })
    rabbit.channel.consume(queue.name, received => {
      received && expect(JSON.parse(received.content.toString())).toEqual(message);
      done();
    });
  });
});
