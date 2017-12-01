var file=require('../models/file.js');
var formidable=require('formidable');
var path=require('path');
var fs=require('fs');
exports.showIndex=function(req,res){

	//方法里的函数是callback
	//allAlbums这是callback里的参数

	file.getallAlbums(
		//这就是callback
		function(err,allAlbums){
			if(err){
				res.send(err);
				return;
			}
			res.render('index',{
				'albums':allAlbums
			});
		}
		//这就是callback
	)
}
exports.showalbum=function(req,res,next){
	//遍历相册中的所有图片
	
	var albumname=req.params.albumname;
	file.imagesname(albumname,function(err,imagesArr){
		if(err){
			
			next();
			return;
		}
			res.render('album',{
			'albumname':albumname,
			'images':imagesArr
		})
	})
	
}
exports.up=function(req,res){
	//得到文件夹名字
	file.getallAlbums(function(err,allAlbums){
		res.render('up',{
		'albums':allAlbums
			});
		})
	}
	exports.dopost=function(req,res){
		var form = new formidable.IncomingForm();
		//设置上传路径
		form.uploadDir=path.normalize(__dirname+'/../tempup/');
		form.parse(req, function(err, fields, files,next) {

 　　　　 console.log(fields); 
  		   console.log(files);
  		   if(err){
  		   	next();
  		   	return;
  		   }
  		   //判断尺寸
  		   // var size=parseInt(files.image.size);
  		   // console.log(size);
  		   // if(size>2000){
  		   // 	res.send('图片尺寸应该小于2m');
  		   // 	fs.unlink(files.image.path);
  		   // 	return;
  		   // }
  		   var extname=path.extname(files.image.name);
  		   var ran=parseInt(Math.random()*99999+100000);
  		   var oldPath=files.image.path;
  		   var wenjianjia=fields.wenjianjia;
  		   var newPath=path.normalize(__dirname+'/../uploads/'+wenjianjia+'/'+ran+extname);
  		   console.log(newPath);
  		   fs.rename(oldPath,newPath,function(err){
  		   	if(err){
  		   		res.send('改名失败');
  		   		return;
  		   	}
  		   });

　　  });
		
		res.send('成功');
	}
