const fs = require('fs');
const { resolve } = require('path');

const sheetsFilePath = {
    'enroll-info-session': resolve(__dirname, '..', 'data', 'info_session_sheets.json'),
    'root-level-1': resolve(__dirname, '..', 'data', 'root_1_sheets.json'),
    'root-js': resolve(__dirname, '..', 'data', 'root_js_sheets.json')
}

function saveSheetInfoLocal(title, classId, sheetId){
    const filePath = sheetsFilePath[classId];

    if(filePath){
        const data = JSON.parse(fs.readFileSync(filePath));

        data.sheets[title] = sheetId;
    
        return fs.writeFileSync(filePath, JSON.stringify(data));
    }

    throw new Error(`Invalid file path - "${filePath}"`);
}

function sheetExists(title, classId){
    const filePath = sheetsFilePath[classId];

    if(filePath){
        const { sheets } = JSON.parse(fs.readFileSync(filePath));
                
        return typeof sheets[title] !== 'undefined';
    }

    throw new Error(`Invalid file path - "${filePath}"`);
}

function writeToSheetsFile(classId, data){

    return new Promise((resolve, reject) => {

        const filePath = sheetsFilePath[classId];

        if(filePath){
            fs.writeFile(filePath, JSON.stringify(data), err => {
                if(err) return reject({
                    msg: 'Error: Writing to file',
                    function: {
                        name: 'writeToSheetsFile',
                        paramsList: ['classId', 'data'],
                        paramsValues: { classId, data }
                    },
                    file: __filename,
                    error: err.message
                });
    
                resolve({success: true});
            });
        } else {
            reject({
                msg: 'Error: Invalid file path',
                function: {
                    name: 'writeToSheetsFile',
                    paramsList: ['classId', 'data'],
                    paramsValues: { classId, data }
                },
                file: __filename,
                error: `Invalid file path - "${filePath}"`
            });
        }        
    });
}

function getTemplateId(classId, templateName = 'template'){
    const filePath = sheetsFilePath[classId];

    if(filePath){
        const { sheets } = JSON.parse(fs.readFileSync(filePath));
        const template = sheets[templateName];

        return template ? template.id : false;
    }

    throw new Error(`Invalid file path - "${filePath}"`);
}

module.exports = {
    sheetExists,
    getTemplateId,
    writeToSheetsFile,
    saveSheetInfoLocal
}
