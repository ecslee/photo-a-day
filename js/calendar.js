var months = [{
    name: 'January',
    abbrev: 'Jan',
    days: 31
}, {
    name: 'February',
    abbrev: 'Feb',
    days: 28
}, {
    name: 'March',
    abbrev: 'Mar',
    days: 31
}, {
    name: 'April',
    abbrev: 'Apr',
    days: 30
}, {
    name: 'May',
    abbrev: 'May',
    days: 31
}, {
    name: 'June',
    abbrev: 'Jun',
    days: 30
}, {
    name: 'July',
    abbrev: 'Jul',
    days: 31
}, {
    name: 'August',
    abbrev: 'Aug',
    days: 31
}, {
    name: 'September',
    abbrev: 'Sep',
    days: 30
}, {
    name: 'October',
    abbrev: 'Oct',
    days: 31
}, {
    name: 'November',
    abbrev: 'Nov',
    days: 30
}, {
    name: 'December',
    abbrev: 'Dec',
    days: 31
}];

function buildWeek(startDate, endDate) {
    var week = '<div class="week">';
    for (var i = 0; i < 7; i++) {
        if (startDate + i > 0 && startDate + i <= endDate) {
            week += `<div class="day" data-date="${startDate + i}">${startDate + i}</div>`;
        } else {
            week += '<div class="day wrong-month"></div>';
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

function buildPrevButton(currMonth, currYear) {
    var prevMonth = currMonth === 0 ? 11 : currMonth - 1,
        prevYear = prevMonth === 11 ? currYear - 1 : currYear,
        prevStr = `${months[prevMonth].abbrev} ${prevYear}`;

    var $prev = $(`<div class="header-narrow"><button class="nav nav-prev" data-month="${prevMonth}" data-year="${prevYear}">${prevStr}</button></div>`);
    $prev.click(goToMonth);
    return $prev;
}

function buildNextButton(currMonth, currYear, isToday) {
    var nextMonth = currMonth === 11 ? 0 : currMonth + 1,
        nextYear = nextMonth === 0 ? currYear + 1 : currYear,
        nextStr = `${months[nextMonth].abbrev} ${nextYear}`;

    var $next = $(`<div class="header-narrow"><button class="nav nav-next" data-month="${nextMonth}" data-year="${nextYear}">${nextStr}</button></div>`);
    $next.click(goToMonth);
    return $next;
}

function buildHeader(currMonth, currYear, isToday) {
    var title = `${months[currMonth].name} ${currYear}`;
    var $header = $(`<div class="header"><div class="header-wide"><h2>${title}</h2></div></div>`);
    $('.calendar').append($header);
    $header.prepend(buildPrevButton(currMonth, currYear));
    $header.append(buildNextButton(currMonth, currYear, isToday));
    return $header;
}

function buildCalendar(date) {
    $('.calendar').append(buildHeader(date.getMonth(), date.getFullYear()));
    $('.calendar').append(buildMonth(date.getDay(), months[date.getMonth()].days));
}

function buildToday() {
    var today = new Date();
    buildCalendar(new Date(today.getFullYear(), today.getMonth()));
}

function clearCalendar() {
    $('.calendar').empty();
}

function goToMonth(evt) {
    clearCalendar();

    var month = $(evt.target).data('month'),
        year = $(evt.target).data('year');
    buildCalendar(new Date(year, month));
}
