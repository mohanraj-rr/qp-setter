const postgres = require('pg').Client;

const conn = new postgres({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "root",
    database: "postgres"
});


conn.connect(function(err){
    if (err) throw err;
    console.log("postgres is connected");
});

module.exports = conn;

/*conn.query(`select subject_name from "DOM".r19_fc_pcc_eec`, (err,res) =>{
    if(!err){
        console.log(res.rows);
    }
    else
    {
        console.log(err.message);
    }
    conn.end;
})*/