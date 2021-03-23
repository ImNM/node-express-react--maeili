// url server adress
// https://hongikeatme.herocuapp.com
// 
// git init
// git add .
// git commit -m "message"
// git push    (DbManagement .git)
// git push heroku HEAD:master    (server upload)
// heroku logs --fail   (logs)
// heroku.cofig.MongosUri 등록필수
// mongoose atlas 사용 (0.0.0.0/ white )
// process.env.PORT 사용 heroku port 는 다 다름
// git 주소 https://github.com/ImNM/DbManagement
// test 로 postman 사용

require('dotenv').config({ path: 'ENV_FILENAME' });



const express =require('express');
const app =express();

//const port = 5000;
const {User}=require("./models/User");  //user schema

const bodyParser = require('body-parser');
//application/x-www-form-urlencoded data 분석해서 가져올수 있게함. (html form 제출방식) 
app.use(bodyParser.urlencoded({extended: true}));
//application/json 타입 분석가능하게 해줌!
app.use(bodyParser.json());







//mongoose altlas  db 설정 옵션4개는 뭔지몰라나도 connect는 altlas 주소
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
mongoose.connect(uri || 'mongodb+srv://NMisnm:ckswlscjswo@eatme.43tfu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    ,{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=>console.log('MongoDB conneted...'))
.catch(err => console.log(err));

app.get('/',(req,res)=> res.send('Hello world!  ㅎㅇㅎㅇ'));

//check


app.post('/register',(req,res)=>{
    //user 객체는 mongoose 모듈 import 해서 만든 객체임 save method 사용가능
    const user = new User(req.body)
    user.save((err,userInfo)=>{
        if(err) return res.json({success:false,err});
        return res.status(200).json({
            success:true
        });
    })
})


app.listen(process.env.PORT || 5000,()=>console.log(`Example app listening on port 5000!`))
//process.env.PORT || 