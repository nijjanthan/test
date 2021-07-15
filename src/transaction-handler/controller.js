const map = require('./map');
const _ = require('lodash');
const { getMetadataConfig } = require('../../shared/db/metadata');
const schedule = require('node-schedule');
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(4, 6)];
rule.minute = 15;

const { sequelize } = global.components;
const job = schedule.scheduleJob(rule, function(){
    const customizeQuery = `select * from test `
    let query = sequelize.query(customizeQuery, { type: sequelize.QueryTypes.SELECT });
    query.then(
        data=>{
        console.log(data,"updated data")
        }
            );
});
module.exports = function () {
    return {
        healthcheck(req, res) {
            map.healthcheck(req, res);
        },

        update(req,res){
            const model = req.originalUrl.split("/")[2];
            const { sequelize } = global.components;
            if (model==="edit_user")
            var query1 = `update test set user_name='${req.body.user_name}' ,place='${req.body.place}', dob='${req.body.place}' , g_password= '${req.body.password}' where user_id= ${req.body.user_id} `
            query1 = sequelize.query(query1, { type: sequelize.QueryTypes.UPDATE });
            query1.then(
                data=>{
                const customizeQuery = `select * from test where user_id=${req.body.user_id} `
                let query2 = sequelize.query(customizeQuery, { type: sequelize.QueryTypes.SELECT });
                query2.then(
                data1=>{
                    console.log("data",data1[0].user_id);
                    var history= `INSERT INTO history ( user_id, user_name, password, place, dob) VALUES (${data1[0].user_id}, '${data1[0].user_name}',  '${data1[0].g_password}', '${data1[0].place}', '${data1[0].dob}')`;
                    query = sequelize.query(history, { type: sequelize.QueryTypes.INSERT });
                    query.then(
                        data => map.post(req, res, data),
                        err => map.error(req, res, err)
                    )
                }
                )
                }
                )
        },

        condition(req, res) {
            const model = req.originalUrl.split("/")[2];
            const { sequelize } = global.components;
            _.get(global.components.dbConnections, model,'').create(req.body).then(
                data => map.post(req, res, data),
                err => map.error(req, res, err)
            )
        },

        login (req,res){
            const model = req.originalUrl.split("/")[2];
            const { sequelize } = global.components;
            if (model === "login") {
                try {
                    const customizeQuery = `select * from test where google_id= '${req.body.email}' or facebook_id='${req.body.email}' `
                    let query = sequelize.query(customizeQuery, { type: sequelize.QueryTypes.SELECT });
                    query.then(
                        login => {
                            if (login.length !== 0) {
                                login.map(value => {
                                    const base2 = `select * from test Where user_id=${value.user_id}`;
                                    sequelize.query(base2, { type: sequelize.QueryTypes.SELECT }).then(
                                        email => {
                                            email.map(value => {
                                                if (value.g_password === req.body.password) {
                                                    map.get(req, res, email)
                                                } else {
                                                    map.error(req, res, { err: `Invalid Password` })
                                                }
                                            });
                                        }
                                    )
                                })
                            } else {
                                map.error(req, res, { err: `Email Doesn't Exists please sign up` })
                            }
                        },
                        err => map.error(req, res, err),
                    );
                } catch (ex) {
                    map.error(req, res, { error: ex })
                }
            }
        },

        post(req, res) {
            const model = req.originalUrl.split("/")[2];
            const { sequelize } = global.components;
            const customizeQuery = `select * from test where google_id= '${req.body.email}' or facebook_id='${req.body.email}' `
            let query = sequelize.query(customizeQuery, { type: sequelize.QueryTypes.SELECT });
                    query.then(
                        email => {
                            emailValue = email.length;
                                if (emailValue === 0) {
                                    const obj ={
                                        user_name: req.body.user_name,
                                        google_id: req.body.email,
                                        g_password: req.body.password,
                                        place: req.body.place,
                                        dob : req.body.dob,
                                    }
                                    _.get(global.components.dbConnections, 'test', '').create(obj).then(
                                        data => map.post(req, res, data),
                                        err => map.error(req, res, err)
                                    )

                                } else {
                                    map.error(req, res, { err: `Email Already Exists` })
                                }
                            })
        },
    }
}();
