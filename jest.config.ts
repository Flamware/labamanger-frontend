export { };

module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!**/vendor/**'
    ],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    transform: {
        ".(ts|tsx)": "ts-jest"
    },
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/coverage",
        "package.json",
        "package-lock.json",
        "reportWebVitals.ts",
        "setupTests.ts",
        "index.tsx"
    ],
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],

    // ✅ Add this section
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    }
};
