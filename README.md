# I am robot

## Preface
- Developed and tested with `bash@3.2`, `node@8.9` and `npm@6.1`
- To install and run the game a `Bourne` compatible shell is needed. I recommend `Bash`.

## Install
- Make sure the install script is executable: `chmod +x install.sh`
- Execute `./install.sh` from shell in the root folder of the project.

## Commands
Note: commands can be executed from anywhere in the filesystem.
- `place <0..4> <0..4> <NORTH|EAST|SOUTH|WEST>` Places the robot on the table grid. Example `place 0 0 NORTH`
- `report` The robot reports its position.
- `left` The robot makes a quarter turn anti-clockwise.
- `right` The robot makes a quarter turn clockwise.
- `move` The robot moves forward in its current direction.

## Uninstall
Note: All the global commands will be removed and the server will be stopped.
- Make sure the uninstall script is executable: `chmod +x uninstall.sh`
- Execute `./uninstall.sh` from shell in the root folder of the project.
