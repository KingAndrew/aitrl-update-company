////////////// UpdateCompany ///////////////////////
'use strict';

// Added to handle injection
const vandium = require('vandium');
const mysql   = require('mysql');

exports.handler = vandium.generic()
    .handler( (event, context, callback) => {

  let connection = mysql.createConnection({
       host     : '[rds_host]',
       user     : '[rds_user]',
       password : '[rds_password]',
       database : '[rds_database]'
  });
  let sql = "UPDATE items SET ";
  sql = sql + " name = " + connection.escape(event.name);
  sql = sql + " racing_name = " + connection.escape(event.racing_name);
  sql = sql + " points = " + connection.escape(event.points);
  sql = sql + " WHERE id = " + connection.escape(event.company_id);

  console.log('UpdateCompany SQL: ${sql}');

  connection.query(sql, function (error, results, fields) {
    let response = {};
    response['item_id'] = event.item_id;
    response['name'] = event.name;

    console.log('UpdateCompany Response: ${response}');

    callback( null, response );

  });
})