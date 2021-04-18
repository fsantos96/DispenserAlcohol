const deviceService = require('./device');
const employeeList = [],
devicesList = [];
//empleado
// {
//     id
//     name
//     isEnabled
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
            employeeListFiltered = employeeList.filter(e => e.id !== employeeId && e.isEnabled);
        }
    
        resolve({
            employees: employeeId ? employeeListFiltered : employeeList.filter(e => e.isEnabled)
        });
    })
}

function employeeEndRegister(employeeId) {
    return new Promise((resolve, reject) => {
        const indexEmployee = employeeList.findIndex(e => e.id === employeeId);
        if(indexEmployee !== -1) {
            employeeList[indexEmployee].isEnabled = false;
        }

        resolve();
    })
}

function employeeStartRegister(employeeId, employee) {
    return new Promise((resolve, reject) => {
        const indexEmployee = employeeList.findIndex(e => e.id === employeeId);
        if(indexEmployee !== -1) {
            employeeList[indexEmployee].isEnabled = true;
        } else {
            employeeList.push(employee);
        }

        resolve();
    })
}

const service = {
    getListEmployee: getListEmployee,
    employeeEndRegister: employeeEndRegister,
    employeeStartRegister: employeeStartRegister,
}

module.exports = service;