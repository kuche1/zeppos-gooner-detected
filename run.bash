#! /usr/bin/env bash

set -euo pipefail

# TODO: and cwd ?

#########################################

# delete old js
find page/ utils/ -name '*.js' -delete

#########################################

# check types, generate .js
tsc

#########################################

# dependency:
# npm i -D eslint typescript-eslint typescript
## actually, i think this is for the .lock (as to speak) file

# linter
npx eslint utils
# if you dont have this installed you will get a prompt

#########################################

### we are now using `tsc` with `"noEmit": false` for this
# add new js
# esbuild utils/ai_animation_radar.ts utils/device_info.ts utils/music_player.ts utils/screen.ts --outdir=utils

#########################################

# run on simulator
zeus dev --target 'Amazfit Bip Max'
# TODO: kill after like 1sec or something
