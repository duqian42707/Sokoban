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
        Arrays.fill(map, 0);
        data.stream().filter(t -> t.getType() == BlockType.WALL)
                .forEach(t -> {
                    map[(t.getRow() + 1) * BOUND_X + (t.getCol() + 1)] = TREE;
                });

        LinkedHashSet<Long> allBuckets = data.stream()
                .filter(b -> b.getType() == BlockType.BOX || b.getType() == BlockType.BOX_ON_GOAL)
                .map(b -> new Long((b.getRow() + 1) * BOUND_X + (b.getCol() + 1)))
                .collect(Collectors.toCollection(() -> new LinkedHashSet()));

        spots = data.stream().filter(b -> b.getType() == BlockType.GOAL || b.getType() == BlockType.BOX_ON_GOAL || b.getType() == BlockType.MAN_ON_GOAL)
                .map(s -> (s.getRow() + 1) * BOUND_X + (s.getCol() + 1))
                .collect(Collectors.toList());

        results = new ArrayList<>();

        BlockEntity man = data.stream().filter(item -> item.getType() == BlockType.MAN || item.getType() == BlockType.MAN_ON_GOAL)
                .findFirst().orElseThrow(() -> new RuntimeException("??"));
        int x = man.getCol() + 1;
        int y = man.getRow() + 1;


        // 以两位Uint32来表示所有的8个buckets，以一位Uint32来表示x,y,direction，以一位Uint32来表示preIndex
        long[] list = new long[256 * 1024 * 1024];
        long[] packed = pack(allBuckets, x, y, 0, -1);
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
            log.trace("unpack1:{}", list[i]);
            JSONObject jsonObject = unpack(list[i], list[i + 1], list[i + 2], list[i + 3]);
            log.trace("unpack:{}", jsonObject);
            Set<Long> buckets = (Set<Long>) jsonObject.get("buckets");
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

    private boolean isEmpty(Set<Long> buckets, long idx) {
        return Objects.equals(map[(int) idx], EMPTY) && !buckets.contains(idx);
    }

    private boolean isBucketInSpot(long idx) {
        return spots.stream().anyMatch(spot -> spot == idx);
    }


    private boolean deadBucket(Set<Long> buckets, Long bucket) {
        Set<Long> fixed = new HashSet<>();

        boolean movable = canMove(buckets, fixed, bucket);
        if (movable) return false;
        if (isBucketInSpot(bucket)) {
            return fixed.stream().anyMatch(b -> !isBucketInSpot(b));
        }
        return true;
    }

    private boolean isImmovable(Set<Long> buckets, Set<Long> fixed, long idx) {
        return map[(int) idx] == TREE || map[(int) idx] == null
                || buckets.contains(idx) && !canMove(buckets, fixed, idx);
    }


    private boolean canMove(Set<Long> buckets, Set<Long> fixed, long idx) {
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

    private Integer testMove(Set<Long> buckets, Long nextnext, Long next) {
        buckets.remove(next);
        buckets.add(nextnext);
        if (deadBucket(buckets, nextnext)) {
            buckets.remove(nextnext);
            buckets.add(next);
            return 0;
        }
        return MOVE_BOX;
    }


    private long[] makeDirectionXY(int direction, int x, int y, int delta) {
        if (direction == 0) {
            return new long[]{x - delta, y};
        }
        if (direction == 1) {
            return new long[]{x + delta, y};
        }
        if (direction == 2) {
            return new long[]{x, y - delta};
        }
        if (direction == 3) {
            return new long[]{x, y + delta};
        }
        return null;
    }

    private Long getPos(long x, long y) {
        if (x < 0 || x >= BOUND_X) return null;
        if (y < 0 || y >= BOUND_Y) return null;
        return y * BOUND_X + x;
    }


    private int makeMove(Set<Long> buckets, int x, int y, int direction) {
        long[] pos = makeDirectionXY(direction, x, y, 1);
        long next = getPos(pos[0], pos[1]);
        if (next > 0 && isEmpty(buckets, next)) {
            return MOVE_MAN;
        }
        if (next > 0 && buckets.contains(next)) {
            pos = makeDirectionXY(direction, x, y, 2);
            long nextnext = getPos(pos[0], pos[1]);
            if (nextnext > 0 && isEmpty(buckets, nextnext)) {
                return testMove(buckets, nextnext, next);
            }
        }
        return 0;
    }

    private boolean checkSpots(Set<Long> buckets) {
        return spots.stream().allMatch(x -> buckets.contains(new Long(x)));
    }

    private long[] getRecord(long b1, long b2) {
        Object b1Value = recordSet.get(b1);
        if (b1Value == null) {
            return null;
        }
        long[] values = ((Map<Long, long[]>) b1Value).get(b2);
        if (values == null) {
            log.error("null");
        }
        return values;
    }

    private void setRecord(long b1, long b2, long pos) {
        long[] poss = getRecord(b1, b2);
        if (poss == null) {
            poss = new long[]{0, 0, 0, 0};
        }
        setPos(poss, pos);
        if (recordSet.get(b1) == null) {
            recordSet.put(b1, new HashMap<>());
        }
        ((Map<Long, long[]>) recordSet.get(b1)).put(b2, poss);
    }


    private boolean hasPos(long[] poss, long pos) {
        int idx = 0;
        while (pos >= 30) {
            pos -= 30;
            idx++;
        }
        return (poss[idx] & (1L << pos)) != 0;
    }

    private void setPos(long[] poss, long pos) {
        int idx = 0;
        while (pos >= 30) {
            pos -= 30;
            idx++;
        }
        poss[idx] |= (1L << pos);
    }


    private long[] pack(Set<Long> buckets, long x, long y, int step, int pre) {
        long[] arr = new long[4];
        List<Long> sortedBuckets = buckets.stream().sorted().collect(Collectors.toList());
        for (int i = 0; i < 8; i++) {
            Long bucket;
            if (i >= sortedBuckets.size()) {
                bucket = 0xffL;
            } else {
                bucket = sortedBuckets.get(i);
            }
            if (bucket == null) bucket = 0xffL;
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
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] < 0) {
                arr[i] = 4294967296L + arr[i];
            }
        }
