var months = [{
    name: 'January',
    abrev: 'Jan'
}, {
    name: 'February',
    abrev: 'Feb'
}, {
    name: 'March',
    abrev: 'Mar'
}, {
    name: 'April',
    abrev: 'Apr'
}, {
    name: 'May',
    abrev: 'May'
}, {
    name: 'June',
    abrev: 'Jun'
}, {
    name: 'July',
    abrev: 'Jul'
}, {
    name: 'August',
    abrev: 'Aug'
}, {
    name: 'September',
    abrev: 'Sep'
}, {
    name: 'October',
    abrev: 'Oct'
}, {
    name: 'November',
    abrev: 'Nov'
}, {
    name: 'December',
    abrev: 'Dec'
}];

function buildWeek(startDate, endDate) {
    var week = '<div class="week">';
    for (var i = 0; i < 7; i++) {
        if (startDate + i > 0 && startDate + i <= endDate) {
            week += `<div class="day" data-date="${startDate + i}">${startDate + i}</div>`;
        } else {
            week += '<div class="day wrongMonth"></div>';
        }
    }

    return week + '</div>';
}

function buildMonth(day1, endDate) {
    var month = '<div class="month">';

    // first week
    month += buildWeek(1 - day1, 7 - day1);

    var start = 8 - day1;
    while (start < endDate - 7) {
        month += buildWeek(start, start + 7);
        start += 7;
    }

    // last week
    month += buildWeek(start, endDate);

    return month + '</div>';
}

function buildCalendar() {
    var today = new Date();
    $('.calendar').append(`<h2>${months[today.getMonth()].name} ${today.getFullYear()}</h2>`);

    var day1 = ((today.getDate() - 1) % 7) - today.getDay();
    $('.calendar').append(buildMonth(day1, 30));
}
