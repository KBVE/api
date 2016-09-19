#!/bin/bash
set -x
if [ $TRAVIS_BRANCH == 'master' ] ; then
    # Initialize a new git repo in _site, and push it to our server.
    git init

    git remote add deploy "root@kbve.com:/var/lib/lxc/api/rootfs/home/ubuntu/api"
    git config user.name "Travis CI"
    git config user.email "travis@imsean.me"

    git add .
    git commit -m "Deploy"
    git push --force deploy master
else
    echo "Not deploying, since this branch isn't master."
fi
