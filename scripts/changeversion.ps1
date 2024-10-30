# I created this script because 'nvm use' command doesn't seem to work with NVM for Windows on my machine.

$nvm_version = Get-Content .nvmrc 
nvm install $nvm_version
nvm use $nvm_version