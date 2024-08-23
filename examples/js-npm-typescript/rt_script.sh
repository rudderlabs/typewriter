cd ../../
npm run build
cd dist
npm install
node . $1 --config=../examples/js-npm-typescript 
