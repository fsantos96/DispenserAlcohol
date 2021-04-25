const managerList = [],
//empleado
// {
//     id
//     email
// }



function getListManagers(managerId) {
    return new Promise((resolve, reject) => {
        resolve({
            manager: managerId ? managerList.find(m => m.id === managerId) : managerList;
        });
    })
}

function addOrUpdateManager(managerData) {
    if(managerData.id) {
        var managerIndex = managerList.findIndex(managerData.id)
        if(managerIndex !== -1) {
            managerList[managerIndex].email = managerData.email;
        }
    } else {
        managerList.push({
            id: managerList.length,
            email: managerData.email
        })
    }

    resolve();
}

function deleteManager(managerId) {
    var managerIndex = managerList.find(m => m.id === managerId);
    if(managerIndex !== -1) {
        managerList.splice(managerList, 1);
    }

    resolve();
}

const service = {
    getListManagers: getListManagers,
    addOrUpdateManager: addOrUpdateManager
}

module.exports = service;