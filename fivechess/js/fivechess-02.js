/**
 * Created by uid on 2016/11/18.
 */
//棋盘上的数组
var chess = [];
var weight = [];
//面向对象
var game = {
  BW: 0,//保存棋子颜色，1为黑色。2为白色
  //WEIGHT:0,//权值
  GAMEOVER: false,//保存游戏是否结束
  init: function () {//页面初始化
    this.GAMEOVER = false;
    chess = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    weight = [
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
    ctx.clearRect(0, 0, 600, 600);
    ctx.beginPath();
    for (var i = 0; i < 15; i++) {
      ctx.moveTo(20, 20 + i * 40);
      ctx.lineTo(580, 20 + i * 40);
      ctx.moveTo(20 + i * 40, 20);
      ctx.lineTo(20 + i * 40, 580);
    }
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = '#000';
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
    //重新计算权值
    weight = [
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
  chessDown: function (ctx) {
    //保存this
    var that = this;
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
    gameBegin.onclick = function () {
      playerWin.style.display = 'none';
      that.init();
    };
    gameBeg.onclick = function () {
      computerWin.style.display = 'none';
      that.init();
    }
  },
  //电脑自动下棋；
  computerAI: function (ctx) {
    this.BW = 2;
    //遍历weight，得到最大的weight[i][j],保存i，j

    var max = this.getMax();
    console.dir(weight);
    var x = 0;
    var y = 0;
    for (var i = 0; i < weight.length; i++) {//得到权值最大的i，j
      for (var j = 0; j < weight[i].length; j++) {
        if (max == weight[i][j]) {
          x = i;
          y = j;
        }
      }
    }
    chess[x][y] = this.BW;
    this.isGameOver();
  },
  getMax: function () {
    var maxWeight = 0;
    for (var i = 0; i < weight.length; i++) {//得到权值最大值
      for (var j = 0; j < weight[i].length; j++) {
        if (chess[i][j] == 2 || chess[i][j] == 1) {
          weight[i][j] = 0;
        }
        maxWeight = weight[i][j] > maxWeight ? weight[i][j] : maxWeight;
      }
    }
    return maxWeight;
  },
  checkChess: function (ctx) {//电脑检查棋盘，得出该下的x，y
    for (var i = 0; i < chess.length; i++) {
      for (var j = 0; j < chess[i].length; j++) {
        if (chess[i][j] == 0) {
          //权值相加块
          if (j < 14) {//右
            if (chess[i][j + 1] == 0) {//左边第一颗为空
              if (j < 13 && chess[i][j + 2] == 2) {//左边第二颗为白子
                weight[i][j] += 5;
                if (j < 12 && chess[i][j + 3] == 2) {//左边第三颗为白子
                  weight[i][j] = 1000
                }
                if (j < 12 && chess[i][j + 3] == 1) {//左边第三颗为黑子,权值为10
                  weight[i][j] = 10;
                }
              }
              if (j < 13 && chess[i][j + 2] == 1) {//左边第二颗为黑子
                weight[i][j] += 5;
                if (j < 12 && chess[i][j + 3] == 1) {//左边第三颗为黑子,权值为600
                  weight[i][j] = 600;
                }
              }
            }
            if (chess[i][j + 1] == 2) {//左边第一课为白子,权值加100
              weight[i][j] += 40;
              if (j < 13 && chess[i][j + 2] == 2) {//左边第二颗都为白子，权值加100
                weight[i][j] += 350;
                if (j < 12 && chess[i][j + 3] == 2) {//左边第三颗是白子，
                  if (j < 11 && chess[i][j + 4] == 1) {//第四颗是黑子
                    weight[i][j] = 1000;
                  }
                  if (j < 11 && chess[i][j + 4] == 2) {//第四颗是白子
                    weight[i][j] = 10000;
                  }
                  if (j < 11 && chess[i][j + 4] == 1) {//第四颗是空
                    weight[i][j] = 5000;
                  }
                }
              }
            }
            if (chess[i][j + 1] == 1) {//左边第一颗为黑子，权值加5
              weight[i][j] += 5;
              if (j < 13 && chess[i][j + 2] == 1) {//左边两颗都为黑子，权值加110
                weight[i][j] += 300;
                if (j < 12 && chess[i][j + 3] == 1) {//右边第三颗为黑子，
                  if (j < 11 && chess[i][j + 4] == 1) {//右边第四颗为黑子
                    weight[i][j] = 9900;
                  }
                }
              }
            }
          }
          if (i < 14) {//下
            if (chess[i + 1][j] == 0) {//左边第一颗为空
              if (i < 13 && chess[i + 2][j] == 2) {//左边第二颗为白子
                weight[i][j] += 5;
                if (i < 12 && chess[i + 3][j] == 2) {//左边第三颗为白子
                  weight[i][j] = 1000
                }
                if (i < 12 && chess[i + 3][j] == 1) {//左边第三颗为黑子,权值为10
                  weight[i][j] = 10;
                }
              }
              if (i < 13 && chess[i + 2][j] == 1) {//左边第二颗为黑子
                weight[i][j] += 5;
                if (i < 12 && chess[i + 3][j] == 1) {//左边第三颗为黑子,权值为600
                  weight[i][j] = 600;
                }
              }
            }
            if (chess[i + 1][j] == 2) {//左边第一课为白子,权值加100
              weight[i][j] += 40;
              if (i < 13 && chess[i + 2][j] == 2) {//左边第二颗都为白子，权值加100
                weight[i][j] += 350;
              }
            }
            if (chess[i + 1][j] == 1) {//左边第一颗为黑子，权值加5
              weight[i][j] += 5;
              if (i < 13 && chess[i + 2][j] == 1) {//左边两颗都为黑子，权值加110
                weight[i][j] += 110;
              }
            }
          }
          if (i < 14 && j < 14) {//右下
            if (chess[i + 1][j + 1] == 0) {//左边第一颗为空
              if (i < 13 && j < 13 && chess[i + 2][j + 2] == 2) {//左边第二颗为白子
                weight[i][j] += 5;
                if (i < 12 && j < 12 && chess[i + 3][j + 3] == 2) {//左边第三颗为白子
                  weight[i][j] = 1000
                }
                if (i < 12 && j < 12 && chess[i + 3][j + 3] == 1) {//左边第三颗为黑子,权值为10
                  weight[i][j] = 10;
                }
              }
              if (i < 13 && j < 13 && chess[i + 2][j + 2] == 1) {//左边第二颗为黑子
                weight[i][j] += 5;
                if (i < 12 && j < 12 && chess[i + 3][j + 3] == 1) {//左边第三颗为黑子,权值为600
                  weight[i][j] = 600;
                }
              }
            }
            if (chess[i + 1][j + 1] == 2) {//左边第一课为白子,权值加100
              weight[i][j] += 40;
              if (i < 13 && j < 13 && chess[i + 2][j + 2] == 2) {//左边第二颗都为白子，权值加100
                weight[i][j] += 350;
              }
            }
            if (chess[i + 1][j + 1] == 1) {//左边第一颗为黑子，权值加5
              weight[i][j] += 5;
              if (i < 13 && j < 13 && chess[i + 2][j + 2] == 1) {//左边两颗都为黑子，权值加110
                weight[i][j] += 110;
              }
            }
          }
          if (i < 14 && j > 0) {//左下
            if (chess[i + 1][j + 1] == 0) {//左边第一颗为空
              if (i < 13 && j > 1 && chess[i + 2][j + 2] == 2) {//左边第二颗为白子
                weight[i][j] += 5;
                if (i < 12 && j > 2 && chess[i + 3][j + 3] == 2) {//左边第三颗为白子
                  weight[i][j] = 1000
                }
                if (i < 12 && j > 2 && chess[i + 3][j + 3] == 1) {//左边第三颗为黑子,权值为10
                  weight[i][j] = 10;
                }
              }
              if (i < 13 && j > 1 && chess[i + 2][j + 2] == 1) {//左边第二颗为黑子
                weight[i][j] += 5;
                if (i < 12 && j > 2 && chess[i + 3][j + 3] == 1) {//左边第三颗为黑子,权值为600
                  weight[i][j] = 600;
                }
              }
            }
            if (chess[i + 1][j + 1] == 2) {//左边第一课为白子,权值加100
              weight[i][j] += 40;
              if (i < 13 && j > 1 && chess[i + 2][j + 2] == 2) {//左边第二颗都为白子，权值加100
                weight[i][j] += 350;
              }
            }
            if (chess[i + 1][j + 1] == 1) {//左边第一颗为黑子，权值加5
              weight[i][j] += 5;
              if (i < 13 && j > 1 && chess[i + 2][j + 2] == 1) {//左边两颗都为黑子，权值加110
                weight[i][j] += 110;
              }
            }
          }
          if (i > 0) {//上
            if (chess[i - 1][j] == 0) {//左边第一颗为空
              if (i > 1 && chess[i - 2][j] == 2) {//左边第二颗为白子
                weight[i][j] += 5;
                if (i > 2 && chess[i - 3][j] == 2) {//左边第三颗为白子
                  weight[i][j] = 1000
                }
                if (i > 2 && chess[i - 3][j] == 1) {//左边第三颗为黑子,权值为10
                  weight[i][j] = 10;
                }
              }
              if (i > 1 && chess[i - 2][j] == 1) {//左边第二颗为黑子
                weight[i][j] += 5;
                if (i > 2 && chess[i - 3][j] == 1) {//左边第三颗为黑子,权值为600
                  weight[i][j] = 600;
                }
              }
            }
            if (chess[i - 1][j] == 2) {//左边第一课为白子,权值加100
              weight[i][j] += 40;
              if (i > 1 && chess[i - 2][j] == 2) {//左边第二颗都为白子，权值加100
                weight[i][j] += 350;
              }
            }
            if (chess[i - 1][j] == 1) {//左边第一颗为黑子，权值加5
              weight[i][j] += 5;
              if (i > 1 && chess[i - 2][j] == 1) {//左边两颗都为黑子，权值加110
                weight[i][j] += 110;
              }
            }
          }
          if (i > 0 && j > 0) {//左上
            if (chess[i - 1][j - 1] == 0) {//左边第一颗为空
              if (i > 1 && j > 1 && chess[i - 2][j - 2] == 2) {//左边第二颗为白子
                weight[i][j] += 5;
                if (i > 2 && j > 2 && chess[i - 3][j - 3] == 2) {//左边第三颗为白子
                  weight[i][j] = 1000
                }
                if (i > 2 && j > 2 && chess[i - 3][-3] == 1) {//左边第三颗为黑子,权值为10
                  weight[i][j] = 10;
                }
              }
              if (i > 1 && j > 1 && chess[i - 2][j - 2] == 1) {//左边第二颗为黑子
                weight[i][j] += 5;
                if (i > 2 && j > 2 && chess[i - 3][j - 3] == 1) {//左边第三颗为黑子,权值为600
                  weight[i][j] = 600;
                }
              }
            }
            if (chess[i - 1][j - 1] == 2) {//左边第一课为白子,权值加100
              weight[i][j] += 40;
              if (i > 1 && j > 1 && chess[i - 2][j - 2] == 2) {//左边第二颗都为白子，权值加100
                weight[i][j] += 350;
              }
            }
            if (chess[i - 1][j - 1] == 1) {//左边第一颗为黑子，权值加5
              weight[i][j] += 5;
              if (i > 1 && j > 1 && chess[i - 2][j - 2] == 1) {//左边两颗都为黑子，权值加110
                weight[i][j] += 110;
              }
            }
          }
          if (i > 0 && j < 14) {//右上
            if (chess[i - 1][j - 1] == 0) {//左边第一颗为空
              if (i > 1 && j < 13 && chess[i - 2][j - 2] == 2) {//左边第二颗为白子
                weight[i][j] += 5;
                if (i > 2 && j < 12 && chess[i - 3][j - 3] == 2) {//左边第三颗为白子
                  weight[i][j] = 1000
                }
                if (i > 2 && j < 12 && chess[i - 3][-3] == 1) {//左边第三颗为黑子,权值为10
                  weight[i][j] = 10;
                }
              }
              if (i > 1 && j < 13 && chess[i - 2][j - 2] == 1) {//左边第二颗为黑子
                weight[i][j] += 5;
                if (i > 2 && j < 12 && chess[i - 3][j - 3] == 1) {//左边第三颗为黑子,权值为600
                  weight[i][j] = 600;
                }
              }
            }
            if (chess[i - 1][j - 1] == 2) {//左边第一课为白子,权值加100
              weight[i][j] += 40;
              if (i > 1 && j < 13 && chess[i - 2][j - 2] == 2) {//左边第二颗都为白子，权值加100
                weight[i][j] += 350;
              }
            }
            if (chess[i - 1][j - 1] == 1) {//左边第一颗为黑子，权值加5
              weight[i][j] += 5;
              if (i > 1 && j < 13 && chess[i - 2][j - 2] == 1) {//左边两颗都为黑子，权值加110
                weight[i][j] += 110;
              }
            }
          }
          if (j > 0) {//左
            if (chess[i][j - 1] == 0) {//左边第一颗为空
              if (j > 1 && chess[i][j - 2] == 2) {//左边第二颗为白子
                weight[i][j] += 5;
                if (j > 2 && chess[i][j - 3] == 2) {//左边第三颗为白子
                  weight[i][j] = 1000
                }
                if (j > 2 && chess[i][j - 3] == 1) {//左边第三颗为黑子,权值为10
                  weight[i][j] = 10;
                }
              }
              if (j > 1 && chess[i][j - 2] == 1) {//左边第二颗为黑子
                weight[i][j] += 5;
                if (j > 2 && chess[i][j - 3] == 1) {//左边第三颗为黑子,权值为600
                  weight[i][j] = 600;
                }
              }
            }
            if (chess[i][j - 1] == 2) {//左边第一课为白子,权值加100
              weight[i][j] += 40;
              if (j > 1 && chess[i][j - 2] == 2) {//左边第二颗都为白子，权值加100
                weight[i][j] += 350;
              }
            }
            if (chess[i][j - 1] == 1) {//左边第一颗为黑子，权值加5
              weight[i][j] += 5;
              if (j > 1 && chess[i][j - 2] == 1) {//左边两颗都为黑子，权值加110
                weight[i][j] += 110;
              }
            }
          }
          ////第六，对方三步赢，权值9300
          ////左右方向
          //if (j < 12 && j > 0 && chess[i][j + 1] == 1 && chess[i][j + 2] == 1 && chess[i][j + 3] == 0 && chess[i][j - 1] == 0) {//00220
          //  console.log('6');
          //  weight[i][j] = 9300;
          //}
          //if (j < 13 && j > 1 && chess[i][j + 1] == 1 && chess[i][j + 2] == 0 && chess[i][j - 2] == 0 && chess[i][j - 1] == 1) {//02020
          //  weight[i][j] = 9300;
          //  console.log('6');
          //}
          //if (j < 14 && j > 2 && chess[i][j + 1] == 0 && chess[i][j - 3] == 0 && chess[i][j - 2] == 1 && chess[i][j - 1] == 1) {//02200
          //  weight[i][j] = 9300;
          //  console.log('6');
          //}
          ////上下方向
          //if (i < 12 && i > 0 && chess[i + 1][j] == 1 && chess[i + 2][j] == 1 && chess[i + 3][j] == 0 && chess[i - 1][j] == 0) {//00220
          //  weight[i][j] = 9300;
          //  console.log('6');
          //}
          //if (i < 13 && i > 1 && chess[i + 1][j] == 1 && chess[i + 2][j] == 0 && chess[i - 2][j] == 0 && chess[i - 1][j] == 1) {//02020
          //  weight[i][j] = 9300;
          //  console.log('6');
          //}
          //if (i < 14 && i > 2 && chess[i + 1][j] == 0 && chess[i - 3][j] == 0 && chess[i - 2][j] == 1 && chess[i - 1][j] == 1) {//02200
          //  weight[i][j] = 9300;
          //  console.log('6');
          //}
          ////右下方向
          //if (i < 12 && i > 0 && j < 12 && j > 0 && chess[i + 1][j + 1] == 1 && chess[i + 2][j + 2] == 1 && chess[i + 3][j + 3] == 0 && chess[i - 1][j - 1] == 0) {//00220
          //  weight[i][j] = 9300;
          //  console.log('6');
          //}
          //if (i < 13 && i > 1 && j < 13 && j > 1 && chess[i + 1][j + 1] == 1 && chess[i + 2][j + 2] == 0 && chess[i - 2][j - 2] == 0 && chess[i - 1][j - 1] == 1) {//02020
          //  weight[i][j] = 9300;
          //  console.log('6');
          //}
          //if (i < 14 && i > 2 && j < 14 && j > 2 && chess[i + 1][j + 1] == 0 && chess[i - 3][j - 3] == 0 && chess[i - 2][j - 2] == 1 && chess[i - 1][j - 1] == 1) {//02200
          //  weight[i][j] = 9300;
          //  console.log('6');
          //}
          ////右上方向
          //if (i < 12 && i > 0 && j < 14 && j > 2 && chess[i + 1][j - 1] == 1 && chess[i + 2][j - 2] == 1 && chess[i + 3][j - 3] == 0 && chess[i - 1][j + 1] == 0) {//00220
          //  weight[i][j] = 9300;
          //  console.log('6');
          //}
          //if (i < 13 && i > 1 && j < 13 && j > 1 && chess[i + 1][j - 1] == 1 && chess[i + 2][j - 2] == 0 && chess[i - 2][j + 2] == 0 && chess[i - 1][j + 1] == 1) {//02020
          //  weight[i][j] = 9300;
          //  console.log('6');
          //}
          //if (i < 14 && i > 2 && j < 12 && j > 0 && chess[i + 1][j - 1] == 0 && chess[i - 3][j + 3] == 0 && chess[i - 2][j + 2] == 1 && chess[i - 1][j + 1] == 1) {//02200
          //  weight[i][j] = 9300;
          //  console.log('6');
          //}
        //第五，我方三步赢，权值9400
          //左右方向
          if (j < 12 && j > 0 && chess[i][j + 1] == 2 && chess[i][j + 2] == 2 && chess[i][j + 3] == 0 && chess[i][j - 1] == 0) {//00220
            weight[i][j] = 9400;
            console.log('5');
          }
          if (j < 13 && j > 1 && chess[i][j + 1] == 2 && chess[i][j + 2] == 0 && chess[i][j - 2] == 0 && chess[i][j - 1] == 2) {//02020
            weight[i][j] = 9400;
            console.log('5');
          }
          if (j < 14 && j > 2 && chess[i][j + 1] == 0 && chess[i][j - 3] == 0 && chess[i][j - 2] == 2 && chess[i][j - 1] == 2) {//02200
            weight[i][j] = 9400;console.log('5');
          }
          //上下方向
          if (i < 12 && i > 0 && chess[i + 1][j] == 2 && chess[i + 2][j] == 2 && chess[i + 3][j] == 0 && chess[i - 1][j] == 0) {//00220
            weight[i][j] = 9400;console.log('5');
          }
          if (i < 13 && i > 1 && chess[i + 1][j] == 2 && chess[i + 2][j] == 0 && chess[i - 2][j] == 0 && chess[i - 1][j] == 2) {//02020
            weight[i][j] = 9400;console.log('5');
          }
          if (i < 14 && i > 2 && chess[i + 1][j] == 0 && chess[i - 3][j] == 0 && chess[i - 2][j] == 2 && chess[i - 1][j] == 2) {//02200
            weight[i][j] = 9400;console.log('5');
          }
          //右下方向
          if (i < 12 && i > 0 && j < 12 && j > 0 && chess[i + 1][j + 1] == 2 && chess[i + 2][j + 2] == 2 && chess[i + 3][j + 3] == 0 && chess[i - 1][j - 1] == 0) {//00220
            weight[i][j] = 9400;console.log('5');
          }
          if (i < 13 && i > 1 && j < 13 && j > 1 && chess[i + 1][j + 1] == 2 && chess[i + 2][j + 2] == 0 && chess[i - 2][j - 2] == 0 && chess[i - 1][j - 1] == 2) {//02020
            weight[i][j] = 9400;console.log('5');
          }
          if (i < 14 && i > 2 && j < 14 && j > 2 && chess[i + 1][j + 1] == 0 && chess[i - 3][j - 3] == 0 && chess[i - 2][j - 2] == 2 && chess[i - 1][j - 1] == 2) {//02200
            weight[i][j] = 9400;console.log('5');
          }
          //右上方向
          if (i < 12 && i > 0 && j < 14 && j > 2 && chess[i + 1][j - 1] == 2 && chess[i + 2][j - 2] == 2 && chess[i + 3][j - 3] == 0 && chess[i - 1][j + 1] == 0) {//00220
            weight[i][j] = 9400;console.log('5');
          }
          if (i < 13 && i > 1 && j < 13 && j > 1 && chess[i + 1][j - 1] == 2 && chess[i + 2][j - 2] == 0 && chess[i - 2][j + 2] == 0 && chess[i - 1][j + 1] == 2) {//02020
            weight[i][j] = 9400;console.log('5');
          }
          if (i < 14 && i > 2 && j < 12 && j > 0 && chess[i + 1][j - 1] == 0 && chess[i - 3][j + 3] == 0 && chess[i - 2][j + 2] == 2 && chess[i - 1][j + 1] == 2) {//02200
            weight[i][j] = 9400;console.log('5');
          }
          //第四，对方两步赢之二，权值9500
          //左右方向
          if (j < 11 && j > 0 && chess[i][j + 1] == 1 && chess[i][j + 2] == 1 && chess[i][j + 3] == 1 && chess[i][j - 1] == 0) {//00111
            weight[i][j] = 9500;
            console.log('4');
          }
          if (j < 12 && j > 1 && chess[i][j + 1] == 1 && chess[i][j + 2] == 1 && chess[i][j + 3] == 0 && chess[i][j - 1] == 1) {//10110
            weight[i][j] = 9500;console.log('4');
          }
          if (j < 12 && j > 1 && chess[i][j + 1] == 1 && chess[i][j + 2] == 1 && chess[i][j - 2] == 0 && chess[i][j - 1] == 1) {//01011
            weight[i][j] = 9500;console.log('4');
          }
          if (j < 13 && j > 2 && chess[i][j + 1] == 1 && chess[i][j + 2] == 0 && chess[i][j - 2] == 1 && chess[i][j - 1] == 1) {//11010
            weight[i][j] = 9500;console.log('4');
          }
          if (j < 13 && j > 2 && chess[i][j + 1] == 1 && chess[i][j - 3] == 0 && chess[i][j - 2] == 1 && chess[i][j - 1] == 1) {//01101
            weight[i][j] = 9500;console.log('4');
          }
          if (j < 14 && j > 3 && chess[i][j + 1] == 0 && chess[i][j - 3] == 1 && chess[i][j - 2] == 1 && chess[i][j - 1] == 1) {//11100
            weight[i][j] = 9500;console.log('4');
          }
          //上下方向
          if (i < 11 && i > 0 && chess[i + 1][j] == 1 && chess[i + 2][j] == 1 && chess[i + 3][j] == 1 && chess[i - 1][j] == 0) {//00111
            weight[i][j] = 9500;console.log('4');
          }
          if (i < 12 && i > 1 && chess[i + 1][j] == 1 && chess[i + 2][j] == 1 && chess[i + 3][j] == 0 && chess[i - 1][j] == 1) {//10110
            weight[i][j] = 9500;console.log('4');
          }
          if (i < 12 && i > 1 && chess[i + 1][j] == 1 && chess[i + 2][j] == 1 && chess[i - 2][j] == 0 && chess[i - 1][j] == 1) {//01011
            weight[i][j] = 9500;console.log('4');
          }
          if (i < 13 && i > 2 && chess[i + 1][j] == 1 && chess[i + 2][j] == 0 && chess[i - 2][j] == 1 && chess[i - 1][j] == 1) {//11010
            weight[i][j] = 9500;console.log('4');
          }
          if (i < 13 && i > 2 && chess[i + 1][j] == 1 && chess[i - 3][j] == 0 && chess[i - 2][j] == 1 && chess[i - 1][j] == 1) {//01101
            weight[i][j] = 9500;console.log('4');
          }
          if (i < 14 && i > 3 && chess[i + 1][j] == 0 && chess[i - 3][j] == 1 && chess[i - 2][j] == 1 && chess[i - 1][j] == 1) {//11100
            weight[i][j] = 9500;console.log('4');
          }
          //右下方向
          if (i < 11 && i > 0 && j < 11 && j > 0 && chess[i + 1][j + 1] == 1 && chess[i + 2][j + 2] == 1 && chess[i + 3][j + 3] == 1 && chess[i - 1][j - 1] == 0) {//00111
            weight[i][j] = 9500;console.log('4');
          }
          if (i < 12 && i > 1 && j < 12 && j > 1 && chess[i + 1][j + 1] == 1 && chess[i + 2][j + 2] == 1 && chess[i + 3][j + 3] == 0 && chess[i - 1][j - 1] == 1) {//10110
            weight[i][j] = 9500;console.log('4');
          }
          if (i < 12 && i > 1 && j < 12 && j > 1 && chess[i + 1][j + 1] == 1 && chess[i + 2][j + 2] == 1 && chess[i - 2][j - 2] == 0 && chess[i - 1][j - 1] == 1) {//01011
            weight[i][j] = 9500;console.log('4');
          }
          if (i < 13 && i > 2 && j < 13 && j > 2 && chess[i + 1][j + 1] == 1 && chess[i + 2][j + 2] == 0 && chess[i - 2][j - 2] == 1 && chess[i - 1][j - 1] == 1) {//11010
            weight[i][j] = 9500;console.log('4');
          }
          if (i < 13 && i > 2 && j < 13 && j > 2 && chess[i + 1][j + 1] == 1 && chess[i - 3][j - 3] == 0 && chess[i - 2][j - 2] == 1 && chess[i - 1][j - 1] == 1) {//01101
            weight[i][j] = 9500;console.log('4');
          }
          if (i < 14 && i > 3 && j < 14 && j > 3 && chess[i + 1][j + 1] == 0 && chess[i - 3][j - 3] == 1 && chess[i - 2][j - 2] == 1 && chess[i - 1][j - 1] == 1) {//11100
            weight[i][j] = 9500;console.log('4');
          }
          //右上方向
          if (i < 11 && i > 0 && j < 14 && j > 3 && chess[i + 1][j - 1] == 1 && chess[i + 2][j - 2] == 1 && chess[i + 3][j - 3] == 1 && chess[i - 1][j + 1] == 0) {//00111
            weight[i][j] = 9500;console.log('4');
          }
          if (i < 12 && i > 1 && j < 13 && j > 2 && chess[i + 1][j - 1] == 1 && chess[i + 2][j - 2] == 1 && chess[i + 3][j - 3] == 0 && chess[i - 1][j + 1] == 1) {//10110
            weight[i][j] = 9500;console.log('4');
          }
          if (i < 12 && i > 1 && j < 13 && j > 2 && chess[i + 1][j - 1] == 1 && chess[i + 2][j - 2] == 1 && chess[i - 2][j + 2] == 0 && chess[i - 1][j + 1] == 1) {//01011
            weight[i][j] = 9500;console.log('4');
          }
          if (i < 13 && i > 2 && j < 12 && j > 1 && chess[i + 1][j - 1] == 1 && chess[i + 2][j - 2] == 0 && chess[i - 2][j + 2] == 1 && chess[i - 1][j + 1] == 1) {//11010
            weight[i][j] = 9500;console.log('4');
          }
          if (i < 13 && i > 2 && j < 12 && j > 1 && chess[i + 1][j - 1] == 1 && chess[i - 3][j + 3] == 0 && chess[i - 2][j + 2] == 1 && chess[i - 1][j + 1] == 1) {//01101
            weight[i][j] = 9500;console.log('4');
          }
          if (i < 14 && i > 3 && j < 11 && j > 0 && chess[i + 1][j - 1] == 0 && chess[i - 3][j + 3] == 1 && chess[i - 2][j + 2] == 1 && chess[i - 1][j + 1] == 1) {//11100
            weight[i][j] = 9500;console.log('4');
          }
          //第四，对方两步赢之一，权值9600
          // 左右方向
          if (j < 11 && j > 0 && chess[i][j + 1] == 1 && chess[i][j + 2] == 1 && chess[i][j + 3] == 1 && chess[i][j + 4] == 0 && chess[i][j - 1] == 0) {//001110
            weight[i][j] = 9600;console.log('4')
          }
          if (j < 12 && j > 1 && chess[i][j + 1] == 1 && chess[i][j + 2] == 1 && chess[i][j + 3] == 0 && chess[i][j - 2] == 0 && chess[i][j - 1] == 1) {//010110
            weight[i][j] = 9600;console.log('4');
          }
          if (j < 13 && j > 2 && chess[i][j + 1] == 1 && chess[i][j + 2] == 0 && chess[i][j - 3] == 0 && chess[i][j - 2] == 1 && chess[i][j - 1] == 1) {//011010
            weight[i][j] = 9600;console.log('4');
          }
          if (j < 14 && j > 3 && chess[i][j + 1] == 0 && chess[i][j - 4] == 0 && chess[i][j - 3] == 1 && chess[i][j - 2] == 2 && chess[i][j - 1] == 1) {//011100
            weight[i][j] = 9600;console.log('4');
          }
          // 上下方向
          if (i < 11 && i > 0 && chess[i + 1][j] == 1 && chess[i + 2][j] == 1 && chess[i + 3][j] == 1 && chess[i + 4][j] == 0 && chess[i - 1][j] == 0) {//001110
            weight[i][j] = 9600;console.log('4');
          }
          if (i < 12 && i > 1 && chess[i + 1][j] == 1 && chess[i + 2][j] == 1 && chess[i + 3][j] == 0 && chess[i - 2][j] == 0 && chess[i - 1][j] == 1) {//010110
            weight[i][j] = 9600;console.log('4');
          }
          if (i < 13 && i > 2 && chess[i + 1][j] == 1 && chess[i + 2][j] == 0 && chess[i - 3][j] == 0 && chess[i - 2][j] == 1 && chess[i - 1][j] == 1) {//011010
            weight[i][j] = 9600;console.log('4');
          }
          if (i < 14 && i > 3 && chess[i + 1][j] == 0 && chess[i - 4][j] == 0 && chess[i - 3][j] == 1 && chess[i - 2][j] == 2 && chess[i - 1][j] == 1) {//011100
            weight[i][j] = 9600;console.log('4');
          }
          // 右下方向
          if (i < 11 && i > 0 && j < 11 && j > 0 && chess[i + 1][j + 1] == 1 && chess[i + 2][j + 2] == 1 && chess[i + 3][j + 3] == 1 && chess[i + 4][j + 4] == 0 && chess[i - 1][j - 1] == 0) {//001110
            weight[i][j] = 9600;console.log('4');
          }
          if (i < 12 && i > 1 && j < 12 && j > 1 && chess[i + 1][j + 1] == 1 && chess[i + 2][j + 2] == 1 && chess[i + 3][j + 3] == 0 && chess[i - 2][j - 2] == 0 && chess[i - 1][j - 1] == 1) {//010110
            weight[i][j] = 9600;console.log('4');
          }
          if (i < 13 && i > 2 && j < 13 && j > 2 && chess[i + 1][j + 1] == 1 && chess[i + 2][j + 2] == 0 && chess[i - 3][j - 3] == 0 && chess[i - 2][j - 2] == 1 && chess[i - 1][j - 1] == 1) {//011010
            weight[i][j] = 9600;console.log('4');
          }
          if (i < 14 && i > 3 && j < 14 && j > 3 && chess[i + 1][j + 1] == 0 && chess[i - 4][j - 4] == 0 && chess[i - 3][j - 3] == 1 && chess[i - 2][j - 2] == 1 && chess[i - 1][j - 1] == 1) {//011100
            weight[i][j] = 9600;console.log('4');
          }
          // 右上方向
          if (i < 11 && i > 0 && j < 14 && j > 3 && chess[i + 1][j - 1] == 1 && chess[i + 2][j - 2] == 1 && chess[i + 3][j - 3] == 1 && chess[i + 4][j - 4] == 0 && chess[i - 1][j + 1] == 0) {//001110
            weight[i][j] = 9600;console.log('4');
          }
          if (i < 12 && i > 1 && j < 13 && j > 2 && chess[i + 1][j - 1] == 1 && chess[i + 2][j - 2] == 1 && chess[i + 3][j - 3] == 0 && chess[i - 2][j + 2] == 0 && chess[i - 1][j + 1] == 1) {//010110
            weight[i][j] = 9600;console.log('4');
          }
          if (i < 13 && i > 2 && j < 12 && j > 1 && chess[i + 1][j - 1] == 1 && chess[i + 2][j - 2] == 0 && chess[i - 3][j + 3] == 0 && chess[i - 2][j + 2] == 1 && chess[i - 1][j + 1] == 1) {//011010
            weight[i][j] = 9600;console.log('4');
          }
          if (i < 14 && i > 3 && j < 11 && j > 0 && chess[i + 1][j - 1] == 0 && chess[i - 4][j + 4] == 0 && chess[i - 3][j + 3] == 1 && chess[i - 2][j + 2] == 1 && chess[i - 1][j + 1] == 1) {//011100
            weight[i][j] = 9600;console.log('4');
          }
          //第三，我方两步赢之二权值9700
          //左右方向
          if (j < 11 && j > 0 && chess[i][j + 1] == 2 && chess[i][j + 2] == 2 && chess[i][j + 3] == 2 && chess[i][j - 1] == 0) {//00222
            weight[i][j] = 9700;console.log('3');
          }
          if (j < 12 && j > 1 && chess[i][j + 1] == 2 && chess[i][j + 2] == 2 && chess[i][j + 3] == 0 && chess[i][j - 1] == 2) {//20220
            weight[i][j] = 9700;console.log('3');
          }
          if (j < 12 && j > 1 && chess[i][j + 1] == 2 && chess[i][j + 2] == 2 && chess[i][j - 2] == 0 && chess[i][j - 1] == 2) {//02022
            weight[i][j] = 9700;console.log('3');
          }
          if (j < 13 && j > 2 && chess[i][j + 1] == 2 && chess[i][j + 2] == 0 && chess[i][j - 2] == 2 && chess[i][j - 1] == 2) {//22020
            weight[i][j] = 9700;console.log('3');
          }
          if (j < 13 && j > 2 && chess[i][j + 1] == 2 && chess[i][j - 3] == 0 && chess[i][j - 2] == 2 && chess[i][j - 1] == 2) {//02202
            weight[i][j] = 9700;console.log('3');
          }
          if (j < 14 && j > 3 && chess[i][j + 1] == 0 && chess[i][j - 3] == 2 && chess[i][j - 2] == 2 && chess[i][j - 1] == 2) {//22200
            weight[i][j] = 9700;console.log('3');
          }
          //上下方向
          if (i < 11 && i > 0 && chess[i + 1][j] == 2 && chess[i + 2][j] == 2 && chess[i + 3][j] == 2 && chess[i - 1][j] == 0) {//00222
            weight[i][j] = 9700;console.log('3');
          }
          if (i < 12 && i > 1 && chess[i + 1][j] == 2 && chess[i + 2][j] == 2 && chess[i + 3][j] == 0 && chess[i - 1][j] == 2) {//20220
            weight[i][j] = 9700;console.log('3');
          }
          if (i < 12 && i > 1 && chess[i + 1][j] == 2 && chess[i + 2][j] == 2 && chess[i - 2][j] == 0 && chess[i - 1][j] == 2) {//02022
            weight[i][j] = 9700;console.log('3');
          }
          if (i < 13 && i > 2 && chess[i + 1][j] == 2 && chess[i + 2][j] == 0 && chess[i - 2][j] == 2 && chess[i - 1][j] == 2) {//22020
            weight[i][j] = 9700;console.log('3');
          }
          if (i < 13 && i > 2 && chess[i + 1][j] == 2 && chess[i - 3][j] == 0 && chess[i - 2][j] == 2 && chess[i - 1][j] == 2) {//02202
            weight[i][j] = 9700;console.log('3');
          }
          if (i < 14 && i > 3 && chess[i + 1][j] == 0 && chess[i - 3][j] == 2 && chess[i - 2][j] == 2 && chess[i - 1][j] == 2) {//22200
            weight[i][j] = 9700;console.log('3');
          }
          //右下方向
          if (i < 11 && i > 0 && j < 11 && j > 0 && chess[i + 1][j + 1] == 2 && chess[i + 2][j + 2] == 2 && chess[i + 3][j + 3] == 2 && chess[i - 1][j - 1] == 0) {//00222
            weight[i][j] = 9700;console.log('3');
          }
          if (i < 12 && i > 1 && j < 12 && j > 1 && chess[i + 1][j + 1] == 2 && chess[i + 2][j + 2] == 2 && chess[i + 3][j + 3] == 0 && chess[i - 1][j - 1] == 2) {//20220
            weight[i][j] = 9700;console.log('3');
          }
          if (i < 12 && i > 1 && j < 12 && j > 1 && chess[i + 1][j + 1] == 2 && chess[i + 2][j + 2] == 2 && chess[i - 2][j - 2] == 0 && chess[i - 1][j - 1] == 2) {//02022
            weight[i][j] = 9700;console.log('3');
          }
          if (i < 13 && i > 2 && j < 13 && j > 2 && chess[i + 1][j + 1] == 2 && chess[i + 2][j + 2] == 0 && chess[i - 2][j - 2] == 2 && chess[i - 1][j - 1] == 2) {//22020
            weight[i][j] = 9700;console.log('3');
          }
          if (i < 13 && i > 2 && j < 13 && j > 2 && chess[i + 1][j + 1] == 2 && chess[i - 3][j - 3] == 0 && chess[i - 2][j - 2] == 2 && chess[i - 1][j - 1] == 2) {//02202
            weight[i][j] = 9700;console.log('3');
          }
          if (i < 14 && i > 3 && j < 14 && j > 3 && chess[i + 1][j + 1] == 0 && chess[i - 3][j - 3] == 2 && chess[i - 2][j - 2] == 2 && chess[i - 1][j - 1] == 2) {//22200
            weight[i][j] = 9700;console.log('3');
          }
          //右上，左下方向
          if (i < 11 && i > 0 && j < 14 && j > 3 && chess[i + 1][j - 1] == 2 && chess[i + 2][j - 2] == 2 && chess[i + 3][j - 3] == 2 && chess[i - 1][j + 1] == 0) {//00222
            weight[i][j] = 9700;console.log('3');
          }
          if (i < 12 && i > 1 && j < 13 && j > 2 && chess[i + 1][j - 1] == 2 && chess[i + 2][j - 2] == 2 && chess[i + 3][j - 3] == 0 && chess[i - 1][j + 1] == 2) {//20220
            weight[i][j] = 9700;console.log('3');
          }
          if (i < 12 && i > 1 && j < 13 && j > 2 && chess[i + 1][j - 1] == 2 && chess[i + 2][j - 2] == 2 && chess[i - 2][j + 2] == 0 && chess[i - 1][j + 1] == 2) {//02022
            weight[i][j] = 9700;console.log('3');
          }
          if (i < 13 && i > 2 && j < 12 && j > 1 && chess[i + 1][j - 1] == 2 && chess[i + 2][j - 2] == 0 && chess[i - 2][j + 2] == 2 && chess[i - 1][j + 1] == 2) {//22020
            weight[i][j] = 9700;console.log('3');
          }
          if (i < 13 && i > 2 && j < 12 && j > 1 && chess[i + 1][j - 1] == 2 && chess[i - 3][j + 3] == 0 && chess[i - 2][j + 2] == 2 && chess[i - 1][j + 1] == 2) {//02202
            weight[i][j] = 9700;console.log('3');
          }
          if (i < 14 && i > 3 && j < 11 && j > 0 && chess[i + 1][j - 1] == 0 && chess[i - 3][j + 3] == 2 && chess[i - 2][j + 2] == 2 && chess[i - 1][j + 1] == 2) {//22200
            weight[i][j] = 9700;console.log('3');
          }
          //第三，我方两部赢-之一权值9800
          //左右方向
          if (j < 11 && j > 0 && chess[i][j + 1] == 2 && chess[i][j + 2] == 2 && chess[i][j + 3] == 2 && chess[i][j + 4] == 0 && chess[i][j - 1] == 0) {//002220
            weight[i][j] = 9800;console.log('3');
          }
          if (j < 12 && j > 1 && chess[i][j + 1] == 2 && chess[i][j + 2] == 2 && chess[i][j + 3] == 0 && chess[i][j - 2] == 0 && chess[i][j - 1] == 2) {//020220
            weight[i][j] = 9800;console.log('3');
          }
          if (j < 13 && j > 2 && chess[i][j + 1] == 2 && chess[i][j + 2] == 0 && chess[i][j - 3] == 0 && chess[i][j - 2] == 2 && chess[i][j - 1] == 2) {//022020
            weight[i][j] = 9800;console.log('3');
          }
          if (j < 14 && j > 3 && chess[i][j + 1] == 0 && chess[i][j - 4] == 0 && chess[i][j - 3] == 2 && chess[i][j - 2] == 2 && chess[i][j - 1] == 2) {//022200
            weight[i][j] = 9800;console.log('3');
          }
          //上下方向
          if (i < 11 && i > 0 && chess[i + 1][j] == 2 && chess[i + 2][j] == 2 && chess[i + 3][j] == 2 && chess[i + 4][j] == 0 && chess[i - 1][j] == 0) {//002220
            weight[i][j] = 9800;console.log('3');
          }
          if (i < 12 && i > 1 && chess[i + 1][j] == 2 && chess[i + 2][j] == 2 && chess[i + 3][j] == 0 && chess[i - 2][j] == 0 && chess[i - 1][j] == 2) {//020220
            weight[i][j] = 9800;console.log('3');
          }
          if (i < 13 && i > 2 && chess[i + 1][j] == 2 && chess[i + 2][j] == 0 && chess[i - 3][j] == 0 && chess[i - 2][j] == 2 && chess[i - 1][j] == 2) {//022020
            weight[i][j] = 9800;console.log('3');
          }
          if (i < 14 && i > 3 && chess[i + 1][j] == 0 && chess[i - 4][j] == 0 && chess[i - 3][j] == 2 && chess[i - 2][j] == 2 && chess[i - 1][j] == 2) {//022200
            weight[i][j] = 9800;console.log('3');
          }
          //右下，左上方向
          if (i < 11 && i > 0 && j < 11 && j > 0 && chess[i + 1][j + 1] == 2 && chess[i + 2][j + 2] == 2 && chess[i + 3][j + 3] == 2 && chess[i + 4][j + 4] == 0 && chess[i - 1][j] == 0) {//002220
            weight[i][j] = 9800;console.log('3');
          }
          if (i < 12 && i > 1 && j < 12 && j > 1 && chess[i + 1][j + 1] == 2 && chess[i + 2][j + 2] == 2 && chess[i + 3][j + 3] == 0 && chess[i - 2][j - 2] == 0 && chess[i - 1][j - 1] == 2) {//020220
            weight[i][j] = 9800;console.log('3');
          }
          if (i < 13 && i > 2 && j < 13 && j > 2 && chess[i + 1][j + 1] == 2 && chess[i + 2][j + 2] == 0 && chess[i - 3][j - 3] == 0 && chess[i - 2][j - 2] == 2 && chess[i - 1][j - 1] == 2) {//022020
            weight[i][j] = 9800;console.log('3');
          }
          if (i < 14 && i > 3 && j < 14 && j > 3 && chess[i + 1][j + 1] == 0 && chess[i - 4][j - 4] == 0 && chess[i - 3][j - 3] == 2 && chess[i - 2][j - 2] == 2 && chess[i - 1][j - 1] == 2) {//022200
            weight[i][j] = 9800;console.log('3');
          }
          //右上，左下方向
          if (i < 11 && i > 0 && j < 14 && j > 3 && chess[i + 1][j - 1] == 2 && chess[i + 2][j - 2] == 2 && chess[i + 3][j - 3] == 2 && chess[i + 4][j - 4] == 0 && chess[i - 1][j] == 0) {//002220
            weight[i][j] = 9800;console.log('3');
          }
          if (i < 12 && i > 1 && j < 13 && j > 2 && chess[i + 1][j - 1] == 2 && chess[i + 2][j - 2] == 2 && chess[i + 3][j - 3] == 0 && chess[i - 2][j + 2] == 0 && chess[i - 1][j + 1] == 2) {//020220
            weight[i][j] = 9800;console.log('3');
          }
          if (i < 13 && i > 2 && j < 12 && j > 1 && chess[i + 1][j - 1] == 2 && chess[i + 2][j - 2] == 0 && chess[i - 3][j + 3] == 0 && chess[i - 2][j + 2] == 2 && chess[i - 1][j + 1] == 2) {//022020
            weight[i][j] = 9800;console.log('3');
          }
          if (i < 14 && i > 3 && j < 11 && j > 0 && chess[i + 1][j - 1] == 0 && chess[i - 4][j + 4] == 0 && chess[i - 3][j + 3] == 2 && chess[i - 2][j + 2] == 2 && chess[i - 1][j + 1] == 2) {//022200
            weight[i][j] = 9800;console.log('3');
          }
          //第二，对方一步赢权值9900
          //左右方向
          if (j < 11 && chess[i][j + 1] == 1 && chess[i][j + 2] == 1 && chess[i][j + 3] == 1 && chess[i][j + 4] == 1) {//02222
            weight[i][j] = 9900;
          }
          if (j < 12 && j > 0 && chess[i][j + 1] == 1 && chess[i][j + 2] == 1 && chess[i][j + 3] == 1 && chess[i][j - 1] == 1) {//20222
            weight[i][j] = 9900;
          }
          if (j < 13 && j > 1 && chess[i][j + 1] == 1 && chess[i][j + 2] == 1 && chess[i][j - 2] == 1 && chess[i][j - 1] == 1) {//22022
            weight[i][j] = 9900;
          }
          if (j < 14 && j > 2 && chess[i][j + 1] == 1 && chess[i][j - 3] == 1 && chess[i][j - 2] == 1 && chess[i][j - 1] == 1) {//22202
            weight[i][j] = 9900;
          }
          if (j > 3 && chess[i][j - 4] == 1 && chess[i][j - 3] == 1 && chess[i][j - 2] == 1 && chess[i][j - 1] == 1) {//22220
            weight[i][j] = 9900;
          }
          //上下方向
          if (i < 11 && chess[i + 1][j] == 1 && chess[i + 2][j] == 1 && chess[i + 3][j] == 1 && chess[i + 4][j] == 1) {//02222
            weight[i][j] = 9900;
          }
          if (i < 12 && i > 0 && chess[i + 1][j] == 1 && chess[i + 2][j] == 1 && chess[i + 3][j] == 1 && chess[i - 1][j] == 1) {//20222
            weight[i][j] = 9900;
          }
          if (i < 13 && i > 1 && chess[i + 1][j] == 1 && chess[i + 2][j] == 1 && chess[i - 2][j] == 1 && chess[i - 1][j] == 1) {//22022
            weight[i][j] = 9900;
          }
          if (i < 14 && i > 2 && chess[i + 1][j] == 1 && chess[i - 3][j] == 1 && chess[i - 2][j] == 1 && chess[i - 1][j] == 1) {//22202
            weight[i][j] = 9900;
          }
          if (i > 3 && chess[i - 4][j] == 1 && chess[i - 3][j] == 1 && chess[i - 2][j] == 1 && chess[i - 1][j] == 1) {//22220
            weight[i][j] = 9900;
          }
          //右下，左上方向
          if (i < 11 && j < 11 && chess[i + 1][j + 1] == 1 && chess[i + 2][j + 2] == 1 && chess[i + 3][j + 3] == 1 && chess[i + 4][j + 4] == 1) {//02222
            weight[i][j] = 9900;
          }
          if (i < 12 && i > 0 && j < 12 && j > 0 && chess[i + 1][j + 1] == 1 && chess[i + 2][j + 2] == 1 && chess[i + 3][j + 3] == 1 && chess[i - 1][j - 1] == 1) {//20222
            weight[i][j] = 9900;
          }
          if (i < 13 && i > 1 && j < 13 && j > 1 && chess[i + 1][j + 1] == 1 && chess[i + 2][j + 2] == 1 && chess[i - 2][j - 2] == 1 && chess[i - 1][j - 1] == 1) {//22022
            weight[i][j] = 9900;
          }
          if (i < 14 && i > 2 && j < 14 && j > 2 && chess[i + 1][j + 1] == 1 && chess[i - 3][j - 3] == 1 && chess[i - 2][j - 2] == 1 && chess[i - 1][j - 1] == 1) {//22202
            weight[i][j] = 9900;
          }
          if (i > 3 && j > 3 && chess[i - 4][j - 4] == 1 && chess[i - 3][j - 3] == 1 && chess[i - 2][j - 2] == 1 && chess[i - 1][j - 1] == 1) {//22220
            weight[i][j] = 9900;
          }
          //右上，左下方向
          if (i < 11 && j > 3 && chess[i + 1][j - 1] == 1 && chess[i + 2][j - 2] == 1 && chess[i + 3][j - 3] == 1 && chess[i + 4][j - 4] == 1) {//02222
            weight[i][j] = 9900;
          }
          if (i < 12 && i > 0 && j < 14 && j > 2 && chess[i + 1][j - 1] == 1 && chess[i + 2][j - 2] == 1 && chess[i + 3][j - 3] == 1 && chess[i - 1][j + 1] == 1) {//20222
            weight[i][j] = 9900;
          }
          if (i < 13 && i > 1 && j < 13 && j > 1 && chess[i + 1][j - 1] == 1 && chess[i + 2][j - 2] == 1 && chess[i - 2][j + 2] == 1 && chess[i - 1][j + 1] == 1) {//22022
            weight[i][j] = 9900;
          }
          if (i < 14 && i > 2 && j < 12 && j > 0 && chess[i + 1][j - 1] == 1 && chess[i - 3][j + 3] == 1 && chess[i - 2][j + 2] == 1 && chess[i - 1][j + 1] == 1) {//22202
            weight[i][j] = 9900;
          }
          if (i > 3 && j < 11 && chess[i - 4][j + 4] == 1 && chess[i - 3][j + 3] == 1 && chess[i - 2][j + 2] == 1 && chess[i - 1][j + 1] == 1) {//22220
            weight[i][j] = 9900;
          }
          //最优级，我方一步赢，权值10000
          //左右方向
          if (j < 11 && chess[i][j + 1] == 2 && chess[i][j + 2] == 2 && chess[i][j + 3] == 2 && chess[i][j + 4] == 2) {//02222
            weight[i][j] = 10000;
          }
          if (j < 12 && j > 0 && chess[i][j + 1] == 2 && chess[i][j + 2] == 2 && chess[i][j + 3] == 2 && chess[i][j - 1] == 2) {//20222
            weight[i][j] = 10000;
          }
          if (j < 13 && j > 1 && chess[i][j + 1] == 2 && chess[i][j + 2] == 2 && chess[i][j - 2] == 2 && chess[i][j - 1] == 2) {//22022
            weight[i][j] = 10000;
          }
          if (j < 14 && j > 2 && chess[i][j + 1] == 2 && chess[i][j - 3] == 2 && chess[i][j - 2] == 2 && chess[i][j - 1] == 2) {//22202
            weight[i][j] = 10000;
          }
          if (j > 3 && chess[i][j - 4] == 2 && chess[i][j - 3] == 2 && chess[i][j - 2] == 2 && chess[i][j - 1] == 2) {//22220
            weight[i][j] = 10000;
          }
          //上下方向
          if (i < 11 && chess[i + 1][j] == 2 && chess[i + 2][j] == 2 && chess[i + 3][j] == 2 && chess[i + 4][j] == 2) {//02222
            weight[i][j] = 10000;
          }
          if (i < 12 && i > 0 && chess[i + 1][j] == 2 && chess[i + 2][j] == 2 && chess[i + 3][j] == 2 && chess[i - 1][j] == 2) {//20222
            weight[i][j] = 10000;
          }
          if (i < 13 && i > 1 && chess[i + 1][j] == 2 && chess[i + 2][j] == 2 && chess[i - 2][j] == 2 && chess[i - 1][j] == 2) {//22022
            weight[i][j] = 10000;
          }
          if (i < 14 && i > 2 && chess[i + 1][j] == 2 && chess[i - 3][j] == 2 && chess[i - 2][j] == 2 && chess[i - 1][j] == 2) {//22202
            weight[i][j] = 10000;
          }
          if (i > 3 && chess[i - 4][j] == 2 && chess[i - 3][j] == 2 && chess[i - 2][j] == 2 && chess[i - 1][j] == 2) {//22220
            weight[i][j] = 10000;
          }
          //右下，左上方向
          if (i < 11 && j < 11 && chess[i + 1][j + 1] == 2 && chess[i + 2][j + 2] == 2 && chess[i + 3][j + 3] == 2 && chess[i + 4][j + 4] == 2) {//02222
            weight[i][j] = 10000;
          }
          if (i < 12 && i > 0 && j < 12 && j > 0 && chess[i + 1][j + 1] == 2 && chess[i + 2][j + 2] == 2 && chess[i + 3][j + 3] == 2 && chess[i - 1][j - 1] == 2) {//20222
            weight[i][j] = 10000;
          }
          if (i < 13 && i > 1 && j < 13 && j > 1 && chess[i + 1][j + 1] == 2 && chess[i + 2][j + 2] == 2 && chess[i - 2][j - 2] == 2 && chess[i - 1][j - 1] == 2) {//22022
            weight[i][j] = 10000;
          }
          if (i < 14 && i > 2 && j < 14 && j > 2 && chess[i + 1][j + 1] == 2 && chess[i - 3][j - 3] == 2 && chess[i - 2][j - 2] == 2 && chess[i - 1][j - 1] == 2) {//22202
            weight[i][j] = 10000;
          }
          if (i > 3 && j > 3 && chess[i - 4][j - 4] == 2 && chess[i - 3][j - 3] == 2 && chess[i - 2][j - 2] == 2 && chess[i - 1][j - 1] == 2) {//22220
            weight[i][j] = 10000;
          }
          //右上，左下
          if (i < 11 && j > 3 && chess[i + 1][j - 1] == 2 && chess[i + 2][j - 2] == 2 && chess[i + 3][j - 3] == 2 && chess[i + 4][j - 4] == 2) {//02222
            weight[i][j] = 10000;
          }
          if (i < 12 && i > 0 && j < 14 && j > 2 && chess[i + 1][j - 1] == 2 && chess[i + 2][j - 2] == 2 && chess[i + 3][j - 3] == 2 && chess[i - 1][j + 1] == 2) {//20222
            weight[i][j] = 10000;
          }
          if (i < 13 && i > 1 && j < 13 && j > 1 && chess[i + 1][j - 1] == 2 && chess[i + 2][j - 2] == 2 && chess[i - 2][j + 2] == 2 && chess[i - 1][j + 1] == 2) {//22022
            weight[i][j] = 10000;
          }
          if (i < 14 && i > 2 && j < 12 && j > 0 && chess[i + 1][j - 1] == 2 && chess[i - 3][j + 3] == 2 && chess[i - 2][j + 2] == 2 && chess[i - 1][j + 1] == 2) {//22202
            weight[i][j] = 10000;
          }
          if (i > 3 && j < 11 && chess[i - 4][j + 4] == 2 && chess[i - 3][j + 3] == 2 && chess[i - 2][j + 2] == 2 && chess[i - 1][j + 1] == 2) {//22220
            weight[i][j] = 10000;
          }
        }
      }
    }


    this.computerAI(ctx)
  },
  isGameOver: function () {
    //判断玩家胜利
    for (var i = 0; i < chess.length - 4; i++) {
      for (var j = 0; j < chess[i].length - 4; j++) {
        if (chess[i][j] == 1) {
          if (chess[i + 1][j + 1] == 1) {
            if (chess[i + 2][j + 2] == 1) {
              if (chess[i + 3][j + 3] == 1) {
                if (chess[i + 4][j + 4] == 1) {
                  playerWin.style.display = 'block';
                  this.GAMEOVER = true;
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
        if (chess[i][j] == 1) {
          if (chess[i + 1][j] == 1) {
            if (chess[i + 2][j] == 1) {
              if (chess[i + 3][j] == 1) {
                if (chess[i + 4][j] == 1) {
                  playerWin.style.display = 'block';
                  this.GAMEOVER = true;
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
        if (chess[i][j] == 1) {
          if (chess[i][j + 1] == 1) {
            if (chess[i][j + 2] == 1) {
              if (chess[i][j + 3] == 1) {
                if (chess[i][j + 4] == 1) {
                  //黑子赢了，玩家赢
                  // console.log('玩家赢了');
                  playerWin.style.display = 'block';
                  this.GAMEOVER = true;
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
        if (chess[i][j] == 1) {
          if (chess[i + 1][j - 1] == 1) {
            if (chess[i + 2][j - 2] == 1) {
              if (chess[i + 3][j - 3] == 1) {
                if (chess[i + 4][j - 4] == 1) {
                  playerWin.style.display = 'block';
                  this.GAMEOVER = true;
                  break;
                }
              }
            }
          }
        }
      }
    }//左下
    if (this.GAMEOVER == false) {
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