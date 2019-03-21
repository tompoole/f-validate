module.exports = {
    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],

    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif||svg|)$': '<rootDir>/fileMock.js',
        '\\.(css|scss)$': '<rootDir>/styleMock.js'
    },

    transform: {
        '^.+\\.js$': 'babel-jest'
    },

    collectCoverageFrom: [
        'assets/js/**/*.js',
        '!assets/js/shims/**',
        '!**/locales/**',
        '!**/node_modules/**'
    ],

    testURL: 'http://localhost/',

    snapshotSerializers: [
    ]
};
