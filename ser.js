const express = require('express')
const app = express()
const port = 6554

const http = require('http').createServer(app)
const io = require('socket.io')(http)

var exist=false
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

http.listen(port, () => {
  console.log(`Only Only UUU: ${port}`)
})





app.use(express.static(`${__dirname}/dist`))

app.get('/register', (req, res) => {
  
  var search2 = 'user_num/';
  database.ref(search2).once('value',v=>{
    var user_num = v.val();
    user_num++;
    //var paths = '/kid_test/'+user_num+'/';
    var input = {
      //id: req.query.id,
      password:req.query.password,
      parent_password: req.query.parent_password,
      birthday: req.query.birthday,
      nickname: req.query.nickname
    }      
    //var reff = database.ref(paths);
    var reff = database.ref('account/'+req.query.id);
    reff.set(input);

    database.ref(search2).set(user_num++);
  });
})

app.get('/login',(req, res) =>{
  database.ref('account/'+req.query.name+'/password/').once('value',v=>{
    if(v.val()==req.query.password){
	  database.ref('account/'+req.query.name+'/').once('value',data=>{
		if(data.val()!=null){
			var pwd = data.val().parent_password
			var nickname = data.val().nickname
			var birthday = data.val().birthday
			console.log(typeof(nickname))
			console.log(nickname)
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
    else{
      res.send(`
        {
          "text": "wrong password or name!",
          "exist": false
        }
      `)
    }
  });
})


io.on('connection', function(socket) {
    /*是否是新用户标识*/
    var isNewPerson = true;
    /*当前登录用户*/
    var username = null;
    /*监听登录*/
    socket.on('login', function(data) {
          for (var i = 0; i < users.length; i++) {
                  if (users[i].username === data.username) {
                            isNewPerson = false
                            break;
                          } else {
                                    isNewPerson = true
                                  }
                }
          if (isNewPerson) {
                  username = data.username
                  users.push({
                            username: data.username
                          })
                  /*登录成功*/
                  socket.emit('loginSuccess', data)
                  /*向所有连接的客户端广播add事件*/
                  io.sockets.emit('add', data)
                } else {
                        /*登录失败*/
                        socket.emit('loginFail', '')
                      }
        })


    socket.on('shake', function(data) {

          console.log('搖呀'+data.username);

          var e = true;
          for (var i = 0; i < shakers.length; i++) {
                  if (shakers[i].username === data.username) {
                            e = false
                            break;
                          }
                }
          if(e){
                  shakers.push({
                            username: data.username
                          })
                  s++;
                }
          if(s==2){
                  io.sockets.emit('receiveMessage', { username: 'SERVER', message: 'EGG' });
                  s=0
                  shakers=[]
                }
        })

    socket.on('sendMessage', function(data) {
          console.log('target is '+data.target);
          io.sockets.emit('receiveMessage', data);
        })

    socket.on('end_story', function(data){
          console.log("story end");
          io.sockets.emit('appear_egg', data);
    })  

    socket.on('lay_egg', function(data){
          console.log("laying egg ");
          io.sockets.emit('get_egg', data);
    })  
})
