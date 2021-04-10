import Queue from "bull";

// An interface describing the data that will be stored in this job
interface Payload {
  orderId: string;
}

// order:expiration is the channel in redis where we want to save this new job
const expirationQueue = new Queue<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

// Process the job when redis server returns it after elapsed time (15 minutes in this case)
expirationQueue.process(async (job) => {
  console.log(
    "I want to publish an expiration:complete event for orderId",
    job.data.orderId
  );
});

export { expirationQueue };
