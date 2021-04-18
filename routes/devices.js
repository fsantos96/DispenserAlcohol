const deviceService = require('../services/device');
module.exports = function(router) {
  router.post('/device', (req, res) => {
    deviceService.deviceRegister(req.body.device).then(() => {
        res.status(200).send();
    }).catch((error) => {
      res.status(404).send('Not found');
    })
  });

  router.post('/device/lastUpdateDate/{deviceId}', (req, res) => {
    deviceService.setLastUpdateDate(req.deviceId).then(() => {
        res.status(200).send();
    }).catch((error) => {
      res.status(404).send('Not found');
    })
  });

  router.get('/device', (req, res) => {
    deviceService.getDeviceData(req.deviceId).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
      res.status(404).send('Not found');
    })
  });


}