# Why Schema Registry?

Kafka, at its core, only transfers data in byte format. There is no data verification that’s being done at the Kafka cluster level. In fact, Kafka doesn’t even know what kind of data it is sending or receiving; whether it is a string or integer.Kafka 的核心仅以字节格式传输数据。 Kafka 集群级别没有进行数据验证。事实上，Kafka 甚至不知道它正在发送或接收什么样的数据；无论它是字符串还是整数。

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*6s8wj899rLxpQduV.png)

Producer sending data in byte format to Kafka Cluster and being consumed by a consumer. 生产者以字节格式将数据发送到 Kafka 集群并由消费者消费。

Due to the decoupled nature of Kafka, producers and consumers do not communicate with each other directly, but rather information transfer happens via Kafka topic. At the same time, the consumer still needs to know the type of data the producer is sending in order to deserialize it. Imagine if the producer starts sending bad data to Kafka or if the data type of your data gets changed. Your downstream consumers will start breaking. We need a way to have a common data type that must be agreed upon. 由于 Kafka 的解耦特性，生产者和消费者并不直接相互通信，而是通过 Kafka 主题进行信息传输。同时，消费者仍然需要知道生产者发送的数据类型才能反序列化。想象一下，如果生产者开始向 Kafka 发送不良数据，或者数据的数据类型发生变化。你的下游消费者将开始崩溃。我们需要一种方法来拥有必须达成一致的通用数据类型。

That’s where [Schema Registry](https://docs.confluent.io/current/schema-registry/index.html) comes into the picture. It is an application that resides outside of your Kafka cluster and handles the distribution of schemas to the producer and consumer by storing a copy of schema in its local cache. 这就是[架构注册表](https://docs.confluent.io/current/schema-registry/index.html)发挥作用的地方。它是一个驻留在 Kafka 集群外部的应用程序，通过在其本地缓存中存储架构副本来处理向生产者和消费者分发架构。

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*RNcZmLPN5jljq46M.png)

Schema Registry Architecture

With the schema registry in place, the producer, before sending the data to Kafka, talks to the schema registry first and checks if the schema is available. If it doesn’t find the schema then it registers and caches it in the schema registry. Once the producer gets the schema, it will serialize the data with the schema and send it to Kafka in binary format prepended with a unique schema ID. When the consumer processes this message, it will communicate with the schema registry using the schema ID it got from the producer and deserialize it using the same schema. If there is a schema mismatch, the schema registry will throw an error letting the producer know that it’s breaking the schema agreement. 模式注册表就位后，生产者在将数据发送到 Kafka 之前，首先与模式注册表进行对话并检查模式是否可用。如果它没有找到该架构，则会将其注册并缓存在架构注册表中。一旦生产者获得模式，它将使用该模式序列化数据，并将其以二进制格式发送到 Kafka，并在前面添加唯一的模式 ID。当消费者处理此消息时，它将使用从生产者那里获得的架构 ID 与架构注册表进行通信，并使用相同的架构对其进行反序列化。如果存在模式不匹配，模式注册表将抛出一个错误，让生产者知道它违反了模式协议。
