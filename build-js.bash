#! /usr/bin/env bash

set -euo pipefail

# TODO: and cwd ?

rm utils/ai_animation_radar.js utils/device_info.js || true
esbuild utils/ai_animation_radar.ts utils/device_info.ts --outdir=utils
