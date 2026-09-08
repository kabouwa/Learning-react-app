const fs = require('fs');

const loadConfig = () => {
    const configPath = '.env'
    const env = {};

    const data = fs.readFileSync(
        configPath,
        'utf-8'
    );

    data.split('\n').forEach(line => {
        line = line.trim();

        if (!line || line.startsWith('#')) return;

        const separator = line.indexOf('=');

        if(separator == -1) return;

        const key = line.slice(0, separator).trim();
        const value = line.slice(separator + 1).trim();

        env[key] = value;
    });

    return env;
}

const env = loadConfig();
const config = (key) => env[key];

module.exports = config;