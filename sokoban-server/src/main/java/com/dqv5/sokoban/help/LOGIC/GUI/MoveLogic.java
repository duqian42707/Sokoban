package com.dqv5.sokoban.help.LOGIC.GUI;

import com.dqv5.sokoban.help.GUI.PeopleLabel;
import com.dqv5.sokoban.help.LOGIC.DataStatic;
import com.dqv5.sokoban.help.STRUCT.MyPoint;

import javax.swing.*;

public class MoveLogic {//根据传递的移动位置，来完成移动

    private void pointChange(int fangxiang, MyPoint point) {
        switch (fangxiang) {
            case 1://向左
                point.x--;
                break;
            case 2://向右
                point.x++;
                break;
            case 0://向下
                point.y++;
                break;
            case 3://向上
                point.y--;
                break;
        }
    }

    private void peopleMapChange(char map[][], MyPoint peopleBe) {
        switch (map[peopleBe.y][peopleBe.x]) {//人原来带的地方
            case '@':
                map[peopleBe.y][peopleBe.x] = '-';
                break;
            case '+':
                map[peopleBe.y][peopleBe.x] = '.';
        }
    }

    //这个方法需要加锁。
    public synchronized void move(int fangxiang) {//因为fangxiang在control中已经判断过，直接传过来
        //先判断是否可以移动
        int zuo = DataStatic.zuo;
        int shang = DataStatic.shang;
        int picSize = DataStatic.picSize;

        JLayeredPane fenceng = DataStatic.fenceng;
        PeopleLabel peopleLabel = DataStatic.peopleLabel;
        char map[][] = DataStatic.map;

        MyPoint peopleBe = DataStatic.valueToPoint(DataStatic.peopleValue);
        MyPoint people = DataStatic.valueToPoint(DataStatic.peopleValue);
        pointChange(fangxiang, people);


        //箱子每一次移动都要从map中删除原箱子，添加新箱子。
        switch (map[people.y][people.x]) {//人要到的地方
            case '#':
                cannotMove(peopleLabel, fangxiang);
                break;
            case '-':
            case '.':
                if (map[people.y][people.x] == '-') {
                    map[people.y][people.x] = '@';
                } else {
                    map[people.y][people.x] = '+';
                }
                peopleMapChange(map, peopleBe);
                fenceng.setLayer(peopleLabel, 10 + people.y * 2);
                DataStatic.peopleValue = DataStatic.pointToValue(people.y, people.x);
                movePeople(peopleLabel, fangxiang, new MyPoint(zuo + peopleBe.x * picSize - 10, shang + peopleBe.y * picSize - 52));
                break;
            case '$':
            case '*':
                MyPoint box = new MyPoint(people.x, people.y);
                MyPoint boxBe = new MyPoint(people.x, people.y);
                JLabel boxLabel = DataStatic.boxLabelMap.get(boxBe);
                pointChange(fangxiang, box);
                switch (map[box.y][box.x]) {//箱子要到的地方
                    case '-':
                    case '.':
                        DataStatic.peopleValue = DataStatic.pointToValue(people.y, people.x);
                        DataStatic.boxLabelMap.put(box, boxLabel);
                        DataStatic.boxLabelMap.remove(boxBe);
                        peopleMapChange(map, peopleBe);
                        if (map[people.y][people.x] == '$') {
                            map[people.y][people.x] = '@';
                        } else {
                            map[people.y][people.x] = '+';
                        }
                        fenceng.setLayer(peopleLabel, 10 + people.y * 2);
                        DataStatic.peopleValue = DataStatic.pointToValue(people.y, people.x);
                        if (map[box.y][box.x] == '-') {
                            map[box.y][box.x] = '$';
                            fenceng.setLayer(boxLabel, 10 + box.y * 2);
                            SwingUtilities.invokeLater(new Runnable() {
                                @Override
                                public void run() {
                                    boxLabel.setIcon(new ImageIcon("lib/imgs/box.png"));
                                }
                            });
                        } else {
                            map[box.y][box.x] = '*';
                            fenceng.setLayer(boxLabel, 11 + box.y * 2);
                            SwingUtilities.invokeLater(new Runnable() {
                                @Override
                                public void run() {
                                    boxLabel.setIcon(new ImageIcon("lib/imgs/boxarrive.png"));
                                }
                            });
                        }
                        bothMove(peopleLabel, boxLabel, fangxiang, new MyPoint(zuo + peopleBe.x * picSize - 10, shang + peopleBe.y * picSize - 52)
                                , new MyPoint(zuo + boxBe.x * picSize, shang + boxBe.y * picSize - 10));
                        break;
                    default:
                        cannotMove(peopleLabel, fangxiang);
                }


        }

    }

