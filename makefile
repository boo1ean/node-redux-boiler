build:
	./node_modules/webpack/bin/webpack.js --verbose --colors --display-error-details --config webpack/prod.config.js

dev-server:
	node bin/dev-server.js
