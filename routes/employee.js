const employeeService = require('../services/employee');
module.exports = function(router) {
  router.get('/employee/list', (req, res) => {
    employeeService.getListEmployee(req.query.employeeId).then((data) => {
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

  router.post('/employee/end', (req, res) => {
    employeeService.employeeEndRegister(req.query.employeeId).then(() => res.status(200).send())
    .catch((error) => {
      res.status(404).send(error);
    })
  });

  router.post('/employee/start', (req, res) => {
    employeeService.employeeStartRegister(req.query.employeeId, req.query.deviceId, req.body.employee).then(() => res.status(200).send())
    .catch((error) => {
      res.status(404).send(error);
    })
  });

  router.get('/employee/ack', (req, res) => {
    employeeService.employeeAckRegister(req.query.employeeId, req.query.deviceId).then((data) => res.status(200).json(data))
    .catch((error) => {
      res.status(404).send(error);
    })
  });

  router.post('/employee/done', (req, res) => {
    employeeService.employeeDonetRegister(req.query.deviceId).then(() =>        res.status(200).send()
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