package com.dqv5.sokoban.help.STRUCT;

public class Node {
    private int place;//定义节点位置，或者是位置标志
    private int G;//移动到当前节点移动量,本题不是都为1，需要累加的
    private int H;//当前方块到终点的移动量估计值
    private int F;//g+h
    private Node father;

    public Node(int place, int h, Node father) {
        this.place = place;
        this.H = h;
        this.father = father;
        if (father == null) {
            G = 1;
        } else {
            G = father.getG() + 1;
        }
        this.F = this.G + h;
    }

    public int getF() {
        return F;
    }

    public int getPlace() {
        return place;
    }

    public int getG() {
        return G;
    }

    public Node getFather() {
        return father;
    }

    public void updateFather(Node newNode) {
        int oldG = G;
        father = newNode;
        G = father.getG() + 1;
        F = F - oldG + G;
    }
}
