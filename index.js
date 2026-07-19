const express = require('express');
const lodash = require('lodash');
const minimatch = require('minimatch');


const app = express();


app.get('/', (req, res) => {
  const obj = lodash.cloneDeep({
<<<<<<< HEAD
    message: 'Hello, DevSecOps! I am Krish Naharki, Welcome to the world of secure coding and DevSecOps_practices in cloud class.',
=======
    message: 'Hello, DevSecOps by Krish Naharbrhffehhf dnc ndf jndfni!, Welcome to the world of secure coding and DevSecOps practices in cloud class.',
>>>>>>> main
  });


  const pattern = minimatch('.js', '.js');


  res.send(`${obj.message} (Pattern match: ${pattern})`);
});


module.exports = app;
