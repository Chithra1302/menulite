import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./src",
  testRegex: ".*\\.spec\\.ts$",
  moduleNameMapper: {
    "^@common/(.*)$": "<rootDir>/common/$1",
    "^@menu/(.*)$": "<rootDir>/menu/$1",
  },
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "./tsconfig.test.json" }],
  },
  coverageDirectory: "../coverage",
  collectCoverageFrom: ["**/*.ts", "!**/*.spec.ts", "!**/main.ts"],
};

export default config;
