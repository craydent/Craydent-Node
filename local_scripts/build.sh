rm -f ./package-lock.json &&
rm -Rf ./node_modules &&
npm install --only=dev &&
./local_scripts/buildProd.js &&
tsc &&
./local_scripts/copyModels.js &&
./local_scripts/copyGlobalTypes.js &&
./local_scripts/updateIndexProd.js &&
./local_scripts/copyIgnoreFile.js &&

tsc --lib es2017,dom --emitDeclarationOnly --declaration --outDir ./compiled ./modules/methods/* &&
./local_scripts/updateMethodDeclarations.js &&

./local_scripts/updateMainPackageDependenciesDev.js &&
npm install &&
./local_scripts/updateMainPackageDependenciesProd.js &&
./local_scripts/copyPackageJsonFile.js &&
./local_scripts/populateReadmes.sh &&

echo 'done'