package com.dqv5.sokoban.help.STRUCT;

public class MyPoint implements Comparable<MyPoint> {//让需要排序的对象类重新方法
    public int x, y;

    public MyPoint(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public int compareTo(MyPoint o) {
        if (this.y > ((MyPoint) o).y) {
            return 1;
        } else if (this.y < ((MyPoint) o).y) {
            return -1;
        } else {
            if (this.x >= ((MyPoint) o).x) {
                return 1;
            } else {
                return -1;
            }
        }
    }

    @Override
    public boolean equals(Object obj) {//用来判断是否相同
        MyPoint nowPoint = (MyPoint) obj;
        if (nowPoint != null) {
            return this.x == nowPoint.x && this.y == nowPoint.y;
        } else
            return false;
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = result * 31 + x;
        result = result * 31 + y;
        return result;
    }
}
