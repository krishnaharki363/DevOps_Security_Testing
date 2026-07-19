const express = require('express');
const lodash = require('lodash');
const minimatch = require('minimatch');


const app = express();


app.get('/', (req, res) => {
  const obj = lodash.cloneDeep({
    message: 'Hello, DevSecOps by Krish Naharki!, Welcome to the world of secure coding and DevSecOps_practices in cloud class.',
  });


  const pattern = minimatch('.js', '.js');


  res.send(`${obj.message} (Pattern match: ${pattern})`);
});


module.exports = app;
