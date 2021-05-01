const deviceService = require('./device');
const adminService = require('./administrator');
const employeeList = [],
devicesList = [];
//empleado
// {
//     id
//     name
//     enabled
// }

//dispositivo
// {
//     id
//     lastUpdateDate
//     hasAlcohol
// }


function getListEmployee(employeeId) {
    return new Promise((resolve, reject) => {
        var employeeListFiltered = [];
        if(employeeId) {
            employeeListFiltered = employeeList.find(e => e.id !== employeeId);
        }
    
        resolve({
            employees: employeeId ? employeeListFiltered : employeeList.filter(e => e.enabled)
        });
    })
}

function getAllListEmployee(employeeId) {
    return new Promise((resolve, reject) => {
        resolve({
            employees: employeeList
        });
    })
}

function getDeviceAlert(deviceId, alarmaActiva) {
    return new Promise((resolve, reject) => {
        if(alarmaActiva == 0) {
            deviceService.setLastUpdateDate(deviceId);
            resolve({amountManagers: employeeList.length, managers: employeeList, alert: 1 })
        } else {
            var device = deviceService.getDeviceData(deviceId);
            var managers = adminService.getListManagers();
            var typeTime = !device.hasACK ? "ack" : "charge";

            if(deviceService.validateTime(deviceId, typeTime)) {

                const response = {amountManagers: managers.length, managers: managers, alert: device.hasACK ? 3 : 2, employeeACK: device.employeeACK  };
                console.log(response)
                resolve(response)
                return;
            }

            resolve({amountManagers: 0, alert: 0});
        }
    })
}

function employeeEndRegister(employeeId) {
    return new Promise((resolve, reject) => {
        if(!employeeId) {
            reject();
        }

        const indexEmployee = employeeList.findIndex(e => e.id == employeeId);
        if(indexEmployee !== -1) {
            employeeList[indexEmployee].enabled = false;
        }

        resolve();
    })
}

function employeeStartRegister(employeeId, deviceId, employee) {
    return new Promise((resolve, reject) => {
        const indexEmployee = employeeList.findIndex(e => e.id == employeeId);
        if(indexEmployee !== -1) {
            employeeList[indexEmployee].enabled = true;
        } else {
            employeeList.push(employee);
        }

        deviceService.deviceRegister(deviceId)

        resolve();
    })
}

function employeeAckRegister(employeeId, deviceId) {
    return new Promise((resolve, reject) => {
        const indexEmployee = employeeList.findIndex(e => e.id == employeeId);
        if(indexEmployee !== -1) {
            deviceService.setAckData(deviceId , {
                hasACK: true,
                employeeACK: employeeList[indexEmployee].name
            })
        }
        
        const employees = employeeList.filter(e => e.id != employeeId && e.enabled);
        resolve({amountEmployee: employees.length , employees: employees});
    })
}

function employeeDoneRegister(deviceId, employeeId) {
    return new Promise((resolve, reject) => {
        deviceService.setAckData(deviceId , {
            hasACK: false,
            employeeACK: null
        })

        const employees = employeeList.filter(e => e.id != employeeId && e.enabled);

        resolve({amountEmployee: employees.length , employees: employees});
    })
}

const service = {
    getListEmployee: getListEmployee,
    employeeEndRegister: employeeEndRegister,
    employeeStartRegister: employeeStartRegister,
    employeeAckRegister: employeeAckRegister,
    employeeDoneRegister: employeeDoneRegister,
    getDeviceAlert: getDeviceAlert,
    getAllListEmployee: getAllListEmployee
}

module.exports = service;