const Service = require('node-windows').Service
const svc = new Service({
  name: 'daraplusServer',
  description: 'DaraPlus backend application server',
  //script: '//Users//user//Applications//Backend//New_Dara_Backend//index.js',
  script: 'C:\\inetpub\\daraBack\\index.js',
})
svc.on('install', () => {
  svc.start()
})

svc.install()
