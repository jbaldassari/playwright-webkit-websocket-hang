#!/bin/sh

if [ $# -ne 1 ]; then
  echo "Usage: $0 <test-file.js>"
  exit 0
fi

TEST="$1"

while [ true ]; do
  node $TEST
done

