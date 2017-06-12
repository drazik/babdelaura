#!/usr/bin/env bash

changed_files="$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD)"

check_run() {
    echo "$changed_files" | grep -E --quiet "$1" && eval "$2"
}

update_rights() {
    chmod -R 755 ./*
    chown -R laura:web./*
}

update_rights

# If package.json changed, npm install the new dependencies and delete unused packages
check_run package.json "npm install && npm prune"

# If a file changed in the assets directory, compile the assets
check_run assets "npm run compile"

# If composer.json or composer.lock changed, install the new dependencies
check_run composer "composer install"

update_rights
