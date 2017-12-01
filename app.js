var express=require('express');
var app=express();
var router=require('./controller/router.js');
//设置模板引擎
app.set('view engine','ejs');
//静态服务
app.use(express.static('./public'));
app.use(express.static('./uploads'));
//首页
app.get('/',router.showIndex);
app.get('/:albumname',router.showalbum);
app.get('/up',router.up);
app.post('/up',router.dopost);
//最后的中间件
app.use(function(req,res){
	res.render('err');
})

app.listen(3000);