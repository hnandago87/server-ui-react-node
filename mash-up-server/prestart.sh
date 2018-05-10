#!/bin/bash
npm run -s build
npm install --save mongodb
node db-setup.js