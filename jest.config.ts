import { createDefaultPreset } from 'ts-jest'

export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testMatch: ['**/tests/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        ...createDefaultPreset().transform,
    }
}