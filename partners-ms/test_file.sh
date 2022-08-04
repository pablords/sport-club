
#!/bin/bash
set -e

# module=$1
# source=$2
# file=$3

read -p "Digite o nome do module: " module
read -p "Digite o nome da pasta: " source
read -p "Digite o nome do test: " file


npx jest --watch ./__test__/unit/src/$module/$source/$file-unit.test.ts