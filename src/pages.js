// Data
const Database = require('./database/db')

const {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
} = require('./utils/format')

function pageLanding(req, res) {
    return res.render("index.html")
}

async function pageStudy(req, res) {
    const filters = req.body

    if (!filters.subject || !filters.weekday || !filters.time) {

        return res.render("study.html", {
            filters,
            subjects,
            weekdays
        })
    }

    // convert hours to minutes
    const HourToMinutes = convertHoursToMinutes(filters.time)


    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${HourToMinutes}
            AND class_schedule.time_To > ${HourToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `

    // in case that an error occurs when querying for data
    try {
        const db = await Database
        const proffys = await db.all(query)

        return res.render('study.html', {
            proffys,
            subjects,
            filters,
            weekdays
        })

    } catch (error) {
        console.log(error)
    }
}

function pageGiveClasses(req, res) {
    const data = req.query

    // check if data is not empty
    const isNotEmpty = Object.keys(data).length > 0;

    if (isNotEmpty) {

        data.subject = getSubject(data.subject);
        // add data to the proffys list
        proffys.push(data);

        return res.redirect("/study");
    }

    // if data is empty, show page
    return res.render("give-classes.html", {
        subjects,
        weekdays
    })
}

function saveClasses(req, res) {
    
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}
