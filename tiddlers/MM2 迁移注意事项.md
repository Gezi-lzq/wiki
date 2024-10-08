### Throughput on the offset-syncs topic is a bottleneck（偏移量同步主题的吞吐量是瓶颈）

**偏移量同步主题的吞吐量瓶颈**意味着在 MM2 中，偏移量同步的过程可能成为系统性能的瓶颈。为了解决这个问题，操作员可以采取以下措施：

1. **Use multiple flows, keep high-throughput topics separate（使用多个流，保持高吞吐量主题分离）**：

   * 将高吞吐量的主题分成多个数据流进行处理，以避免单个流的负载过高。
   * 这样可以分散负载，提升整体系统的吞吐量。

2. **Keep offset-syncs topic on low-load Kafka brokers（将偏移量同步主题保留在低负载的 Kafka 代理上）**：

   * 将偏移量同步主题分配到负载较低的 Kafka 代理上，以确保其能够得到足够的资源进行处理。
   * 这有助于避免偏移量同步过程中的性能瓶颈。

3. **Minimize Connect/target Kafka latency（最小化连接 / 目标 Kafka 的延迟）**：

   * 尽量减少源集群和目标集群之间的网络延迟。
   * 低延迟可以提高偏移量同步的效率，从而减少瓶颈问题。

### Reading checkpoint topic requires write credentials（读取检查点主题需要写入凭证）

**读取检查点主题需要写入凭证**意味着在读取 MM2 的检查点主题时，需要具备写入权限。这可能会导致以下问题：

1. **WARN Not authorized to access checkpoints topic（警告：未授权访问检查点主题）**：

   * 如果操作员没有相应的权限，将会收到未授权访问检查点主题的警告信息。
   * 需要确保操作员拥有必要的写入权限，以避免此类问题。

2. **INFO Exception encountered loading checkpoints topic（信息：加载检查点主题时遇到异常）**：

   * 在尝试加载检查点主题时，如果遇到权限问题或其他异常情况，将会记录相关的异常信息。
   * 操作员需要检查日志，定位并解决这些异常。

3. **Limits translation to only very recent offsets（限制仅转换非常近期的偏移量）**：

   * 由于权限问题或其他原因，MM2 可能只能处理非常近期的偏移量。
   * 这会限制偏移量的翻译和同步范围，影响数据的一致性和完整性。

###
