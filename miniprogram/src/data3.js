import {Stage} from "./base/Stage";
import {countNum} from "./data2";

const dataList = [{
    "level": 1,
    "xsb": "-#####\n-#--@#\n##$$##\n#---.#\n#-.--#\n###--#\n--####",
    "solve": ["left", "down", "up", "left", "down", "down", "right"]
}, {
    "level": 2,
    "xsb": "#####\n#---#\n#---#\n#---#\n##$##\n#-@-#\n#-.-#\n#####",
    "solve": ["up", "up", "left", "up", "up", "right", "down", "down", "down", "down"]
}, {
    "level": 3,
    "xsb": "#####\n#.-.#\n#$$-#\n#-@-#\n#-$$#\n#.-.#\n#####",
    "solve": ["left", "up", "right", "down", "right", "up", "down", "down", "left", "up", "left", "down"]
}, {
    "level": 4,
    "xsb": "#####\n#-$.#\n#.$-#\n#-$.#\n#--@#\n#####",
    "solve": ["left", "left", "up", "up", "up", "right", "left", "down", "down", "down", "right", "right", "up", "up", "left", "right", "down", "down", "left", "left", "up", "right"]
}, {
    "level": 5,
    "xsb": "#####\n#-$.#\n#-$-#\n#.$-#\n#.-@#\n#####",
    "solve": ["left", "left", "up", "up", "up", "right", "left", "down", "down", "down", "right", "right", "up", "up", "left", "up", "left", "down", "right", "down", "right", "down", "left"]
}, {
    "level": 6,
    "xsb": "#######\n#-----#\n#-***-#\n#-*+*-#\n#-$.*-#\n#-$---#\n##--###\n-####--",
    "solve": ["down", "down", "right", "right", "up", "up", "up", "up", "left", "left", "left", "left", "down", "down", "right", "left", "down", "down", "right", "up", "down", "down", "right", "up"]
}, {
    "level": 7,
    "xsb": "--####-\n###--##\n#-----#\n#-.*$-#\n#-*@*-#\n#-$*.-#\n#-----#\n#######",
    "solve": ["up", "left", "left", "down", "right", "left", "down", "down", "right", "up", "right", "down", "right", "right", "up", "up", "up", "left", "left", "down", "up", "right", "up", "up", "left", "down"]
}, {
    "level": 8,
    "xsb": "######\n#...-#\n#-#$-#\n#-$--#\n#-$-##\n#@-##-\n####--",
    "solve": ["up", "up", "up", "up", "right", "right", "right", "down", "down", "left", "up", "right", "up", "left", "down", "down", "down", "left", "down", "left", "up", "up", "up", "down", "right", "down", "right", "up", "up"]
}, {
    "level": 9,
    "xsb": "######\n#----#\n#-$-.#\n#-.$-#\n#.$###\n##@#--\n-###--",
    "solve": ["up", "left", "up", "up", "right", "left", "down", "down", "right", "up", "left", "up", "up", "right", "right", "right", "down", "down", "left", "left", "right", "right", "up", "up", "left", "left", "down", "right", "left", "left", "down"]
}, {
    "level": 10,
    "xsb": "--####-\n###--##\n#-----#\n#-.*$-#\n#-*@*-#\n#-$*.-#\n#----##\n######-",
    "solve": ["up", "left", "left", "down", "down", "down", "right", "right", "right", "up", "right", "up", "up", "left", "left", "right", "down", "up", "up", "up", "left", "down", "left", "left", "down", "down", "right", "right", "left", "left", "down", "down", "right", "up"]
}, {
    "level": 11,
    "xsb": "#######\n#.--@-#\n#-#.#-#\n#---$-#\n#.$$-##\n#--###-\n####---",
    "solve": ["left", "left", "left", "down", "down", "down", "down", "right", "up", "left", "up", "up", "up", "right", "right", "down", "down", "left", "down", "left", "up", "up", "down", "right", "right", "up", "up", "right", "right", "down", "down", "left", "down", "left", "left", "right", "up"]
}, {
    "level": 12,
    "xsb": "###-###\n#.###.#\n#-#--.#\n#-$$-@#\n#--$--#\n#--#--#\n#--####\n####---",
    "solve": ["left", "down", "left", "right", "up", "up", "left", "down", "left", "down", "left", "down", "down", "right", "up", "up", "left", "up", "up", "down", "right", "right", "left", "down", "right", "right", "up", "down", "down", "right", "up", "up", "up", "down", "left", "left", "up", "right"]
}, {
    "level": 13,
    "xsb": "#######\n#-----#\n#-.*.-#\n#-*-*-#\n#-$#--#\n#-$@--#\n##--###\n-####--",
    "solve": ["right", "up", "up", "right", "up", "up", "left", "left", "left", "left", "down", "down", "right", "left", "down", "down", "right", "up", "up", "right", "left", "left", "up", "up", "right", "right", "right", "right", "down", "down", "down", "left", "down", "left", "down", "left", "up", "up"]
}, {
    "level": 14,
    "xsb": "-####-\n-#--#-\n##.-#-\n#-.$##\n#--$-#\n##$--#\n-#.@-#\n-#####",
    "solve": ["right", "up", "up", "left", "up", "left", "left", "down", "right", "down", "right", "right", "up", "left", "up", "left", "up", "up", "right", "down", "down", "down", "right", "down", "down", "left", "up", "left", "up", "up", "down", "down", "right", "right", "up", "left", "down", "left", "up"]
}, {
    "level": 15,
    "xsb": "######\n#--@-#\n#-$--#\n##-#$#\n#-$$-#\n#--$.#\n#....#\n######",
    "solve": ["left", "left", "down", "right", "down", "down", "down", "up", "up", "up", "up", "right", "right", "down", "down", "down", "down", "up", "up", "up", "left", "up", "left", "down", "down", "down", "right", "left", "up", "up", "right", "right", "down", "down", "left", "down", "left", "up", "left", "down"]
}, {
    "level": 16,
    "xsb": "#######\n#@-*--#\n#-*$*-#\n#--*--#\n#-**--#\n#--*--#\n#--.-##\n######-",
    "solve": ["down", "down", "right", "right", "left", "down", "right", "down", "right", "right", "up", "up", "up", "up", "left", "left", "down", "down", "left", "left", "up", "up", "right", "left", "down", "down", "down", "down", "down", "right", "up", "right", "right", "right", "up", "up", "left", "down", "right", "down", "left"]
}, {
    "level": 17,
    "xsb": "-####---\n-#@-#---\n-#--#---\n##.-####\n#-$$.-.#\n#--$-###\n###--#--\n--####--",
    "solve": ["down", "down", "down", "right", "right", "right", "left", "down", "down", "left", "up", "up", "left", "left", "down", "right", "up", "right", "right", "down", "down", "left", "up", "right", "up", "left", "up", "left", "up", "up", "right", "down", "down", "down", "right", "down", "down", "left", "up", "left", "up", "right"]
}, {
    "level": 18,
    "xsb": "-####-\n##--##\n#----#\n#-$--#\n#$$--#\n#@####\n#.#---\n#.#---\n#.#---\n###---",
    "solve": ["up", "right", "up", "right", "up", "up", "left", "down", "left", "down", "down", "down", "down", "down", "up", "up", "up", "up", "up", "right", "right", "down", "left", "up", "left", "down", "down", "down", "down", "up", "up", "right", "up", "right", "right", "down", "left", "left", "up", "left", "down", "down"]
}, {
    "level": 19,
    "xsb": "-######\n##--.-#\n#-$-#-#\n#-.$--#\n#--#$##\n#.-@-#-\n######-",
    "solve": ["left", "left", "up", "up", "up", "right", "up", "right", "right", "right", "down", "down", "left", "left", "left", "up", "left", "down", "down", "right", "down", "right", "right", "up", "down", "left", "left", "up", "up", "up", "up", "right", "right", "right", "down", "down", "left", "left", "up", "left", "up", "right"]
}, {
    "level": 20,
    "xsb": "-#######\n##---.-#\n#-$--$@#\n#.$.####\n#--##---\n#--#----\n#--#----\n####----",
    "solve": ["left", "up", "left", "left", "down", "down", "left", "right", "up", "up", "right", "right", "down", "left", "up", "left", "left", "down", "left", "down", "down", "right", "up", "right", "up", "down", "left", "left", "up", "right", "up", "right", "right", "left", "down", "left", "down", "down", "down", "down", "left", "up", "up"]
}, {
    "level": 21,
    "xsb": "-#####\n##---#\n#----#\n#--#.#\n##-$-#\n-#-$*#\n-##@.#\n--####",
    "solve": ["right", "up", "up", "left", "right", "down", "down", "left", "up", "left", "up", "up", "left", "up", "right", "up", "right", "right", "down", "down", "down", "down", "left", "left", "up", "right", "left", "up", "up", "up", "right", "right", "down", "down", "down", "left", "left", "up", "up", "right", "up", "right", "down"]
}, {
    "level": 22,
    "xsb": "--####-\n###--##\n#-----#\n#-.**-#\n#-$@$-#\n#-**.-#\n#-----#\n#######",
    "solve": ["up", "left", "left", "down", "right", "left", "down", "down", "right", "up", "up", "down", "down", "right", "right", "up", "left", "right", "right", "up", "up", "up", "left", "left", "down", "down", "up", "up", "right", "right", "down", "left", "down", "left", "left", "left", "up", "up", "right", "right", "up", "right", "down"]
}, {
    "level": 23,
    "xsb": "--####-\n###--##\n#-----#\n#-.**-#\n#-$@$-#\n#-**.-#\n#----##\n######-",
    "solve": ["up", "left", "left", "down", "right", "left", "down", "down", "right", "up", "up", "down", "down", "right", "right", "up", "left", "right", "right", "up", "up", "up", "left", "left", "down", "down", "up", "up", "right", "right", "down", "left", "down", "left", "left", "left", "up", "up", "right", "right", "up", "right", "down"]
}, {
    "level": 24,
    "xsb": "--####--\n--#--#--\n--#--###\n###-..-#\n#--$#--#\n#--.$$-#\n####-@-#\n---#####",
    "solve": ["up", "up", "down", "left", "left", "up", "left", "left", "down", "right", "right", "right", "down", "right", "up", "left", "left", "up", "up", "right", "up", "up", "left", "down", "down", "down", "left", "down", "right", "right", "down", "right", "right", "up", "up", "up", "left", "right", "down", "down", "left", "left", "right", "up"]
}, {
    "level": 25,
    "xsb": "---####\n####-@#\n#--*$-#\n#-----#\n##-.###\n-#$-#--\n-#-.#--\n-####--",
    "solve": ["left", "down", "left", "down", "down", "down", "down", "left", "up", "right", "up", "up", "up", "right", "right", "down", "left", "up", "left", "down", "left", "left", "up", "right", "right", "down", "down", "down", "left", "up", "right", "up", "up", "left", "left", "down", "right", "up", "right", "down", "right", "right", "up", "left"]
}, {
    "level": 26,
    "xsb": "####---\n#.@##--\n#.--#--\n#.$-#--\n#.$$###\n##$---#\n-#--#-#\n-#----#\n-######",
    "solve": ["down", "right", "down", "down", "left", "up", "right", "up", "left", "down", "left", "up", "right", "down", "down", "down", "right", "down", "down", "left", "up", "up", "up", "right", "up", "left", "right", "down", "down", "down", "down", "right", "right", "up", "up", "left", "left", "down", "left", "up", "up", "up", "right", "up", "left"]
}, {
    "level": 27,
    "xsb": "####----\n#--#----\n#--#####\n#-.*---#\n##$----#\n-#-#$###\n-#.-@#--\n-#####--",
    "solve": ["up", "down", "left", "left", "up", "up", "right", "right", "up", "right", "right", "down", "left", "left", "down", "down", "left", "left", "up", "up", "up", "right", "right", "down", "left", "up", "left", "down", "right", "right", "right", "right", "up", "left", "left", "down", "left", "left", "down", "up", "up", "left", "up", "up", "right", "down"]
}, {
    "level": 28,
    "xsb": "-######-\n##@.--#-\n#-$$*-#-\n#--#--##\n#--#--.#\n####-#-#\n---#---#\n---#####",
    "solve": ["right", "right", "down", "up", "left", "left", "down", "right", "right", "up", "right", "down", "left", "down", "down", "right", "right", "down", "down", "left", "left", "up", "up", "up", "up", "right", "down", "left", "down", "right", "up", "up", "up", "left", "down", "left", "left", "left", "down", "down", "right", "up", "left", "up", "right", "right"]
}, {
    "level": 29,
    "xsb": "--###--\n###.###\n#---$-#\n#@.$#-#\n#--.--#\n##-$###\n-#--#--\n-####--",
    "solve": ["right", "down", "right", "right", "right", "up", "up", "left", "left", "down", "left", "left", "up", "right", "down", "right", "up", "left", "down", "down", "right", "left", "down", "down", "right", "up", "up", "left", "up", "up", "right", "right", "right", "down", "down", "left", "left", "down", "left", "up", "left", "up", "up", "right", "right", "down"]
}, {
    "level": 30,
    "xsb": "########\n#------#\n#-#-##*#\n#-#@-$-#\n#.$-.--#\n#####--#\n----#--#\n----####",
    "solve": ["up", "up", "left", "left", "down", "down", "down", "right", "right", "right", "left", "up", "up", "up", "right", "right", "right", "down", "down", "left", "left", "right", "right", "up", "up", "left", "left", "left", "down", "down", "right", "down", "left", "left", "right", "right", "up", "right", "right", "down", "left", "down", "down", "right", "up", "up", "up"]
}, {
    "level": 31,
    "xsb": "#####--\n#.--###\n#-#---#\n#-.-#-#\n#-$*$-#\n##@-###\n-#--#--\n-####--",
    "solve": ["right", "up", "down", "left", "up", "left", "up", "up", "up", "right", "right", "down", "right", "right", "down", "down", "left", "left", "right", "right", "up", "up", "left", "left", "down", "left", "down", "left", "up", "up", "down", "right", "down", "right", "down", "down", "left", "up", "up", "right", "up", "up", "right", "right", "down", "down", "left"]
}, {
    "level": 32,
    "xsb": "--#####\n--#---#\n--#-#.#\n###--.#\n#@-$$-#\n#--.$-#\n#######",
    "solve": ["right", "down", "right", "up", "up", "right", "right", "down", "down", "left", "up", "left", "left", "down", "right", "up", "right", "right", "up", "up", "up", "left", "left", "down", "down", "right", "down", "right", "up", "left", "down", "left", "down", "left", "left", "up", "right", "right", "up", "right", "right", "down", "down", "left", "up", "left", "up", "right"]
}, {
    "level": 33,
    "xsb": "--####-\n###--##\n#-----#\n#-.$*-#\n#-*@*-#\n#-*$.-#\n#-----#\n#######",
    "solve": ["up", "left", "left", "down", "right", "left", "down", "down", "right", "up", "right", "up", "down", "left", "left", "up", "up", "right", "down", "right", "down", "down", "right", "right", "up", "up", "left", "left", "right", "right", "up", "up", "left", "down", "left", "down", "down", "down", "left", "left", "up", "up", "up", "up", "right", "right", "up", "right", "down"]
}, {
    "level": 34,
    "xsb": "#####--\n#---#--\n#-#-###\n#--*$-#\n##*---#\n-#@---#\n-##--.#\n--#####",
    "solve": ["right", "up", "up", "left", "left", "up", "up", "right", "right", "down", "down", "down", "right", "down", "down", "left", "up", "left", "up", "right", "up", "up", "up", "left", "left", "down", "down", "right", "left", "up", "up", "right", "right", "down", "down", "left", "down", "down", "right", "right", "right", "up", "up", "left", "down", "left", "right", "down", "left", "down", "right"]
}, {
    "level": 35,
    "xsb": "#####---\n#--.###-\n#-$..-#-\n#--##$##\n##--#--#\n-#$---@#\n-#--####\n-####---",
    "solve": ["left", "left", "left", "up", "left", "up", "up", "down", "down", "right", "down", "down", "left", "up", "up", "up", "left", "up", "up", "right", "down", "right", "right", "right", "down", "down", "right", "down", "left", "left", "left", "up", "left", "up", "left", "up", "right", "right", "left", "down", "down", "right", "down", "down", "left", "up", "up", "up", "left", "up", "right"]
}, {
    "level": 36,
    "xsb": "-#####-\n-#---#-\n-#-#$#-\n##.--##\n#.$-$-#\n#--#--#\n#@-#.-#\n#######",
    "solve": ["up", "up", "right", "up", "right", "right", "down", "left", "right", "right", "down", "down", "left", "up", "right", "up", "left", "up", "left", "left", "up", "up", "right", "right", "down", "down", "left", "left", "down", "left", "down", "down", "right", "up", "up", "up", "right", "right", "down", "left", "left", "right", "right", "down", "up", "up", "up", "up", "left", "left", "down"]
}, {
    "level": 37,
    "xsb": "####----\n#.-#----\n#-$#----\n#--#####\n#-.$-@-#\n#-.$-#-#\n###----#\n--######",
    "solve": ["left", "left", "right", "down", "down", "left", "up", "left", "left", "up", "up", "right", "down", "left", "up", "up", "up", "right", "down", "left", "down", "down", "down", "right", "up", "right", "right", "down", "down", "right", "right", "up", "up", "left", "left", "left", "left", "down", "left", "up", "right", "right", "right", "down", "left", "up", "left", "left", "up", "up", "right", "down"]
}, {
    "level": 38,
    "xsb": "#######\n#-----#\n#.##-.#\n#*--$@#\n#--#$-#\n#--#--#\n#######",
    "solve": ["left", "right", "down", "down", "left", "up", "up", "right", "up", "up", "left", "left", "left", "left", "down", "down", "right", "right", "right", "down", "right", "up", "left", "left", "left", "left", "up", "up", "right", "right", "right", "down", "down", "left", "left", "down", "down", "left", "up", "up", "right", "right", "right", "right", "down", "down", "left", "up", "right", "up", "left", "left", "left"]
}, {
    "level": 39,
    "xsb": "--####-\n###--##\n#-----#\n#-.$*-#\n#-*@*-#\n#-*$.-#\n#----##\n######-",
    "solve": ["up", "left", "up", "right", "left", "left", "down", "down", "right", "left", "down", "down", "right", "up", "up", "up", "down", "down", "down", "right", "right", "up", "left", "right", "right", "up", "up", "left", "left", "right", "down", "left", "up", "up", "up", "right", "down", "down", "left", "down", "down", "down", "left", "left", "up", "up", "up", "up", "right", "right", "up", "right", "down"]
}, {
    "level": 40,
    "xsb": "########\n#-@.#--#\n#-.$-.-#\n#--#$--#\n#--$--##\n###--##-\n--#--#--\n--####--",
    "solve": ["down", "right", "right", "down", "down", "left", "down", "down", "right", "up", "up", "up", "right", "right", "up", "up", "left", "down", "left", "left", "up", "left", "left", "down", "down", "right", "up", "left", "up", "right", "left", "down", "down", "down", "right", "right", "down", "right", "up", "up", "down", "right", "up", "right", "up", "up", "left", "down", "left", "left", "right", "down", "down", "right", "up"]
}, {
    "level": 41,
    "xsb": "---####-\n---#--#-\n####-$##\n#-@$.--#\n#-##---#\n#---##-#\n#---*-.#\n########",
    "solve": ["right", "right", "down", "right", "right", "up", "left", "left", "up", "up", "right", "down", "down", "right", "down", "down", "down", "left", "left", "left", "up", "left", "left", "down", "right", "right", "left", "left", "up", "up", "up", "right", "right", "right", "down", "right", "up", "right", "down", "left", "left", "up", "up", "up", "right", "down", "left", "down", "down", "right", "right", "down", "up", "up", "left"]
}, {
    "level": 42,
    "xsb": "--#####\n###--.#\n#-$-#-#\n#-*$--#\n#-.#@-#\n#----##\n#---##-\n#####--",
    "solve": ["down", "left", "left", "left", "up", "up", "up", "right", "down", "down", "left", "down", "down", "right", "right", "up", "right", "up", "up", "left", "right", "right", "up", "up", "left", "left", "down", "left", "down", "right", "left", "left", "down", "down", "right", "up", "left", "up", "up", "right", "right", "down", "right", "down", "right", "up", "up", "down", "left", "down", "down", "left", "down", "left", "up"]
}, {
    "level": 43,
    "xsb": "#####--\n#.-.###\n#.#$$-#\n#---@-#\n#-$#--#\n##---##\n-#####-",
    "solve": ["down", "down", "left", "left", "up", "left", "up", "right", "right", "left", "left", "up", "up", "right", "right", "down", "up", "left", "left", "down", "down", "right", "down", "down", "right", "right", "up", "right", "up", "up", "left", "down", "left", "left", "down", "left", "up", "up", "down", "right", "down", "down", "right", "right", "up", "right", "up", "left", "left", "up", "down", "left", "down", "left", "up"]
}, {
    "level": 44,
    "xsb": "####---\n#.@##--\n#.--#--\n#.$-#--\n#.$$###\n##$-$-#\n-#--#-#\n-#.---#\n-######",
    "solve": ["down", "right", "down", "down", "left", "up", "right", "up", "left", "down", "left", "up", "right", "down", "down", "down", "down", "right", "up", "down", "down", "right", "right", "up", "up", "left", "left", "down", "left", "up", "up", "up", "right", "down", "left", "down", "right", "down", "down", "right", "right", "up", "up", "left", "left", "down", "left", "up", "up", "right", "up", "left", "right", "up", "left"]
}, {
    "level": 45,
    "xsb": "---###-\n---#.#-\n--##.##\n###-.@#\n#--$$##\n#-#-$-#\n#---#-#\n###---#\n--#####",
    "solve": ["left", "left", "down", "left", "left", "down", "down", "right", "right", "up", "down", "down", "right", "right", "up", "up", "left", "up", "up", "up", "down", "down", "down", "right", "down", "down", "left", "left", "up", "left", "left", "up", "up", "right", "right", "left", "left", "down", "down", "right", "right", "up", "right", "up", "up", "down", "left", "down", "down", "left", "left", "up", "up", "right", "right", "down", "right", "up"]
}, {
    "level": 46,
    "xsb": "########\n#---#--#\n#-#.$-$#\n#---$--#\n#####.@#\n--#----#\n--#---.#\n--######",
    "solve": ["left", "up", "up", "up", "right", "down", "down", "left", "left", "left", "up", "right", "down", "right", "right", "up", "up", "left", "down", "down", "down", "up", "left", "left", "up", "up", "left", "left", "down", "down", "right", "right", "right", "up", "right", "right", "down", "down", "left", "up", "right", "up", "left", "left", "right", "right", "down", "down", "down", "left", "down", "left", "left", "up", "right", "down", "right", "up"]
}, {
    "level": 47,
    "xsb": "-#####-\n##.-@#-\n#-.#-#-\n#-$$-#-\n##--###\n-#-$--#\n-#.---#\n-######",
    "solve": ["left", "left", "down", "down", "up", "up", "right", "right", "down", "down", "left", "down", "down", "left", "down", "right", "up", "up", "up", "right", "up", "up", "left", "left", "down", "left", "down", "right", "down", "up", "up", "up", "right", "right", "down", "down", "left", "down", "left", "up", "up", "down", "right", "down", "down", "down", "left", "up", "right", "right", "right", "down", "left", "left", "up", "left", "up", "up"]
}, {
    "level": 48,
    "xsb": "########\n#---#--#\n#-#.$-$#\n#---$--#\n#####.-#\n--#---@#\n--#---.#\n--######",
    "solve": ["left", "up", "up", "up", "up", "right", "down", "down", "left", "left", "left", "up", "right", "down", "right", "right", "up", "up", "left", "down", "down", "down", "up", "left", "left", "up", "up", "left", "left", "down", "down", "right", "right", "right", "up", "right", "right", "down", "down", "left", "up", "right", "up", "left", "left", "right", "right", "down", "down", "down", "left", "down", "left", "left", "up", "right", "down", "right", "up"]
}, {
    "level": 49,
    "xsb": "######\n#----#\n#.$-@#\n#.-#-#\n##-$.#\n-#-#$#\n-#---#\n-#####",
    "solve": ["left", "up", "left", "left", "down", "right", "down", "down", "down", "down", "right", "right", "up", "up", "left", "right", "down", "down", "left", "left", "up", "up", "up", "left", "up", "up", "right", "down", "up", "right", "right", "down", "left", "left", "up", "left", "down", "right", "right", "right", "down", "down", "left", "left", "up", "down", "right", "right", "up", "up", "left", "left", "down", "down", "down", "down", "right", "right", "up"]
}, {
    "level": 50,
    "xsb": "######--\n#---@#--\n#-$#-###\n#-*-$--#\n#---##-#\n##.--.-#\n-##---##\n--#####-",
    "solve": ["left", "left", "left", "down", "down", "down", "right", "right", "up", "right", "left", "down", "left", "left", "up", "right", "left", "up", "up", "right", "down", "down", "left", "down", "right", "up", "up", "up", "right", "right", "down", "down", "left", "down", "left", "down", "right", "left", "up", "left", "up", "up", "right", "down", "down", "right", "down", "down", "right", "right", "up", "right", "up", "up", "left", "left", "left", "down", "down", "right"]
}, {
    "level": 51,
    "xsb": "######-\n#.---#-\n#--#-#-\n#-$--##\n#@#$$-#\n#.-.#-#\n###---#\n--#####",
    "solve": ["up", "right", "right", "left", "left", "down", "down", "right", "right", "up", "down", "down", "right", "right", "up", "up", "left", "up", "left", "left", "right", "right", "down", "right", "down", "down", "left", "left", "up", "up", "down", "left", "left", "up", "up", "up", "right", "up", "right", "right", "down", "down", "left", "down", "down", "down", "right", "right", "up", "up", "left", "up", "left", "down", "up", "left", "up", "left", "down", "down"]
}, {
    "level": 52,
    "xsb": "#####--\n#---###\n#--$--#\n##$$-.#\n-#@-.-#\n-##-#-#\n--#--.#\n--#####",
    "solve": ["right", "right", "up", "up", "left", "down", "down", "up", "up", "up", "left", "left", "down", "right", "up", "right", "down", "right", "down", "down", "left", "left", "up", "right", "right", "down", "right", "down", "down", "left", "left", "up", "up", "left", "up", "right", "up", "right", "right", "down", "down", "down", "up", "left", "left", "up", "right", "left", "up", "up", "left", "left", "down", "right", "up", "right", "down", "down", "left", "down", "right"]
}, {
    "level": 53,
    "xsb": "#####--\n#.--#--\n#-#-###\n#-*$--#\n#--$.-#\n#--@###\n#####--",
    "solve": ["left", "up", "right", "left", "left", "up", "up", "up", "right", "right", "down", "down", "left", "right", "up", "up", "left", "left", "down", "down", "right", "down", "down", "right", "up", "up", "right", "right", "down", "left", "left", "up", "left", "left", "up", "up", "right", "right", "down", "up", "left", "left", "down", "down", "right", "right", "down", "right", "right", "up", "left", "left", "down", "down", "left", "left", "up", "right", "right", "left", "left", "up", "up"]
}, {
    "level": 54,
    "xsb": "#####---\n#---####\n#-$$---#\n#-.#.--#\n#--##-##\n#--##$#-\n#-@--.#-\n#######-",
    "solve": ["left", "up", "up", "up", "up", "up", "right", "down", "down", "down", "up", "up", "right", "right", "down", "right", "right", "up", "left", "left", "left", "up", "left", "down", "left", "down", "down", "down", "down", "right", "right", "right", "right", "up", "up", "down", "down", "left", "left", "left", "left", "up", "up", "right", "down", "left", "down", "right", "right", "right", "left", "left", "left", "up", "up", "up", "up", "right", "right", "right", "right", "right", "down", "left"]
}, {
    "level": 55,
    "xsb": "---#####\n--##---#\n--#--#-#\n--#-$--#\n###$-#-#\n#..*-#-#\n##@#---#\n-#######",
    "solve": ["up", "right", "up", "right", "up", "right", "right", "up", "up", "left", "left", "down", "left", "down", "down", "right", "up", "right", "right", "down", "down", "down", "left", "left", "up", "left", "left", "right", "right", "up", "down", "down", "right", "right", "up", "up", "up", "left", "left", "right", "right", "up", "up", "left", "left", "down", "left", "down", "down", "right", "down", "left", "right", "down", "right", "right", "up", "up", "up", "left", "left", "up", "left", "down", "down"]
}, {
    "level": 56,
    "xsb": "######--\n#---@#--\n#-$$####\n#-$-.--#\n##-#.#-#\n#.---#-#\n#------#\n########",
    "solve": ["left", "down", "up", "left", "left", "down", "right", "down", "down", "up", "right", "right", "down", "down", "down", "right", "right", "up", "up", "up", "left", "left", "left", "right", "down", "down", "left", "down", "left", "left", "up", "right", "right", "left", "up", "up", "left", "up", "up", "right", "down", "down", "down", "up", "right", "right", "right", "right", "down", "down", "down", "left", "left", "up", "left", "left", "up", "up", "up", "up", "right", "down", "left", "down", "right"]
}, {
    "level": 57,
    "xsb": "--####-\n--#--#-\n--#$-##\n--#---#\n###$..#\n#@----#\n#-.$--#\n#######",
    "solve": ["right", "down", "right", "up", "right", "up", "up", "left", "down", "right", "down", "left", "down", "left", "left", "up", "right", "right", "up", "right", "right", "down", "down", "left", "up", "left", "left", "down", "right", "up", "up", "up", "right", "up", "up", "left", "down", "down", "down", "up", "right", "right", "down", "down", "left", "left", "down", "left", "left", "up", "right", "right", "up", "up", "right", "right", "down", "down", "down", "left", "left", "up", "right", "down", "right", "up"]
}, {
    "level": 58,
    "xsb": "-#####-\n##---#-\n#-$#-#-\n#-.-@##\n#-*---#\n##-#$-#\n-#.--##\n-#####-",
    "solve": ["up", "up", "left", "left", "down", "left", "down", "right", "left", "down", "right", "down", "down", "right", "right", "up", "up", "left", "right", "down", "down", "left", "left", "up", "up", "left", "up", "up", "right", "up", "right", "right", "down", "down", "down", "left", "left", "down", "down", "right", "right", "up", "right", "up", "left", "up", "up", "up", "left", "left", "down", "down", "down", "down", "up", "up", "up", "up", "right", "right", "down", "down", "left", "right", "down", "left"]
}, {
    "level": 59,
    "xsb": "----####\n----#--#\n--###$.#\n--#--.-#\n###--#.#\n#-$--$-#\n#---#-@#\n########",
    "solve": ["up", "up", "up", "left", "left", "left", "down", "down", "down", "left", "left", "up", "right", "down", "right", "up", "right", "up", "up", "right", "right", "up", "up", "left", "down", "right", "down", "down", "down", "left", "left", "left", "down", "left", "left", "up", "right", "right", "right", "right", "down", "right", "up", "up", "up", "down", "down", "left", "left", "up", "up", "left", "down", "right", "down", "left", "down", "left", "left", "up", "right", "right", "right", "right", "down", "right", "up"]
}, {
    "level": 60,
    "xsb": "-####-\n-#--##\n##.--#\n#.--.#\n#--$-#\n###$$#\n--#-@#\n--####",
    "solve": ["up", "up", "left", "right", "down", "down", "left", "up", "up", "up", "left", "up", "up", "right", "down", "right", "down", "down", "left", "up", "right", "up", "left", "down", "down", "down", "down", "right", "up", "up", "left", "up", "left", "left", "down", "right", "up", "right", "up", "up", "left", "down", "right", "down", "left", "right", "down", "right", "down", "down", "left", "up", "up", "left", "up", "up", "right", "right", "down", "left", "down", "down", "right", "up", "left", "left", "up"]
}, {
    "level": 61,
    "xsb": "######\n#----#\n#..@$#\n#-#$.#\n#--$-#\n###--#\n--#--#\n--####",
    "solve": ["up", "right", "down", "down", "down", "left", "up", "right", "up", "left", "down", "down", "down", "down", "right", "up", "up", "left", "up", "up", "up", "left", "left", "down", "down", "down", "right", "left", "up", "up", "up", "right", "right", "down", "down", "down", "right", "down", "down", "left", "up", "up", "left", "left", "up", "up", "up", "right", "right", "down", "left", "right", "right", "down", "down", "left", "up", "right", "up", "left", "down", "down", "down", "down", "right", "up", "up"]
}, {
    "level": 62,
    "xsb": "----####\n----#--#\n--###$.#\n--#--.-#\n###--#.#\n#-$--$-#\n#---#@-#\n########",
    "solve": ["right", "up", "up", "up", "left", "left", "left", "down", "down", "down", "left", "left", "up", "right", "down", "right", "up", "right", "up", "up", "right", "right", "up", "up", "left", "down", "right", "down", "down", "down", "left", "left", "left", "down", "left", "left", "up", "right", "right", "right", "right", "down", "right", "up", "up", "up", "down", "down", "left", "left", "up", "up", "left", "down", "right", "down", "left", "down", "left", "left", "up", "right", "right", "right", "right", "down", "right", "up"]
}, {
    "level": 63,
    "xsb": "######--\n#--.-#--\n#----###\n#-#$$.-#\n#.--##-#\n#@$-##-#\n###----#\n--######",
    "solve": ["up", "right", "right", "up", "down", "down", "down", "right", "right", "right", "up", "up", "up", "left", "left", "up", "up", "left", "left", "down", "right", "left", "left", "down", "down", "down", "right", "up", "right", "up", "right", "right", "right", "down", "down", "down", "left", "left", "left", "up", "up", "left", "left", "up", "up", "right", "up", "right", "right", "down", "left", "up", "left", "left", "down", "down", "down", "right", "right", "up", "right", "left", "up", "left", "up", "left", "down", "down"]
}, {
    "level": 64,
    "xsb": "######-\n#-.--#-\n#--#@#-\n#--$-##\n##$#--#\n#---#-#\n#.-*--#\n#######",
    "solve": ["down", "down", "right", "down", "down", "left", "left", "up", "left", "up", "up", "up", "down", "down", "down", "right", "down", "right", "right", "up", "up", "left", "up", "left", "right", "down", "right", "down", "down", "left", "left", "up", "left", "left", "down", "right", "right", "left", "up", "up", "up", "left", "up", "up", "right", "down", "down", "down", "down", "right", "down", "left", "up", "up", "up", "right", "right", "up", "up", "left", "right", "down", "down", "down", "right", "down", "down", "left"]
}, {
    "level": 65,
    "xsb": "---#####\n---#---#\n-###--@#\n-#-$-$##\n##-$--#-\n#.--#-#-\n#..---#-\n#######-",
    "solve": ["left", "left", "down", "down", "right", "down", "down", "left", "left", "left", "up", "up", "up", "right", "down", "down", "up", "right", "right", "up", "left", "up", "up", "right", "right", "down", "left", "up", "left", "down", "down", "right", "down", "left", "right", "down", "down", "left", "left", "left", "up", "up", "up", "right", "down", "right", "right", "up", "up", "left", "down", "right", "down", "left", "left", "up", "left", "down", "right", "down", "left", "right", "up", "right", "right", "down", "down", "left", "left"]
}, {
    "level": 66,
    "xsb": "---####-\n---#-@##\n####---#\n#.-#$$-#\n#-----##\n#.--$##-\n##.--#--\n-#####--",
    "solve": ["left", "down", "down", "up", "right", "right", "down", "left", "down", "left", "left", "down", "left", "left", "up", "up", "right", "down", "down", "right", "up", "right", "right", "up", "up", "left", "down", "right", "down", "left", "left", "down", "down", "right", "up", "up", "left", "down", "left", "left", "up", "up", "right", "down", "left", "down", "right", "up", "right", "right", "right", "up", "up", "left", "down", "right", "down", "left", "left", "left", "down", "left", "up", "right", "right", "right", "down", "left", "left"]
}, {
    "level": 67,
    "xsb": "---#####\n---#-@-#\n-###---#\n-#-$-$##\n##-$--#-\n#.--#-#-\n#..---#-\n#######-",
    "solve": ["left", "down", "down", "down", "right", "down", "down", "left", "left", "left", "up", "up", "up", "right", "down", "down", "up", "right", "right", "up", "left", "up", "up", "right", "right", "down", "left", "up", "left", "down", "down", "right", "down", "left", "right", "down", "down", "left", "left", "left", "up", "up", "up", "right", "down", "right", "right", "up", "up", "left", "down", "right", "down", "left", "left", "up", "left", "down", "right", "down", "left", "right", "up", "right", "right", "down", "down", "left", "left"]
}, {
    "level": 68,
    "xsb": "---####-\n--##@-##\n-##--..#\n##-$#$##\n#---$.-#\n#--#---#\n#----###\n######--",
    "solve": ["right", "down", "down", "down", "left", "left", "right", "right", "right", "down", "left", "up", "up", "up", "left", "left", "down", "left", "down", "right", "right", "left", "left", "left", "down", "down", "right", "right", "right", "up", "right", "up", "up", "down", "left", "left", "up", "up", "right", "right", "down", "down", "left", "down", "down", "left", "left", "left", "up", "up", "right", "right", "right", "down", "right", "up", "up", "down", "left", "down", "down", "left", "left", "up", "left", "up", "right", "right", "right"]
}, {
    "level": 69,
    "xsb": "#####--\n#---###\n#-#$$-#\n#-$-#-#\n#--@.-#\n#--#--#\n#--.-.#\n#######",
    "solve": ["left", "left", "up", "up", "up", "right", "right", "down", "down", "up", "up", "left", "left", "down", "down", "right", "down", "down", "down", "right", "right", "up", "up", "left", "up", "left", "left", "up", "up", "right", "right", "down", "down", "left", "down", "down", "left", "down", "right", "right", "right", "up", "right", "up", "up", "up", "left", "right", "down", "down", "left", "left", "up", "left", "left", "up", "up", "right", "right", "down", "down", "left", "down", "right", "left", "down", "left", "down", "right"]
}, {
    "level": 70,
    "xsb": "--######\n--#-$..#\n###--*.#\n#--$-*.#\n#-$$$#.#\n#--#-###\n#@---#--\n######--",
    "solve": ["right", "right", "right", "up", "up", "up", "left", "up", "up", "right", "right", "left", "left", "down", "down", "right", "right", "up", "right", "down", "left", "left", "left", "up", "right", "right", "left", "down", "down", "down", "down", "left", "left", "left", "up", "up", "up", "right", "right", "right", "left", "left", "left", "down", "down", "right", "up", "right", "left", "down", "down", "right", "right", "up", "up", "up", "right", "left", "left", "down", "left", "left", "up", "right", "right", "right", "left", "up", "right"]
}, {
    "level": 71,
    "xsb": "-######-\n-#--.@##\n-#---$.#\n-###*#-#\n##-----#\n#--$--##\n#---###-\n#####---",
    "solve": ["left", "down", "down", "down", "right", "right", "up", "up", "left", "left", "down", "down", "left", "left", "down", "down", "right", "up", "left", "up", "right", "right", "up", "up", "right", "right", "down", "down", "left", "left", "up", "up", "up", "left", "left", "down", "right", "right", "right", "left", "down", "down", "right", "down", "left", "left", "down", "left", "left", "up", "right", "up", "right", "left", "down", "down", "right", "up", "right", "up", "up", "up", "down", "down", "down", "left", "left", "up", "right", "down", "right", "up"]
}, {
    "level": 72,
    "xsb": "-######-\n-#@---##\n-##$---#\n###-.--#\n#-$-#$##\n#-.--.#-\n####--#-\n---####-",
    "solve": ["right", "right", "down", "down", "left", "down", "down", "left", "left", "up", "right", "down", "right", "right", "right", "up", "up", "left", "left", "down", "up", "right", "up", "up", "right", "down", "right", "down", "left", "down", "down", "left", "left", "up", "left", "left", "down", "right", "right", "right", "down", "right", "up", "up", "up", "right", "up", "left", "up", "left", "left", "down", "down", "down", "up", "up", "up", "right", "right", "down", "down", "down", "down", "left", "left", "up", "up", "up", "right", "up", "right", "down", "down", "down"]
}, {
    "level": 73,
    "xsb": "######-\n#---@##\n#--#--#\n#.--$-#\n#-$$#.#\n###--.#\n--#####",
    "solve": ["down", "right", "down", "left", "left", "right", "right", "down", "down", "left", "left", "up", "down", "right", "right", "up", "up", "left", "up", "up", "left", "left", "left", "down", "down", "down", "right", "up", "left", "up", "up", "right", "right", "right", "down", "down", "left", "left", "right", "right", "right", "down", "down", "left", "left", "up", "left", "up", "right", "right", "up", "up", "left", "left", "down", "up", "right", "right", "down", "right", "down", "down", "up", "left", "left", "down", "left", "left", "up", "right", "up", "up", "left", "down", "right", "down", "right", "right", "up", "right", "down"]
}, {
    "level": 74,
    "xsb": "######-\n#--@-##\n#--#--#\n#.--$-#\n#-$$#.#\n###--.#\n--#####",
    "solve": ["right", "down", "right", "down", "left", "left", "right", "right", "down", "down", "left", "left", "up", "down", "right", "right", "up", "up", "left", "up", "up", "left", "left", "left", "down", "down", "down", "right", "up", "left", "up", "up", "right", "right", "right", "down", "down", "left", "left", "right", "right", "right", "down", "down", "left", "left", "up", "left", "up", "right", "right", "up", "up", "left", "left", "down", "up", "right", "right", "down", "right", "down", "down", "up", "left", "left", "down", "left", "left", "up", "right", "up", "up", "left", "down", "right", "down", "right", "right", "up", "right", "down"]
}, {
    "level": 75,
    "xsb": "#####---\n#...##--\n#.$$-###\n#@*-$-.#\n###-$--#\n--#--$-#\n--###--#\n----####",
    "solve": ["up", "up", "right", "right", "down", "down", "right", "left", "up", "up", "left", "left", "down", "down", "right", "up", "right", "right", "down", "left", "right", "right", "down", "right", "down", "down", "left", "up", "left", "left", "up", "up", "up", "left", "left", "down", "right", "up", "right", "right", "down", "right", "down", "right", "down", "down", "left", "up", "left", "up", "left", "up", "down", "right", "down", "right", "right", "up", "left", "left", "right", "up", "left", "up", "left", "left", "down", "left", "up", "right", "right", "right", "down", "left", "right", "down", "down", "left", "up", "up", "right", "up", "left", "left"]
}, {
    "level": 76,
    "xsb": "-######\n-#----#\n-#*$#-#\n##@---#\n#--#-##\n#..-$#-\n#----#-\n######-",
    "solve": ["right", "right", "right", "up", "up", "left", "left", "left", "down", "down", "down", "left", "down", "right", "down", "right", "right", "up", "up", "down", "down", "left", "left", "up", "up", "up", "up", "up", "right", "right", "right", "down", "down", "left", "left", "right", "right", "up", "up", "left", "left", "down", "left", "down", "down", "left", "down", "down", "right", "right", "right", "up", "up", "up", "left", "right", "down", "down", "down", "left", "left", "left", "up", "up", "right", "up", "down", "left", "down", "down", "right", "up", "down", "right", "right", "up", "left", "left", "right", "right", "up", "up", "left", "left", "down"]
}, {
    "level": 77,
    "xsb": "-######\n##--.-#\n#-*-#-#\n#-.$--#\n#--#$##\n##-@-#-\n-#####-",
    "solve": ["left", "up", "left", "up", "up", "right", "up", "right", "right", "right", "down", "down", "left", "left", "right", "right", "up", "up", "left", "left", "left", "down", "left", "down", "down", "right", "down", "right", "right", "up", "down", "left", "left", "up", "left", "up", "up", "right", "up", "right", "right", "right", "down", "down", "left", "down", "down", "left", "left", "up", "up", "down", "down", "right", "right", "up", "up", "left", "up", "down", "right", "down", "down", "left", "left", "up", "left", "up", "up", "right", "up", "right", "down", "left", "left", "down", "down", "right", "up", "down", "down", "right", "right", "up", "up", "left"]
}, {
    "level": 78,
    "xsb": "--######\n###-.--#\n#-$@#.-#\n#--$#-##\n#--*--#-\n##--#-#-\n-##---#-\n--#####-",
    "solve": ["up", "right", "right", "down", "down", "down", "left", "left", "right", "right", "up", "up", "up", "left", "left", "down", "down", "left", "left", "up", "right", "down", "right", "down", "right", "right", "up", "up", "up", "left", "left", "down", "up", "right", "right", "down", "down", "down", "down", "down", "left", "left", "up", "left", "up", "right", "right", "left", "down", "down", "right", "right", "up", "up", "up", "up", "right", "up", "left", "down", "down", "down", "left", "left", "left", "left", "up", "up", "right", "down", "left", "down", "right", "right", "right", "left", "left", "up", "up", "right", "down", "left", "down", "down", "right", "down", "right", "right", "up", "up", "up"]
}, {
    "level": 79,
    "xsb": "#######\n#--.@-#\n#-#.#-#\n#---$-#\n#.$$-##\n#--###-\n####---",
    "solve": ["left", "left", "left", "down", "down", "down", "down", "right", "up", "left", "up", "up", "up", "right", "right", "down", "down", "left", "down", "left", "up", "right", "right", "up", "up", "right", "right", "down", "down", "left", "down", "left", "up", "left", "left", "down", "right", "up", "right", "right", "right", "up", "up", "left", "left", "left", "left", "down", "down", "right", "right", "up", "down", "left", "left", "up", "up", "right", "right", "down", "down", "left", "down", "down", "left", "up", "up", "right", "right", "right", "down", "left", "up", "left", "left", "down", "down", "right", "up", "right", "up", "up", "up", "left", "left", "down", "down", "right", "down", "right", "up", "right", "right", "up", "up", "left"]
}, {
    "level": 80,
    "xsb": "----####\n-####--#\n##-$-$-#\n#.$@#--#\n#.#-#-##\n#..-$--#\n#-#$#--#\n#.----##\n#######-",
    "solve": ["down", "down", "left", "left", "down", "down", "right", "right", "right", "right", "up", "up", "left", "left", "left", "right", "right", "right", "down", "down", "left", "left", "left", "left", "up", "up", "right", "right", "down", "up", "right", "right", "down", "down", "left", "left", "left", "right", "right", "right", "up", "up", "up", "up", "right", "up", "up", "left", "down", "down", "down", "down", "left", "left", "up", "up", "left", "up", "right", "right", "left", "down", "down", "down", "down", "down", "right", "right", "up", "right", "up", "left", "up", "up", "right", "up", "up", "left", "down", "down", "down", "down", "left", "left", "left", "right", "down", "down", "right", "right", "up", "right", "up", "left", "left", "left"]
}, {
    "level": 81,
    "xsb": "######--\n#....#--\n#.$*$###\n#@*-$--#\n###-$--#\n--#--$-#\n--##---#\n---#####",
    "solve": ["up", "up", "right", "right", "down", "down", "right", "up", "left", "up", "left", "left", "down", "down", "right", "up", "right", "right", "down", "left", "right", "down", "right", "right", "down", "down", "left", "left", "up", "left", "up", "up", "up", "left", "left", "down", "right", "up", "right", "right", "down", "down", "left", "up", "right", "up", "left", "left", "down", "left", "up", "right", "right", "right", "down", "down", "right", "right", "up", "left", "left", "left", "right", "right", "right", "down", "down", "down", "left", "left", "up", "down", "right", "up", "up", "left", "down", "left", "up", "up", "right", "up", "left", "left", "right", "right", "down", "down", "right", "right", "up", "left", "left", "down", "left", "up"]
}, {
    "level": 82,
    "xsb": "####----\n#.-##---\n#..@#---\n#.*$###-\n##-$--##\n#--$$--#\n#------#\n###--###\n--####--",
    "solve": ["left", "down", "down", "right", "down", "right", "down", "down", "left", "up", "left", "up", "up", "down", "down", "right", "right", "up", "left", "up", "left", "up", "left", "up", "up", "right", "down", "right", "down", "down", "left", "up", "right", "up", "left", "right", "down", "down", "down", "right", "down", "down", "left", "up", "left", "up", "up", "up", "left", "up", "down", "right", "right", "up", "left", "down", "down", "down", "down", "right", "right", "up", "left", "down", "left", "up", "up", "right", "up", "left", "right", "down", "down", "right", "down", "right", "right", "up", "left", "left", "left", "down", "left", "up", "up", "up", "right", "down", "down", "right", "right", "up", "left", "left", "down", "left", "up"]
}, {
    "level": 83,
    "xsb": "#####--\n#---###\n#-#$--#\n#.-..-#\n##$#-##\n#--$-#-\n#@---#-\n######-",
    "solve": ["right", "up", "right", "down", "right", "up", "up", "up", "left", "left", "down", "up", "right", "right", "down", "down", "left", "down", "left", "left", "up", "right", "up", "up", "left", "up", "up", "right", "right", "down", "up", "left", "left", "down", "down", "right", "down", "down", "down", "right", "right", "up", "up", "up", "right", "up", "left", "down", "down", "down", "down", "left", "left", "up", "up", "up", "right", "left", "left", "up", "up", "right", "right", "down", "right", "down", "left", "left", "down", "down", "down", "right", "right", "up", "up", "down", "down", "left", "left", "up", "up", "up", "right", "up", "right", "right", "down", "left", "down", "down", "down", "left", "left", "up", "right", "down", "right", "up", "up"]
}, {
    "level": 84,
    "xsb": "#####--\n#.-@#--\n#-#$#--\n#---#--\n#-#-###\n#.-$--#\n#--.$-#\n#######",
    "solve": ["left", "left", "down", "down", "down", "down", "right", "down", "right", "up", "right", "right", "down", "left", "left", "up", "left", "left", "up", "up", "right", "right", "down", "up", "left", "left", "down", "down", "right", "right", "down", "right", "right", "up", "left", "left", "up", "up", "left", "left", "up", "up", "right", "right", "down", "down", "left", "left", "down", "down", "down", "right", "right", "up", "left", "down", "left", "up", "right", "right", "right", "right", "down", "left", "left", "up", "left", "left", "up", "up", "right", "right", "down", "up", "left", "left", "up", "down", "down", "down", "right", "right", "down", "right", "right", "up", "left", "left", "up", "up", "left", "left", "down", "down", "down", "right", "right", "up", "left", "right", "right", "right", "down", "left"]
}, {
    "level": 85,
    "xsb": "-######\n##.---#\n#@-$.-#\n#-#$###\n#--$-#-\n#--.-#-\n#--###-\n####---",
    "solve": ["down", "down", "right", "down", "right", "right", "up", "left", "down", "left", "left", "up", "up", "up", "right", "right", "down", "down", "right", "down", "left", "up", "up", "up", "left", "left", "down", "down", "right", "left", "up", "up", "right", "right", "up", "right", "right", "down", "left", "left", "down", "down", "left", "left", "up", "up", "right", "left", "down", "down", "right", "right", "up", "up", "left", "left", "down", "down", "down", "down", "right", "up", "left", "up", "up", "up", "right", "right", "right", "up", "left", "down", "down", "down", "right", "down", "left", "up", "up", "up", "left", "left", "down", "down", "right", "left", "down", "down", "right", "up", "right", "up", "up", "down", "down", "left", "left", "up", "right", "left", "up", "up", "right", "right", "down", "down"]
}, {
    "level": 86,
    "xsb": "----####\n-####-@#\n##-----#\n#.--#--#\n#.#-#-##\n#.$-$$-#\n#-###--#\n#-----##\n#######-",
    "solve": ["left", "down", "left", "left", "left", "down", "left", "down", "down", "down", "down", "right", "right", "right", "right", "up", "up", "up", "up", "right", "up", "left", "down", "down", "down", "down", "down", "left", "left", "left", "left", "up", "up", "up", "up", "right", "right", "down", "down", "right", "left", "up", "up", "left", "left", "down", "down", "down", "down", "right", "right", "right", "right", "up", "up", "left", "left", "left", "right", "right", "right", "down", "down", "left", "left", "left", "left", "up", "up", "right", "right", "right", "right", "up", "up", "right", "up", "up", "left", "down", "down", "down", "down", "left", "left", "left", "left", "up", "down", "down", "down", "right", "right", "right", "right", "up", "right", "up", "left", "left", "left", "left", "right", "right", "right", "down", "down", "left", "left", "left", "left", "up", "up", "right", "right", "up", "up", "up", "right", "left", "down", "down", "down", "right", "right", "up", "up", "right", "up", "up", "left", "down", "down", "down", "down", "left", "left", "left", "left", "down", "down", "right", "right", "right", "right", "up", "right", "up", "left", "left", "left", "left"]
}]


