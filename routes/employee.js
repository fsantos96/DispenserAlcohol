const employeeService = require('../services/employee');
module.exports = function(router) {
  router.get('/employee/list', (req, res) => {
    employeeService.getListEmployee(req.employeeId).then((data) => {
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

  router.post('/employee/{employeeId}/start', (req, res) => {
    employeeService.employeeStartRegister(req.employeeId, req.body.employee).then(() => res.status(200).send())
    .catch((error) => {
      res.status(404).send(error);
    })
  });

  router.post('/employee/{employeeId}/{deviceId}/ack', (req, res) => {
    employeeService.employeeAckRegister(req.employeeId, req.deviceId).then(() => res.status(200).send())
    .catch((error) => {
      res.status(404).send(error);
    })
  });

  router.post('/employee/{employeeId}/done', (req, res) => {
    employeeService.employeeDonetRegister(req.employeeId, req.body.employee).then(() => res.status(200).send())
    .catch((error) => {
      res.status(404).send(error);
    })
  });
}