import { Redis } from 'ioredis';
import { parseServerEnvironment } from '@assetforge/config';

async function bootstrap() {
  const environment = parseServerEnvironment();
  const redis = new Redis(environment.REDIS_URL, { lazyConnect: true });
  await redis.connect();
  console.info(
    JSON.stringify({ service: 'assetforge-worker', status: 'ready' }),
  );

  const shutdown = async () => {
    await redis.quit();
    console.info(
      JSON.stringify({ service: 'assetforge-worker', status: 'stopped' }),
    );
  };

  process.once('SIGINT', () => void shutdown());
  process.once('SIGTERM', () => void shutdown());
}

void bootstrap().catch((error: unknown) => {
  console.error(
    JSON.stringify({
      service: 'assetforge-worker',
      status: 'failed',
      message: error instanceof Error ? error.message : 'Unknown startup error',
    }),
  );
  process.exitCode = 1;
});

// BullMQ processors are added with asset upload and processing workflows.
