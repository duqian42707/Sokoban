package com.dqv5.sokoban.help.GUI;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.io.File;
import java.io.IOException;

public class PeopleLabel extends JLabel {
    ImageIcon tu[][];//用来存储16张图片

    public PeopleLabel() {
        tu = new ImageIcon[4][4];
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 4; j++) {
                try {
                    tu[i][j] = new ImageIcon(ImageIO.read(new File("lib/imgs/role.png")).getSubimage(j * 100 + 20, i * 100 + 20, 60, 80));
                    tu[i][j].setImage(tu[i][j].getImage().getScaledInstance(60, 80, Image.SCALE_DEFAULT));//等比例缩放，不是拉伸
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        this.setIcon(tu[0][0]);

    }

    public void changeIcon(int fangxiang, int place) {
        this.setIcon(tu[fangxiang][place]);
    }
}