    private synchronized void cannotMove(PeopleLabel peopleLabel, int fangxiang) {
        int play[] = new int[3];
        play[0] = 1;
        play[1] = 2;
        play[2] = 3;
        for (int i = 0; i < 3; i++) {
            int finalI = i;
            SwingUtilities.invokeLater(new Runnable() {
                @Override
                public void run() {
                    peopleLabel.changeIcon(fangxiang, finalI);
                }
            });
            try {
                Thread.sleep(DataStatic.sleepTime);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                peopleLabel.changeIcon(fangxiang, 0);
            }
        });
    }

    private void bothMove(PeopleLabel peopleLabel, JLabel boxLabel, int fangxiang, MyPoint nowPoint, MyPoint boxPoint) {
        MyPoint shunxu[] = new MyPoint[4];
        MyPoint boxShunxu[] = new MyPoint[4];
        switch (fangxiang) {
            case 1://向左
                shunxu[0] = new MyPoint(nowPoint.x - 10, nowPoint.y);
                shunxu[1] = new MyPoint(nowPoint.x - 20, nowPoint.y);
                shunxu[2] = new MyPoint(nowPoint.x - 30, nowPoint.y);
                shunxu[3] = new MyPoint(nowPoint.x - 35, nowPoint.y);
                boxShunxu[0] = new MyPoint(boxPoint.x - 10, boxPoint.y);
                boxShunxu[1] = new MyPoint(boxPoint.x - 20, boxPoint.y);
                boxShunxu[2] = new MyPoint(boxPoint.x - 30, boxPoint.y);
                boxShunxu[3] = new MyPoint(boxPoint.x - 35, boxPoint.y);
                break;
            case 2://向右
                shunxu[0] = new MyPoint(nowPoint.x + 10, nowPoint.y);
                shunxu[1] = new MyPoint(nowPoint.x + 20, nowPoint.y);
                shunxu[2] = new MyPoint(nowPoint.x + 30, nowPoint.y);
                shunxu[3] = new MyPoint(nowPoint.x + 35, nowPoint.y);
                boxShunxu[0] = new MyPoint(boxPoint.x + 10, boxPoint.y);
                boxShunxu[1] = new MyPoint(boxPoint.x + 20, boxPoint.y);
                boxShunxu[2] = new MyPoint(boxPoint.x + 30, boxPoint.y);
                boxShunxu[3] = new MyPoint(boxPoint.x + 35, boxPoint.y);
                break;
            case 0://向下
                shunxu[0] = new MyPoint(nowPoint.x, nowPoint.y + 10);
                shunxu[1] = new MyPoint(nowPoint.x, nowPoint.y + 20);
                shunxu[2] = new MyPoint(nowPoint.x, nowPoint.y + 30);
                shunxu[3] = new MyPoint(nowPoint.x, nowPoint.y + 35);
                boxShunxu[0] = new MyPoint(boxPoint.x, boxPoint.y + 10);
                boxShunxu[1] = new MyPoint(boxPoint.x, boxPoint.y + 20);
                boxShunxu[2] = new MyPoint(boxPoint.x, boxPoint.y + 30);
                boxShunxu[3] = new MyPoint(boxPoint.x, boxPoint.y + 35);
                break;
            case 3://向上
                shunxu[0] = new MyPoint(nowPoint.x, nowPoint.y - 10);
                shunxu[1] = new MyPoint(nowPoint.x, nowPoint.y - 20);
                shunxu[2] = new MyPoint(nowPoint.x, nowPoint.y - 30);
                shunxu[3] = new MyPoint(nowPoint.x, nowPoint.y - 35);
                boxShunxu[0] = new MyPoint(boxPoint.x, boxPoint.y - 10);
                boxShunxu[1] = new MyPoint(boxPoint.x, boxPoint.y - 20);
                boxShunxu[2] = new MyPoint(boxPoint.x, boxPoint.y - 30);
                boxShunxu[3] = new MyPoint(boxPoint.x, boxPoint.y - 35);
                break;
        }
        for (int i = 0; i < 3; i++) {
            int finalI = i;
            SwingUtilities.invokeLater(new Runnable() {
                @Override
                public void run() {
                    boxLabel.setLocation(boxShunxu[finalI].x, boxShunxu[finalI].y);
                    peopleLabel.setLocation(shunxu[finalI].x, shunxu[finalI].y);
                    peopleLabel.changeIcon(fangxiang, finalI + 1);
                }
            });
            try {
                Thread.sleep(DataStatic.sleepTime);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                boxLabel.setLocation(boxShunxu[3].x, boxShunxu[3].y);
                peopleLabel.setLocation(shunxu[2].x, shunxu[3].y);
                peopleLabel.changeIcon(fangxiang, 0);//运动完后回到初始状态
            }
        });
    }

    private void movePeople(PeopleLabel peopleLabel, int fangxiang, MyPoint nowPoint) {
        MyPoint shunxu[] = new MyPoint[4];
        switch (fangxiang) {
            case 1://向左
                shunxu[0] = new MyPoint(nowPoint.x - 10, nowPoint.y);
                shunxu[1] = new MyPoint(nowPoint.x - 20, nowPoint.y);
                shunxu[2] = new MyPoint(nowPoint.x - 30, nowPoint.y);
                shunxu[3] = new MyPoint(nowPoint.x - 35, nowPoint.y);
                break;
            case 2://向右
                shunxu[0] = new MyPoint(nowPoint.x + 10, nowPoint.y);
                shunxu[1] = new MyPoint(nowPoint.x + 20, nowPoint.y);
                shunxu[2] = new MyPoint(nowPoint.x + 30, nowPoint.y);
                shunxu[3] = new MyPoint(nowPoint.x + 35, nowPoint.y);
                break;
            case 0://向下
                shunxu[0] = new MyPoint(nowPoint.x, nowPoint.y + 10);
                shunxu[1] = new MyPoint(nowPoint.x, nowPoint.y + 20);
                shunxu[2] = new MyPoint(nowPoint.x, nowPoint.y + 30);
                shunxu[3] = new MyPoint(nowPoint.x, nowPoint.y + 35);
                break;
            case 3://向上
                shunxu[0] = new MyPoint(nowPoint.x, nowPoint.y - 10);
                shunxu[1] = new MyPoint(nowPoint.x, nowPoint.y - 20);
                shunxu[2] = new MyPoint(nowPoint.x, nowPoint.y - 30);
                shunxu[3] = new MyPoint(nowPoint.x, nowPoint.y - 35);
                break;
        }
        for (int i = 0; i < 3; i++) {
            int finalI = i;
            SwingUtilities.invokeLater(new Runnable() {
                @Override
                public void run() {
                    peopleLabel.setLocation(shunxu[finalI].x, shunxu[finalI].y);
                    peopleLabel.changeIcon(fangxiang, finalI + 1);
                }
            });
            try {
                Thread.sleep(DataStatic.sleepTime);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                peopleLabel.setLocation(shunxu[2].x, shunxu[3].y);
                peopleLabel.changeIcon(fangxiang, 0);//运动完后回到初始状态
            }
        });
    }

}