export function getStateData(level) {
    const data = dataList.find(item => item.level === level);
    return new Stage(data.level, data.xsb, data.solve);
}


/**
 * 按照难度排序
 * 1. 目标数量少的简单（包括人在目标、箱子在目标）
 * 2. 墙/空位比例小的简单
 * 3. 整体元素数量少的简单
 *
 *
 * @returns {any[]}
 */
function sortByDifficult(dataList) {
    const data = [...dataList];
    data.sort((stageA, stageB) => {
        const a = stageA.xsb;
        const b = stageB.xsb;
        const aNums = countNum(a);
        const bNums = countNum(b);
        const aNum1 = (aNums['.'] || 0) + (aNums['+'] || 0) + (aNums['*'] || 0);
        const bNum1 = (bNums['.'] || 0) + (bNums['+'] || 0) + (bNums['*'] || 0);
        const aNum2 = aNums['#'] / (aNums['-'] || 1000);
        const bNum2 = bNums['#'] / (bNums['-'] || 1000);
        if (stageA.solve.length !== stageB.solve.length) {
            return stageA.solve.length - stageB.solve.length
        }
        if (aNum1 !== bNum1) {
            return aNum1 - bNum1;
        }
        if (aNum2 !== bNum2) {
            return aNum2 - bNum2;
        }
        return a.length - b.length;
    })
    for (let i = 0; i < data.length; i++) {
        data[i].level = i + 1;
    }
    return data;
}


function distinct(dataList) {
    const newList = [];
    const xsbs = [];
    for (let i = 0; i < dataList.length; i++) {
        const data = dataList[i];
        if (xsbs.indexOf(data.xsb) === -1 && data.solve.length > 0) {
            xsbs.push(data.xsb);
            newList.push(data);
            data.level = newList.length;
        }
    }
    return newList;
}

export function getMaxLevel() {
    return dataList.length;
}

export function format() {
    let newList = distinct(dataList)
    newList = sortByDifficult(newList)
    console.log(JSON.stringify(newList));
}
