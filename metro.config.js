const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Firebase uses .cjs files
config.resolver.sourceExts.push('cjs');

// Disable the problematic "exports" field resolution to fix the "file not found" error on Windows
config.resolver.unstable_enablePackageExports = false;

// Prioritize react-native fields in package.json
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config;
