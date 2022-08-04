#!/bin/bash

if [ ! -f "../.env" ]; then
  cp example.env .env
fi

npm install

npm run dev


