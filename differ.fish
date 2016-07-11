#!/usr/local/bin/fish

set -l previous_timestamp (ls -d1 -- */ | sort -r | head -1)

set -l timestamp (date "+%Y-%m-%dT%H:%M:%S")
mkdir $timestamp
phantomjs snapshotter.js $timestamp


pushd $timestamp
for page in *
  compare -metric RMSE ../$previous_timestamp/$page ../$timestamp/$page -compose Src ../diff-$page
  echo Result of the comparison is $comparison
  if test "0 (0)" != $comparison
    echo $page different
  end
end

popd