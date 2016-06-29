//TODO: Use github web hook for auto deploy
var exec = require('child_process').exec

exec('sudo pm2 kill', function (error, stdout, stderr) {
  console.log('stdout: ' + stdout)
  console.log('stderr: ' + stderr)
  if (error !== null) {
    console.log('exec error: ' + error)
  }
})
