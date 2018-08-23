#!/usr/bin/env bash

chmod +x place/cli.js
npm install place -g

chmod +x report/cli.js
npm install report -g

chmod +x left/cli.js
npm install left -g

chmod +x right/cli.js
npm install right -g

npm install

npx pm2 start server.js

echo INSTALLED
