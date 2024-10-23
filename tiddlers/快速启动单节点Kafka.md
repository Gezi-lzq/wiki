### 步骤1：生成 `CLUSTER_ID`

使用 Kafka 提供的工具生成一个新的 `CLUSTER_ID`：

```sh
docker run --rm confluentinc/cp-kafka:latest kafka-storage random-uuid
```

这将输出一个新的 `CLUSTER_ID`，例如：

```sh
kafka-uuid-1234567890abcdef
```

### 步骤2：更新 `docker-compose.yml`

将生成的 `CLUSTER_ID` 添加到 `docker-compose.yml` 文件的环境变量中，并确保配置项正确：

```yaml
version: '3.8'

services:
  kafka:
    image: confluentinc/cp-kafka:latest
    container_name: kafka
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:9093
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_MIN_INSYNC_REPLICAS: 1
      KAFKA_LOG_FLUSH_INTERVAL_MESSAGES: 10000
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
      KAFKA_PROCESS_ROLES: broker,controller
      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@localhost:9093
      KAFKA_NODE_ID: 1
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,CONTROLLER:PLAINTEXT
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_LOG_DIRS: /var/lib/kafka/data
      KAFKA_METADATA_LOG_DIR: /var/lib/kafka/metadata
      CLUSTER_ID: "kafka-uuid-1234567890abcdef"  # 替换为实际生成的 CLUSTER_ID
    volumes:
      - ./data/kafka:/var/lib/kafka/data
      - ./data/metadata:/var/lib/kafka/metadata
```

### 步骤3：重启 Docker Compose

更新配置后，重启 Docker Compose 以应用更改：

```sh
docker-compose down
docker-compose up -d
```

### 步骤4：检查容器状态

检查 Kafka 容器的状态，确保其正在运行：

```sh
docker ps -a
```

### 步骤5：验证 Kafka 配置

如果容器正在运行，尝试验证 Kafka 配置，创建一个新的主题：

```sh
docker exec -it kafka kafka-topics --create --topic test --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
```

通过这些步骤，你应该能够成功配置并运行 Kafka 容器。