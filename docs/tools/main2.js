/**
 * http://sokoban.cn/utility/levelset.php?set=editor15
 */
(() => {
    function srcToXsb(src) {
        if (src.endsWith("p_player.gif")) {
            return "@";
        }
        if (src.endsWith("p_wall.gif")) {
            return "#";
        }
        if (src.endsWith("p_floor.gif")) {
            return "-";
        }
        if (src.endsWith("p_box.gif")) {
            return "$";
        }
        if (src.endsWith("p_box_on_goal.gif")) {
            return "*";
        }
        if (src.endsWith("p_player_on_goal.gif")) {
            return "+";
        }
        if (src.endsWith("p_goal.gif")) {
            return ".";
        }
        return src;
    }


    const pTags = document.getElementsByTagName('p');
    const stageList = {};
    let data = [];
    for (let i = 0; i < pTags.length; i++) {
        const pTag = pTags[i];
        if (pTag.children && pTag.children.length > 0) {
            const children = pTag.children
            for (let j = 0; j < children.length; j++) {
                var child = children[j];
                if (child.tagName.indexOf('IMG') != -1) {
                    data.push(srcToXsb(child.src));
                } else if (child.tagName.indexOf('BR') != -1) {
                    data.push('\n')
                }
            }
        } else if (pTag.innerText.startsWith("关数: ")) {
            data = [];
            stageList[pTag.innerText.substring(4)] = data
        }
    }

    const result = [];
    for (var p in stageList) {
        const stage = {
            level: Number(p),
            xsb: stageList[p].join('')
        }
        result.push(stage);
    }
    console.log(JSON.stringify(result))
})()
