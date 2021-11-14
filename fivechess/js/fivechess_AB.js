/**
 * Created by uid on 2021/11/14.
 */

 const core = {
  ONE: 10,
  TWO: 100,
  THREE: 1000,
  FOUR: 100000,
  FIVE: 10000000,
  BLOCKED_ONE: 1,
  BLOCKED_TWO: 10,
  BLOCKED_THREE: 100,
  BLOCKED_FOUR: 10000
}
const level = 4;
 /**
  * board: 棋盘 二位数组， 宽高默认15， 棋子颜色，1为黑色。2为白色
  * boardOption this对象
  * 返回总分数： 默认为黑色，减去白色棋子分数
  */
 var boardOption = {
     WIDTH: 15,
     wins:[], //赢法数组
     count: 0,
     blackWin: [],//保存黑子赢法
     whiteWin: [],//保存白子赢法
     calcWins:function(){
         var W=this.WIDTH;
         this.wins=[];
         this.connt = 0;
         for(var i=0;i<W;i++){//总的赢法
           this.wins[i]=[];
           for(var j=0;j<W;j++){
             this.wins[i][j]=[];
           }
         }
         //横线赢法
         for(var i=0;i<W;i++){
           for(var j=0;j<W-4;j++){
             for(var k=0;k<5;k++){
               this.wins[i][j+k][this.count]=true;
             }
             this.count++;
           }
         }
         //竖线赢法
         for(var i=0;i<W-4;i++){
           for(var j=0;j<W;j++){
             for(var k=0;k<5;k++){
               this.wins[i+k][j][this.count]=true;
             }
             this.count++;
           }
         }
         //正斜线赢法
         for(var i=0;i<W-4;i++){
           for(var j=0;j<W-4;j++){
             for(var k=0;k<5;k++){
               this.wins[i+k][j+k][this.count]=true;
             }
             this.count++;
           }
         }
         //反斜线赢法
         for(var i=0;i<W-4;i++){
           for(var j=4;j<W;j++){
             for(var k=0;k<5;k++){
               this.wins[i+k][j-k][this.count]=true;
             }
             this.count++;
           }
         }
       },
 }
 boardOption.calcWins();
 // 评价函数
 function calcScore(board) {
     var len = board.length;
     let blackScore = 0;
     let whiteScore = 0;
     //初始化玩家赢法，电脑赢法
     for(let i=0;i<boardOption.count;i++){
         boardOption.blackWin[i]=0;
         boardOption.whiteWin[i]=0;
     }
     for (let i = 0; i<len;i++) {
         for (let j = 0;j<len;j++) {
             if (board[i][j] === 1) {
                 for (var k = 0; k < boardOption.count; k++) {
                     if (boardOption.wins[i][j][k]) {
                         boardOption.blackWin[k]++;
                         boardOption.whiteWin[k] = 6;
                     }
                 }
             } else if(board[i][j] === 2){
                 for (var k = 0; k < boardOption.count; k++) {
                     if (boardOption.wins[i][j][k]) {
                         boardOption.whiteWin[k]++;
                         boardOption.blackWin[k] = 6;
                     }
                 }
             }
         }
     }
     for (let k = 0;k<boardOption.count;k++) {
         if (boardOption.whiteWin[k] === 1) {
             whiteScore+= core.ONE;
         } else if (boardOption.whiteWin[k] === 2) {
             whiteScore+= core.TWO;
         }else if (boardOption.whiteWin[k] === 3) {
             whiteScore+= core.THREE;
         }else if (boardOption.whiteWin[k] === 4) {
             whiteScore+= core.FOUR;
         }else if (boardOption.whiteWin[k] === 5) {
             whiteScore+= core.FIVE;
         }
         if (boardOption.blackWin[k] === 1) {
             blackScore+= core.ONE;
         } else if (boardOption.blackWin[k] === 2) {
             blackScore+= core.TWO;
         }else if (boardOption.blackWin[k] === 3) {
             blackScore+= core.THREE;
         }else if (boardOption.blackWin[k] === 4) {
             blackScore+= core.FOUR;
         }else if (boardOption.blackWin[k] === 5) {
             blackScore+= core.FIVE;
         }
     }
 
     return  whiteScore - blackScore;
 }
 class Tree {
  value=  0;
  x;
  y
  children = [];
  constructor(value,x,y){
      this.value = value;
      this.x = x;
      this.y = y
   }
 }
// 当alpha<=beta时剪枝
//  function alpha_beta_pruning(node, alpha, beta, who){
//   if(position->left == NULL){
//     return position->value;	
//     }
    
