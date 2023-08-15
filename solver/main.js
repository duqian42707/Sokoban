const {solve} = require('./solve');
const {DATA_LIST} = require('./data');


const processTask = (dataList, proFn, callback) => {
    const dataItem = dataList.shift();
    if (dataItem) {
        const task = proFn(dataItem);
        task.then((res) => {
            if (callback) {
                callback(res);
            }
            if (dataList.length > 0) {
                processTask(dataList, proFn, callback);
            }
        });
    }
};

// proFn返回一个封装了异步任务的promise
function promiseAll(arr = [], proFn, limit) {
    // 当前正在遍历的坐标
    let index = 0;
    // 存放结果的数组
    let res = [];
    // 正在执行的数组
    let excuting = [];


    // 执行函数
    function enqueue() {
        // 当执行完毕之后返回resolve状态的promise
        if (index === arr.length) {
            return Promise.resolve();
        }

        // 依次取出一个元素
        const item = arr[index++];

        /* 此处then方法会立即返回一个promise,在then回调运行结束
        （promise生成完毕）之后才会变成resolved状态，且当时的promise与
        proFn生成的promise保持一致(1、状态一致；2、resolve或者reject的值一致)*/
        const p = Promise.resolve().then(() => proFn(item, arr));
        // 将其放到promise数组
        res.push(p);

        // 将e放入正在执行的数组，并且在p执行完成之后将当前执行的e删除掉
        const e = p.then(() => {
            excuting.splice(excuting.indexOf(e), 1);
        });
        excuting.push(e);

        // 让r为一个默认resolved状态的promise
        let r = Promise.resolve();
        // 如果执行数组满了的话，那就让r通过race等待改变状态
        if (excuting.length >= limit) {
            r = Promise.race(excuting);
        }
        // 等到r变为resolved状态（执行数组没满或者有一个已经执行完被删除了）再来递归调用enqueue
        return r.then(() => enqueue());
    }

    // 执行完成后，通过promise.all返回所有的结果
    return enqueue().then(() => Promise.all(res));
}

async function main() {
    console.log('111')
    const tasks = DATA_LIST.filter(x => x.level <= 10).map(x => x.xsb);
    console.log('2222')
    for (let i = 0; i < 3; i++) {
        console.log('333--' + i);
        processTask(tasks, solve, (res) => {
            console.log('finish', res.length);
        });
    }


    // for (let i = 0; i < xsbs.length; i++) {
    //     const xsb = xsbs[i];
    //     const t1 = new Date().getTime();
    //     console.log('start...' + i)
    //     await solve(xsb).then(res => {
    //         const t2 = new Date().getTime();
    //         console.log('end.....' + i + '，耗时：' + (t2 - t1) + '，解答步数：' + res.length);
    //     })
    // }
}


function main3() {
    console.log('start8')
    solve(DATA_LIST[8].xsb).then(res => {
        console.log(8, res.length);
    })
    console.log('start9')
    solve(DATA_LIST[9].xsb).then(res => {
        console.log(9, res.length);
    })
    console.log('start10')
    solve(DATA_LIST[10].xsb).then(res => {
        console.log(10, res.length);
    })
}

sleep = (time) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time)
    })
}

function main34() {
    const data = [2000, 3000, 1000, 1500, 4000, 2500, 3500];
    console.log('star1')
    const t1 = new Date();
    const a = promiseAll(data, sleep, 3)
    a.then(res => {
        console.log(res)
    })
    const t2 = new Date();

}

main();
