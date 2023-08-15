package com.dqv5.sokoban.help.STRUCT;

public class Graph {
    private int vexNum;//图的定点个数
    private int edge;//图的边数
    private int arc[][];//邻接矩阵
    private int map[];
    int kuan, chang;

    public Graph(char map[][]) {//根据提供的地图生成邻接矩阵,墙壁也应该算进去
        kuan = map.length;//地图的行数
        chang = map[0].length;//地图的列数.
        vexNum = kuan * chang;//包括墙壁的节点数
        arc = new int[vexNum][vexNum];
        this.map = new int[vexNum];
        //初始化邻接矩阵
        for (int i = 0; i < kuan; i++) {
            for (int j = 0; j < chang; j++) {
                this.map[i * chang + j] = map[i][j];
            }
        }
        for (int i = 0; i < vexNum; i++) {
            for (int j = 0; j < vexNum; j++) {
                arc[i][j] = 0;
            }
        }
        //生成邻接矩阵
        for (int i = 0; i < kuan; i++) {
            for (int j = 0; j < chang; j++) {
                if (map[i][j] != '#') {//只要不是墙壁他的上下左右都连接
                    if (i > 0) {//上
                        int x = i * chang + j;
                        arc[x][x - chang] = 1;
                        arc[x - chang][x] = 1;
                    }
                    if (i < kuan - 1) {//下
                        int x = i * chang + j;
                        arc[x][x + chang] = 1;
                        arc[x + chang][x] = 1;
                    }
                    if (j > 0) {//左
                        int x = i * chang + j;
                        arc[x][x - 1] = 1;
                        arc[x - 1][x] = 1;
                    }
                    if (j < chang - 1) {//右
                        int x = i * chang + j;
                        arc[x][x + 1] = 1;
                        arc[x + 1][x] = 1;
                    }
                }
            }
        }
        for (int i = 0; i < kuan; i++) {
            for (int j = 0; j < chang; j++) {//如果是墙壁，将他的上下左右的边都关闭
                if (map[i][j] == '#' || map[i][j] == '$' || map[i][j] == '*') {
                    if (i > 0) {//上
                        int x = i * chang + j;
                        arc[x][x - chang] = 0;
                        arc[x - chang][x] = 0;
                    }
                    if (i < kuan - 1) {//下
                        int x = i * chang + j;
                        arc[x][x + chang] = 0;
                        arc[x + chang][x] = 0;
                    }
                    if (j > 0) {//左
                        int x = i * chang + j;
                        arc[x][x - 1] = 0;
                        arc[x - 1][x] = 0;
                    }
                    if (j < chang - 1) {//右
                        int x = i * chang + j;
                        arc[x][x + 1] = 0;
                        arc[x + 1][x] = 0;
                    }
                }
            }
        }
    }

    public boolean connect(int vex1, int vex2) {//两个点是否联通
        if (vex1 > 0 && vex2 > 0 && vex1 < vexNum && vex2 < vexNum) {//在符合范围内
            if (arc[vex1][vex2] == 1) {
                return true;
            } else
                return false;
        } else
            return false;
    }
}
