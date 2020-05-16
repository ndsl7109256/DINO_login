const express = require('express')
const app = express()
const port = 6553
const https = require('https')
const fs = require('fs');

/**** ssl資料 ****/
var server = https.createServer({
  key: fs.readFileSync('./ssl/private.key'),
  cert: fs.readFileSync('./ssl/certificate.crt'),
  ca: fs.readFileSync('./ssl/ca_bundle.crt'),
  requestCert: false,
  rejectUnauthorized: false
},app);
server.listen(port, ()=>{
  console.log(`port: ${port}`)
})

/*** 建立socket ****/
const io = require('socket.io').listen(server);


/**** database資料 ****/
var exist = false
var firebaseConfig = {
  apiKey: "AIzaSyCFZm71gA1VwC3gRLwgcuDPeZI-06GLxj4",
  authDomain:"test1-20b63.firebaseapp.com",
  databaseURL: "https://test1-20b63.firebaseio.com/",
  projectId: "test1-20b63",
  storageBucket: "test1-20b63.appspot.com",
  messagingSenderId: "115050522172",
  appId: "1:115050522172:web:2a21552bce3355b3df0539",
  measurementId: "G-2FSBV0C1TM"
}
var firebase = require('firebase');
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

app.use(express.static(`${__dirname}/dist`))

/**** register 建立 database ****/
app.get('/register', (req, res) => {
  if(req.query.id != "" && req.query.password != "" && req.query.parent_password !="" && req.query.nickname!="" ){//如果皆有輸入
    database.ref('account/'+req.query.id).once('value',v=>{
      if(v.val()==null){
        var input = {
          password:req.query.password,
          parent_password: req.query.parent_password,
          birthday: req.query.birthday,
          nickname: req.query.nickname,
          letter: "",
          score: 0

        } 
        var reff = database.ref('account/'+req.query.id);
        reff.set(input);
      }
      else{
        //若該使用者已經存在
      }
    });
  }
  else{
    //如果輸入有空白
  }
})

/**** 互相取名字 ****/
app.get('/naming_parent',(req,res)=>{
  var input = {
    child_nickname: req.query.child_nickname
  }
  var  reff = database.ref('account/'+req.query.path_id+'/task1/child/')
  reff.set(input)
})

app.get('/naming_child',(req,res)=>{
  var input = {
    parent_nickname: req.query.parent_nickname
  }
  var  reff = database.ref('account/'+req.query.path_id+'/task1/parent/')
  reff.set(input)
})


/**** login 確認密碼,資料傳給cookie ****/
app.get('/login',(req, res) =>{
  database.ref('account/'+req.query.name+'/password/').once('value',v=>{
    if(v.val()==req.query.password){ //若密碼正確
      database.ref('account/'+req.query.name+'/').once('value',data=>{// 資料傳給cookie
        if(data.val()!=null){
          var pwd = data.val().parent_password
          var nickname = data.val().nickname
          var birthday = data.val().birthday
          console.log(typeof(nickname))
          console.log(nickname)
          //傳給cookie的資料為下
          res.send(`
            {
              "text": "<h1> choose your identity </h1>",
              "pwd": "${pwd}",
              "nickname": "${nickname}",
              "birthday": "${birthday}",
              "exist": true
            }
          `)
        }
      });
    }
    else{//若密碼失敗
      res.send(`
        {
          "text": "wrong password or name!",
          "exist": false
        }
      `)
    }
  });
})

/**** 所有socket溝通都包在io.on之下 ****/
io.on('connection', function(socket) {
  
  /*似乎是廢扣
  socket.on('sendMessage', function(data) {
    console.log('target is '+data.target);
    io.sockets.emit('receiveMessage', data);
  })*/

  /**** 故事結束.小朋友端顯示出蛋蛋 ****/
  socket.on('end_story', function(data){
    console.log("story end");
    io.sockets.emit('appear_egg', data);
  })  

  /**** 拉蛋 ****/
  socket.on('lay_egg', function(data){
    console.log("laying egg ");
    io.sockets.emit('get_egg', data);
  })  

/**** 寫信並將信件存入database ****/
  socket.on('send_letter', function(data){
      console.log(data);
      var reff = database.ref('account/'+data.ID);
      database.ref('account/'+data.ID).once('value',db=>{
        var letters;
        if(db.val().letter){
          letters = db.val().letter;
        }else{
          letters = [];
        }

        var d = new Date(); //取得當日日期
        var n = d.getMonth();
        n = n+1;
        var date = n + "/" + d.getDate();
        console.log(date);

        letters.push({ // 將這些資料存到database的'letter'中
          content:data.Letter,
          date: date,
          read:false,
          letter_id: db.val().letter.length
        })

        // 將所有的資料再包一次.並傳進database. 不然新資料會覆蓋掉舊的資料
        var input = {
          password:db.val().password,
          parent_password: db.val().parent_password,
          birthday: db.val().birthday,
          nickname: db.val().nickname,
          letter: letters
        }
        reff.set(input);
        console.log(letters)
      });
    })

  /**** P端dino_p頁面整理好時. check database 有沒有未讀信件 ****/
    socket.on('check_letter', function(data){
      database.ref('account/'+data.ID).once('value',db=>{
        for(var i=0; i< db.val().letter.length; i++)
        {
          if(db.val().letter[i].read == false)
          {
            socket.emit('letter_unread', data);//若有未讀信件.觸發此
            break;
          }
        }
      });
    })

    /**** p端按下信件按鈕. 傳給p沒有讀過得信件內容 ****/
    socket.on('give_me_letter', function(data){
      var letters = [];
      database.ref('account/'+data.ID).once('value',db=>{
        var j = 0;
        for(var i=0; i< db.val().letter.length; i++)
        {
          if(db.val().letter[i].read == false)
          {
            letters.push({
              content:db.val().letter[i].content,
              date: db.val().letter[i].date,
              letter_id: db.val().letter[i].letter_id
            });
          }
        }
        console.log(letters);
        socket.emit('give_you_letter', {ID:data.ID, Letters:letters});//傳
      });
    })

    /**** p端確認信件並加分或不給分 ****/
    socket.on('score_letter', function(data){// data.score回傳0或是10分
      database.ref('account/'+data.ID+'/letter/'+data.letter_id+'/read').set(true);

      database.ref('account/'+data.ID+'/score').once('value',db=>{
        var s = db.val();
        s+=data.score;//將目前的分數加上0或10
        database.ref('account/'+data.ID+'/score').set(s);
      });
    })
})
