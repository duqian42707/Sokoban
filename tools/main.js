const axios = require('axios')
const urlPrefix = 'https://webdocs.cs.ualberta.ca/~games/Sokoban/Mazes/Screens/screen.';


async function getLevelData(level) {
    const url = urlPrefix + level;
    const res = await axios.get(url)
    let str = res.data;
    str = str.replaceAll(/\r\n/g, '\n');
    str = str.replaceAll(/ /g, '-');
    const rows = str.split('\n');
    let maxCol = 0;
    for (let i = 0; i < rows.length; i++) {
        maxCol = Math.max(maxCol, rows[i].length - 1)
    }

    for (let i = 0; i < rows.length; i++) {
        for (let j = rows[i].length - 1; j < maxCol; j++) {
            rows[i] = rows[i] + '-';
        }
    }
    return rows.join('\n');
}

async function main() {
    const data = [];
    for (let i = 0; i < 90; i++) {
        const str = await getLevelData(i + 1);
        data.push(str);
    }
    console.log(JSON.stringify(data))
}


main()
