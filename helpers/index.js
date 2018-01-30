
function buildSheetsObj(sheetsArr){
    const sheets = {};

    sheetsArr.map(sheet => sheets[sheet.properties.title] = {id: sheet.properties.sheetId});

    return sheets;
}

function buildDataArray(info){
    const { first_name, last_name, phone, email, class_date, marketing } = info;
    const sheet = class_date;
    return [
        null,                                       // #
        email,                                      // Email
        first_name + ' ' + last_name,               // Name
        first_name,                                 // First Name
        last_name,                                  // Last Name
        phone,                                      // Phone #
        class_date,                                 // Class Date
        new Date().toLocaleString(),                // Enroll Date
        '',                                         // Follow Up
        '',                                         // Prep MC
        '',                                         // Reminder MC
        '',                                         // Prep Instructions
        'No',                                       // Paid
        '$0',                                       // Amount
        marketing,                                  // Marketing
        genPortalId(
            class_date, first_name, last_name 
        ),                                          // Portal UID
        '',                                         // Github Username
        'Not Invited',                              // Slack Status
        'Not Invited',                              // Portal Status
        'Not Invited',                              // Github Team
        'Not Created',                              // root prototypes
        'Not Created',                              // root portfolio
        'Not Created'                               // root mboutique
    ];
}

function genPortalId(date, fName, lName){
    return 'r' + dateToMonthYear(date) + '_' + fName[0].toLowerCase() + capitalize(lName);
}

function dateToMonthYear(date){
    const months = {
        'jan': 1, 'january': 1,
        'feb': 2, 'february': 2,
        'mar': 3, 'march': 3,
        'apr': 4, 'april': 4,
        'may': 5,
        'jun': 6, 'june': 6,
        'jul': 7, 'july': 7,
        'aug': 8, 'august': 8,
        'sep': 9, 'september': 9,
        'oct': 10, 'october': 10,
        'nov': 11, 'november': 11,
        'dec': 12, 'december': 12
    }
    
    const dash = date.indexOf('-');
    
    if(dash > -1){
        date = date.slice(0, dash - 1);
    }
    
    const dateArr = date.toLowerCase().split(' ');
    
    return months[dateArr[0]] + dateArr[dateArr.length - 1].slice(2);
}

function normalizeNames(obj){
    const normalized = {};

    Object.keys(obj).map( key => {
        const keyArr = key.split('_');

        const inputtedIndex = keyArr.indexOf('inputted');

        if(inputtedIndex > -1){
            keyArr.splice(inputtedIndex, 1);
        }

        normalized[keyArr.join('_')] = obj[key];
    });

    return normalized;
}

function capitalize(str){
    return str[0].toUpperCase() + str.slice(1);
}

module.exports = {
    buildDataArray,
    buildSheetsObj,
    normalizeNames
}
