#! /usr/bin/env bash

set -euo pipefail

#########################################

# cwd
cd "$(dirname "${BASH_SOURCE[0]}")"

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

zeus build
# this will automatically delete the old package from dist/

zeus install --path . --target 'Amazfit Bip Max'

# this does not display the images properly on the simulator
# zeus install --path dist/*.zab --target 'Amazfit Bip Max'

### we don't want to keep on watching for any new changes in the project
# # run on simulator
# zeus dev --target 'Amazfit Bip Max'
