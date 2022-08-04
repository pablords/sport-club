#!/bin/bash

if [ ! -f "../.env"]; then
  cp example.env .env
fi

yarn

yarn start:dev
