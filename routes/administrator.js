const managerService = require('../services/administrator');
module.exports = function(router) {
  router.get('/manager', (req, res) => {
    managerService.getListManagersPromise(req.query.id).then((data) => {
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

  router.delete('/manager', (req, res) => {
    managerService.deleteManager(req.query.id).then((data) => res.status(200).send(data))
    .catch((error) => {
      res.status(404).send(error);
    })
  });
}