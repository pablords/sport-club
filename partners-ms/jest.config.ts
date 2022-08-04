
export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  watchman: true,
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/__test__/setup.ts"],
  collectCoverageFrom: [
    "!**/node_modules/**",
    "!**/vendor/**",
    "!__test__/**",
    "src/**/**.{js,ts}"
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/infra/models",
    "<rootDir>/src/infra/db",
    "<rootDir>/src/infra/services/redis",
    "<rootDir>/src/app/core/entity"
  ]
}
