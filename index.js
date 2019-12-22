////////////// UpdateCompany ///////////////////////
'use strict';

// Added to handle injection
const vandium = require('vandium');
const mysql   = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 100,
  host            : process.env.rds_host,
  user            : process.env.rds_user,
  password        : process.env.rds_password,
  database        : process.env.rds_database,
  port            : process.env.rds_port
});

exports.handler = vandium.generic()
    .handler( (event, context, callback) => {

  let sql = "UPDATE items SET ";
  sql = sql + " name = " + connection.escape(event.name);
  sql = sql + " racing_name = " + connection.escape(event.racing_name);
  sql = sql + " points = " + connection.escape(event.points);
  sql = sql + " WHERE id = " + connection.escape(event.company_id);

  console.log('UpdateCompany SQL: ${sql}');

  pool.query(sql, function (error, results, fields) {
    let response = {};
    response['item_id'] = event.item_id;
    response['name'] = event.name;

    console.log('UpdateCompany Response: ${response}');

    callback( null, response );

  });
})
