import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    extends: './vitest.config.ts',
    test: {
      name: 'unit-tests',
      environment: 'node',
    }
  },
  {
    extends: './vitest.config.ts',
    test: {
      include: ['src/application/controllers/**.e2e-spec.ts'],
      name: 'e2e-tests',
      environment: 'prisma/vitest-environment-prisma/prisma-test-environment.ts'
    }
  }
]);