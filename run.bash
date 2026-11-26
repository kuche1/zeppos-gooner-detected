#! /usr/bin/env bash

set -euo pipefail

# TODO: and cwd ?

# check types
tsc

# delete old js
rm utils/ai_animation_radar.js utils/device_info.js utils/music_player.js || true

# add new js
esbuild utils/ai_animation_radar.ts utils/device_info.ts utils/music_player.ts --outdir=utils

# run on simulator
zeus dev
