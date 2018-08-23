#!/usr/bin/env bash

npx pm2 stop server.js

npm uninstall place -g

npm uninstall report -g

npm uninstall left -g

npm uninstall right -g

npm uninstall move -g

echo UNINSTALLED