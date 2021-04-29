const managerList = [];
//empleado
// {
//     id
//     email
// }



function getListManagers(managerId) {
    return new Promise((resolve, reject) => {
        resolve({
            manager: managerId ? managerList.find(m => m.id == managerId) : managerList
        });
    })
}

function addOrUpdateManager(managerData) {
    return new Promise((resolve, reject) => {
        if(managerData.id) {
            var managerIndex = managerList.findIndex(m => m.id == managerData.id)
            if(managerIndex !== -1) {
                managerList[managerIndex].email = managerData.email;
            }
        } else {
            managerList.push({
                id: managerList.length,
                email: managerData.email,
                enabled: true
            })
        }
    
        resolve();
    })
}

function deleteManager(managerId) {
    return new Promise((resolve, reject) => {
        var managerIndex = managerList.find(m => m.id === managerId);
        if(managerIndex !== -1) {
            managerList.splice(managerList, 1);
        }

        resolve({ manager: managerList});
    })
}

const service = {
    getListManagers: getListManagers,
    addOrUpdateManager: addOrUpdateManager,
    deleteManager: deleteManager
}

module.exports = service;