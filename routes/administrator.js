const managerService = require('../services/administrator');
module.exports = function(router) {
  router.get('/manager/{managerId}', (req, res) => {
    managerService.getListManagers(req.managerId).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
      res.status(404).send('Not found');
    })
  });

  router.post('/manager/', (req, res) => {
    managerService.addOrUpdateManager(req.body).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
      res.status(404).send('Not found');
    })
  });

  router.delete('/manager/{managerId}', (req, res) => {
    managerService.deleteManager(req.employeeId).then(() => res.status(200).send())
    .catch((error) => {
      res.status(404).send(error);
    })
  });
}