//        log.info("pack:{},{},{},{},{},{}", buckets, x, y, step, pre, arr);
        return arr;
    }

    private JSONObject unpack(long a, long b, long c, long d) {
        long[] buckets = new long[]{
                a & 0xff,
                (a >>> 8) & 0xff,
                (a >>> 16) & 0xff,
                (a >>> 24) & 0xff,
                b & 0xff,
                (b >>> 8) & 0xff,
                (b >>> 16) & 0xff,
                (b >>> 24) & 0xff,
        };
        Set<Long> collect = Arrays.stream(buckets)
                .filter(bb -> bb != 0xff)
                .boxed()
                .collect(Collectors.toSet());

        long x = c & 0xff;
        long y = (c >> 8) & 0xff;
        long step = -1;
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

    private Integer[] getSteps(long[] list, int idx) {
        if (idx < 0) {
            return new Integer[0];
        }
        JSONObject data = unpack(list[idx], list[idx + 1], list[idx + 2], list[idx + 3]);
        log.trace("getSteps:{}", data);
        if (data.getLong("step") >= 0) {
            // intValue
            Integer[] pres = getSteps(list, data.getLong("pre").intValue());
            List<Integer> list1 = new ArrayList<>(Arrays.asList(pres));
            list1.add(data.getInteger("step"));
            return list1.toArray(new Integer[0]);
        }
        return new Integer[0];
    }

    private boolean bfs(long[] list, Set<Long> buckets, int i, int x, int y, int direction) {
        Set<Long> mvb = new HashSet<>(buckets);
        int check = makeMove(mvb, x, y, direction);
        if (check > 0) {
            long[] pos = makeDirectionXY(direction, x, y, 1);
            if (check == MOVE_BOX && checkSpots(mvb)) {
                Integer[] st = getSteps(list, i);
                results = new ArrayList<>(Arrays.asList(st));
                results.add(direction);
                return true;
            }
            log.trace("pack1:{},{},{},{},{}", mvb, pos[0], pos[1], direction, i);
            long[] packed = pack(mvb, pos[0], pos[1], direction, i);
            log.trace("packed:{}", packed);
            long[] poss = getRecord(packed[0], packed[1]);
            if (poss == null) {
                list[count] = packed[0];
                list[count + 1] = packed[1];
                list[count + 2] = packed[2];
                list[count + 3] = packed[3];
                count += 4;
                setRecord(packed[0], packed[1], getPos(pos[0], pos[1]));
            } else {
                long idx = getPos(pos[0], pos[1]);
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
//        String xsb = "-#####\n-#--@#\n##$$##\n#---.#\n#-.--#\n###--#\n--####";
        String xsb = "---####----\n####--#----\n#-----####-\n#-$-#--.-##\n#--#---.--#\n##-#$$#.--#\n##----#####\n#-@-###----\n#---#------\n#####------";
        long start = System.currentTimeMillis();
        new SolveUtils(xsbToBlocks(xsb));
        long end = System.currentTimeMillis();
        log.info("耗时：{}毫秒", end - start);

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

