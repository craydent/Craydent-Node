BASEDIR=$(dirname "$0")

cd $BASEDIR;
./compile_submodules.js publish && ./populateReadmes.sh && npmpublish.sh;