package com.dqv5.sokoban.utils;

import com.alibaba.fastjson.JSONObject;
import com.dqv5.sokoban.common.BlockType;
import com.dqv5.sokoban.pojo.BlockEntity;
import lombok.extern.slf4j.Slf4j;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @author duqian
 * @date 2023/8/14
 */
@Slf4j
public class SolveUtils {
    private final int TREE = 1;
    private final int EMPTY = 0;

    private final int BOUND_X = 15;
    private final int BOUND_Y = 10;

    private final int MOVE_MAN = 1;
    private final int MOVE_BOX = 2;

    private final int LEFT = 0;
    private final int RIGHT = 1;
    private final int UP = 2;
    private final int DOWN = 3;


    Integer[] map;
    List<Integer> spots;
    List<Integer> results;
    int count = 4;
    Map<Object, Object> recordSet = new HashMap<>();

    public SolveUtils(List<BlockEntity> data) {

        map = new Integer[(BOUND_X + 1) * (BOUND_Y + 1)];
        data.stream().filter(t -> t.getType() == BlockType.WALL)
                .forEach(t -> {
                    map[(t.getRow() + 1) * BOUND_X + (t.getCol() + 1)] = TREE;
                });

        LinkedHashSet allBuckets = data.stream()
                .filter(b -> b.getType() == BlockType.BOX || b.getType() == BlockType.BOX_ON_GOAL)
                .map(b -> (b.getRow() + 1) * BOUND_X + (b.getCol() + 1)).collect(Collectors.toCollection(() -> new LinkedHashSet()));

        spots = data.stream().filter(b -> b.getType() == BlockType.GOAL || b.getType() == BlockType.BOX_ON_GOAL || b.getType() == BlockType.MAN_ON_GOAL)
                .map(s -> (s.getRow() + 1) * BOUND_X + (s.getCol() + 1))
                .collect(Collectors.toList());

        results = new ArrayList<>();

        BlockEntity man = data.stream().filter(item -> item.getType() == BlockType.MAN || item.getType() == BlockType.MAN_ON_GOAL)
                .findFirst().orElseThrow(() -> new RuntimeException("??"));
        int x = man.getCol() + 1;
        int y = man.getRow() + 1;


        // 以两位Uint32来表示所有的8个buckets，以一位Uint32来表示x,y,direction，以一位Uint32来表示preIndex
        int[] list = new int[256 * 1024 * 1024];
        int[] packed = pack(allBuckets, x, y, 0, -1);
        list[0] = packed[0];
        list[1] = packed[1];
        list[2] = packed[2];
        list[3] = packed[3];

        setRecord(list[0], list[1], getPos(x, y));

        boolean success = false;
        for (int i = 0; i < list.length; i += 4) {
            if (list[i] == 0) {
                break;
            }
            JSONObject jsonObject = unpack(list[i], list[i + 1], list[i + 2], list[i + 3]);
            Set<Integer> buckets = (Set<Integer>) jsonObject.get("buckets");
            int x0 = jsonObject.getInteger("x");
            int y0 = jsonObject.getInteger("y");
            if (bfs(list, buckets, i, x0, y0, LEFT)
                    || bfs(list, buckets, i, x0, y0, RIGHT)
                    || bfs(list, buckets, i, x0, y0, UP)
                    || bfs(list, buckets, i, x0, y0, DOWN)) {
                success = true;
                break;
            }
        }

        if (success) {
            String[] m = new String[]{"left", "right", "up", "down"};
            List<String> collect = results.stream().map(r -> m[r]).collect(Collectors.toList());
            log.info("解题成功：{}", collect);
        } else {
            log.warn("解题失败...");
        }
    }

    private boolean isEmpty(Set<Integer> buckets, int idx) {
        return Objects.equals(map[idx], EMPTY) && !buckets.contains(idx);
    }

    private boolean isBucketInSpot(int idx) {
        return spots.stream().anyMatch(spot -> spot == idx);
    }


