const branchName = process.env['GITHUB_REF'].replace('refs/heads/', '');
console.log('Branch: ' + branchName);

const packageVersion = require('../../package.json').version;
console.log('Package: ' + packageVersion);

if (branchName == `release-${packageVersion}`) {
  console.log('Branch name matches version in package.json');
  process.exit(0);
}

if (branchName.startsWith('release-')) {
  console.log('Branch name DOES NOT match version in package.json');
  process.exit(1);
}

console.log('Not a release branch');
