#! /usr/bin/env bash

set -euo pipefail

# TODO: and cwd ?

rm utils/device_info.js || true
esbuild utils/device_info.ts --outdir=utils
