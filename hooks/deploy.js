// http://nodejs.org/api.html#_child_processes
var exec = require('child_process').exec
// executes `pwd`
exec('sudo pm2 kill', function (error, stdout, stderr) {
  console.log('stdout: ' + stdout)
  console.log('stderr: ' + stderr)
  if (error !== null) {
    console.log('exec error: ' + error)
  }
})
