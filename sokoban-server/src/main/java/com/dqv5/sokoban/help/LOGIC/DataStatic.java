package com.dqv5.sokoban.help.LOGIC;

import com.dqv5.sokoban.help.STRUCT.MyPoint;
import com.dqv5.sokoban.help.STRUCT.SimpleSitu;

import javax.swing.*;
import java.util.*;

public class DataStatic {
    public static int sleepTime = 10;
    public static int picSize = 35, picNum = 20, changdu = picSize * picNum;
    public static int zuo, shang;
    public static JLayeredPane fenceng;
    public static Map<MyPoint, JLabel> boxLabelMap = new HashMap<>(10);

    public static List<MyPoint> boxList = new ArrayList<>(10);
    public static List<MyPoint> zhongdian = new ArrayList<>(10);
    public static int peopleValue;
    public static char[][] map;
    public static int chang, kuan;
    public static int boxNum;
    public static HashSet<MyPoint> failPoint = new HashSet<>(30);
    public static HashSet<SimpleSitu> allSitu = new HashSet<>(100);

    public static int pointToValue(MyPoint myPoint) {
        return myPoint.y * DataStatic.chang + myPoint.x;
    }

    public static int pointToValue(int y, int x) {
        return y * DataStatic.chang + x;
    }

    public static MyPoint valueToPoint(int value) {
        return new MyPoint(value % DataStatic.chang, value / DataStatic.chang);
    }
}
