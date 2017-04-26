const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
    name: 'RemoteControl',
    description: 'RemoteControl',
    script: require('path').resolve(__dirname, 'index.js')
});

svc.on('install', function () {
    svc.start();
});

svc.install();