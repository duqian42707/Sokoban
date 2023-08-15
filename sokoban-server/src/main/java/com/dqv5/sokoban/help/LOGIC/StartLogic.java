package com.dqv5.sokoban.help.LOGIC;

import java.io.*;

public class StartLogic {//读取地图文件，获取char[][]数组

    public char[][] findMap(int rank) {//读取指定关卡文件
        //遇到换行符为这一行边界。
        int mapByte;
        int chang = 0, kuan = 1;
        int i = 0, j = 0;
        char map[][] = null;
        try {
            File file = new File("lib/map/" + rank + ".xsb");
            BufferedReader readMap = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
            readMap.mark((int) file.length() + 1);
            while ((mapByte = readMap.read()) != -1) {
                if (mapByte == 10) {//读到换行符,是两个字符为13 10
                    kuan++;
                } else {
                    if (kuan == 1) {
                        chang++;
                    }
                }
            }
            map = new char[kuan][chang - 1];
            DataStatic.chang = chang - 1;
            DataStatic.kuan = kuan;
            readMap.reset();
            while ((mapByte = readMap.read()) != -1) {
                if (mapByte == 10) {//读到换行符
                    i++;
                    j = 0;
                } else if (mapByte != 13)
                    map[i][j++] = (char) mapByte;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return map;
    }
}
