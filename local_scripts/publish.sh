BASEDIR=$(dirname "$0")

cd $BASEDIR;
./compile_submodules.js && ./populateReadmes.sh && ./compile_submodules.js publish && ./updateMainPackageDependencies.js publish public && ./npmpublish.sh;