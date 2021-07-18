start();

function start(newDate) {
    let days = ["mon", "tus", "wed", "thu", "fri", "sat", "sun"];
    let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september","october", "november", "december"];
    let date= new Date();
    if(newDate){
        date =  new Date(newDate);
    }
    let thisYear = date.getFullYear();
    let thisMonth = date.getMonth();
    let activeDay = date.getDate();    
    let daysOfMonth = new Date(thisYear, (thisMonth), 0).getDate();
    let fistDayofTheMonth = new Date(thisYear, (thisMonth), 1).getDay();
    let data={
        thisYear:thisYear,
        thisMonth: months[thisMonth],
        thisPrevDate: PreviusMonth(date.toDateString()),
        thisNextDate: nextMonth(date.toDateString()),
    };
    let dateData = {
        daysOfMonth:daysOfMonth,
        activeDay:activeDay,
        fistDayofTheMonth:fistDayofTheMonth
    }
    $("monthControl").innerHTML = displayControl(data);
    dispayDaystable(dateData);
}
/**
 * 
 * @param {*} action // this actions allow to know whitch month we are in charge
 */
function PreviusMonth(previesDate) { 
    let preDate = new Date(previesDate);   
    return new Date(preDate.setMonth(preDate.getMonth()-1)).toDateString();
}
function nextMonth(nextDate) { 
    let preDate = new Date(nextDate);
    return new Date(preDate.setMonth(preDate.getMonth()+1)).toDateString();
}
//
/**
 * 
 * @param {*} daysOfMonth //this is the number of the days on the month
 * @param {*} activeDay //is today date
 * @param {*} fistDayofTheMonth //this is the first day of the selected month
 */
function dispayDaystable(dateData) {
    let {
        daysOfMonth,
        activeDay,
        fistDayofTheMonth
    }=dateData;
    $("daysMonthtable").innerHTML = "";
    let table = $("daysMonthtable");
    // create the first row
    let tr = table.insertRow(0);
    let td;
    // cycleTable help to manage hom much row we are going to create
    let cycleTable = 0;
    // cycle if counting how much days left before the end of the week
    let cycle = 0;
    let today = fistDayofTheMonth;
    // manage the period when the first day of the month
    // doesn't start on monday
    for (var y = 0; y < today - 1; y++) {
        // create emply cell, to manage days witch dobt belong to this month
        td = tr.insertCell(y);
        td.innerHTML = "";
        cycle++;
    }

    for (var i = 1; i <= daysOfMonth; i++) {
        // start create date according to the specify day of the week on the month
        let val = i < 10 ? `0${i}` : i;
        if (activeDay == i) {
            td = tr.insertCell(cycle);
            td.innerHTML = `<span class="active">${val}</span>`;
        } else {
            td = tr.insertCell(cycle);
            td.innerHTML = val;
        }
        cycle++;   
        //  check if it is the end of the week
        //  then create another row for the next week,
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

function displayControl(data){
    let control=`<ul>
        <li class = "prev" onclick = "start('${data.thisPrevDate}')" > &#10094;</li>
        <li class= "next"  onclick = "start('${data.thisNextDate}')" > &#10095;</li>
        <li>
            <span style="font-size:38px" > ${data.thisMonth} </span><br> 
            <span style="font-size:28px" > ${data.thisYear} </span> 
        </li></ul>`;
    return control;
}