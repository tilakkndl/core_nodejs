const os = require("os");
// console.log(os.EOL);
// console.log(os.availableParallelism())
// console.log(os.arch())
// console.log(os.constants)
// console.log(os.cpus())
// console.log(os.devNull)
// console.log(os.getPriority())
// console.log(os.homedir())
// console.log(os.hostname())
// console.log(os.loadavg())
// console.log(os.machine())
// console.log(os.networkInterfaces())
// console.log(os.release())

console.log("My laptop model is "+ os.cpus()[0].model);
console.log("Laptop's CPU logical core is "+ os.availableParallelism())
console.log("Free space is "+ os.freemem()/(1000*1000*1000)+ " gb")
console.log("Home directory is "+ os.homedir())
console.log("My os type  is "+ os.type() )
console.log("Total free system space is "+ os.totalmem() +" byte")
console.log("Ths user info is ");
console.log(os.userInfo())
