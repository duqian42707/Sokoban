package com.dqv5.sokoban.help.COMMAND;

import com.dqv5.sokoban.help.LOGIC.Astar;
import com.dqv5.sokoban.help.LOGIC.DataStatic;
import com.dqv5.sokoban.help.LOGIC.FindLogic;
import com.dqv5.sokoban.help.STRUCT.Graph;
import com.dqv5.sokoban.help.STRUCT.MyPoint;
import com.dqv5.sokoban.help.STRUCT.Situation;

import java.util.ArrayList;
import java.util.List;

public class FindCommand {//所有的gui都与command层交互

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


}
