BASEDIR=$(dirname "$0")

find $BASEDIR/../compiled -name '*.js' -exec bash -c "closure-compiler --js {} --js_output_file {}.min --compilation_level WHITESPACE_ONLY && mv {}.min {}; echo 'minified {}'" \;