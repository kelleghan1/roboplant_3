const express = require('express');
const router = express.Router();
const moment = require('moment');
const pg = require('pg');
const path = require('path');
const conString = "postgres://postgres:postgres@localhost:5432/cultivato";

const client = new pg.Client(conString);
client.connect();

const knex = require('knex')({
  client: 'postgres',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'cultivato'
  }
});


router.get("/get_client_list", function(req, res){

  knex('clients')
  .then(function(clientList){
    res.send(clientList);
  })

})


router.get("/submit_client/:clientName", function(req, res){

  knex('clients').where('client_name', req.params.clientName)
  .then(function(result){

    if (!result[0]) {

      res.send({clientChecked: true, clientExists: false});

    } else {

      res.send({clientChecked: true, clientExists: true, clientId: result[0].client_id});

    }

  })

});



router.post("/create_client", function(req, res){

  knex('clients').returning('client_id').insert({client_name: req.body.clientName})
  .then(function(insertResult){

    res.send({clientExists: false, clientId: insertResult[0]});

  });


});




router.get("/get_client/:clientId", function(req, res){

  var clientObj = {
    clientId: req.params.clientId,
    clientName: '',
    workers: [],
    modules: []
  };

  knex('modules').where({client_id: req.params.clientId})
  .then(function(modulesResult){

    knex('workers').where({client_id: req.params.clientId})
    .then(function(workersResult){

      clientObj.workers = workersResult;

      var updateModuleArr = function(i){

        if (i <= modulesResult.length - 1) {

          knex('temperature_readings').where({module_id: modulesResult[i].module_id}).orderBy('time', 'desc').first()
          .then(function(tempResult){

            modulesResult[i].temperature_reading = tempResult != undefined ? tempResult.temperature_reading : null;

            knex('humidity_readings').where({module_id: modulesResult[i].module_id}).orderBy('time', 'desc').first()
            .then(function(humidityResult){

              modulesResult[i].humidity_reading = humidityResult != undefined ? humidityResult.humidity_reading : null;

              knex('weight_readings').where({module_id: modulesResult[i].module_id}).orderBy('time', 'desc').first()
              .then(function(weightResult){

                modulesResult[i].weight_reading = weightResult != undefined ? weightResult.weight_reading : null;

                clientObj.modules.push(modulesResult[i]);
                updateModuleArr(i + 1);

              });

            });

          })

        } else {

          res.send(clientObj);
          return;

        }

      };

      updateModuleArr(0);

    });

  });

});


router.get("/get_module/:moduleId", function(req, res){

  console.log('$$$$TEST');
  var moduleId = parseInt(req.params.moduleId);
  var moduleObj = {};

  console.log('MOD', moduleId);

  knex('temperature_readings').where({module_id: moduleId}).orderBy('time', 'desc').limit(150)
  .then(function(temperatureResult){

    moduleObj.temperatureReadings = temperatureResult.reverse();

    knex('humidity_readings').where({module_id: moduleId}).orderBy('time', 'desc').limit(150)
    .then(function(humidityResult){

      moduleObj.humidityReadings = humidityResult.reverse();

      knex('weight_readings').where({module_id: moduleId}).orderBy('time', 'desc').limit(150)
      .then(function(weightResult){

        moduleObj.weightReadings = weightResult.reverse();
        res.send(moduleObj);

      });

    });

  });

});


router.post('/create_module', function(req, res) {
  var clientId = req.body.clientId;
  var moduleName = req.body.moduleName;
  var moduleType = req.body.moduleType;

  knex('modules').where({client_id: clientId})
  .then(function(modulesResult){

    for (var i = 0; i < modulesResult.length; i++) {
      if (modulesResult[i].module_name == moduleName) {
        res.send({moduleExists: true});
        return;
      }
    };

    knex('modules').insert({client_id: clientId, module_name: moduleName, module_type: moduleType, sensor_id: 0, scale_id: 0})
    .then(function(insertResult){
      res.send(insertResult);
    })

  })

});


router.post('/update_module', function(req, res, next) {

  var moduleId = parseInt(req.body.moduleId);

  var updateObj = {
    sensor_id: req.body.sensorId === '' ? 0 : parseInt(req.body.sensorId),
    scale_id: req.body.scaleId === '' ? 0 : parseInt(req.body.scaleId),
    module_notes: req.body.moduleNotes
  }

  knex('modules').where({sensor_id: updateObj.sensor_id})
  .update({sensor_id: 0})
  .then(function(clearSensor){

    knex('modules').where({scale_id: updateObj.scale_id})
    .update({scale_id: 0})
    .then(function(clearScale){

      knex('modules').where({module_id: moduleId})
      .update(updateObj)
      .then(function(moduleResult){

        res.send(JSON.stringify(moduleResult));

      });

    });

  });

});


router.post('/delete_module', function(req, res, next) {

  knex('modules').where({module_id: req.body.moduleId}).del()
  .then(function(deleteRes){

    res.send({deleted: deleteRes});

  })

});


router.post('/create_worker', function(req, res, next) {

  var clientId = parseInt(req.body.clientId);
  var workerName = req.body.workerName;

  knex('workers').insert({client_id: clientId, worker_name: workerName})
  .then(function(insertResult){
    res.send(insertResult);
  })

});


router.post('/update_worker', function(req, res, next) {

  var workerId = req.body.worker_id;
  var workerActive = req.body.active;

  knex('workers').where({'worker_id': workerId})
  .update({'active': workerActive})
  .then(function(updateResult){
    res.send({"updateResult": updateResult});
  })

});


router.post("/post_data/:data", function(req, res){

  var sensorRequest = JSON.parse(req.params.data);
  var date = moment(new Date());

  if (sensorRequest.hum1) {

    knex('modules').where({sensor_id: sensorRequest.sensorid})
    .then(function(moduleResult){

      if (moduleResult.length) {

        knex('humidity_readings').insert({module_id: moduleResult[0].module_id, humidity_reading: parseFloat(sensorRequest.hum1), sensor_id: sensorRequest.sensorid, time: date})
        .then(function(res){

          var io = req.app.get('socketio');
          io.emit('humidity', { clientId: moduleResult[0].client_id, moduleId: moduleResult[0].module_id, humidity: parseFloat(sensorRequest.hum1) + '', time: date});

          knex('temperature_readings').insert({module_id: moduleResult[0].module_id, temperature_reading: parseFloat(sensorRequest.temp1), sensor_id: sensorRequest.sensorid, time: date})
          .then(function(res1){

            var io = req.app.get('socketio');
            io.emit('temperature', {clientId: moduleResult[0].client_id, moduleId: moduleResult[0].module_id, temperature: parseFloat(sensorRequest.temp1) + '', time: date});

            return;

          });

        });

      };

    });

  } else if (sensorRequest.hasOwnProperty('weight1')) {

    knex('modules').where({scale_id: sensorRequest.sensorid})
    .then(function(moduleResult){

      if (moduleResult.length) {

        knex('weight_readings').insert({module_id: moduleResult[0].module_id, weight_reading: parseFloat(sensorRequest.weight1), sensor_id: sensorRequest.sensorid, time: date})
        .then(function(res3){

          var io = req.app.get('socketio');
          io.emit('weight', {clientId: moduleResult[0].client_id, moduleId: moduleResult[0].module_id, weight: parseFloat(sensorRequest.weight1) + '', time: date});

          return;

        });

      };

    });

  };

});



module.exports = router;
