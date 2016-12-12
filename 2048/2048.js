function setCookie(cookieName,value,date){
	document.cookie=cookieName+"="+value+";expires="+date.toGMTString();
}
function getCookie(cookieName){
	//将document.cookie保存在变量cookie中
	var cookie=document.cookie;
	//cookie中查找cookieName的位置保存在i中
	var i=cookie.indexOf(cookieName);
	//如果i=-1//返回null
	if(i==-1){return null}
	else{//否则
		//跳过i+cookieName的长度+1，保存在变量starti中
		var starti=i+cookieName.length+1;
		//从starti开始，查找下一个;的位置endi
		var endi=cookie.indexOf(";",starti);
		if(endi==-1){//如果endi是-1
			//截取cookie中starti到结尾的剩余内容，返回
			return cookie.slice(starti);
		}else{
		//否则
			//截取cookie中starti到endi的内容，返回
			return cookie.slice(starti,endi);
		}
	}
}
var game={
	data:null,//保存RN行，cn列的二位数组
	RN:4,CN:4,
	score:0,//保存游戏得分
	state:1,//保存游戏状态
	GAMEOVER:0,//表示游戏结束状态
	top:0,//保存游戏最高分
	RUNNING:1,//大写表示固定的值，常量，不成文规定，大写属性别轻易改
	//强调：
	//1.每个属性和方法结尾都用逗号分隔
	//2.方法中使用自己的属性都必须前加this.
	start:function(){
		//获得cookie中的top变量值，保存在top属性中(如果top变量的值无效，就用0代替)
		this.top=getCookie("top")||0;
		this.state=this.RUNNING;//重置游戏状态为RUNNING
		this.score=0;//将score重置为0
		//初始化RN*CN的二维数组，保存到data属性中
		//创建空数组保存在data属性中
		this.data=[];
		//r从0开始，到<RN结束
		for(var r=0;r<this.RN;r++){	
			//向data中压入一个空数组
			this.data.push([]);
			//c从0开始，到<CN结束
			for(var c=0;c<this.CN;c++){
				//向data中r行压入一个0
				this.data[r].push(0);
				}
		}//（遍历结束）
		this.randomNum();
		this.randomNum();
		this.updateView();
		//debugger;//F12：鼠标放到任意关心的变量或属性
		//console.log(this.data.join("\n"));//用回车换行join数组
		//为document绑定键盘按下
			//当键盘按下时自动执行该函数
		document.onkeydown=function(e){
		//在事件处理函数中：this->.前的对象document
		//bind将this->game
			switch(e.keyCode){
			//判断e.keyCode
			case 37:this.moveLeft();break;//是37：左移
				//是38：上移
			case 38:this.moveUp();break;
				//是39：右移
			case 39:this.moveRight();break;
				//是40：下移
			case 40:this.moveDown();break;
			}
		}.bind(this);
	},
	randomNum:function(){//在一个随机位置生成2或4
		//反复：
		while(true){
			//在0-RN-1之间去一个随机数r
			var r=Math.floor(Math.random()*this.RN);
			//在0-CN-1之间取一个随机数c
			var c=Math.floor(Math.random()*this.CN);
			//如果data中r行c列为0
			if(this.data[r][c]===0){
			//设置data中r行c列的值为：
			this.data[r][c]=Math.random()<0.5?2:4;
				//随机生成一个小数，如果 <0.5,就赋值2，否则赋值4
			  break;//退出循环
			}
		}
	},
	updateView:function(){//将data中的每个元素值更新到页面队形的div上
		//遍历data
		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
			//找到和r行c列对应的div
			var div=document.getElementById("c"+r+c);
			//如果data中当前元素的值不等于0
			if(this.data[r][c]!==0){
				//设置其内容为data中当前元素的值
				div.innerHTML=this.data[r][c];
				//设置div的class属性为"cell n"+当前元素值
				div.className="cell n"+this.data[r][c];
				}else{//否则
				div.innerHTML="";//清除div的内容
				//设置div的class为"cell"
				div.className="cell";
				}
			}
		}
		//将score属性的值，放入id为score的div
		document.getElementById("score").innerHTML=this.score;
		//设置id为gameOver的div的display为：
		document.getElementById("gameOver")
			.style.display=
			this.state==this.GAMEOVER?"block":"none";
			//如果游戏结束，设置id为gameOver的div显示，否则，就隐藏
		//如果游戏结束，就设置id为final的span的内容为score属性
		this.state==this.GAMEOVER&&(
			document.getElementById("final").innerHTML=this.score
			);
		//设置id为topScore的内容为top属性
		document.getElementById("topScore")
			.innerHTML=this.top;
	},
	moveLeft:function(){//左移所有行
		//为data拍照，保存在before中
		var before=String(this.data);
		//遍历data中每一行
		for(var r=0;r<this.RN;r++){
			//调用moveLeftInRow(r)
			this.moveLeftInRow(r);
		}//（遍历结束）
		//为data拍照保存在after中
		var after=String(this.data);
		//如果before不等于after
		if(before!==after){
			//随机生成一个数
			this.randomNum();
			//如果游戏结束，就修改游戏状态为GAMEOVER
			if(this.isGAMEOVER()){
				this.state=this.GAMEOVER;
				//如果score>top
				if(this.score>this.top){
					//获得当前时间now
					var now=new Date();
					//将now+1年
					now.setFullYear(now.getFullYear()+1);
					//才将score写入cookie中的top变量，设置过期日期为now
					setCookie("top",this.score,now);
				}
			};
			//更新页面
			this.updateView();
		}	
	},
	isGAMEOVER:function(){
		//遍历data
		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				//如果当前元素是0或c<this.CN-1且当前元素等于右侧元素，或r<this.RN-1且当前元素等于下方元素，
				if(this.data[r][c]==0||c<this.CN-1&&this.data[r][c]==this.data[r][c+1]
					||r<this.RN-1&&this.data[r][c]==this.data[r+1][c])
				{return false}//就返回false
			}
		}//遍历结束
		return true;//返回true
	},
	moveLeftInRow:function(r){//左移一行
		//遍历data中r行，c从0开始，到<CN-1遍历当前行
			for(var c=0;c<this.CN-1;c++){
				//找到c位置后，下一个不为0的位置nextc
				var nextc=this.getNextInRow(r,c);
				//如果nextc是-1，直接退出循环
				if(nextc===-1){break;}
				//否则，如果当前c位置是0
				else {
					if(this.data[r][c]===0){
					//将r行nextc列的值赋给r行c列
					this.data[r][c]=this.data[r][nextc];
					//将nextc位置赋为0
					this.data[r][nextc]=0;
					//c留在原地  c--
					c--;
					}else if
					(this.data[r][c]===this.data[r][nextc]){//否则
					//如果r行c列的值等于r行nextc的值
					//将r行c列的值*2
					this.data[r][c]*=2;
					//将r行c列的新值累加到score属性上
					this.score+=this.data[r][c];
					//将nextc位置的值置为0
					this.data[r][nextc]=0;}
				}
			}
	},
	getNextInRow:function(r,c){
		//找r行c列右侧下一个不为0的位置
		//nextc从c+1开始，到<CN结束
		for(var nextc=c+1;nextc<this.CN;nextc++){
		
			//如果r行nextc位置不等于0
			if(this.data[r][nextc]!==0){
			return nextc;
			}//返回nextc
		}//遍历结束
		//返回-1
		return -1;
	},
	moveRight:function(){//右移所有行
		//为data拍照保存在before中
		var before=String(this.data);
		//遍历data中每一行
		for(var r=0;r<this.RN;r++){
			//调用moveRightInRow(r)
			this.moveRightInRow(r);
		}//(遍历结束)
		//为data拍照保存在after中
		var after=String(this.data);
		if(after!==before){//如果before不等于after
			this.randomNum();//随机生成一个数
			//如果游戏结束，就修改游戏状态为GAMEOVER
			if(this.isGAMEOVER()){
				this.state=this.GAMEOVER;
				//如果score>top
				if(this.score>this.top){
					//获得当前时间now
					var now=new Date();
					//将now+1年
					now.setFullYear(now.getFullYear()+1);
					//才将score写入cookie中的top变量，设置过期日期为now
					setCookie("top",this.score,now);
				}
			};
			this.updateView();//更新页面
		}
	},
	moveRightInRow:function(r){//右移第r行
		//c从CN-1开始,反向遍历r行，到>0结束
		for(var c=this.CN-1;c>0;c--){
			//找r行c列前一个不为0的位置prevc
			var prevc=this.getPrevInRow(r,c);
			//如果prevc是-1，就退出循环
			if(prevc==-1){break;}
			else{//否则
				//如果r行c列是0
				if(this.data[r][c]==0){
					//将r行prevc列的值赋值给r行c列
					this.data[r][c]=this.data[r][prevc];
					//将r行prevc列置为0
					this.data[r][prevc]=0;
					//c留在原地
					c++;
				}else if(this.data[r][c]==this.data[r][prevc]){
				//否则，如果r行c列的值等于r行prevc列的值
					//将r行c列的值*2
					this.data[r][c]*=2;
					//将r行c列的新值累加到score属性上
					this.score+=this.data[r][c];
					//将r行prevc列的值置为0
					this.data[r][prevc]=0;
				}
			}
		}
	},
	getPrevInRow:function(r,c){
		//查找r行c列左侧前一个不为0的位置
		//prevc从c-1开始，反向遍历，到>=0结束
		for(var prevc=c-1;prevc>=0;prevc--){
			//如果r行prevc列不等于0
			if(this.data[r][prevc]!==0){
				return prevc;//返回prevc
			}		
		//(遍历结束)
		//返回-1
		}
		return -1;
	},
	moveUp:function(){//上移所有行
		//为data拍照保存在before中
		var before=String(this.data);
		//遍历data中每一列
		for(var c=0;c<this.CN;c++){
			//调用moveRightInRow(r)
			this.moveUpInCol(c);
		}//(遍历结束)
		//为data拍照保存在after中
		var after=String(this.data);
		if(after!==before){//如果before不等于after
			this.randomNum();//随机生成一个数
			//如果游戏结束，就修改游戏状态为GAMEOVER
			if(this.isGAMEOVER()){
				this.state=this.GAMEOVER;
				//如果score>top
				if(this.score>this.top){
					//获得当前时间now
					var now=new Date();
					//将now+1年
					now.setFullYear(now.getFullYear()+1);
					//才将score写入cookie中的top变量，设置过期日期为now
					setCookie("top",this.score,now);
				}
			};
			this.updateView();//更新页面
		}
	},
	moveUpInCol:function(c){//上移第c列
		//
		for(var r=0;r<this.CN-1;r++){
			//找r行c列前一个不为0的位置naxtr
			var nextr=this.getNextInCol(r,c);
			//如果nextr是-1，就退出循环
			if(nextr==-1){break;}
			else{//否则
				//如果r行c列是0
				if(this.data[r][c]==0){
					//将nextr行c列的值赋值给r行c列
					this.data[r][c]=this.data[nextr][c];
					//将nextr行c列置为0
					this.data[nextr][c]=0;
					//r留在原地
					r--;
				}else if(this.data[r][c]==this.data[nextr][c]){
				//否则，如果r行c列的值等于nextr行c列的值
					//将r行c列的值*2
					this.data[r][c]*=2;
					//将r行c列的新值累加到score属性上
					this.score+=this.data[r][c];
					//将nextr行c列的值置为0
					this.data[nextr][c]=0;
				}
			}
		}
	},
	getNextInCol:function(r,c){
	 //nextr从r+1开始，到<RN结束  简化：把nextr改为r，r++
	 for(var nextr=r+1;nextr<this.CN;nextr++){
      //如果nextr位置不等于0
      if(this.data[nextr][c]!=0)
        return nextr;//返回nextr位置
	 }//(遍历结束)
	 return -1;//返回-1
	},
	moveDown:function(){//下移所有行
		//为data拍照保存在before中
		var before=String(this.data);
		//遍历data中每一列
		for(var c=0;c<this.CN;c++){
			//调用moveDownInCol(c)
			this.moveDownInCol(c);
		}//(遍历结束)
		//为data拍照保存在after中
		var after=String(this.data);
		if(after!==before){//如果before不等于after
			this.randomNum();//随机生成一个数
			//如果游戏结束，就修改游戏状态为GAMEOVER
			if(this.isGAMEOVER()){
				this.state=this.GAMEOVER;
				//如果score>top
				if(this.score>this.top){
					//获得当前时间now
					var now=new Date();
					//将now+1年
					now.setFullYear(now.getFullYear()+1);
					//才将score写入cookie中的top变量，设置过期日期为now
					setCookie("top",this.score,now);
				}
			};
			this.updateView();//更新页面
		}
	},
	moveDownInCol:function(c){
	 //r从RN-1开始，反向遍历每一行,到r>0结束
	  for(var r=this.RN-1;r>0;r--){
      //查找r位置上方前一个不为0的位置prevr
      var prevr=this.getPrevInCol(r,c);
      //如果没找到,就退出循环
      if(prevr==-1){break;}
      else{//否则  
        //如果r位置的值为0
        if(this.data[r][c]==0){
          //将prevr位置的值赋值给r位置
          this.data[r][c]=this.data[prevr][c];
          //将prevr位置置为0
          this.data[prevr][c]=0;
          r++;//r留在原地
        }else if(this.data[r][c]
                  ==this.data[prevr][c]){
        //否则，如果r位置的值等于prevr位置的值
          //将r位置的值*2
          this.data[r][c]*=2;
		  //将r行c列的新值累加到score属性上
		  this.score+=this.data[r][c];
          //将prevr位置置为0
          this.data[prevr][c]=0;
        }
      }
	 }
	},
	getPrevInCol:function(r,c){
		//prevr从r-1开始，到<RN结束
		for(var prevr=r-1;prevr>=0;prevr--){
      //如果nextr位置不等于0
      if(this.data[prevr][c]!=0)
        return prevr;//返回nextr位置
	 }//(遍历结束)
	 return -1;//返回-1
	},

}
game.start();

		
	
	

		