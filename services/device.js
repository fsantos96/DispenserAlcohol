const moment = require('moment');
const devicesList = [],
minLevel = null,
timeAck = 13,
timeCharge= 12,
dateFormat = "YYYY/MM/DD HH:mm";

//dispositivo
// {
//     id
//     lastUpdateDate
// }

function getTimeConfiguration(device) {
    return {
        timeAck: timeAck,
        timeCharge: timeCharge
    }
}

function deviceRegister(device) {
    return new Promise((resolve, reject) => {
        const indexDevice = devicesList.find(d => d.id === device.id);
        if(indexDevice === -1) {
            devicesList.push({
                id: device.id,
                lastUpdateDate: moment().format(dateFormat),
                hasAlcohol: true
            });
        }

        resolve();
    })
}

function setLastUpdateDate(deviceId){
    return new Promise((resolve, reject) => {
        const indexDevice = devicesList.find(d => d.id === device.id);
        if(indexDevice !== -1) {
            devicesList[indexDevice].lastUpdateDate = moment().format(dateFormat);
        }

        resolve();
    })
}

function validateTime(deviceId, typeTime){
    return new Promise((resolve, reject) => {
        var response = {};
        const indexDevice = devicesList.find(d => d.id === deviceId);
        const propertyName = typeTime === "ack" ? "isAckTimingExpired" : "isChargeTimingExpired";
        var isExpired = false;
        if(indexDevice !== -1) {
            const momentDate = moment(devicesList[indexDevice].lastUpdateDate, dateFormat);
            const momentNoW = moment();
            const momentDifference = momentNoW.valueOf() - momentDate.valueOf();
            isExpired = typeTime === "ack" ? momentDifference > timeAck : momentDifference > timeCharge;
        }

        response[propertyName] = isExpired;
        resolve(response);
    })
}

function getDeviceData(deviceId) {
    return new Promise((resolve, reject) => {
        resolve({
            var1: "test",
            var2: "test"
        })
    })
}
const service = {
    deviceRegister: deviceRegister,
    setLastUpdateDate: setLastUpdateDate,
    validateTime: validateTime,
    getTimeConfiguration: getTimeConfiguration,
    getDeviceData: getDeviceData
}

module.exports = service;