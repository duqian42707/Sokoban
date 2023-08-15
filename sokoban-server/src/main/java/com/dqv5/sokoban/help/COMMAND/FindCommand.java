package com.dqv5.sokoban.help.COMMAND;

import com.dqv5.sokoban.help.LOGIC.Astar;
import com.dqv5.sokoban.help.LOGIC.DataStatic;
import com.dqv5.sokoban.help.LOGIC.FindLogic;
import com.dqv5.sokoban.help.LOGIC.GUI.MoveLogic;
import com.dqv5.sokoban.help.LOGIC.StartLogic;
import com.dqv5.sokoban.help.STRUCT.Graph;
import com.dqv5.sokoban.help.STRUCT.MyPoint;
import com.dqv5.sokoban.help.STRUCT.Situation;

import javax.swing.*;
import java.awt.event.KeyEvent;
import java.util.ArrayList;
import java.util.List;

public class FindCommand {//所有的gui都与command层交互
    private MoveLogic moveLogic = new MoveLogic();

    public char[][] getMap(int rank) {//获取地图，并且初始化数据
        char map[][];
        StartLogic startLogic = new StartLogic();
        map = startLogic.findMap(rank);
        //长宽startLogic已经初始化
        //寻找几个关键点
        int boxNum = 0;
        for (int i = 0; i < DataStatic.kuan; i++) {
            for (int j = 0; j < DataStatic.chang; j++) {
                switch (map[i][j]) {
                    case '+':
                        DataStatic.peopleValue = DataStatic.pointToValue(i, j);
                        DataStatic.zhongdian.add(new MyPoint(j, i));
                        break;
                    case '*':
                        DataStatic.boxList.add(new MyPoint(j, i));
                        boxNum++;
                        break;
                    case '@'://人
                        DataStatic.peopleValue = DataStatic.pointToValue(i, j);
                        break;
                    case '.'://终点
                        DataStatic.zhongdian.add(new MyPoint(j, i));
                        break;
                    case '$'://箱子
                        DataStatic.boxList.add(new MyPoint(j, i));
                        boxNum++;
                        break;
                }
            }
        }
        DataStatic.boxNum = boxNum;
        return map;
    }

    private int getValue(int fangxiang, MyPoint boxPoint) {
        switch (fangxiang) {
            case 0://下
                return DataStatic.pointToValue(boxPoint.y - 1, boxPoint.x);
            case 1://左
                return DataStatic.pointToValue(boxPoint.y, boxPoint.x + 1);
            case 2://右
                return DataStatic.pointToValue(boxPoint.y, boxPoint.x - 1);
            case 3://上
                return DataStatic.pointToValue(boxPoint.y + 1, boxPoint.x);
            default:
                return 0;
        }
    }

    public boolean findPath(char map[][], List<Integer> valueList) {
        Situation tailSitu;
        List<Situation> situList = new ArrayList<>(50);
        List<Graph> graphList = new ArrayList<>(50);
        List<MyPoint> boxPoint = new ArrayList<>(50);
        List<Integer> fangxiangList = new ArrayList<>(50);
        Astar myAstar = new Astar();
        tailSitu = new FindLogic().findPath(map);
        if (tailSitu == null)
            return false;
        else {//找到终点，遍历寻找路径
            while (tailSitu != null) {
                situList.add(tailSitu);
                tailSitu = tailSitu.getFatherSitu();
            }
        }
        valueList.add(DataStatic.peopleValue);
        Situation nextSitu = situList.get(situList.size() - 2);
        tailSitu = situList.get(situList.size() - 1);
        myAstar.findRenyiPath(new Graph(tailSitu.getMap()), valueList, DataStatic.pointToValue(tailSitu.getPeoplePoint()),
                getValue(nextSitu.getFangxiang(), nextSitu.getMovePoint()));
        int x;
        for (int i = situList.size() - 3; i >= 0; i--) {
            x = DataStatic.pointToValue(nextSitu.getMovePoint());
            tailSitu = nextSitu;
            valueList.add(x);
            nextSitu = situList.get(i);
            myAstar.findRenyiPath(new Graph(tailSitu.getMap()), valueList, x,
                    getValue(nextSitu.getFangxiang(), nextSitu.getMovePoint()));
        }
        valueList.add(DataStatic.pointToValue(nextSitu.getMovePoint()));
        return true;
    }

    public void move(int jianzhi) {//每一个move都是在一个新的线程完成
        int fangxiang = 0;
        switch (jianzhi) {
            case KeyEvent.VK_DOWN:
                fangxiang = 0;
                break;
            case KeyEvent.VK_UP:
                fangxiang = 3;
                break;
            case KeyEvent.VK_LEFT:
                fangxiang = 1;
                break;
            case KeyEvent.VK_RIGHT:
                fangxiang = 2;
                break;
        }
        moveLogic.move(fangxiang);
    }

    //每一个help都是在一个新的线程完成
    public void help(MyPoint nowPoint) {//点击帮助按钮后
        List<Integer> valueList = new ArrayList<>();//记录人的移动
        char map[][] = DataStatic.map;
        //赋值地图,防止数据被更改
        if (!findPath(map, valueList))//如果查找失败，则
            JOptionPane.showMessageDialog(null, "查找失败", "帮助", JOptionPane.ERROR_MESSAGE);
        if (JOptionPane.showConfirmDialog(null, "已经好到") == 0) {
            int bianliang, fangxiang = 0;
            for (int i = 0; i < valueList.size() - 1; i++) {
                bianliang = valueList.get(i) - valueList.get(i + 1);
                switch (bianliang) {
                    case 1://向左
                        fangxiang = 1;
                        break;
                    case -1://向右
                        fangxiang = 2;
                        break;
                    default:
                        if (bianliang == -DataStatic.chang) {//向下
                            fangxiang = 0;
                        } else {
                            fangxiang = 3;
                        }
                }
                moveLogic.move(fangxiang);
            }
        }
    }

}
