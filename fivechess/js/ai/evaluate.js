import core from './core.js';



console.log(core);
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
export function calcScore(board) {
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
                    if (boardOption.wins[x][y][k]) {
                        boardOption.blackWin[k]++;
                        boardOption.whiteWin[k] = 6;
                    }
                }
            } else if(board[i][j] === 2){
                for (var k = 0; k < boardOption.count; k++) {
                    if (boardOption.wins[x][y][k]) {
                        boardOption.whiteWin[k]++;
                        boardOption.blackWin[k] = 6;
                    }
                }
            }
        }
    }
    for (let i = 0;i<boardOption.count;i++) {
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

    return blackScore - whiteScore;
}
