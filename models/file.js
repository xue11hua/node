var fs=require('fs');
//callback是个函数
exports.getallAlbums=function(callback){
	fs.readdir('./uploads/',function(err,files){
        if(err){
            callback('没有找到文件夹',null);
        }
		var allAlbums=[];
		(function iterator(i){
            if(i == files.length){
                //遍历结束
                console.log(allAlbums);
                //得到allAlbums传给callback
                callback(null,allAlbums);
                return;
            }
            fs.stat("./uploads/" + files[i],function(err,stats){
                if(err){
                    callback("找不到文件" + files[i] , null);
                }
                if(stats.isDirectory()){
                    allAlbums.push(files[i]);
                }
                iterator(i + 1);
            });
        })(0);
		
	})
	
}
exports.imagesname=function(albumname,callback){
    fs.readdir('./uploads/'+albumname,function(err,files){
        if(err){
            callback('没有找到图片',null);
            return;
        }
        var allimages=[];
        (function iterator(i){
            if(i == files.length){
                //遍历结束
                console.log(allimages);
                //得到allAlbums传给callback
                callback(null,allimages);
                return;
            }
            fs.stat("./uploads/"+albumname + '/'+files[i],function(err,stats){
                if(err){
                    callback("找不到文件" + files[i] , null);
                }
                if(stats.isFile()){
                    allimages.push(files[i]);
                }
                iterator(i + 1);
            });
        })(0);

    })

}