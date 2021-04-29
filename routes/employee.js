const employeeService = require('../services/employee');
module.exports = function(router) {
  router.get('/employee/list', (req, res) => {
    employeeService.getListEmployee(req.employeeId).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
      res.status(404).send('Not found');
    })
  });

  router.get('/employee/list/all', (req, res) => {
    employeeService.getAllListEmployee().then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
      res.status(404).send('Not found');
    })
  });

  router.post('/employee/{employeeId}/end', (req, res) => {
    employeeService.employeeEndRegister(req.employeeId).then(() => res.status(200).send())
    .catch((error) => {
      res.status(404).send(error);
    })
  });

  router.post('/employee/{employeeId}/{deviceId}/start', (req, res) => {
    employeeService.employeeStartRegister(req.employeeId, req.deviceId, req.body.employee).then(() => res.status(200).send())
    .catch((error) => {
      res.status(404).send(error);
    })
  });

  router.post('/employee/{employeeId}/{deviceId}/ack', (req, res) => {
    employeeService.employeeAckRegister(req.employeeId, req.deviceId).then((data) => res.status(200).json(data))
    .catch((error) => {
      res.status(404).send(error);
    })
  });

  router.post('/employee/{deviceId}/done', (req, res) => {
    employeeService.employeeDonetRegister(req.deviceId).then(() =>        res.status(200).send()
    )
    .catch((error) => {
      res.status(404).send(error);
    })
  });

  router.post('/employee/{deviceId}/alert/{alarmaActiva}', (req, res) => {
    employeeService.getDeviceAlert(req.deviceId, req.alarmaActiva).then((data) => {
        res.status(200).json(data);
    }).catch((error) => {
      res.status(404).send('Not found');
    })
  });
}