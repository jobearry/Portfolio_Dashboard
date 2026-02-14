const fs = require('fs');
const path = require('path');
const { title } = require('process');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

function writeEnv(filePath, obj) {
  const content = `export const environment = ${JSON.stringify(obj, null, 2)};`;
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, { encoding: 'utf8' });
  console.log('Wrote', filePath);
}

const githubToken = process.env.GITHUB_TOKEN || '';

const prod = {
  production: true,
  githubToken: githubToken,
  title: null
};

const dev = {
  production: false,
  githubToken: githubToken,
  title: "DEV"
};

const example = {
  production: false,
  githubToken: '',
  title: "SAMPLE"
};

const outProd = path.join('src', 'environments', 'environment.ts');
const outDev = path.join('src', 'environments', 'environment.development.ts');
const outSample = path.join('src', 'environments', 'environment.example.ts');

writeEnv(outProd, prod);
writeEnv(outDev, dev);
writeEnv(outSample, example);

console.log('[GEN:ENV] Environment generation complete.');
