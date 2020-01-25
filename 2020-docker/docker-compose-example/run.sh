set -ex

rootPath=$(git rev-parse --show-toplevel)

docker-compose -f "$rootPath"/2020-docker/docker-compose-example/docker-compose.yaml -p prosvita up -d
