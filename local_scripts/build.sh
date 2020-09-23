npm install --only=dev &&
./local_scripts/buildProd.js &&
tsc &&
./local_scripts/copyPackageJsonFile.js &&
./local_scripts/updateMainPackageDependenciesProd.js &&
./local_scripts/updateIndexProd.js &&
npm install &&
./local_scripts/populateReadmes.sh