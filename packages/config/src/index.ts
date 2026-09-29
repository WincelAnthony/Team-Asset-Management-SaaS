import dotenv from 'dotenv';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';

const workspaceRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../../../',
);
dotenv.config({ path: resolve(workspaceRoot, '.env'), override: false });

const baseSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  STORAGE_ENDPOINT: z.string().url(),
  STORAGE_REGION: z.string().min(1),
  STORAGE_ACCESS_KEY: z.string().min(1),
  STORAGE_SECRET_KEY: z.string().min(1),
  STORAGE_BUCKET: z.string().min(3),
});

export type ServerEnvironment = z.infer<typeof baseSchema>;

export function parseServerEnvironment(
  source: NodeJS.ProcessEnv = process.env,
): ServerEnvironment {
  const result = baseSchema.safeParse(source);

  if (!result.success) {
    const fields = result.error.issues
      .map((issue) => issue.path.join('.'))
      .join(', ');
    throw new Error(`Invalid server environment configuration: ${fields}`);
  }

  return result.data;
}
