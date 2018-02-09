BASEDIR=$(dirname "$0")
cd $BASEDIR;
./updateMainPackageDependencies.js nopublish private && ./compile_submodules.js && ./populateReadmes.sh;