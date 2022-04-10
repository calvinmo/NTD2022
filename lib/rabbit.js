import Queue from './queue';
import amqp from "amqplib";

export default class Rabbit {

  async reset() {
    this.connection = await amqp.connect(process.env.RABBITMQ_URI);
    this.channel = await this.connection.createChannel();
    return undefined;
  };

  async close() {
    return await this.connection.close();
  }

  async assertQueue(queueName) {
    await this.channel.assertQueue(queueName, {durable: true});
    return new Queue(queueName, this.channel);
  };
}
