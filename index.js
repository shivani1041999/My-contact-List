const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
// import model
const Contact = require('./models/contact');
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
// encode the submitted data
app.use(express.urlencoded({extended : true}));
app.use(express.static('assests'));

// // middleware1
// app.use(function(req,res,next){
//     req.name = 'arpan';
//     console.log("middelware1 called");
//     next();
// });
// // middleware2
// app.use(function(req,res,next){
//     console.log('print changed name',req.name);
//     console.log("middelware2 called");
//     next();
// });
// var contactList = [
//     {
//         name : "Shivani",
//         phoneNo : '9468140258'
//     },
//     {
//         name : "Deeps",
//         phoneNo : '9468140268'
//     },
//     {
//         name : "Rashmi",
//         phoneNo : '9678263671' 
//     },
//     {
//         name : "Rohit",
//         phoneNo : '8949839323'
//     }
// ]

app.post('/create-contact',function(req,res){

    // console.log(req.body);
    // console.log(req.body.name);
    // contactList.push({
    //     name : req.body.name,
    //     phoneNo : req.body.phoneNo
    // });
    // contactList.push(req.body);
    Contact.create({
        name : req.body.name,
        phone : req.body.phoneNo 
    },function(err, newcontact){
        if(err){
            console.log('error in creating a contact');
            return;
        }
        console.log('*******', newcontact);
        return res.redirect('back');
    });
    // return res.redirect('/');
});


app.get('/',function(req, res){
   
    console.log(__dirname);
    // res.send('<h1> Cool it is running! or is it ?</h1>');0
    Contact.find({},function(err,contactList){
        if(err){
            console.log('Error in fetching the database');
            return;
        }

        return res.render('home',{
            title :"Contacts List",
            contact_list : contactList
        });
    });
    
});

app.get('/delete-contact/',function(req,res){
    // console.log(req.params);
    // let phone = req.params.phoneNo;
    
    //receive phone Number 
    // console.log(req.query);
    // let phone = req.query.phoneNo;
    // // console.log(phone);
    // // matches with the contactList 
    // let contactIndex = contactList.findIndex( contact => contact.phoneNo == phone)
    // // console.log(contactIndex);
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }
    let id = req.query.id;
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting a object in database');
            return;
        }
        return res.redirect('back');
    });
    
   

});
app.get('/practice',function(req, res){

    return res.render('practice',{
        title :"Let us play with ejs"
    });
});

app.listen(port,function(err){
    if(err){
        console.log('Error is running the Server',err);
    }
    console.log('Yupp!! My Server is running on port',port);
});