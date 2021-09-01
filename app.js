const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'employees'

});
connection.connect((err) => {
    if(err) throw err
    else{
        console.log('Connection Established');
    }
});



app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.set('view engine','ejs');



app.get('/',(req,res) => {
     connection.query('SELECT * FROM users',(err,rows) => {
       if(err) throw err
       else{
        res.render('home',{rows})
       }
     })
    
});
app.post('/',(req,res) => {
    
})








app.get('/add',(req,res)=>{
     res.render('adduser')
})
app.post('/add',(req,res) => {
    const{empid,username,email,password,phone,role} = req.body;
    connection.query('INSERT INTO users SET empid=?,username=?,email=?,password=?,phone=?,role=?',[empid,username,email,password,phone,role],(err,rows) => {
        if(err) throw err
        else{
            res.render('adduser',{user:rows})
        }
    })
})








app.get('/edit/:empid',(req,res) => {
    console.log(req.params.empid)
    connection.query('SELECT * FROM users WHERE empid='+req.params.empid,(err,rows)=>{
        if(err) throw err
        else{
            res.render('edit',{users:rows})
        }
    })
    
})
app.post('/edit/save',(req,res) => {
    const{username,email,password,phone,role} = req.body
    var sql='UPDATE users SET username=?,email=?,password=?,phone=?,role=? WHERE empid=?'
    connection.query(sql,[username,email,password,phone,role,req.body.empid],(err,rows)=>{
        if(err) throw err
        else{
            res.redirect('/')
        }
    })
})
app.get('/delete/:empid',(req,res) => {
    var sql = 'DELETE FROM users WHERE empid=?'
    connection.query(sql,[req.params.empid],(err,rows) => {
        if(err) throw err
        else{
            res.redirect('/')
        }
    })
})






app.listen(5000, () => {
    console.log('Server listening on port 5000...');
})