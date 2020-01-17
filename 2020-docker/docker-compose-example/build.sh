#!/usr/bin/env bash

set -ex

rootPath=$(git rev-parse --show-toplevel)

path1=$rootPath/docker2020/docker-compose-example/front
docker build -t prosvita-front $path1

path2=$rootPath/docker2020/docker-compose-example/back
docker build -t prosvita-back $path2
