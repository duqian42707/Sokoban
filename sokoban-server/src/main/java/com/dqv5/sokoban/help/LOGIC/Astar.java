package com.dqv5.sokoban.help.LOGIC;


import com.dqv5.sokoban.help.STRUCT.Graph;
import com.dqv5.sokoban.help.STRUCT.MyPoint;
import com.dqv5.sokoban.help.STRUCT.Node;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

//利用A*算法,寻找两点之间的最短距离，并通过数组实参返回查询结果，如果不存在则返回false
public class Astar {
    public boolean findRenyiPath(Graph myGraph, List<Integer> peoplePath, int value1, int value2) {
        HashSet<Node> openList;
        openList = new HashSet<>();
        HashSet<Node> closeList;
        closeList = new HashSet<>();
        if (value1 == value2) {
            return true;
        }
        //查找路径
        boolean xx = ARenyisuanfa(myGraph, openList, closeList, value1, value2);
        if (xx) {//如果可以达到
            getRenyiPath(peoplePath, findNode(openList, value2));
        }
        return xx;
    }

    private boolean ARenyisuanfa(Graph myGraph, HashSet<Node> openList, HashSet<Node> closeList, int value1, int value2) {
        Node workNode;//当前节点
        //1. 把起点加入 open list 。
        Node fistNode = new Node(value1, supposeWeight(value1, value2), null);
        openList.add(fistNode);
        //2. 重复如下过程：
        while (true) {
            workNode = findMinNode(openList, closeList);
            if (workNode == null)
                return false;
            if (checkRenyiNode(myGraph, openList, closeList, workNode, value2))//检查周围4个相邻方格
                return true;
           /* c. 遇到下面情况停止搜索：
            把终点加入到了 open list 中，此时路径已经找到了，或者
            查找终点失败，并且open list 是空的，此时没有路径。
            从终点开始，每个方格沿着父节点移动直至起点，形成路径。*/
        }
    }

    private int supposeWeight(int value1, int value2) {//计算h值
        MyPoint p1 = valueToPoint(value1);
        MyPoint p2 = valueToPoint(value2);
        return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    }

    private Node findNode(HashSet<Node> openList, int value) {
        for (Node mynode : openList) {
            if (mynode.getPlace() == value) {
                return mynode;
            }
        }
        return null;
    }

    private Node findMinNode(HashSet<Node> openList, HashSet<Node> closeList) {//遍历open list ，查找F值最小的节点,把它作为当前要处理的节点，然后移到close list中
        Node minNode = null;
        int i = 0;
        for (Node mynode : openList) {
            if (i == 0) {//如果是第一次
                i++;
                minNode = mynode;
            } else if (mynode.getF() < minNode.getF()) {
                minNode = mynode;
            }
        }
        //移到close list中
        openList.remove(minNode);
        closeList.add(minNode);
        return minNode;
    }

    //b. 对当前方格的 4 个相邻方格一一进行检查，如果它是可抵达的并且它不在close list
    private boolean checkRenyiNode(Graph myGraph, HashSet<Node> openList, HashSet<Node> closeList, Node myNode, int value2) {
        int place = myNode.getPlace();
        int place2;
        Node[] getNode = new Node[1];
        //上
        place2 = myNode.getPlace() - DataStatic.chang;//上方的位置
        if (!contains(place2, closeList, getNode) && access(place, place2, myGraph)) {
            if (caozuo(openList, place2, myNode, value2))//添加了终点
                return true;
        }
        //下
        place2 = myNode.getPlace() + DataStatic.chang;//下方的位置
        if (!contains(place2, closeList, getNode) && access(place, place2, myGraph)) {
            if (caozuo(openList, place2, myNode, value2))//添加了终点
                return true;
        }

        //左边
        place2 = myNode.getPlace() - 1;//左方的位置
        if (!contains(place2, closeList, getNode) && access(place, place2, myGraph)) {
            if (caozuo(openList, place2, myNode, value2))//添加了终点
                return true;
        }

        //右边
        place2 = myNode.getPlace() + 1;//右方的位置
        if (!contains(place2, closeList, getNode) && access(place, place2, myGraph)) {
            if (caozuo(openList, place2, myNode, value2))//添加了终点
                return true;
        }
        return false;
    }

    private boolean contains(int value, HashSet<Node> set, Node getNode[]) {//遍历openlist查看是否存在
        for (Node mynode : set) {
            if (mynode.getPlace() == value) {
                getNode[0] = mynode;
                return true;
            }
        }
        return false;
    }

    private boolean access(int place1, int place2, Graph myGraph) {//是否可以抵达
        return myGraph.connect(place1, place2);
    }

    private boolean caozuo(HashSet<Node> openList, int place, Node nowNode, int value2) {//nowNode是当前节点，place是他四周的位置
        Node[] getNode = new Node[1];
        if (contains(place, openList, getNode)) {// 如果它已经在open list中
            if (getNode[0].getG() > nowNode.getG() + 1) {//如果更近
                getNode[0].updateFather(nowNode);
            }
        }
        //如果它不在open list中，把它加入open list，并且把当前方格设置为它的父亲
        else {
            openList.add(new Node(place, supposeWeight(place, value2), nowNode));
            if (place == value2)//如果添加的是终点
                return true;
        }
        return false;
    }

    private void getRenyiPath(List<Integer> peoplePath, Node zhongdian) {
        List<Integer> path = new ArrayList<>(50);
        while (zhongdian != null) {
            path.add(zhongdian.getPlace());
            zhongdian = zhongdian.getFather();
        }
        //进行倒序
        for (int i = path.size() - 2; i >= 0; i--) {//不把开始放进去
            peoplePath.add(path.get(i));
        }
    }

    private MyPoint valueToPoint(int value) {
        return new MyPoint(value % DataStatic.chang, value / DataStatic.chang);
    }

}