//     if(who){// max
//     int max1 = INT_MIN;
//     int value = alpha_beta_pruning(position->left,alpha,beta,false);
//     max1 = std::max(value,max1);
//     alpha = std::max(alpha,max1);
//     if(beta <= alpha){
//       delete_subtree(position->right);  //剪枝只发生在右边
//       position->right = NULL;
//       return max1;
//     } 
    
//     value = alpha_beta_pruning(position->right,alpha,beta,false);
//     max1 = std::max(value,max1);
//     return max1;
    
//     }
//     else {//min
//     int min1 = INT_MAX;
//     int value = alpha_beta_pruning(position->left,alpha,beta,true);
//     min1 = std::min(value,min1);
//     beta = std::min(beta,min1);
//     if(beta <= alpha){
//       delete_subtree(position->right);  //剪枝只发生在右边
//       position->right = NULL;
//       return min1;
//     }
    
//     value = alpha_beta_pruning(position->right,alpha,beta,true);
//     min1 = std::min(value,min1);
//     return min1;
//     }
// 剪枝时delete函数
// void delete_subtree(Node* position) {
//   if (position -> left != NULL){
//     delete_subtree(position -> left);
//     position -> left = NULL;
//   }
//   if (position -> right != NULL){
//     delete_subtree(position -> right);
//     position -> right = NULL;
//   }
//   delete position; 
// }


 function ABjianzhi(board) {
    let cloneBD = cloneBoard(board);
 
    let root = new Tree(calcScore(cloneBD))
    let alpha = -Infinity; // 极大值
    let beta = Infinity; // 极小值
    let maxNode = dfs(cloneBD, root, alpha, beta, true);
  
    root.value = maxNode.value;
    console.log(root)
    let {x , y } = maxNode
    root = null;
    return {
      x: x,
      y: y
    }
 }
 function dfs(board, root, alpha, beta, who) {
  for (let i =0;i<board.length;i++){
    for (let j =0;j<board.length;j++) {
      if (board[i][j]===0) { // 空白的地方可走
        if (who) { // 极大值
          // 走子
          let movedBoard = moveBoard(board, 2, i,j) // 走黑子 、、 电脑走白子，
          let score = calcScore(movedBoard) // 评价分数
          let node = new Tree(score,i,j)
          root.children.push(node);
          if (score > alpha) {
            alpha = score;
          }
          let minNode = dfs(movedBoard, node, alpha, beta, false)
          // let minNode = Min(node);
          node.value = minNode.value;
          // 恢复棋盘
          moveBoard(board, 0, i,j) 
         
        } else { // 极小值
            // 走子
            let movedBoard = moveBoard(board, 1, i,j) // 走黑子 、、 电脑走白子，
            let score = calcScore(movedBoard) // 评价分数
            let node = new Tree(score,i,j)
            root.children.push(node);
            // dfs(board, root, alpha, beta, true)
            // let maxNode = Max(node);
            // node.value = maxNode.value;
            // 恢复棋盘
            if (score < beta) {
              beta = score;
            }
            moveBoard(board, 0, i,j) 
            // if (score < alpha) {
            //   return maxNode
            // }
        }
       
      }
    }
  }
  if (who) {
    return Max(root);
  }else {
    return Min(root);
  }
 }
 function Max(node) {
    let maxNode = null;
    node.children.forEach(node=>{
      if (!maxNode ||node.value > maxNode.value) {
        maxNode = node
      }
    })
    return maxNode;
 }
 function Min(node) {
  let minNode = null;
  node.children.forEach(node=>{
    if (!minNode || node.value < minNode.value) {
      minNode = node
    }
  })
  return minNode;
}
 // 克隆棋盘
 function cloneBoard(board) {
   var cloneBoard = [];
   for (var i = 0;i<board.length;i++) {
    cloneBoard.push([])
    for (var j = 0;j<board.length;j++) {
      cloneBoard[i][j] = board[i][j]
    }
   }

   return cloneBoard;
 }
 // 走子函数
 function moveBoard(board, value, x,y) {
  board[x][y] = value;

  return board;
 }




 var game = {
    BW: 1,//保存棋子颜色，1为黑色。2为白色
    WIDTH:15,//保存棋盘行宽度
    chess:[],//棋盘
    wins:null,//赢法数组
    count: 0,//赢法总数
    playerWin: [],//保存玩家赢法
    computerWin: [],//保存电脑赢法
    playerWeight: [],//玩家棋子权重
    computerWeight: [],//计算机权重
    chessClone: [],//克隆棋盘
    pwinClone: [],//玩家赢法克隆
    cwinClone: [],//电脑赢法克隆
    step: 0,//记录下棋总步数
    isPlayer1:true,//记录是否是玩家1
   // pvp:false,//是否是玩家对战
    GAMEOVER: false,//保存游戏是否结束
    init: function () {//页面初始化
      this.GAMEOVER = false;
      //棋盘初始化
      var W=this.WIDTH;
      for (var i = 0; i < W; i++) {
        this.chess[i] = [];
        for (var j = 0; j < W; j++) {
          this.chess[i][j] = 0;
        }
      }
      //权重初始化
      this.renewWeight();
      //重绘棋盘
      this.paintBoard();
      if(this.wins==null){
        //计算赢法数组，保存总的赢法
        this.calcWins();
      }
      //初始化玩家赢法，电脑赢法
      for(var i=0;i<this.count;i++){
        this.playerWin[i]=0;
        this.computerWin[i]=0;
      }
      //console.dir(this.playerWin)
      //绑定所有事件
      this.bind();
    },
    renewWeight:function(){//权重初始化
      var W=this.WIDTH;
      for (var i = 0; i < W; i++) {
        this.playerWeight[i] = [];
        this.computerWeight[i]=[];
        for (var j = 0; j < W; j++) {
          this.playerWeight[i][j] = 0;
          this.computerWeight[i][j]=0;
        }
      }
    },
    paintBoard:function(){//绘制棋盘
      var ctx = c1.getContext('2d');
      ctx.clearRect(0,0,600,600); //清空棋盘
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
    },
    calcWins:function(){
      var W=this.WIDTH;
      this.wins=[];
      for(var i=0;i<W;i++){//总的赢法
        this.wins[i]=[];
        for(var j=0;j<W;j++){
          this.wins[i][j]=[];
        }
      }
      //横线赢法
      for(var i=0;i<W;i++){
        for(var j=0;j<W-4;j++){
          for(var k=0;k<5;k++){
            this.wins[i][j+k][this.count]=true;
          }
          this.count++;
        }
      }
      //竖线赢法
      for(var i=0;i<W-4;i++){
        for(var j=0;j<W;j++){
          for(var k=0;k<5;k++){
            this.wins[i+k][j][this.count]=true;
          }
          this.count++;
        }
      }
      //正斜线赢法
      for(var i=0;i<W-4;i++){
        for(var j=0;j<W-4;j++){
          for(var k=0;k<5;k++){
            this.wins[i+k][j+k][this.count]=true;
          }
          this.count++;
        }
      }
      //反斜线赢法
      for(var i=0;i<W-4;i++){
        for(var j=4;j<W;j++){
          for(var k=0;k<5;k++){
            this.wins[i+k][j-k][this.count]=true;
          }
          this.count++;
        }
      }
    },
    updateView:function(){//更新页面，权值清零，绘制棋盘，绘制棋子
      var ctx = c1.getContext('2d');
      this.renewWeight();
      this.paintBoard();
      //遍历格子，将数组中值为1的棋子，绘制黑子棋子在棋盘上
      for (var i = 0; i < this.chess.length; i++) {
        for (var j = 0; j < this.chess[i].length; j++) {
          if (this.chess[i][j] == 1) {
            ctx.beginPath();
            ctx.arc(20 + 40 * j, 20 + 40 * i, 15, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = '#000';
            ctx.fill();
          } else if (this.chess[i][j] === 2) {
            ctx.beginPath();
            ctx.arc(20 + 40 * j, 20 + 40 * i, 15, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = '#fff';
            ctx.fill();
          }
        }
      }
    },
    bind:function(){
      var that=this;
      //鼠标单击事件绑定
      pvp.onclick=function(){//启动玩家对战模式，隐藏div
       // that.pvp=true;
        that.pvp(that);
        choosePattern.style.display='none';
      };
      pve.onclick=function(){//启动人机对战模式，隐藏div
        choosePattern.style.display='none';
        
        that.pve(that);
      };
      gameBegin.onclick=function(){
        pWin.style.display='none';
        that.init();
      };
      btnWhite.onclick=function(){
        white.style.display='none';
        that.init();
      };
      btnBlack.onclick=function(){
        black.style.display='none';
        that.init();
      };
      gameBeg.onclick=function(){
        cWin.style.display='none';
        that.init();
      };
      restart.onclick=function(){
        that.init();
      };
      regret.onclick=function(){
        //转换棋子颜色
        if(that.isPlayer1){
          that.BW=2;
          that.isPlayer1=false;
        }else{
          that.BW=1;
          that.isPlayer1=true;
        }
        //要有克隆棋盘,恢复上一次棋的棋盘,//反克隆
        if(that.step<2){return;}
        that.step--;
        console.log(that.step);
        for(var i=0;i<15;i++){
          for(var j=0;j<15;j++){
            that.chess[i][j]=that.chessClone[that.step][i][j];
          }
        }
        for(var i=0;i<that.count;i++){
          that.playerWin[i]=that.cwinClone[that.step][i];
          that.computerWin[i]=that.pwinClone[that.step][i];
        }
        //重绘棋盘
        that.paintBoard();
        //跟新页面
        that.updateView();
      };
    },
    pvp:function(that){
      c1.onclick = function (e) {
        var x1 = e.offsetX;
        var y1 = e.offsetY;
        for (var i = 0; i < 15; i++) {
          for (var j = 0; j < 15; j++) {
            var x2 = 20 + 40 * j;
            var y2 = 20 + 40 * i;
            var distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
            if ((distance < 15) && (that.chess[i][j] ==0)){
              that.chess[i][j] = that.BW;
              for (var k = 0; k < that.count; k++) {
                if (that.wins[i][j][k]){
                  if(that.BW==1) {
                    that.playerWin[k]++;
                    that.computerWin[k] = 6;//白子这个点不能赢了
                    if (that.playerWin[k] == 5) {
                      black.style.display = 'block';//黑子1赢了
                      that.GAMEOVER = true;
                    }
                  }else if(that.BW==2){
                    that.computerWin[k]++;
                    that.playerWin[k] = 6;//黑子这个点不能赢了
                    if (that.computerWin[k] == 5) {
                      white.style.display = 'block';//白子
                      that.GAMEOVER = true;
                    }
                  }
                }
              }
              if(that.isPlayer1==true){//先手下黑子
                that.BW=2;
                that.isPlayer1=false;
              }else{//下白子
                that.BW=1;
                that.isPlayer1=true;
              }
             that.updateView();
              //克隆棋盘
              that.clone(that);
            }
          }
        }
      };
    },
   rn:function(min,max){
      return Math.floor(Math.random()*(max-min+1)+min);
    },
    pve:function(that){
        var rni=that.rn(6,8);
      var rnj=that.rn(6,8);
      //console.log(rni,rnj);
      //console.dir(chess);
      that.chess[rni][rnj]=2;//随机生成一白个子
        that.updateView(that);
      c1.onclick = function (e) {
        var x1 = e.offsetX;
        var y1 = e.offsetY;
        // console.log(x1);
        // debugger;
        that.BW = 1;
        //判断鼠标点击的位置对应i，j
        for (var i = 0; i < 15; i++) {
          for (var j = 0; j < 15; j++) {
            var x2 = 20 + 40 * j;
            var y2 = 20 + 40 * i;
            var distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
            if ((distance < 15 && that.BW == 1) && (that.chess[i][j] != 1 && that.chess[i][j] != 2)) {
              that.chess[i][j] = that.BW;
              for (var k = 0; k < that.count; k++) {
                if (that.wins[i][j][k]) {
                  that.playerWin[k]++;
                  that.computerWin[k]=6;//电脑不能赢了
                  if(that.playerWin[k]==5){
                    pWin.style.display='block';//人赢了
                    that.GAMEOVER=true;
                  }
                }
              }
            
            
              that.computerAI(that);
           
              that.updateView();
            //  console.log(that.count)
              //克隆
              that.clone(that);
             // console.dir(that.chessClone);
            }
          }
        }
      };
    },
    clone:function(that){
      //步数加1
      that.step++;
      //克隆棋盘
      that.chessClone[that.step]=[];
      for(var i=0;i<15;i++){
        that.chessClone[that.step][i]=[];
        for(var j=0;j<15;j++){
          that.chessClone[that.step][i][j]=that.chess[i][j];
        }
      }
      //克隆赢法
      that.cwinClone[that.step]=[];
      that.pwinClone[that.step]=[];
      for(var i=0;i<that.count;i++){
        that.cwinClone[that.step][i]=that.playerWin[i];
        that.pwinClone[that.step][i]=that.computerWin[i];
      }
    },
  
    computerAI:function(that){
      that.BW=2;
      console.time('a')
      let {x,y} = ABjianzhi(that.chess)
      that.chess[x][y]=that.BW;
      console.timeEnd('a')
      if (that.GAMEOVER == false) {
        for (var k = 0; k < that.count; k++) {
          //console.log(this.wins[x][y][k]);
          if (that.wins[x][y][k]) {
            that.computerWin[k]++;
            that.playerWin[k] = 6;
            if (that.computerWin[k] == 5) {//电脑赢了
              cWin.style.display = 'block';
              that.GAMEOVER=true;
            }
          }
        }
      }
    },

  };
  game.init();
  