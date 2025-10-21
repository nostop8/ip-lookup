/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@ip-lookup/shared$': '<rootDir>/../shared/src/index.ts',
    '^@ip-lookup/shared/(.*)$': '<rootDir>/../shared/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '.*\\.(vue)$': '@vue/vue3-jest'
  },
  transform: {
    '^.+\\.(ts)$': ['ts-jest', {
      useESM: true
    }],
    '.*\\.(vue)$': '@vue/vue3-jest'
  },
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/?(*.)+(spec|test).(ts)'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/setup.test.ts'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,vue}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts}',
    '!src/**/*.spec.{ts}',
    '!src/main.ts',
    '!src/vite-env.d.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/src/setup.test.ts'],
  moduleFileExtensions: ['ts', 'vue', 'js'],
  testTimeout: 10000
};