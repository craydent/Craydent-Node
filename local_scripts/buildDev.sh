npm install --only=dev &&
./local_scripts/buildDev.js &&
tsc &&
./local_scripts/copyPackageJsonFile.js &&
./local_scripts/updateMainPackageDependenciesDev.js &&
./local_scripts/updateIndexDev.js &&
npm install &&
./local_scripts/populateReadmes.sh