    private boolean deadBucket(Set<Integer> buckets, Integer bucket) {
        Set<Integer> fixed = new HashSet<>();

        boolean movable = canMove(buckets, fixed, bucket);
        if (movable) return false;
        if (isBucketInSpot(bucket)) {
            return fixed.stream().anyMatch(b -> !isBucketInSpot(b));
        }
        return true;
    }

    private boolean isImmovable(Set<Integer> buckets, Set<Integer> fixed, int idx) {
        return map[idx] == TREE || map[idx] == null
                || buckets.contains(idx) && !canMove(buckets, fixed, idx);
    }


    private boolean canMove(Set<Integer> buckets, Set<Integer> fixed, int idx) {
        if (fixed.contains(idx)) {
            return false;
        }
        fixed.add(idx);

        boolean left = idx % BOUND_X > 0 && isImmovable(buckets, fixed, idx - 1),
                right = idx % BOUND_X < BOUND_X - 1 && isImmovable(buckets, fixed, idx + 1),
                top = isImmovable(buckets, fixed, idx - BOUND_X),
                down = isImmovable(buckets, fixed, idx + BOUND_X);

        if ((left && top)
                || (top && right)
                || (right && down)
                || (down && left)) {
            return false;
        }
        fixed.remove(idx);
        return true;
    }

    private Integer testMove(Set<Integer> buckets, Integer nextnext, Integer next) {
        buckets.remove(next);
        buckets.add(nextnext);
        if (deadBucket(buckets, nextnext)) {
            buckets.remove(nextnext);
            buckets.add(next);
            return 0;
        }
        return MOVE_BOX;
    }


    private int[] makeDirectionXY(int direction, int x, int y, int delta) {
        if (direction == 0) {
            return new int[]{x - delta, y};
        }
        if (direction == 1) {
            return new int[]{x + delta, y};
        }
        if (direction == 2) {
            return new int[]{x, y - delta};
        }
        if (direction == 3) {
            return new int[]{x, y + delta};
        }
        return null;
    }

    private Integer getPos(int x, int y) {
        if (x < 0 || x >= BOUND_X) return null;
        if (y < 0 || y >= BOUND_Y) return null;
        return y * BOUND_X + x;
    }


    private int makeMove(Set<Integer> buckets, int x, int y, int direction) {
        int[] pos = makeDirectionXY(direction, x, y, 1);
        int next = getPos(pos[0], pos[1]);
        if (next > 0 && isEmpty(buckets, next)) {
            return MOVE_MAN;
        }
        if (next > 0 && buckets.contains(next)) {
            pos = makeDirectionXY(direction, x, y, 2);
            int nextnext = getPos(pos[0], pos[1]);
            if (nextnext > 0 && isEmpty(buckets, nextnext)) {
                return testMove(buckets, nextnext, next);
            }
        }
        return 0;
    }

    private boolean checkSpots(Set<Integer> buckets) {
        return buckets.containsAll(spots);
    }

    private int[] getRecord(int b1, int b2) {
        Object b1Value = recordSet.get(b1);
        if (b1Value == null) return null;
        return ((Map<Integer, int[]>) b1Value).get(b2);
    }

    private void setRecord(int b1, int b2, int pos) {
        int[] poss = getRecord(b1, b2);
        if (poss == null) {
            poss = new int[]{0, 0, 0, 0};
        }
        setPos(poss, pos);
        if (recordSet.get(b1) == null) {
            recordSet.put(b1, new HashMap<>());
        }
        ((Map<Integer, int[]>) recordSet.get(b1)).put(b2, poss);
    }


    private boolean hasPos(int[] poss, int pos) {
        int idx = 0;
        while (pos >= 30) {
            pos -= 30;
            idx++;
        }
        return (poss[idx] & (1 << pos)) == 1;
    }

    private void setPos(int[] poss, int pos) {
        int idx = 0;
        while (pos >= 30) {
            pos -= 30;
            idx++;
        }
        poss[idx] |= (1 << pos);
    }


