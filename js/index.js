start();

/**
 * 
 * @param {*} action //this is the action done buy the user {next,previuw}
 */
function start(action) {
    let days = ["mon", "tues", "wed", "thu", "fri", "sat", "sun"];
    let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "november", "decdember"];
    let date = nextPreviusMonth(action) ? nextPreviusMonth(action) : new Date();
    let thisYear = date.getFullYear();
    let thisMonth = date.getMonth();
    let todayDate = date.getDate();
    let todayDay = date.getDay();
    let dayofMonth = new Date(date.getFullYear(), date.getMonth(), 0);
    let daysOfMonth = new Date(thisYear, (thisMonth), 0).getDate();
    let fistDayofThemonth = new Date(thisYear, (thisMonth), 1).getDay()
    $("thisYear").innerHTML = thisYear;
    $("thisMonth").innerHTML = months[thisMonth];
    dispayDaystable(daysOfMonth, todayDate, fistDayofThemonth);
}
/**
 * 
 * @param {*} action // this actions allow to know whitch month we are in charge
 */
function nextPreviusMonth(action) {
    let prevDate = new Date();
    switch (action) {
        case "prev":
            return new Date(prevDate.setMonth(prevDate.getMonth() - 1));
            break;
        case "next":
            // return new Date(prevDate.setMonth(prevDate.getMonth() + 1));
            break;
        default:
            return false;
            break;
    }
}
//
/**
 * 
 * @param {*} days //this is the number of the days on the month
 * @param {*} active //is today date
 * @param {*} fistDayofThemonth //this is the first day of the selected month
 */
function dispayDaystable(days, active, fistDayofThemonth) {
    $("daysMonthtable").innerHTML = "";
    let table = $("daysMonthtable");
    // create the first row
    let tr = table.insertRow(0);
    let td;
    // cycleTable help to manage hom much row we are going to create
    let cycleTable = 0;
    // cycle if counting how much days left before the end of the week
    let cycle = 0;
    let today = fistDayofThemonth;
    // manage the period when the first day of the month
    // doent start on monday
    for (var y = 0; y < today - 1; y++) {
        // create emply cell, to manage days witch dobt belong to this month
        td = tr.insertCell(y);
        td.innerHTML = "";
        cycle++;
    }

    for (var i = 1; i <= days; i++) {
        // start create date according to the specify day of the week on the month
        let val = i < 10 ? `0${i}` : i;
        if (active == i) {
            td = tr.insertCell(cycle);
            td.innerHTML = `<span class="active">${val}</span>`;
        } else {
            td = tr.insertCell(cycle);
            td.innerHTML = val;
        }
        cycle++;   
        //  check if it is the end of the week
        //  then create another rwo for the next week,
        //  also initialize the cycle for the week
        if (cycle == 7) {
            cycle = 0;
            cycleTable++;
            // create new row for new records
            tr = table.insertRow(cycleTable);
        }
    }
}

function $(id) {
    return document.getElementById(id);
}