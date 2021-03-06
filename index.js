'use strict';
const _ = require('lodash');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('method-override')());

let mapping = {};
let logging = {};

const treeKill = require('tree-kill');

app.listen(4444, function () {
})

app.get('/kill/:name', function (req, res) {
    treeKill(mapping[req.params.name], 'SIGKILL', function (err) {
        if (err) {
            res.status(500).send();
        } else {
            res.send();
        }
    });
})

app.post('/dir', function (req, res) {
    process.chdir(req.body.dir);
    res.send('OK');
})

app.post('/cmd', function (req, res) {
    const out = require('child_process').execSync(req.body.cmd, 'utf-8');
    res.send(out.toString());
})

app.post('/cmd/:name', function (req, res) {

    const arr = req.body.cmd.split(' ');
    const first = arr.shift();

    const nodeProcess = require('child_process').spawn(first, arr);

    logging[req.params.name] = '';

    nodeProcess.stdout.on('data', function (data) {
        logging[req.params.name] += data.toString() + '<br>';
    });

    nodeProcess.stderr.on('data', function (data) {
        logging[req.params.name] += data.toString() + '<br>';
    });

    mapping[req.params.name] = nodeProcess.pid;

    res.send("OK");
})

app.get('/logging/:name', function (req, res) {
    res.send(logging[req.params.name]);
})