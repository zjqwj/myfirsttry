/**
 * Created by uid on 2016/11/18.
 */
//棋盘上的数组
var chess = [];
var weight=[];
//面向对象
var game = {
  BW: 0,//保存棋子颜色，1为黑色。2为白色
  //WEIGHT:0,//权值
  GAMEOVER:false,//保存游戏是否结束
  init: function () {//页面初始化
    this.GAMEOVER=false;
    chess = [
      [0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],
      [0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],
      [0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],
      [0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],
      [0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],

      [0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],
      [0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],
      [0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],
      [0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],
      [0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],

      [0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],
      [0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],
      [0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],
      [0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],
      [0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0]
    ];
    weight=[
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
      [0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 0],
      [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0],

      [0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 4, 3, 2, 1, 0],
      [0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 4, 3, 2, 1, 0],
      [0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 4, 3, 2, 1, 0],
      [0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 4, 3, 2, 1, 0],
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

    this.updateView(ctx);
    this.chessDown(ctx);
  },
  updateView: function (ctx) {
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
  chessDown: function (ctx) {
    //保存this
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
          if ((distance < 15 && that.BW == 1)&&(chess[i][j]!=1&&chess[i][j]!=2)){
            chess[i][j] = that.BW;
            that.checkChess(ctx);//电脑下的位置
            that.updateView(ctx);
            that.isGameOver();
          } else if (distance < 15 && that.BW == 2) {
            chess[i][j] = that.BW;
            that.checkChess(ctx);//电脑下的位置
            that.updateView(ctx);
            that.isGameOver();
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
    }
  },
  //电脑自动下棋；
  computerAI:function(ctx){
    this.BW=2;
    //遍历weight，得到最大的weight[i][j],保存i，j

    var max=this.getMax();
    if(max<2000){//没有威胁，检查白棋进攻，只有2子
      for(var i=0;i<chess.length;i++){
        for(var j=0;j<chess[i].length;j++){
          if(chess[i][j]==0){//右方白棋
            if(j<11&&chess[i][j+1]==2){//02
              weight[i][j]+=1;
              if(j<11&&chess[i][j+2]==2){//022
                weight[i][j]=2000;
                if(j<11&&chess[i][j+3]==2){//0222
                  weight[i][j]=4000;
                  if(j<11&&chess[i][j+4]==2){//02222
                    weight[i][j]=40000;
                  }
                }
              }
            }
          }//右方白棋
          if(chess[i][j]==0){//左方白棋
            if(j>3&&chess[i][j-1]==2){//0*
              weight[i][j]+=1;
              if(j>3&&chess[i][j-2]==2){//022
                weight[i][j]=2000;
                if(j>3&&chess[i][j-3]==2){//0222
                  weight[i][j]=4000;
                  if(j>3&&chess[i][j-4]==2){//02222
                    weight[i][j]=40000;
                  }
                }
              }
            }
          }//左方白棋
          if(chess[i][j]==0){//上方白棋
            if(i>3&&chess[i-1][j]==2){//0*
              weight[i][j]+=1;
              if(i>3&&chess[i-2][j]==2){//022
                weight[i][j]=2000;
                if(i>3&&chess[i-3][j]==2){//0222
                  weight[i][j]=4000;
                  if(i>3&&chess[i-4][j]==2){//02222
                    weight[i][j]=40000;
                  }
                }
              }
            }
          }//上方白棋
          if(chess[i][j]==0){//下方白棋
            if(i<11&&chess[i+1][j]==2){//0*
              weight[i][j]+=1;
              if(i<11&&chess[i+2][j]==2){//022
                weight[i][j]=2000;
                if(i<11&&chess[i+3][j]==2){//0222
                  weight[i][j]=4000;
                  if(i<11&&chess[i+4][j]==2){//02222
                    weight[i][j]=40000;
                  }
                }
              }
            }
          }//下方白棋
          if(chess[i][j]==0){//左上方白棋
            if(i>3&&j>3&&chess[i-1][j-1]==2){//0*
              weight[i][j]+=1;
              if(i>3&&j>3&&chess[i-2][j-2]==2){//022
                weight[i][j]=2000;
                if(i>3&&j>3&&chess[i-3][j-3]==2){//0222
                  weight[i][j]=4000;
                  if(i>3&&j>3&&chess[i-4][j-4]==2){//02222
                    weight[i][j]=40000;
                  }
                }
              }
            }
          }//左上方白棋
          if(chess[i][j]==0){//左下方白棋
            if(i<11&&j>3&&chess[i+1][j-1]==2){//0*
              weight[i][j]+=1;
              if(i<11&&j>3&&chess[i+2][j-2]==2){//022
                weight[i][j]=2000;
                if(i<11&&j>3&&chess[i+3][j-3]==2){//0222
                  weight[i][j]=4000;
                  if(i<11&&j>3&&chess[i+4][j-4]==2){//02222
                    weight[i][j]=40000;
                  }
                }
              }
            }
          }//左下方白棋
          if(chess[i][j]==0){//右上方白棋
            if(i>3&&j<11&&chess[i-1][j+1]==2){//0*
              weight[i][j]+=1;
              if(i>3&&j<11&&chess[i-2][j+2]==2){//022
                weight[i][j]=2000;
                if(i>3&&j<11&&chess[i-3][j+3]==2){//0222
                  weight[i][j]=4000;
                  if(i>3&&j<11&&chess[i-4][j+4]==2){//02222
                    weight[i][j]=40000;
                  }
                }
              }
            }
          }//右上方白棋
          if(chess[i][j]==0){//右下方白棋
            if(i<11&&j<11&&chess[i+1][j+1]==2){//0*
              weight[i][j]+=1;
              if(i<11&&j<11&&chess[i+2][j+2]==2){//022
                weight[i][j]=2000;
                if(i<11&&j<11&&chess[i+3][j+3]==2){//0222
                  weight[i][j]=4000;

                }
              }
            }
          }//右下方白棋

        }
      }
    }
    console.dir(weight);
    max=this.getMax();
    var x=0;
    var y=0;
    for(var i=0;i<weight.length;i++){//得到权值最大的i，j
      for(var j=0;j<weight[i].length;j++){
        if(max==weight[i][j]){
          x=i;
          y=j;
        }
      }
    }
    chess[x][y]=this.BW;
    this.isGameOver();
  },
  getMax:function(){
    var maxWeight=0;
    for(var i=0;i<weight.length;i++){//得到权值最大值
      for(var j=0;j<weight[i].length;j++){
        if(chess[i][j]==2||chess[i][j]==1){
          weight[i][j]=0;
        }
        maxWeight=weight[i][j]>maxWeight?weight[i][j]:maxWeight;
      }
    }
    return maxWeight;
  },
  checkChess:function(ctx){//电脑检查棋盘，得出该下的x，y
    for(var i=0;i<chess.length;i++){
      for(var j=0;j<chess[i].length;j++){
        /*
        if((i==0||i==14)&&j<14&&j>0){
          if(chess[i][j]==1){
            weight[i][j+1]+=5;
            weight[i][j-1]+=5;
            if(j<13&&j>1){
              if(chess[i][j+1]==1){
                weight[i][j+2]+=200;
                weight[i][j-1]+=200;
              }
            }
          }
        }
        if((j==0||j==14)&&i>0&&i<14){
          if(chess[i][j]==1){
            weight[i+1][j]+=5;
            weight[i-1][j]+=5;
            if(i<13&&i>1){
              if(chess[i+1][j]==1){
                weight[i+2][j]+=200;
                weight[i-1][j]+=200;
              }
            }
          }
        }
        if(i>0&&i<14&&j<14&&j>0){ //黑子周围是否有黑子，判断是否有两个子
          if(chess[i][j]==1){//当有一个黑子时，周围格子权值+1
            //console.log('检查到黑子');
            weight[i][j+1]+=5;//右边
            weight[i-1][j+1]+=5;//右上
            weight[i+1][j+1]+=5;//右下
            weight[i][j-1]+=5;//左方
            weight[i-1][j-1]+=5;//左上
            weight[i+1][j-1]+=5;//左下
            weight[i+1][j]+=5;//下方
            weight[i-1][j]+=5;//上方
            if((i>1&&i<13)&&(j<13&&j>1)) {
              if (chess[i][j + 1] == 1) {//右边
                weight[i] [j + 2] += 200;
                weight[i][j - 1] += 200;
                if((i>2&&i<12)&&(j<12&&j>2)) {//右边2个子
                  if(chess[i][j+2]==1){
                    weight[i][j+3]+=2000;
                    weight[i][j-1]+=2000;
                    if(chess[i][j+3]==0&&chess[i][j-1]==0){
                      weight[i][j+3]+=30000;
                     // weight[i][j-1]+=10000;
                    }
                    if((i>3&&i<11)&&(j<11&&j>3)) {//右边第三子
                      if (chess[i][j + 3] == 1) {
                        weight[i][j + 4] += 35000;
                        //weight[i][j - 1] += 10000;
                      }
                    }
                  }
                }
              }
              if (chess[i + 1][j + 1] == 1) {//右下
                weight[i+2] [j + 2] += 200;
                weight[i-1][j -1] += 200;
                if((i>2&&i<12)&&(j<12&&j>2)) {//右下2个子
                  if(chess[i+2][j+2]==1){
                    weight[i+3][j+3]+=2000;
                    weight[i-1][j-1]+=2000;
                    if(chess[i+3][j+3]==0&&chess[i-1][j-1]==0){
                      weight[i+3][j+3]+=30000;
                      //weight[i-1][j-1]+=10000;
                    }
                    if((i>3&&i<11)&&(j<11&&j>3)) {
                      if (chess[i + 3][j + 3] == 1) {
                        weight[i + 4][j + 4] += 35000;
                        //weight[i - 1][j - 1] += 10000;
                      }
                    }
                  }
                }

              }
              if (chess[i+1][j-1] == 1) {//左下
                weight[i+2] [j - 2] += 200;
                weight[i+1][j -1] += 200;
                if((i>2&&i<12)&&(j<12&&j>2)) {
                  if(chess[i+2][j-2]==1){
                    weight[i+3][j-3]+=2000;
                    weight[i-1][j+1]+=2000;
                    if(chess[i+3][j-3]==0&&chess[i-1][j+1]==0){
                      weight[i+3][j-3]+=30000;
                      //weight[i-1][j+1]+=10000;
                    }
                    if((i>3&&i<11)&&(j<11&&j>3)) {
                      if (chess[i + 3][j - 3] == 1) {
                        weight[i + 4][j - 4] += 35000;
                        //weight[i - 1][j + 1] += 10000;
                      }
                    }
                  }
                }
              }
              if (chess[i+1][j] == 1) {//下方
                weight[i+2] [j ] += 200;
                weight[i-1][j] += 200;
                if((i>2&&i<12)&&(j<12&&j>2)) {
                  if(chess[i+2][j]==1){
                    weight[i+3][j]+=2000;
                    weight[i-1][j]+=2000;
                    if(chess[i+3][j]==0&&chess[i-1][j]==0){
                      weight[i+3][j]+=30000;
                     // weight[i-1][j-1]+=10000;
                    }
                    if((i>3&&i<11)&&(j<11&&j>3)) {
                      if (chess[i + 3][j] == 1) {
                        weight[i + 4][j] += 35000;
                        //weight[i - 1][j] += 10000;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        */
        if(i<chess.length-4){//向下加权值
          if(chess[i][j]==1){//*
            weight[i+1][j]+=5;
            if(chess[i+1][j]==0&&chess[i+2][j]==1){//*0*
              weight[i+1][j]+=200;
              if(chess[i+3][j]==1){//*0**
                weight[i+1][j]+=4000;
                if(chess[i+4][j]==1){//*0***
                  weight[i+1][j]+=20000;
                }
              }
            }
            if(chess[i+1][j]==1){//**
              if(chess[i+2][j]==0){//**0
                weight[i+2][j]+=200;
              }
              if(chess[i-1][j]==0&&i>0){//0**
                weight[i-1][j]+=200;
              }

              if(chess[i+2][j]==1){//***
                if(chess[i+3][j]==1&&chess[i+4][j]==0){//****0
                  weight[i+4][j]+=20000;
                }
                if(chess[i+3][j]==1&&chess[i-1][j]==0&&i>0){//0****
                  weight[i-1][j]+=20000;
                }
                if(chess[i+3][j]==0&&chess[i-1][j]==2){//2***0
                  weight[i+3][j]=1000;
                }
                if(chess[i-1][j]==0&&i>0&&chess[i+3][j]==2){//0***2
                  weight[i-1][j]=1000;
                }
                if(chess[i+3][j]==0&&chess[i-1][j]==0&&i>0){//0***0
                  weight[i+3][j]+=4000;
                  weight[i-1][j]+=4000;
                }
              }
              if(chess[i+2][j]==0&&chess[i+3][j]){//**0*
                weight[i+2][j]+=4000;
                if(chess[i+4][j]==1){//**0**
                  weight[i+2][j]+=20000;
                }
              }
            }
          }
        }//向下加权值
        if(j<chess.length-4){//向右加权值
          if(chess[i][j]==1){//*
            weight[i][j+1]+=5;
            if(chess[i][j+1]==0&&chess[i][j+2]==1){//*0*
              weight[i][j+1]+=200;
              if(chess[i][j+3]==1){//*0**
                weight[i][j+1]+=4000;
                if(chess[i][j+4]==1){//*0***
                  weight[i][j+1]+=20000;
                }
              }
            }
            if(chess[i][j+1]==1){//**
              if(chess[i][j+2]==0){//**0
                weight[i][j+2]+=200;
              }
              if(chess[i][j-1]==0&&j>0){//0**
                weight[i][j-1]+=200;
              }

              if(chess[i][j+2]==1){//***
                if(chess[i][j+3]==1&&chess[i][j+4]==0){//****0
                  weight[i][j+4]+=20000;
                }
                if(chess[i][j+3]==1&&chess[i][j-1]==0&&j>0){//0****
                  weight[i][j-1]+=20000;
                }
                if(chess[i][j+3]==0&&chess[i][j-1]==2){//2***0
                  weight[i][j+3]=1000;
                }
                if(chess[i][j-1]==0&& j>0&&chess[i][j+3]==2){//0***2
                  weight[i][j-1]=1000;
                }
                if(chess[i][j+3]==0&&chess[i][j-1]==0&& j>0){//0***0
                  weight[i][j+3]+=4000;
                  weight[i][j-1]+=4000;
                }
              }
              if(chess[i][j+2]==0&&chess[i][j+3]){//**0*
                weight[i][j+2]+=4000;
                if(chess[i][j+4]==1){//**0**
                  weight[i][j+2]+=20000;
                }
              }
            }
          }
        }//向右加权值
        if(j<chess.length-4&&i<chess.length-4){//向右下加权值
          if(chess[i][j]==1){//*
            weight[i+1][j+1]+=5;
            if(chess[i+1][j+1]==0&&chess[i+2][j+2]==1){//*0*
              weight[i+1][j+1]+=200;
              if(chess[i+3][j+3]==1){//*0**
                weight[i+1][j+1]+=4000;
                if(chess[i+4][j+4]==1){//*0***
                  weight[i+1][j+1]+=20000;
                }
              }
            }
            if(chess[i+1][j+1]==1){//**
              if(chess[i+2][j+2]==0){//**0
                weight[i+2][j+2]+=200;
              }
              if(chess[i-1][j-1]==0&&j>0&&i>0){//0**
                weight[i-1][j-1]+=200;
              }

              if(chess[i+2][j+2]==1){//***
                if(chess[i+3][j+3]==1&&chess[i+4][j+4]==0){//****0
                  weight[i+4][j+4]+=20000;
                }
                if(chess[i+3][j+3]==1&&chess[i-1][j-1]==0&&j>0&&i>0){//0****
                  weight[i-1][j-1]+=20000;
                }
                if(chess[i+3][j+3]==0&&chess[i-1][j-1]==2){//2***0
                  weight[i+3][j+3]=1000;
                }
                if(chess[i-1][j-1]==0&& j>0&&i>0&&chess[i+3][j+3]==0){//0***2
                  weight[i-1][j-1]=1000;
                }
                if(chess[i+3][j+3]==0&&chess[i-1][j-1]==0&& j>0&&i>0){//0***0
                  weight[i+3][j+3]+=4000;
                  weight[i-1][j-1]+=4000;
                }
              }
              if(chess[i+2][j+2]==0&&chess[i+3][j+3]){//**0*
                weight[i+2][j+2]+=4000;
                if(chess[i+4][j+4]==1){//**0**
                  weight[i+2][j+2]+=20000;
                }
              }
            }
          }
        }//向右下加权值
        if(j>4&&i<chess.length-4){//向左下加权值
          if(chess[i][j]==1){//*
            weight[i+1][j-1]+=5;
            if(chess[i+1][j-1]==0&&chess[i+2][j-2]==1){//*0*
              weight[i+1][j-1]+=200;
              if(chess[i+3][j-3]==1){//*0**
                weight[i+1][j-1]+=4000;
                if(chess[i+4][j-4]==1){//*0***
                  weight[i+1][j-1]+=20000;
                }
              }
            }
            if(chess[i+1][j-1]==1){//**
              if(chess[i+2][j-2]==0){//**0
                weight[i+2][j-2]+=200;
              }
              if(chess[i-1][j+1]==0&&j<chess.length&&i>0){//0**
                weight[i-1][j+1]+=200;
              }
              if(chess[i+2][j-2]==1){//***
                if(chess[i+3][j-3]==1&&chess[i+4][j-4]==0){//****0
                  weight[i+4][j-4]+=20000;
                }
                if(chess[i+3][j-3]==1&&chess[i-1][j+1]==0&&j<chess.length&&i>0){//0****
                  weight[i-1][j+1]+=20000;
                }
                if(chess[i+3][j-3]==0&&chess[i-1][j+1]==2){//2***0
                  weight[i+3][j-3]=1000;
                }
                if(chess[i-1][j+1]==0&& j<chess.length&&i>0&&chess[i+3][j-3]==2){//0***2
                  weight[i-1][j+1]=1000;
                }
                if(chess[i+3][j-3]==0&&chess[i-1][j+1]==0&& j<chess.length&&i>0){
                  weight[i+3][j-3]+=4000;
                  weight[i-1][j+1]+=4000;
                }
              }
              if(chess[i+2][j-2]==0&&chess[i+3][j-3]){//**0*
                weight[i+2][j-2]+=4000;
                if(chess[i+4][j-4]==1){//**0**
                  weight[i+2][j-2]+=20000;
                }
              }
            }
          }
        }//向右下加权值
      }
    }//检查黑子
    //检查白子,进攻
    /*
    for (var i = 0; i < chess.length - 4; i++) {
      for (var j = 0; j < chess[i].length - 4; j++) {
        if (chess[i][j] == 2) {
          if (chess[i + 1][j + 1] == 2) {
            if (chess[i + 2][j + 2] == 2) {
              if (chess[i + 3][j + 3] == 0 && chess[i - 1][j - 1] == 0) {
                weight[i + 3][j + 3] += 10000;
              }
              if (chess[i + 3][j + 3] == 2) {
                if (chess[i + 4][j + 4] == 0) {
                  weight[i + 4][j + 4] += 30000;
                }
                if (chess[i -1][j -1] == 0&&(j>0&&i>0)) {
                  weight[i -1][j -1] += 30000;
                }
              }
            }
          }
        }
      }
    }//右下
    for (var i = 0; i < chess.length ; i++) {
      for (var j = 0; j < chess[i].length - 4; j++) {
        if (chess[i][j] == 2) {
          if (chess[i ][j + 1] == 2) {
            if (chess[i ][j + 2] == 2) {
              if (chess[i ][j + 3] == 0 && chess[i][j - 1] == 0) {
                weight[i ][j + 3] += 10000;
              }
              if (chess[i ][j + 3] == 2) {
                if (chess[i ][j + 4] == 0) {
                  weight[i ][j + 4] += 30000;
                }
                if (chess[i ][j -1] == 0&& j>0) {
                  weight[i ][j -1] += 30000;
                }
              }
            }
          }
        }
      }
    }//右
    for (var i = 0; i < chess.length - 4; i++) {
      for (var j = 0; j < chess[i].length ; j++) {
        if (chess[i][j] == 2) {
          if (chess[i + 1][j ] == 2) {
            if (chess[i + 2][j ] == 2) {
              if (chess[i + 3][j ] == 0 && chess[i - 1][j ] == 0) {
                weight[i + 3][j ] += 10000;
              }
              if (chess[i + 3][j] == 2) {
                if (chess[i + 4][j ] == 0) {
                  weight[i + 4][j ] += 30000;
                }
                if (chess[i -1][j ] == 0&&i>0) {
                  weight[i -1][j ] += 30000;
                }
              }
            }
          }
        }
      }
    }//下
    for(var i=0;i<chess.length-4;i++){
      for(var j=4;j<chess[i].length;j++){
        if(chess[i][j]==2){
          if(chess[i+1][j-1]==2){
            if(chess[i+2][j-2]==2){
              if (chess[i + 3][j -3] == 0 && chess[i - 1][j+1 ] == 0) {
                weight[i + 3][j -3] += 10000;
              }
              if(chess[i+3][j-3]==2){
                if (chess[i + 4][j -4] == 0) {
                  weight[i + 4][j -4] += 30000;
                }
                if (chess[i-1][j +1] == 0&&(i>0&&j<14)) {
                  weight[i -1 ][j +1] += 30000;
                }
              }
            }
          }
        }
      }
    }//左下
    */
    //for(var i=0;i<chess.length;i++){
    //  for(var j=0;j<chess[i].length;j++){
    //    //向下检查白子，
    //  }
    //}
    this.computerAI(ctx)
  },
  isGameOver:function(){
    //判断玩家胜利
    for (var i = 0; i < chess.length - 4; i++) {
      for (var j = 0; j < chess[i].length - 4; j++) {
        if (chess[i][j] == 1) {
          if (chess[i + 1][j + 1] == 1) {
            if (chess[i + 2][j + 2] == 1) {
              if (chess[i + 3][j + 3] == 1) {
                if (chess[i + 4][j + 4] == 1) {
                  playerWin.style.display = 'block';
                  this.GAMEOVER=true;
                  break;
                }
              }
            }
          }
        }
      }
    }//右下
    for(var i=0;i<chess.length-4;i++){
      for(var j=0;j<chess[i].length;j++){
        if(chess[i][j]==1){
          if(chess[i+1][j]==1){
            if(chess[i+2][j]==1){
              if(chess[i+3][j]==1){
                if(chess[i+4][j]==1){
                  playerWin.style.display='block';
                  this.GAMEOVER=true;
                  break;
                }
              }
            }
          }
        }//下边
      }
    }//下边
    for(var i=0;i<chess.length;i++){
      for(var j=0;j<chess[i].length-4;j++){
        if(chess[i][j]==1){
          if(chess[i][j+1]==1){
            if(chess[i][j+2]==1){
              if(chess[i][j+3]==1){
                if(chess[i][j+4]==1){
                  //黑子赢了，玩家赢
                  // console.log('玩家赢了');
                  playerWin.style.display='block';
                  this.GAMEOVER=true;
                  break;
                }
              }
            }
          }
        }
      }
    }//右边
    for(var i=0;i<chess.length-4;i++){
      for(var j=4;j<chess[i].length;j++){
        if(chess[i][j]==1){
          if(chess[i+1][j-1]==1){
            if(chess[i+2][j-2]==1){
              if(chess[i+3][j-3]==1){
                if(chess[i+4][j-4]==1){
                  playerWin.style.display='block';
                  this.GAMEOVER=true;
                  break;
                }
              }
            }
          }
        }
      }
    }//左下
    if(this.GAMEOVER==false) {
      //判断电脑胜利
      for (var i = 0; i < chess.length - 4; i++) {
        for (var j = 0; j < chess[i].length - 4; j++) {
          if (chess[i][j] == 2) {
            if (chess[i + 1][j + 1] == 2) {
              if (chess[i + 2][j + 2] == 2) {
                if (chess[i + 3][j + 3] == 2) {
                  if (chess[i + 4][j + 4] == 2) {
                    computerWin.style.display = 'block';
                    break;
                  }
                }
              }
            }
          }
        }
      }//右下
      for (var i = 0; i < chess.length - 4; i++) {
        for (var j = 0; j < chess[i].length; j++) {
          if (chess[i][j] == 2) {
            if (chess[i + 1][j] == 2) {
              if (chess[i + 2][j] == 2) {
                if (chess[i + 3][j] == 2) {
                  if (chess[i + 4][j] == 2) {
                    computerWin.style.display = 'block';
                    break;
                  }
                }
              }
            }
          }//下边
        }
      }//下边
      for (var i = 0; i < chess.length; i++) {
        for (var j = 0; j < chess[i].length - 4; j++) {
          if (chess[i][j] == 2) {
            if (chess[i][j + 1] == 2) {
              if (chess[i][j + 2] == 2) {
                if (chess[i][j + 3] == 2) {
                  if (chess[i][j + 4] == 2) {
                    //黑子赢了，玩家赢
                    // console.log('玩家赢了');
                    computerWin.style.display = 'block';
                    break;
                  }
                }
              }
            }
          }
        }
      }//右边
      for (var i = 0; i < chess.length - 4; i++) {
        for (var j = 4; j < chess[i].length; j++) {
          if (chess[i][j] == 2) {
            if (chess[i + 1][j - 1] == 2) {
              if (chess[i + 2][j - 2] == 2) {
                if (chess[i + 3][j - 3] == 2) {
                  if (chess[i + 4][j - 4] == 2) {
                    computerWin.style.display = 'block';
                    break;
                  }
                }
              }
            }
          }
        }
      }//左下
    }
  }
};
game.init();