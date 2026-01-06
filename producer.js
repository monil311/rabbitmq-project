const amqp = require("amqplib");

async function send() {
  //create connection and channel
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createConfirmChannel();
  const exchange = "user.notifications"; // exchange name
  const exchangeType = "topic"; //direct exchange type

  //assert exchange
  await channel.assertExchange(exchange, exchangeType, { durable: true });
  // durable: true means when the queue server restarts, the exchange will stored in disk, false mean it will lost/deleted

  //prepare message
  const message = {
    user: "john",
    type: "email.welcome",
    text: "Welcome John!",
    // text: "fail this message",
  };

  //publish message to exchange with routing key
  channel.publish(
    exchange,
    message.type,
    Buffer.from(JSON.stringify(message)),
    { persistent: true }, //make message persistent
    (err) => {
      if (err) console.error("Publish failed");
      else console.log("Message published");
    }
  );

  //close channel and connection after a timeout
  setTimeout(() => {
    channel.close();
    connection.close();
  }, 500);
}

send();
