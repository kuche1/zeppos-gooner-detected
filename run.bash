#! /usr/bin/env bash

set -euo pipefail

# TODO: and cwd ?

rm utils/ai_animation_radar.js utils/device_info.js utils/music_player.js || true
esbuild utils/ai_animation_radar.ts utils/device_info.ts utils/music_player.ts --outdir=utils

zeus dev
