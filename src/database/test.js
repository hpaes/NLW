const Database = require('./db');
const createProffy = require('./createProffy')


Database.then(async (db) => {
    // Insert data
    proffyValue = {

        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=400&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4",
        whatsapp: "899232134",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões."
    }

    classValue = {

        subject: 1,
        cost: "20"
        // proffy_id is taken from database
    }

    classScheduleValues = [
        // class_id is taken from database, after register class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }

    ]

    // await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // Query inserted data

    // query all proffys
    const selectedProffys = await db.all("SELECT * FROM proffys");
    // console.log(selectedProffys);

    // query classes from an specific teacher and bring all data from it
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys);

    // time_from must be less than or equal to the filtered time
    // time_to must be higher than the filtered time
    const selectedClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_To > "1300";
    `)
    
    console.log(selectedClassesSchedules);
})

