/*Copyright by lance Francisco. Personalized for Production of HO TV */

function _iS({file,container, videoSelect, custom_element_class, delay, display_container}){
    var vidElem = document.querySelector(videoSelect),
    timeS_reg = /([0-9]{1,2})?:?([0-9]{2}):([0-9]{2}\.[0-9]{2,3})/, 
    groupSubs = [],
    startT = [],
    endT = [],
    styles = [],
    cClass, dLay, dcT;

    if(custom_element_class == undefined)cClass = "_innerSub"
    else{cClass = custom_element_class;}
    if(display_container == undefined)dcT = false 
    else{dcT = true;}
    if(delay !== undefined) dLay = delay
    else{dLay = 0}

    (function readF(f){
        $.get(f, function(data) {
            readAparse(data)
        }, 'text')
    }(file))

    //regex function from https://github.com/osk/node-webvtt/blob/master/lib/parser.js
    function readAparse(a){
    var outputFile = a,
    splitLines = outputFile.split("\n\n");
    for(var i=0; i < splitLines.length; i++){
            sg = splitLines[i].split("\n");
            if(sg[0] !== "NOTE" && sg.length > 1 && sg[0] !== "WEBVTT")groupSubs.push(sg);
            (splitLines.length - 1 === i) ? getDet():'';
    }

        function getDet(){
            var indiv = document.createElement("div");
            indiv.className = "__innerVTT";
            document.querySelector(container).appendChild(indiv)
            var i = 0;
            while(i < groupSubs.length){

                for(var t = 0; t< groupSubs[i].length; t++){
                    if (groupSubs[i][t].match(timeS_reg)) {
                        var o = groupSubs[i][t].split(" --> ")[1],
                        v = o.match(timeS_reg);
                        l = groupSubs[i][t].split(" --> ")[0].match(timeS_reg);
                        s = o.replace(timeS_reg, '').trim().split(" ").map(x => x.split(":"));
                        startT.push(cSec(l)) 
                        endT.push(cSec(v)) 
                        styles.push(s) 
                        continue;
                    }
                }
            i++
            }  
        }

    }

    var posArray = 0, runAg = true;
    vidElem.onplay = ()=>{playVid()};
    vidElem.ontimeupdate = ()=>{playVid()};
    vidElem.onseeking = ()=>{seekSec();}
    function playVid(){
        var vidCurTime = vidElem.currentTime;
        if(vidCurTime + dLay > startT[posArray] && runAg){
            diN(false);
            var e = getSP(groupSubs[posArray]), hsty = stRet(styles[posArray]);
            var cont = document.querySelector(".__innerVTT");
            cont.style.cssText = hsty;
            for(e; e < groupSubs[posArray].length; e++){
                var div = document.createElement("div");
                div.innerHTML = "<p>" + groupSubs[posArray][e]+ "</p>";
                div.className = cClass;
                cont.appendChild(div)
            }
            runAg = false;
        }
        if(vidCurTime + dLay >= endT[posArray]){
            diN(true);
            //console.log('%cend cue', "color:green")
            posArray++; 
            remElem()
            runAg = true; 
        }
    }

    function diN(a){
        if(dcT){
            if(a){
                document.querySelector(container).style.display="none";
            }else{
                document.querySelector(container).style.display="block";
            }
        }
    }

    function seekSec(){
        var a = closest(Math.floor(vidElem.currentTime), startT),
        j = startT.indexOf(a), vC = vidElem.currentTime;
        if(vC < a && vC < endT[j - 1]){
            posArray = j - 1;
        }else{
            posArray = j;
            runAg = true;
        }
        remElem()

    }

    function remElem(){
        const eEm = document.getElementsByClassName(cClass);
        while(eEm.length > 0){eEm[0].remove();}
    }

    function getSP(a){for(var t = 0; t< a.length; t++){if (a[t].match(timeS_reg)) return t + 1;}}

    function cSec(a){
        var s = parseFloat(a[3]), m = parseFloat(a[2]) * 60, h = parseFloat(a[1]) * 3600;
        if(a[1] == undefined)h = 0;
        return parseFloat((s + m + h).toFixed(1))
    };

    function stRet(a){
        var m = {"align": "text-align", "position": "left",  "start": "left", "middle": "center", "end": "right", "vertical": "transform", "rl": "rotate(90deg); width: fit-content", "lr":"rotate(-90deg); width: fit-content", "line": "top", "-1": "100%", "size": "width"},value = "";

        for(var e = 0;e < a.length; e++){
                var w = a[e], prop = w[0], val = w[1], regPer = /(\d+)(%)/;
                    if(m[prop] == undefined){
                        value += prop + ": ";
                    }else{
                        value += m[prop] + ": ";
                    }

                    if(m[val] == undefined){
                            if(regPer.test(val)){
                                split = val.match(regPer)
                                //console.log(split[1])
                                    if(parseInt(split[1]) == 100){
                                        if(prop == "position"){
                                            //console.log('position')
                                            value += "100%; transform: translate(-100%, 0px);"
                                        }else if(prop == "line"){
                                            //console.log('line')
                                            value += "100%; transform: translate(-50%, -100%);"
                                        }
                                    }else{
                                        value+=val + "; ";
                                    }
                            }else{
                                value += val + "; ";
                            }
                    }else{
                        value += m[val] + "; ";
                    }
        if(e == a.length - 1)return value;
    }
    }

    function closest (num, arr) {
        var curr = arr[0], diff = Math.abs (num - curr);
        for (var val = 0; val < arr.length; val++) {
            var newdiff = Math.abs (num - arr[val]);
            if (newdiff < diff) diff = newdiff,curr = arr[val];
        }
        return curr;
    }
}

//_iS({file: "output.vtt",container: ".subtitleOn", videoSelect: "#video", custom_element_class: "nono"})
//IE 5.5 Opera 9 support browsers
/*Consider While loop for large list*/
