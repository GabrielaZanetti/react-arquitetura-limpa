module.exports = {
    preset: 'ts-jest',
    modulePaths: ['<rootDir>/src/'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    testMatch: ['**/__tests__/**/*.test.tsx'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
};