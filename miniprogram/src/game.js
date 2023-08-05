import {BLOCK_WIDTH} from "./config";
import {Block, BlockType} from "./model";
import {canvas, context, imgBorgar} from "./global";

const BACKGROUND_COLOR = '#EAEDF4';
const MARGIN_TOP = 100;
export default class BoxGame {

    constructor({}) {
        this.xsbText = '----#####----------\n' +
            '----#---#----------\n' +
            '----#$--#----------\n' +
            '--###--$##---------\n' +
            '--#--$-$-#---------\n' +
            '###-#-##-#---######\n' +
            '#---#-##-#####--..#\n' +
            '#-$--$----------..#\n' +
            '#####-###-#@##--..#\n' +
            '----#-----#########\n' +
            '----#######--------';
        this.blocks = [];
        this.img = imgBorgar;
        this.init();

    }

    init() {
        console.log('123')
        this.drawBackground();
        this.parseBlocks(this.xsbText)
        this.draw();
    }

    drawBackground() {
        context.fillStyle = BACKGROUND_COLOR;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    parseBlocks(xsbText) {
        this.blocks = [];
        const rows = xsbText.split('\n');
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const chars = row.split('');
            for (let j = 0; j < chars.length; j++) {
                const blockType = BlockType.parse(chars[j]);
                this.blocks.push(new Block(blockType, j, i));
            }
        }
    }

    draw() {
        this.img.onload = () => {
            for (let i = 0; i < this.blocks.length; i++) {
                const block = this.blocks[i];
                const blockType = block.type;
                const x = block.x * BLOCK_WIDTH;
                const y = MARGIN_TOP + block.y * BLOCK_WIDTH;
                context.drawImage(this.img, blockType.sourceX, blockType.sourceY, blockType.sourceWidth, blockType.sourceHeight, x, y, BLOCK_WIDTH, BLOCK_WIDTH)
            }
        }
    }

    moveUp() {

    }

}
