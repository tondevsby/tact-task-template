export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  snapshotSerializers: ["@tact-lang/ton-jest/serializers"],
  globalSetup: "./jest.setup.ts",
  globalTeardown: "./jest.teardown.ts",
};
