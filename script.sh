# !/usr/bin/bash

cd back-end
make DockerBuild

cd ../front-end
make DockerBuild

cd ..