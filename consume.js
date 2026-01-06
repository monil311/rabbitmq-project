const amqp = require("amqplib");

async function consume() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchange = "user.notifications";
  const queue = "email.notifications";
  const exchangeType = "topic"; //fanout, direct, topic

  //assert exchange and queue
  await channel.assertExchange(exchange, exchangeType, { durable: true });

  // Dead-letter exchange setup
  await channel.assertQueue(queue, {
    durable: true,
    arguments: {
      "x-dead-letter-exchange": "dlx",
    },
  });

  await channel.assertExchange("dlx", exchangeType, { durable: true });
  await channel.assertQueue("email.notifications.dlq", { durable: true });
  await channel.bindQueue("email.notifications.dlq", "dlx", "");

  //bind queue to exchange with routing key pattern
  await channel.bindQueue(queue, exchange, "email.*");

  //consume messages
  channel.prefetch(1);

  channel.consume(queue, (msg) => {
    if (!msg) return;
    const content = JSON.parse(msg.content.toString());
    console.log("Received:", content);

    if (content.text.includes("fail")) {
      console.log("Rejecting message");
      channel.reject(msg, false);
    } else {
      channel.ack(msg);
    }
  });
}

consume();
