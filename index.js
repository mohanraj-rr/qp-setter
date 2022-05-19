const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const conn = require('./database');
const app = express();

const alert = require('alert'); 


//const bodyparser = require('body-parser');

const connection = require('./database');
const { title } = require('process');
const { response } = require('express');

app.use(express.json());  // => req.body

//routes//

//get all datas

//get a data

//create a data
/*app.post("/api/user", (req,res) =>{
    res.json(req.body);
})*/
//update a data

//delete a data

const port = process.env.PORT || 3000;

app.set('view engine','ejs');

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')));
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

//home route
app.get('/', (req,res) =>{
    res.render('base',{title:"Dept Of Mathematics"});
});

app.get('/hod_login',(req,res) =>{
    res.render('hod_login',{title:"HOD LOGIN"});

});

app.get('/faculty_login',(req,res) =>{
    res.render('faculty_login',{title:"FACULTY LOGIN"});
});

app.get('/register',(req,res) =>{
    res.render('register',{title:"REGISTER"});
});

/*app.get('/about',(req,res) =>{
    res.render('/',{title:"Dept Of Mathematics"});
});*/

app.get('/faculty',(req,res) =>{
    res.render('faculty',{title:"FACULTY DETAIL"});
});

app.get('/hod',(req,res) =>{
    res.render('hod',{title:'HOD'});
})

app.get

//body parser

app.use(bodyparser.urlencoded({ extended: false}))
app.use(bodyparser.json())

app.post('/hod_login', (req,res)=>{

    const body = req.body;
    var hod_name = body.username;
    var pwd = body.pwd;

    if(hod_name == "hodmath" && pwd=="math2022"){
        alert("hod logged in")
        res.render('hod_main_page',{title:"HOD-Main Page"});
    }
    else{
        alert("Invalid username and password");
        res.redirect('hod_login');
    }

})

app.post('/register', (req,res) =>{
    const body = req.body;

    var id = Math.floor(Math.random() * 101);
    id = "DOM2022" + id;
    var username = body.username;
    var position = body.position;
    var pwd = body.pwd;
    var email = body.email
    let insertQuery = `INSERT INTO "DOM".faculty_detail(
        faculty_id, faculty_name, faculty_position, faculty_password, faculty_email)
        VALUES ('${id}', '${username}', '${position}','${pwd}','${email}');`;

    connection.query(insertQuery, (req,resu,err) =>{
                    if(err){
                        //console.log("status:false, message:therre are some with query");
                        alert("error with database");
                        res.redirect('register');
                    }
                    else{
                        //console.log("status:true, data:results, message:user registered successfully");
                        alert("user registered successfully");
                        res.redirect('faculty_login');
                    }
                });
        /*connection.query(`select faculty_email from "DOM".faculty_detail where faculty_email='${email}'`, (req_q,res_q,e)=>{
            
            var hello = res_q.rows;
            let uemail = hello[0].faculty_email;

            console.log(uemail);
            
            if(email != uemail){
                          
            }
            else{
                res.redirect('register');
            }

        })*/

        connection.end;
   
})
app.post('/faculty_login', (req,res) =>{
    const body = req.body;

    var username = body.username;
    var password = body.pwd;

    //var selectQuery = `;`  //`select * from "DOM".faculty_detail where faculty_name = ?`

    connection.query(`select faculty_name,faculty_password from "DOM".faculty_detail where faculty_name = '${username}'` ,(err,result,fields) =>{
        var hello = result.rows;
        let uname = hello[0].faculty_name;
        let psw = hello[0].faculty_password;
        
        if(uname == username && psw == password)
        {
           alert("faculty logged in");
           res.render('faculty_main_page',{title:"FACULTY MAIN PAGE"});
        }
        else{
          alert("Invalid username or password");
          res.render('/faculty_login');
        }
    })
})



app.listen(port,()=>{
    console.log("Listening to the server on http://localhost:3000")
});
