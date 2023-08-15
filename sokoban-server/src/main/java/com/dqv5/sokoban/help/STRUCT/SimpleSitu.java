package com.dqv5.sokoban.help.STRUCT;


import java.util.HashSet;

public class SimpleSitu {
    private Long myCrcNum;
    private MyPoint peoplePoint;
    private HashSet<MyPoint> fillPoint;//将处于同一填充的坐标放进hashset中

    public SimpleSitu(HashSet<MyPoint> fillPoint, MyPoint peoplePoint, long crc) {
        this.fillPoint = fillPoint;
        this.myCrcNum = crc;
        this.peoplePoint = peoplePoint;
    }

    public Long getMyCrcNum() {
        return myCrcNum;
    }

    public MyPoint getPeoplePoint() {
        return peoplePoint;
    }

    @Override
    public int hashCode() {
        return myCrcNum.intValue();
    }

    @Override
    public boolean equals(Object obj) {
        SimpleSitu situ = (SimpleSitu) obj;
        if (!situ.getMyCrcNum().equals(myCrcNum)) {
            return false;
        }
        return fillPoint.contains(situ.getPeoplePoint());
    }
}