    private int[] pack(Set<Integer> buckets, int x, int y, int step, int pre) {
        int[] arr = new int[4];
        List<Integer> sortedBuckets = buckets.stream().sorted().collect(Collectors.toList());
        for (int i = 0; i < 8; i++) {
            Integer bucket;
            if (i >= sortedBuckets.size()) {
                bucket = 0xff;
            } else {
                bucket = sortedBuckets.get(i);
            }
            if (bucket == null) bucket = 0xff;
            if (i < 4) {
                arr[0] |= bucket << (8 * i);
            } else {
                arr[1] |= bucket << (8 * (i - 4));
            }
        }
        arr[2] |= x;
        arr[2] |= y << 8;
        if (pre != 0xffffffff) {
            arr[2] |= step << 16;
        }
        arr[3] = pre;
        log.debug("pack,x:{},y:{},step:{},pre:{},arr:{}", x, y, step, pre, arr);
        return arr;
    }

    private JSONObject unpack(int a, int b, int c, int d) {
        int[] buckets = new int[]{
                a & 0xff,
                (a >>> 8) & 0xff,
                (a >>> 16) & 0xff,
                (a >>> 24) & 0xff,
                b & 0xff,
                (b >>> 8) & 0xff,
                (b >>> 16) & 0xff,
                (b >>> 24) & 0xff,
        };
        Set<Integer> collect = Arrays.stream(buckets)
                .filter(bb -> bb != 0xff)
                .boxed()
                .collect(Collectors.toSet());

        int x = c & 0xff;
        int y = (c >> 8) & 0xff;
        int step = -1;
        if (d != 0xffffffff) {
            step = (c >> 16) & 0xff;
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("buckets", collect);
        jsonObject.put("x", x);
        jsonObject.put("y", y);
        jsonObject.put("step", step);
        jsonObject.put("pre", d);
        return jsonObject;
    }

    private Integer[] getSteps(int[] list, int idx) {
        JSONObject data = unpack(list[idx], list[idx + 1], list[idx + 2], list[idx + 3]);
        if (data.getInteger("step") >= 0) {
            Integer[] pres = getSteps(list, data.getInteger("pre"));
            List<Integer> list1 = Arrays.asList(pres);
            list1.add(data.getInteger("step"));
            return list1.toArray(new Integer[0]);
        }
        return new Integer[0];
    }

    private boolean bfs(int[] list, Set<Integer> buckets, int i, int x, int y, int direction) {
        Set<Integer> mvb = new HashSet<>(buckets);
        int check = makeMove(mvb, x, y, direction);
        log.debug("check:{}", check);
        if (check > 0) {
            int[] pos = makeDirectionXY(direction, x, y, 1);
            if (check == MOVE_BOX && checkSpots(mvb)) {
                Integer[] st = getSteps(list, i);
                results = Arrays.asList(st);
                results.add(direction);
                return true;
            }
            int[] packed = pack(mvb, pos[0], pos[1], direction, i);
            int[] poss = getRecord(packed[0], packed[1]);
            if (poss != null) {
                list[count] = packed[0];
                list[count + 1] = packed[1];
                list[count + 2] = packed[2];
                list[count + 3] = packed[3];
                count += 4;
                setRecord(packed[0], packed[1], getPos(pos[0], pos[1]));
            } else {
                int idx = getPos(pos[0], pos[1]);
                if (!hasPos(poss, idx)) {
                    list[count] = packed[0];
                    list[count + 1] = packed[1];
                    list[count + 2] = packed[2];
                    list[count + 3] = packed[3];
                    count += 4;
                    setPos(poss, idx);
                }
            }
        }
        return false;
    }


    public static void main(String[] args) {
        String xsb = "-#####\n-#--@#\n##$$##\n#---.#\n#-.--#\n###--#\n--####";
        new SolveUtils(xsbToBlocks(xsb));
    }

    public static List<BlockEntity> xsbToBlocks(String xsbText) {
        List<BlockEntity> blocks = new ArrayList<>();
        String[] rows = xsbText.split("\n");
        for (int i = 0; i < rows.length; i++) {
            String row = rows[i];
            String[] chars = row.split("");
            for (int j = 0; j < chars.length; j++) {
                BlockType blockType = BlockType.fromText(chars[j]);
                blocks.add(new BlockEntity(blockType, j, i));
            }
        }
        return blocks;
    }
}

