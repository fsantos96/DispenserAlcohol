const moment = require('moment');
const devicesList = [],
    minLevel = null,
    dateFormat = "YYYY/MM/DD HH:mm";
var timeAck = 13,
    timeCharge = 12;

//dispositivo
// {
//     id
//     lastUpdateDate
//     hasACK
//     employeeACK
// }

function getTimeConfiguration() {
    return {
        timeAck: timeAck * 60000,
        timeCharge: timeCharge * 60000
    }
}

function deviceRegister(deviceId) {
    return new Promise((resolve, reject) => {
        const indexDevice = devicesList.find(d => d.id == deviceId);
        if (!indexDevice || indexDevice === -1) {
            devicesList.push({
                id: deviceId,
                lastUpdateDate: moment().format(dateFormat),
                hasACK: false,
                employeeACK: null
            });
        }

        resolve();
    })
}

function setAckData(deviceId, data) {
    var index = devicesList.findIndex(d => d.id == deviceId);
    if (index != -1) {
        devicesList[index].hasACK = data.hasACK;
        devicesList[index].employeeACK = data.employeeACK;
    }
}

function setLastUpdateDate(deviceId) {
    return new Promise((resolve, reject) => {
        const indexDevice = devicesList.find(d => d.id === deviceId.id);
        if (indexDevice && indexDevice !== -1) {
            devicesList[indexDevice].lastUpdateDate = moment().format(dateFormat);
        }

        resolve();
    })
}

function validateTime(deviceId, typeTime) {
    const indexDevice = devicesList.findIndex(d => d.id == deviceId);
    var isExpired = false;
    console.log(devicesList)
    console.log(indexDevice)
    if (indexDevice != -1) {
        const momentDate = moment(devicesList[indexDevice].lastUpdateDate, dateFormat);
        const momentNoW = moment();
        const momentDifference = momentNoW.valueOf() - momentDate.valueOf();
        isExpired = typeTime === "ack" ? momentDifference > timeAck : momentDifference > timeCharge;
    }

    return isExpired;
}

function getDeviceDataPromise(deviceId) {
    return new Promise((resolve, reject) => {
        var device = devicesList.find(d => d.id === deviceId);

        resolve(device || null)
    })
}

function getDeviceData(deviceId) {

    var device = devicesList.find(d => d.id === deviceId);

    return device || null;
}

function setAlarmsTimes(data) {
    return new Promise((resolve, reject) => {
        timeAck = data.timeAck;
        timeCharge = data.timeCharge;

        resolve(getTimeConfiguration);
    })
}

function getAllDevice(data) {
    return new Promise((resolve, reject) => {
        resolve(devicesList);
    })
}
const service = {
    deviceRegister: deviceRegister,
    setLastUpdateDate: setLastUpdateDate,
    validateTime: validateTime,
    getTimeConfiguration: getTimeConfiguration,
    getDeviceData: getDeviceData,
    getDeviceDataPromise: getDeviceDataPromise,
    setAckData: setAckData,
    setAlarmsTimes: setAlarmsTimes,
    getAllDevice: getAllDevice
}

module.exports = service;