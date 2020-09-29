npm install --only=dev &&
./local_scripts/buildProd.js &&
tsc &&
./local_scripts/copyPackageJsonFile.js &&
./local_scripts/updateMainPackageDependenciesDev.js &&
./local_scripts/updateIndexDev.js &&
npm install &&
./local_scripts/updateMainPackageDependenciesProd.js &&
./local_scripts/populateReadmes.sh &&
./local_scripts/updateIndexProd.js