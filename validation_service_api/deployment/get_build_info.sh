this_dir=`dirname "$0"`
echo "{\"git\": \"${CI_COMMIT_SHORT_SHA}\", \"target\": \"$1\", \"date\": \"${CI_JOB_STARTED_AT}\"}" > $this_dir/build_info.json