/**
 * Created by uid on 2016/11/18.
 */
//棋盘上的数组
var chess = [];
//var weight=[];
//面向对象
var game = {
  BW: 0,//保存棋子颜色，1为黑色。2为白色
  wins:[],//赢法数组
  count:0,//赢法总数
  playerwin:[],//保存玩家赢法
  computerwin:[],//保存电脑赢法
  playerWeight:[],//玩家棋子权重
  computerWeight:[],//计算机权重
  GAMEOVER:false,//保存游戏是否结束
  init: function () {//页面初始化
    this.GAMEOVER=false;
    for(var i=0;i<15;i++){
      chess[i]=[];
      for(var j=0;j<15;j++){
        chess[i][j]=0;
      }
    };
    //var rni=this.rn(6,8);
    //var rnj=this.rn(6,8);
    //console.log(rni,rnj);
    //console.dir(chess);
    //chess[rni][rnj]=2;//随机生成一白个子
    this.playerWeight=[
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
      [0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 0],
      [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0],

      [0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 4, 3, 2, 1, 0],
      [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
      [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
      [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
      [0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 4, 3, 2, 1, 0],

      [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0],
      [0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 0],
      [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    //canvas绘制棋盘
    var ctx = c1.getContext('2d');
    //清空棋盘
    ctx.clearRect(0,0,600,600);
    ctx.beginPath();
    for (var i = 0; i < 15; i++) {
      ctx.moveTo(20, 20 + i * 40);
      ctx.lineTo(580, 20 + i * 40);
      ctx.moveTo(20 + i * 40, 20);
      ctx.lineTo(20 + i * 40, 580);
    }
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle='#000';
    ctx.arc(300, 300, 5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.arc(140, 140, 5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.arc(140, 460, 5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.arc(460, 460, 5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.arc(460, 140, 5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    //var count=this.count;//赢法总数

    for(var i=0;i<15;i++){//总的赢法
      this.wins[i]=[];
      for(var j=0;j<15;j++){
        this.wins[i][j]=[];
      }
    }
    //横线赢法
    for(var i=0;i<15;i++){
      for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
          this.wins[i][j+k][this.count]=true;
        }
        this.count++;
      }
    }
    //竖线赢法
    for(var i=0;i<11;i++){
      for(var j=0;j<15;j++){
        for(var k=0;k<5;k++){
          this.wins[i+k][j][this.count]=true;
        }
        this.count++;
      }
    }
    //正斜线赢法
    for(var i=0;i<11;i++){
      for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
          this.wins[i+k][j+k][this.count]=true;
        }
        this.count++;
      }
    }
    //反斜线赢法
    for(var i=0;i<11;i++){
      for(var j=4;j<15;j++){
        for(var k=0;k<5;k++){
          this.wins[i+k][j-k][this.count]=true;
        }
        this.count++;
      }
    }
   // console.dir(this.wins);
    //var playerwin=this.playerwin;//
   // var computerwin=this.computerwin;
    for(var i=0;i<this.count;i++){
      this.playerwin[i]=0;
      this.computerwin[i]=0;
    }
    this.updateView(ctx);
    var that=this;
    //鼠标单击事件,获取鼠标对应的数组位置
    c1.onclick = function (e) {
      var x1 = e.offsetX;
      var y1 = e.offsetY;
      that.BW = 1;
      //判断鼠标点击的位置对应i，j
      //console.log(x1+'y:'+y1);
      for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
          var x2 = 20 + 40 * j;
          var y2 = 20 + 40 * i;
          var distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
          //console.log(distance);
          if ((distance < 15 && that.BW == 1) && (chess[i][j] != 1 && chess[i][j] != 2)) {
            chess[i][j] = that.BW;
            for (var k = 0; k < that.count; k++) {
              if (that.wins[i][j][k]) {
                that.playerwin[k]++;
                that.computerwin[k]=6;//电脑不能赢了
                if(that.playerwin[k]==5){
                  playerWin.style.display='block';//人赢了
                  that.GAMEOVER=true;
                }
              }
            }
            that.computerAI(ctx);
            that.updateView(ctx);

          }
        }
      }

    };
    gameBegin.onclick=function(){
      playerWin.style.display='none';
      that.init();
    };
    gameBeg.onclick=function(){
      computerWin.style.display='none';
      that.init();
    };
  },
  updateView: function (ctx) {
    //权值清零
    this.playerWeight=[
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
      [0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 0],
      [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0],

      [0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 4, 3, 2, 1, 0],
      [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
      [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
      [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
      [0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 4, 3, 2, 1, 0],

      [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0],
      [0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 0],
      [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    //遍历格子，将数组中值为1的棋子，绘制黑子棋子在棋盘上
    for (var i = 0; i < chess.length; i++) {
      for (var j = 0; j < chess[i].length; j++) {
        if (chess[i][j] == 1) {
          ctx.beginPath();
          ctx.arc(20 + 40 * j, 20 + 40 * i, 15, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fillStyle = '#000';
          ctx.fill();
        } else if (chess[i][j] === 2) {
          ctx.beginPath();
          ctx.arc(20 + 40 * j, 20 + 40 * i, 15, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fillStyle = '#fff';
          ctx.fill();
        }
      }
    }
  },
  rn:function(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  },
  //电脑自动下棋；
  computerAI:function(ctx){
    this.BW=2;
    //计算权值
    this.calc();
    //遍历weight，得到最大的weight[i][j],保存i，j
    var max=this.getMax();
    console.dir(this.playerWeight);
    var x=0;
    var y=0;
    for(var i=0;i<this.playerWeight.length;i++){//得到权值最大的i，j
      for(var j=0;j<this.playerWeight[i].length;j++){
        if(max==this.playerWeight[i][j]){
          x=i;
          y=j;
        }
      }
    }
    chess[x][y]=this.BW;
   // console.log(this.count);
    if (this.GAMEOVER == false) {
      for (var k = 0; k < this.count; k++) {
        //console.log(this.wins[x][y][k]);
        if (this.wins[x][y][k]) {
          this.computerwin[k]++;
          this.playerwin[k] = 6;
          // console.log(this.computerwin[k]);
          if (this.computerwin[k] == 5) {//电脑赢了
            computerWin.style.display = 'block';
            //computerWin
            this.GAMEOVER=true;
          }
        }
      }
    }
  },
  calc:function(){
    for(var i=0;i<15;i++){
      this.computerWeight[i]=[];
      for(var j=0;j<15;j++){
        this.computerWeight[i][j]=0;
      }
    }
    for(var i=0;i<15;i++){
      for(var j=0;j<15;j++){
        if(chess[i][j]==0){
          for(var k=0;k<this.count;k++){
            if(this.wins[i][j][k]){
              if(this.playerwin[k]==1){
                this.playerWeight[i][j]+=20;
              }else if(this.playerwin[k]==2){
                this.playerWeight[i][j]+=40;
              }else if(this.playerwin[k]==3){
                this.playerWeight[i][j]+=200;
              }else if(this.playerwin[k]==4){
                this.playerWeight[i][j]+=1000;
              }
              if(this.computerwin[k]==1){
                this.playerWeight[i][j]+=22;
              }else if(this.computerwin[k]==2){
                this.playerWeight[i][j]+=42;
              }else if(this.computerwin[k]==3){
                this.playerWeight[i][j]+=220;
              }else if(this.computerwin[k]==4){
                this.playerWeight[i][j]+=2000;
              }
            }
          }
        }
      }
    }
  },
  getMax:function(){
    var maxWeight=0;
    for(var i=0;i<15;i++){//得到权值最大值
      for(var j=0;j<15;j++){
        if(chess[i][j]==2||chess[i][j]==1){
          this.playerWeight[i][j]=0;
        }
        maxWeight=this.playerWeight[i][j]>maxWeight?this.playerWeight[i][j]:maxWeight;
      }
    }
    return maxWeight;
  }
};
game.init();