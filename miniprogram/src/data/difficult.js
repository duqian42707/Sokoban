const dataList = [
    "----#####----------\n----#---#----------\n----#$--#----------\n--###--$##---------\n--#--$-$-#---------\n###-#-##-#---######\n#---#-##-#####--..#\n#-$--$----------..#\n#####-###-#@##--..#\n----#-----#########\n----#######--------\n-------------------\n-------------------",
    "############--\n#..--#-----###\n#..--#-$--$--#\n#..--#$####--#\n#..----@-##--#\n#..--#-#--$-##\n######-##$-$-#\n--#-$--$-$-$-#\n--#----#-----#\n--############\n--------------\n--------------\n--------------",
    "--------########-\n--------#-----@#-\n--------#-$#$-##-\n--------#-$--$#--\n--------##$-$-#--\n#########-$-#-###\n#....--##-$--$--#\n##...----$--$---#\n#....--##########\n########---------\n-----------------\n-----------------\n-----------------",
    "-----------########\n-----------#--....#\n############--....#\n#----#--$-$---....#\n#-$$$#$--$-#--....#\n#--$-----$-#--....#\n#-$$-#$-$-$########\n#--$-#-----#-------\n##-#########-------\n#----#----##-------\n#-----$---##-------\n#--$$#$$--@#-------\n#----#----##-------\n###########--------\n-------------------\n-------------------\n-------------------",
    "--------#####----\n--------#---#####\n--------#-#$##--#\n--------#-----$-#\n#########-###---#\n#....--##-$--$###\n#....----$-$$-##-\n#....--##$--$-@#-\n#########--$--##-\n--------#-$-$--#-\n--------###-##-#-\n----------#----#-\n----------######-\n-----------------\n-----------------\n-----------------",
    "######--###-\n#..--#-##@##\n#..--###---#\n#..-----$$-#\n#..--#-#-$-#\n#..###-#-$-#\n####-$-#$--#\n---#--$#-$-#\n---#-$--$--#\n---#--##---#\n---#########\n------------\n------------\n------------",
    "-------#####-\n-#######---##\n##-#-@##-$$-#\n#----$------#\n#--$--###---#\n###-#####$###\n#-$--###-..#-\n#-$-$-$-...#-\n#----###...#-\n#-$$-#-#...#-\n#--###-#####-\n####---------\n-------------\n-------------\n-------------",
    "--####----------\n--#--###########\n--#----$---$-$-#\n--#-$#-$-#--$--#\n--#--$-$--#----#\n###-$#-#--####-#\n#@#$-$-$--##---#\n#----$-#$#---#-#\n#---$----$-$-$-#\n#####--#########\n--#------#------\n--#------#------\n--#......#------\n--#......#------\n--#......#------\n--########------\n----------------\n----------------\n----------------",
    "----------#######\n----------#--...#\n------#####--...#\n------#------.-.#\n------#--##--...#\n------##-##--...#\n-----###-########\n-----#-$$$-##----\n-#####--$-$-#####\n##---#$-$---#---#\n#@-$--$----$--$-#\n######-$$-$-#####\n-----#------#----\n-----########----\n-----------------\n-----------------\n-----------------",
    "-###--#############\n##@####-------#---#\n#-$$---$$--$-$-...#\n#--$$$#----$--#...#\n#-$---#-$$-$$-#...#\n###---#--$----#...#\n#-----#-$-$-$-#...#\n#----######-###...#\n##-#--#--$-$--#...#\n#--##-#-$$-$-$##..#\n#-..#-#--$------#.#\n#-..#-#-$$$-$$$-#.#\n#####-#-------#-#.#\n----#-#########-#.#\n----#-----------#.#\n----###############\n-------------------\n-------------------\n-------------------",
    "----------####-----\n-----####-#--#-----\n---###-@###$-#-----\n--##------$--#-----\n-##--$-$$##-##-----\n-#--#$##-----#-----\n-#-#-$-$$-#-###----\n-#---$-#--#-$-#####\n####----#--$$-#---#\n####-##-$---------#\n#.----###--########\n#..-..#-####-------\n#...#.#------------\n#.....#------------\n#######------------\n-------------------\n-------------------\n-------------------",
    "################-\n#--------------#-\n#-#-######-----#-\n#-#--$-$-$-$#--#-\n#-#---$@$---##-##\n#-#--$-$-$###...#\n#-#---$-$--##...#\n#-###$$$-$-##...#\n#-----#-##-##...#\n#####---##-##...#\n----#####-----###\n--------#-----#--\n--------#######--\n-----------------\n-----------------\n-----------------",
    "---#########-------\n--##---##--#####---\n###-----#--#----###\n#--$-#$-#--#--...-#\n#-#-$#@$##-#-#.#.-#\n#--#-#$--#----.-.-#\n#-$----$-#-#-#.#.-#\n#---##--##$-$-.-.-#\n#-$-#---#--#$#.#.-#\n##-$--$---$--$...-#\n-#$-######----##--#\n-#--#----##########\n-####--------------\n-------------------\n-------------------\n-------------------",
    "-------#######----\n-#######-----#----\n-#-----#-$@$-#----\n-#$$-#---#########\n-#-###......##---#\n-#---$......##-#-#\n-#-###......-----#\n##---####-###-#$##\n#--#$---#--$--#-#-\n#--$-$$$--#-$##-#-\n#---$-$-###$$-#-#-\n#####-----$---#-#-\n----###-###---#-#-\n------#-----#---#-\n------########--#-\n-------------####-\n------------------\n------------------\n------------------",
    "---########------\n---#---#--#------\n---#--$---#------\n-###-#$---####---\n-#--$--##$---#---\n-#--#-@-$-#-$#---\n-#--#------$-####\n-##-####$##-----#\n-#-$#.....#-#---#\n-#--$..**.-$#-###\n##--#.....#---#--\n#---###-#######--\n#-$$--#--#-------\n#--#-----#-------\n######---#-------\n-----#####-------\n-----------------\n-----------------\n-----------------",
    "#####---------\n#---##--------\n#----#--####--\n#-$--####--#--\n#--$$-$---$#--\n###@-#$----##-\n-#--##--$-$-##\n-#-$--##-##-.#\n-#--#$##$--#.#\n-###---$..##.#\n--#----#.*...#\n--#-$$-#.....#\n--#--#########\n--#--#--------\n--####--------\n--------------\n--------------\n--------------",
    "---##########---\n---#..--#---#---\n---#..------#---\n---#..--#--####-\n--#######--#--##\n--#------------#\n--#--#--##--#--#\n####-##--####-##\n#--$--#####-#--#\n#-#-$--$--#-$--#\n#-@$--$---#---##\n####-##-#######-\n---#----#-------\n---######-------\n----------------\n----------------\n----------------",
    "-----###########---\n-----#--.--#---#---\n-----#-#.----@-#---\n-#####-##..#-####--\n##--#-..###-----###\n#-$-#...---$-#--$-#\n#----..-##--##-##-#\n####$##$#-$-#---#-#\n--##-#----#$-$$-#-#\n--#--$-#-#--#-$##-#\n--#---------------#\n--#--###########--#\n--####---------####\n-------------------\n-------------------\n-------------------",
    "--######-----------\n--#---@####--------\n#####-$---#--------\n#---##----####-----\n#-$-#--##----#-----\n#-$-#--#####-#-----\n##-$--$----#-#-----\n##-$-$-###-#-#-----\n##-#--$--#-#-#-----\n##-#-#$#---#-#-----\n##-###---#-#-######\n#--$--####-#-#....#\n#----$----$---..#.#\n####$--$#-$---....#\n#-------#--##-....#\n###################\n-------------------\n-------------------\n-------------------",
    "----##########-----\n#####--------####--\n#-----#---$--#@-#--\n#-#######$####--###\n#-#----##-#--#$-..#\n#-#-$-----#--#--#.#\n#-#-$--#-----#$-..#\n#-#--###-##-----#.#\n#-###--#--#--#$-..#\n#-#----#--####--#.#\n#-#$---$--$--#$-..#\n#----$-#-$-$-#--#.#\n####-$###----#$-..#\n---#----$$-###....#\n---#------##-######\n---########--------\n-------------------\n-------------------\n-------------------",
    "#########------\n#-------#------\n#-------####---\n##-####-#--#---\n##-#@##----#---\n#-$$$-$--$$#---\n#--#-##-$--#---\n#--#-##--$-####\n####--$$$-$#--#\n-#---##---....#\n-#-#---#-#..-.#\n-#---#-#-##...#\n-#####-$--#...#\n-----##---#####\n------#####----\n---------------\n---------------\n---------------",
    "######-----####----\n#----#######--#####\n#---$#--#--$--#---#\n#--$--$--$-#-$-$--#\n##$-$---#-@#-$----#\n#--$-###########-##\n#-#---#.......#-$#-\n#-##--#-......#--#-\n#-#---$........$-#-\n#-#-$-#....-..#--#-\n#--$-$####$####-$#-\n#-$---###-$---$--##\n#-$-----$-$--$----#\n##-######-$-#####-#\n#---------#-------#\n###################\n-------------------\n-------------------\n-------------------",
    "----#######--------\n----#--#--####-----\n#####-$#$-#--##----\n#..-#--#--#---#----\n#..-#-$#$-#--$####-\n#.--#-----#$--#--#-\n#..---$#--#-$----#-\n#..@#--#$-#$--#--#-\n#..-#-$#-----$#--#-\n#..-#--#$$#$--#--##\n#..-#-$#--#--$#$--#\n#..-#--#--#---#---#\n##.-####--#####---#\n-####--####---#####\n-------------------\n-------------------\n-------------------",
    "###############----\n#..........--.####-\n#..........$$.#--#-\n###########$-#---##\n#------$--$-----$-#\n##-####---#--$-#--#\n#------#---##--#-##\n#--$#--#-##--###-##\n#-$-#$###----###-##\n###--$-#--#--###-##\n###----$-##-#--#-##\n-#-$--#--$--$-$---#\n-#--$--$#$$$--#---#\n-#--#--$------#####\n-#-@##--#--#--#----\n-##############----\n-------------------\n-------------------\n-------------------",
    "####---------------\n#--##############--\n#--#---..#......#--\n#--#-#-#####-...#--\n##$#----........#--\n#---##$######--####\n#-$-#-----######@-#\n##$-#-$---######--#\n#--$-#$$$##-------#\n#------#----#$#$###\n#-####-#$$$$$----#-\n#-#----$-----#---#-\n#-#---##--------###\n#-######$######-$-#\n#--------#----#---#\n##########----#####\n-------------------\n-------------------\n-------------------",
    "-#######-------\n-#--#--#####---\n##--#--#...###-\n#--$#--#...--#-\n#-$-#$$-...--#-\n#--$#--#...-.#-\n#---#-$########\n##$-------$-$-#\n##--#--$$-#---#\n-######--##$$@#\n------#------##\n------########-\n---------------\n---------------\n---------------",
    "-#################-\n-#...---#----#---##\n##.....--$##-#-#$-#\n#......#--$--#----#\n#......#--#--#-#--#\n#########-$--$-$--#\n--#-----#$##$-##$##\n-##---$----#-$----#\n-#--##-###-#--##$-#\n-#-$-$$-----$--$--#\n-#-$----$##$-######\n-#######--@-##-----\n-------######------\n-------------------\n-------------------\n-------------------",
    "---------#####---\n-----#####---#---\n----##-$--$--####\n#####-$--$-$-##.#\n#-------$$--##..#\n#--######-###..-#\n##-#--#----#...-#\n#-$---#----#...-#\n#@-#$-##-####...#\n####--$-$$--##..#\n---##--$-$--$...#\n----#-$$--$-#--.#\n----#---$-$--####\n----######---#---\n---------#####---\n-----------------\n-----------------\n-----------------",
    "#####--------------\n#---##-------------\n#-$--#########-----\n##-#-#-------######\n##-#---$#$#@--#---#\n#--#------$-#---$-#\n#--###-#########-##\n#--##-..*.....-#-##\n##-##-*.*..*.*-#-##\n#-$##########-##$-#\n#--$---$--$----$--#\n#--#---#---#---#--#\n###################\n-------------------\n-------------------\n-------------------",
    "-------###########-\n-------#---#-----#-\n#####--#-----$-$-#-\n#---#####-$##-#-##-\n#-$-##---#-##-$--#-\n#-$--@$$-#-##$$$-#-\n##-###---#-##----#-\n##-#---###-#####$#-\n##-#-----$--#....#-\n#--###-##-$-#....##\n#-$---$-#---#..$.-#\n#--##-$-#--##....-#\n#####---######...##\n----#####----#####-\n-------------------\n-------------------\n-------------------",
    "--####------------\n--#--#########----\n-##--##--#---#----\n-#--$#-$@$---####-\n-#$--$--#-$-$#--##\n##--$##-#$-$-----#\n#--#--#-#---$$$--#\n#-$----$--$##-####\n#-$-$-#$#--#--#---\n##--###--###$-#---\n-#--#....-----#---\n-####......####---\n---#....####------\n---#...##---------\n---#...#----------\n---#####----------\n------------------\n------------------\n------------------",
    "------####---\n--#####--#---\n-##-----$#---\n##-$--##-###-\n#@$-$-#-$--#-\n####-##---$#-\n-#....#$-$-#-\n-#....#---$#-\n-#....--$$-##\n-#...-#-$---#\n-######$-$--#\n------#---###\n------#$-###-\n------#--#---\n------####---\n-------------\n-------------\n-------------",
    "############\n##-----##--#\n##---$---$-#\n####-##-$$-#\n#---$-#----#\n#-$$$-#-####\n#---#-#-$-##\n#--#--#--$-#\n#-$#-$#----#\n#---..#-####\n####..-$-#@#\n#.....#-$#-#\n##....#--$-#\n###..##----#\n############\n------------\n------------\n------------",
    "-#########----\n-#....---##---\n-#.#.#--$-##--\n##....#-#-@##-\n#-....#--#--##\n#-----#$-##$-#\n##-###--$----#\n-#$--$-$-$#--#\n-#-#--$-$-##-#\n-#--###--##--#\n-#----##-##-##\n-#--$-#--$--#-\n-###$-$---###-\n---#--#####---\n---####-------\n--------------\n--------------\n--------------",
    "############-######\n#---#----#-###....#\n#---$$#---@--.....#\n#---#-###---#-....#\n##-##-###--#--....#\n-#-$-$-----#-#-####\n-#--$-$##--#------#\n####-#--####-#-##-#\n#--#-#$---##-#----#\n#-$--$--#-##-#---##\n#-#-$-$----#-#---#-\n#--$-##-##-#-#####-\n#-$$-----$$--#-----\n##-##-###-$--#-----\n-#----#-#----#-----\n-######-######-----\n-------------------\n-------------------\n-------------------",
    "------------#####--\n#####--######---#--\n#---####--$-$-$-#--\n#-$---##-##-##--##-\n#---$-$-----$--$-#-\n###-$--##-##-----##\n--#-#####-#####$$-#\n-##$#####-@##-----#\n-#-$--###$###-$--##\n-#-$--#---###--###-\n-#-$$-$-#---$$-#---\n-#-----#---##--#---\n-#######..-.###----\n----#.........#----\n----#.........#----\n----###########----\n-------------------\n-------------------\n-------------------",
    "###########--------\n#......---#########\n#......---#--##---#\n#..###-$----$-----#\n#...-$-$-#---##---#\n#...#$#####----#--#\n###----#---#$--#$-#\n--#--$$-$-$--$##--#\n--#--$---#$#$-##$-#\n--###-##-#----##--#\n---#--$-$-##-######\n---#----$--$--#----\n---##---#-#---#----\n----#####@#####----\n--------###--------\n-------------------\n-------------------\n-------------------",
    "------####-\n#######-@#-\n#-----$--#-\n#---$##-$#-\n##$#...#-#-\n-#-$...--#-\n-#-#.-.#-##\n-#---#-#$-#\n-#$--$----#\n-#--#######\n-####------\n-----------\n-----------\n-----------",
    "-------------######\n-#############....#\n##---##-----##....#\n#--$$##--$-@##....#\n#------$$-$#--....#\n#--$-##-$$-#-#-...#\n#--$-##-$--#--....#\n##-#####-###-##.###\n##---$--$-##---.--#\n#-$###--#-#####-###\n#---$---#-------#--\n#--$-#$-$-$###--#--\n#-$$$#-$---#-####--\n#----#--$$-#-------\n######---###-------\n-----#####---------\n-------------------\n-------------------\n-------------------",
    "----############-\n----#----------##\n----#--#-#$$-$--#\n----#$-#$#--##-@#\n---##-##-#-$-#-##\n---#---$-#$--#-#-\n---#---#-$---#-#-\n---##-$-$---##-#-\n---#--#--##--$-#-\n---#----##-$$#-#-\n######$$---#---#-\n#....#--########-\n#.#...-##--------\n#....---#--------\n#....---#--------\n#########--------\n-----------------\n-----------------\n-----------------",
    "-----------#####---\n----------##---##--\n---------##-----#--\n--------##--$$--#--\n-------##-$$--$-#--\n-------#-$----$-#--\n####---#---$$-#####\n#--########-##----#\n#.------------$$$@#\n#.#-#######-##---##\n#.#-#######.-#$-$##\n#...........-#----#\n##############--$-#\n-------------##--##\n--------------####-\n-------------------\n-------------------\n-------------------",
    "-----########-----\n--####------######\n--#----##-$-$---@#\n--#-##-##$#$-$-$##\n###-......#--$$-##\n#---......#--#---#\n#-#-......#$--$--#\n#-#$......-$$#-$-#\n#---###-###$--$-##\n###--$--$--$--$-#-\n--#--$--$--$--$-#-\n--######---######-\n-------#####------\n------------------\n------------------\n------------------",
    "--------#######----\n----#####--#--####-\n----#---#---$----#-\n-####-#$$-##-##--#-\n##------#-#--##-###\n#--###-$#$--$--$--#\n#...----#-##--#---#\n#...#----@-#-###-##\n#...#--###--$--$--#\n########-##---#---#\n----------#########\n-------------------\n-------------------\n-------------------",
    "-#####-------------\n-#---#-------------\n-#-#-#######-------\n-#------$@######---\n-#-$-##$-###---#---\n-#-####-$----$-#---\n-#-#####-#--#$-####\n##--####-##$------#\n#--$#--$--#-##-##-#\n#---------#-#...#-#\n######--###--...--#\n-----####-#-#...#-#\n----------#-###-#-#\n----------#-------#\n----------#########\n-------------------\n-------------------\n-------------------",
    "#####-####------\n#...#-#--####---\n#...###--$--#---\n#....##-$--$###-\n##....##---$--#-\n###...-##-$-$-#-\n#-##----#--$--#-\n#--##-#-###-####\n#-$-#-#$--$----#\n#--$-@-$----$--#\n#---#-$-$$-$-###\n#--######--###--\n#-##----####----\n###-------------\n----------------\n----------------\n----------------",
    "##########----\n#--------####-\n#-######-#--##\n#-#-$-$-$--$-#\n#-------#$---#\n###$--$$#--###\n--#--##-#-$##-\n--##$#---$-@#-\n---#--$-$-###-\n---#-#---$--#-\n---#-##---#-#-\n--##--#####-#-\n--#---------#-\n--#.......###-\n--#.......#---\n--#########---\n--------------\n--------------\n--------------",
    "---------####-----\n-#########--##----\n##--$------$-#####\n#---##-##---##...#\n#-#$$-$-$$#$##...#\n#-#---@---#---...#\n#--$#-###$$---...#\n#-$--$$--$-##....#\n###$-------#######\n--#--#######------\n--####------------\n------------------\n------------------\n------------------",
    "--#########--\n--#*.*#*.*#--\n--#.*.*.*.#--\n--#*.*.*.*#--\n--#.*.*.*.#--\n--#*.*.*.*#--\n--###---###--\n----#---#----\n######-######\n#-----------#\n#-$-$-$-$-$-#\n##-$-$-$-$-##\n-#$-$-$-$-$#-\n-#---$@$---#-\n-#--#####--#-\n-####---####-\n-------------\n-------------\n-------------",
    "-------####------\n-------#--##-----\n-------#---##----\n-------#-$$-##---\n-----###$--$-##--\n--####----$---#--\n###--#-#####--#--\n#----#-#....$-#--\n#-#---$-....#-#--\n#--$-#-#.*..#-#--\n###--####-###-#--\n--####-@$--##$##-\n-----###-$-----#-\n-------#--##---#-\n-------#########-\n-----------------\n-----------------\n-----------------",
    "------############-\n-----##..----#---#-\n----##..*-$----$-#-\n---##..*.#-#-#-$##-\n---#..*.#-#-#-$--#-\n####...#--#----#-#-\n#--##-#----------#-\n#-@$-$-###--#---##-\n#-$---$---#-#---#--\n###$$---#-#-#-#-#--\n--#---$---#-#-#####\n--#-$#-#####------#\n--#$---#---#----#-#\n--#--###---##-----#\n--#--#------#----##\n--####------######-\n-------------------\n-------------------\n-------------------",
    "-#########----\n-#-------#----\n-#-$-$$-$#----\n###-#--$-#----\n#.#---$$-##---\n#.###---$-#---\n#.#.-$-##-####\n#...--$##-$--#\n#...$---$----#\n#..###$###-#@#\n#..#-#-----###\n####-#######--\n--------------\n--------------\n--------------",
    "-----------########\n-----------#......#\n---####----#......#\n---#--#########...#\n---#-$---$----#...#\n---#--#-#-#-#-#---#\n#####-#-#-#@#-#---#\n#---#-###-###-##-##\n#----$-#-$-$-$-#-#-\n#-$$$--$---#-----#-\n#---#-###$###$##-#-\n###-#--$---#-----#-\n-##-$--#-$-$-$-###-\n-#--#-###-###-##---\n-#-$----------#----\n-#--###########----\n-####--------------\n-------------------\n-------------------\n-------------------",
    "##################--\n#----------------##-\n#-$#---$-##--$----#-\n#----$###----#-$$-#-\n#.###-----$-$-##--##\n#...#--#--#----#$--#\n#..##$$####-$--#---#\n#...#------$-##--###\n#...$--###--#----#-#\n##..--$#--##---##@-#\n-##.#--------------#\n--##################\n--------------------\n--------------------\n--------------------",
    "####################\n#---#----#---#---#@#\n#-$------$---$---#-#\n##-###..##-###-----#\n#---#....#$#--$###-#\n#-$-#....#--$--$-$-#\n#---#....#-#-#-$-$-#\n#---##..##---#$#---#\n##$##----##--#--#$##\n#---$--$-----#--#--#\n#---#----#---#-----#\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#----@##------#---##\n#----##----$----$-##\n#--###....#-#-#--###\n#---#....#-#-#-$---#\n###-#...#--#-------#\n##--##.#-----$---$-#\n##--$-$-###--#-#-###\n##-$-------#-#-$---#\n####-$--$#-#-#-#-$-#\n####---------#-#--##\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#--#--##----#---@###\n##----$----#-$###--#\n##$#-$-##$#-$-$----#\n#---$#----$------###\n#-##---$-###--#....#\n#-#-$#-#-#-#-#....##\n#----$-$-#--#....###\n##$-###--$-#....####\n#--#-$--------######\n#------#-#----######\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#@-----###---#--#--#\n#-#-#--#--$--$-----#\n#####-----#-$-$#$#-#\n#.#..#----##$-$----#\n#.....----$---#---##\n#.....----###$##$###\n#.#..#----$----#---#\n#####-----#--#$--$-#\n#####--#--$----$-$-#\n#####--#--#--#--#--#\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n##...---##-#----#--#\n#....---------$-##-#\n#....#-#-#$###$----#\n#...#----#-------#-#\n##.#--#$-#-----$##-#\n#--#--#-$-$-###--$-#\n#-----$--$-#--#-##-#\n##-#-##-#$$#-$#--#-#\n#--#---$-$-#------##\n#----#-----#--#---@#\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#---#--#@#-##--#####\n#-#-#--$----$--#####\n#-#----######-$--###\n#---#--#....#--$$--#\n##$##$##....#------#\n#------#....##$##$##\n#--$$--#....#------#\n#-$--$--#--#--###--#\n#####--$---$----$--#\n#####-#----#--#---##\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#-#-----#----------#\n#-------$--##-###-##\n#####--##---$--$---#\n##..##--#-#-$-#-#--#\n#....--$-----##$#-##\n#....--$#####---#$##\n##..#-#--#---#--$--#\n###.#-#--$---$--#-@#\n##--$--$-#---#--####\n##-------###########\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#-----###..###-----#\n#-$$--###..###--$@-#\n#--#-##......#--$--#\n#-----#......#--$--#\n####--###..######$-#\n#---$$$-#..#----#--#\n#-$#---$--$--$$-#$-#\n#--#--##-$--##--#--#\n#-$----$-##-$----$-#\n#--#--##----##--#--#\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#----#--#-#--#--#--#\n#-@#-#-##-$---$---##\n####-#----#--#-$---#\n#----#-##-#$-##-##-#\n#------$---$---$---#\n#..###$$##-$##$-##-#\n#..#.#--#-$---$-#--#\n#....#-$$---##$-####\n#....#--#####------#\n#...###--------##--#\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#....#-------#--#--#\n#....#-#-$--$------#\n#....-##--$#-#-$#$-#\n#...#---$---$#--$--#\n#..####--#-$---$$--#\n#------####-####-###\n#--------#---#-----#\n#-##---#---$-#-$-$-#\n#-##----$-##-$--$--#\n#-----@#-----#---#-#\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#....###-----------#\n#....#####-#--#$#-##\n#....###---#$--$---#\n#....###----$--#$$##\n##--####-$#--#$-$--#\n##--####--$--$--#--#\n#@--####$###$##-$--#\n##--------#--#--$--#\n##---###--#--$--####\n########--#--#-----#\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#-----#-----@#...###\n#-----#------##...##\n#-#-#-##$##-##-....#\n#---$-#---$$$--....#\n###$###-$$--###-##.#\n#-----$--#----#-####\n#--$--#--###--#-#--#\n##-#$##----$--$$---#\n#---$-##---#--#-#--#\n#-----#----#--#----#\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#-----#--#...#@----#\n#-#-------....#----#\n#--$--#---#....#---#\n#-##$####-##....#--#\n#-$---$--#--#...#--#\n#-$$-#---#---#-$$--#\n###--$$$#---$$--$--#\n#-$--#--#----#-$#--#\n#---$#--#-------$--#\n#--#----#----#--#--#\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#####@###.##...##--#\n#####$--..#...#----#\n####----......#--$-#\n###--$-#.....##-#-##\n##--$$#-#####--$-$-#\n##-$#-$----##--$$--#\n##--#--#----#-$--$-#\n##---$$-###-#$##---#\n##-$#------$-$--$-##\n###----#----#----###\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#@-----#---#-------#\n##-###-##--####-#-##\n#----#-#--$$-------#\n#--#-#-#-$-#-$-##-##\n#-----$-#--#$$-#---#\n#--###--#------##-##\n#..#.#-$-#--$-#----#\n#..#.#--$-#-##-$$--#\n#....##---$$--$--#-#\n#.....##--------#--#\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#--#------#---#---##\n#-$#-$-$-##...$--$-#\n#--$--#-##....#-$--#\n#-##-$-##....#---$-#\n#-$----#....##-$---#\n#-$##--#...#-------#\n#---$$$##$##--###-##\n#-#-#--#---#--#----#\n#-$-#--$--##-------#\n#----#----#@-------#\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#--#--#-#----#--#--#\n#---$------$-$-----#\n##-#--#$###$##--##-#\n#---$-----$--#--$--#\n#-###$##$#---#-$---#\n#-#---$-$--######-$#\n#-$--$$-$--#@#.#...#\n#-#-----#--#-#.#...#\n#-##########-#.....#\n#------------#.....#\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#--#-----#--##----##\n#-$#---$-#-----##--#\n#-$--$--#..#-----$-#\n#-$-$--#....#---#-##\n#-$#--#......###-$-#\n#---#--#....#--#$--#\n#-$--####..#---#---#\n##-$---##-#-#-$--$##\n###-$----$#@$-$#---#\n####---#-------#---#\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#------....#----####\n#------....--------#\n#-#-##########-----#\n#-#$---#------###..#\n#--$---#$$###---#..#\n#-$-###-$---$---#..#\n#-$-#---$-$-#--##..#\n#--#--$$-#-$-##---##\n#@##-$#--$--$-----##\n##-------##---#--###\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#--------#---#@-#--#\n#-$$--#$$#-#-#--##-#\n#--#-$-$-#$$-#-----#\n##-#--#--#-#-#--#--#\n#---##-------#-----#\n#---#-$-#---#---#--#\n#-$-#$-#---#--$-#..#\n##$-#--####----#...#\n#--$----------#....#\n#---#--#-----#.....#\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#-----#---#####----#\n##-$--#---####--$--#\n####-$$---#..#--#--#\n#--$--$--##..####-##\n#-$---###....---$$-#\n#--#$#---....#-#-$-#\n#-#--#-$-..###$#---#\n#-#---$-#..#---##--#\n#---$#--####---#-$##\n#-#--#----@#------##\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#---#---#----#---#@#\n#---$--$-----#-$-#-#\n##$#-$###-#----$$#-#\n#--#--#.###--#$-$--#\n#--#$#....#--#-###-#\n#-$--#.....##----#-#\n##$--#.#....#$$-$--#\n#--######..##-#--#-#\n#--$---------$-###-#\n#---#---#--------#-#\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#-#-#-#---#@##---#-#\n#-------------$----#\n#--##$#-#####-$-#-##\n##----##.....#--#--#\n##$##$#.....###$#$-#\n#---#-##.....#--#-##\n#--$----##..##--#--#\n#-$-#---$---$--$$$-#\n##-$--$#-#--#--$---#\n#---##---#--#------#\n####################\n--------------------\n--------------------\n--------------------",
    "####################\n#----##---#----#---#\n#--$--$-----##-$---#\n##-#####--.######-##\n-#-##--##....####-##\n##-##$-###..##-----#\n#------#...-.#-$-$-#\n#-$-##-##-.-###-####\n#-#-$----#.##-#-#---\n#-$-$-#---.####-##--\n#-#--##-#-##--#--##-\n#######--$##$---$-#-\n------##------$-#@#-\n-------#--##-######-\n-------#######------\n--------------------\n--------------------\n--------------------",
    "-------###########-\n-------#---------#-\n-------#----$-$--#-\n######-#-$-#####-#-\n#----#####-$--##$#-\n#-------$-$------#-\n#----------##-##-#-\n#----##@#####-##-#-\n#----####---#-##-##\n#....#------#-$---#\n#....#------#-----#\n######------#######\n-------------------\n-------------------\n-------------------",
    "#############------\n#-----------#------\n#-###-$$----#------\n#---#-$--$--#------\n#--$####$######----\n#-$-##--------#####\n#--$$-$--------...#\n###-##-$$#-----...#\n--#-##---#-----...#\n--#------#-----...#\n--###@#############\n----###------------\n-------------------\n-------------------\n-------------------",
    "--#################\n###@##---------...#\n#----#---------...#\n#-$--#---------...#\n#-$$-#---------...#\n##-$-###$##########\n-#-###--$-#--------\n##---$--$-#--------\n#--$-#--$-#--------\n#-$--#----#--------\n#--$-#----#--------\n#----#----#--------\n###########--------\n-------------------\n-------------------\n-------------------",
    "--------------#####\n-----##########---#\n-----#--------#---#\n-----#--$-$----$$-#\n-----#-#####-##-$-#\n-----#$$---#$##-$-#\n-----#-###-#-##$--#\n######-###-$-$----#\n#....--------##---#\n#....--------######\n#....--------#-----\n###########@##-----\n----------###------\n-------------------\n-------------------\n-------------------",
    "----######-------\n-####----#-------\n-#----##-#-------\n-#-$-----#-------\n###-####-########\n#--$---$-##--...#\n#---$$-$$----...#\n#----$--$##--...#\n##@##-##-##--...#\n-###--$--########\n-#---$$--#-------\n-#----#--#-------\n-#########-------\n-----------------\n-----------------\n-----------------",
    "#######-#########\n#-----#-#---##--#\n#-###-#-#---$---#\n#-#-$-###---$---#\n#---$$------##$-#\n#----####---##--#\n#@############-##\n###..----#####$-#\n--#..----####---#\n--#..-------$$--#\n--#..----####-$-#\n--#..----#--#---#\n--########--#####\n-----------------\n-----------------\n-----------------",
    "#######---------\n#-----##########\n#-----#----#--##\n#-$---#---$-$--#\n#--$--#--$-##--#\n#-$$--##$-$----#\n##-#--##-#######\n##-#--##----...#\n#--#$-------...#\n#---$$------...#\n#-----##@#--...#\n################\n----------------\n----------------\n----------------",
    "############--------\n#------#---##-------\n#-$--$---#--######--\n####--#####------#--\n-#..--#-----####-#--\n-#.####--####----#--\n-#....----#--$-####-\n-#-...#---#-$$$#--##\n###.####-##--$@$---#\n#-----#####-$-#----#\n#-#.#-$------$###$-#\n#-#.########--#--$-#\n#-#..--------##--$-#\n#-#-#######-$-#-#--#\n#---#-----#-------##\n#####-----##########\n--------------------\n--------------------\n--------------------",
    "################-\n#-------#@-#---#-\n#-#-#-#-#-$--$$#-\n#-#...#-#$$$---#-\n#--...#-#-$--$$##\n#-##.##-#-##----#\n#-#...-----$----#\n#-##-###--#######\n#----#-####------\n######-----------\n-----------------\n-----------------\n-----------------",
    "----#####-------\n-####---##-#####\n-#--$----###---#\n-#-$@$-$----$--#\n-#-#$########-##\n-#-#--$--#-----#\n-#-#-$-$-#-#---#\n##-#--$#-#-#####\n#--##----#-----#\n#----$-#-###---#\n#####-##--#....#\n#----$-----....#\n#---------#....#\n################\n----------------\n----------------\n----------------",
    "#############----\n#........####----\n#...####-#--#####\n#...#--###----$-#\n#...$$-----$-$--#\n#--.#--$-$#-$--##\n#...#-#$#---$--#-\n#.#-#-$---$----#-\n#.--#$###$####$#-\n##--#---$-$----#-\n-#--#--$@$--#--#-\n-#--#-####-$--$#-\n-#--#----###---#-\n-#--#-$$-#-#####-\n-#--#----#-------\n-#########-------\n-----------------\n-----------------\n-----------------",
    "-##################-\n-#---$-------...#.##\n-#-------####.....-#\n-#-#######--#.....-#\n-#-#----$-$-##....##\n-#-#--$-#-#-###...#-\n-#-#-$@$-$--#####-#-\n##-#--$--$-$$---$-#-\n#--#$#-$#---#-$##-#-\n#-##----##-##-$-#-#-\n#-#-$#-$-$--#-----#-\n#-#---------#######-\n#-########$##---#---\n#--------#--$---#---\n########----#####---\n-------###--#-------\n---------####-------\n--------------------\n--------------------\n--------------------",
    "####################\n#..#----#----------#\n#.$--$--#$$--$##-$##\n#.$#--###--##-##---#\n#--#-$-#--$$---$---#\n#-###--#-#--#$--####\n#--##-#-$---#@-#---#\n#-$----$--##.##--$-#\n#--#-$#-$#-$-----###\n#--#--#--#---###---#\n#--########-#------#\n#-----------#--#.#.#\n##$########$#---...#\n#----.*--#----##.#.#\n#-.*...*---$--.....#\n####################\n--------------------\n--------------------\n--------------------\n--------------------"
]
