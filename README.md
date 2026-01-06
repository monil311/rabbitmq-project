# RabbitMQ Queue-Based User Notification System (Node.js)

This project demonstrates a **basic yet reliable RabbitMQ implementation** using **Node.js**.  
It follows a **queue-based producer–consumer model** and includes **advanced reliability features** such as **manual acknowledgements** and **Dead Letter Queues (DLQ)**.

---

## 📌 Project Overview

The application simulates a **User Notification System** where:
- A **producer** sends notification messages
- A **consumer** processes messages from a queue
- Failed messages are routed to a **Dead Letter Queue**

This project is designed for **beginners** while introducing **advanced RabbitMQ concepts**.

---

## 📂 Project Structure
.
├── producer.js
├── consumer.js
├── package.json
├── package-lock.json
└── README.md


---

## 🛠️ Prerequisites

- Node.js (v16 or higher)
- RabbitMQ Server (running locally)
- RabbitMQ Management Plugin (optional but recommended)

---

## 🐇 RabbitMQ Setup

Make sure RabbitMQ is running locally:


Enable the management plugin (optional):

rabbitmq-plugins enable rabbitmq_management

RabbitMQ UI:
http://localhost:15672

Default credentials:
```username: guest```
```password: guest```

📦 Install Dependencies
```npm install```

1️⃣ Start the Consumer (First)
```node consumer.js```


The consumer:
- Listens to notifications.queue
- Manually acknowledges messages
- Sends failed messages to the DLQ

2️⃣ Run the Producer
```node producer.js```

The producer:

- Sends notification messages to the queue
- Uses persistent messages for reliability

🔁 Message Flow

1. Producer sends a message to notifications.queue
2. RabbitMQ stores the message
3. Consumer processes the message
4. Consumer acknowledges success OR rejects failure
5. Failed messages go to notifications.queue.dlq

💥 Dead Letter Queue (DLQ)
**Trigger DLQ**

- Edit ```producer.js``` and change the message text:
```text: "fail this message"```


Run the producer again.

**The message will be routed to:**

```notifications.queue.dlq```


You can verify this in the RabbitMQ Management UI.

