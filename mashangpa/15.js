function S() {
    const obj = {
        base_fileds: [4, 4, 4, 4, 1, 1, 1, 3, 2, 2, 2, 2, 2, 2, 2, 4, 2, 1],
        toBuffer: function () {
            for (var u = obj.base_fileds, c = [], s = -1, v = 0, f = u.length; v < f; v++)
                for (var l = obj[v], p = u[v], d = s += p; c[d] = l & 255,
                --p != 0; )
                    --d,
                        l >>= 8;
            return c
        }
    }
    //this['base_fileds'] = [4, 4, 4, 4, 1, 1, 1, 3, 2, 2, 2, 2, 2, 2, 2, 4, 2, 1]
    for (let i = 0; i < obj.base_fileds.length; i++){
        obj[i] = 0
    }
    obj[0] = Math.random() * 4294967295
    obj[1] = 1736664896
    obj[2] = tools.timeNow()
    obj[3] = tools.strHash('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36')
    obj[4] = tools.getPlatform()
    obj[5] = tools.getBrowserIndex()
    obj[6] = tools.getPluginNum()
    obj[7] = 0 //tools.getMouseMove()
    obj[8] = 0 //tools.getMouseClick()
    obj[9] = 0 //tools.getMouseWhell()
    obj[10] = 0 //tools.getKeyDown()
    obj[11] = 0 //tools.getClickPos().x
    obj[12] = 0 //tools.getClickPos().y
    obj[13] = tools.getBrowserFeature()
    // obj[14] = ''
    obj[15] = 0
    obj[16] = 2
    obj[17] = 3
    return obj
}

const tools = {
    serverTimeNow:  function() {
        return parseInt(1736664896.387)
    },
    timeNow: function(){
        return (new Date()).getTime() / 1000 >>> 0
    },
    strHash: function (n) {
        let c = 0
        for (let i = 0 ; i < n.length; i++)
            c = (c << 5) - c + n.charCodeAt(i)
            c = c >>> 0
        return c
    },
    getBrowserFeature: function(){
        // var n = []
        // for (let i = 0; i < 16; i++)
        //     n[i] = tn[i]();
        var n = [false, false, true, false, false, true, false, false, false, true, true, true, false, false, false, false]
        return tools.booleanToDecimal(n)
    },
    booleanToDecimal: function(n) {
        var o = 0
        for (var i = n.length - 1; i >= 0; i--){
            o = o << 1 | +n[i];
        }
        return o
    },
    getPlatform: function() {
        var platform = 'MacIntel'
        let matches = [/^Win32/, /^Win64/, /^Linux armv|Android/, /^Android/, /^iPhone/, /^iPad/, /^MacIntel/, /^Linux [ix]\d+/, /^ARM/, /^iPod/, /^BlackBerry/]
        for (var i = 0; i < matches.length; i++)
            if (matches[i].test(platform)){
                return i + 1;
            }
        return 0
    },
    getBrowserIndex: function(){
        return 10
    },
    getPluginNum: function(){
        return 5
    },
    encode: function(n){
        function x(n) {
            for (var e = 0, i = 0, u = n.length; i < u; i++)
                e = (e << 5) - e + n[i];
            return e & 255
        }
        function g(n, a, o, i, u) {
            for (var c = '11', v = '11', f = n.length; a < f; )
                o[i++] = n[a++] ^ u & parseInt('11' + '11' + '11' + '11', 2),
                    u = ~(u * 131)
        }
        function w(n) {
            let m = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
            for (var t = '0', i = 0, v = n.length, f = []; i < v; ) {
                var l = n[i++] << parseInt('1' + t, 16) | n[i++] << 8 | n[i++];
                f.push(m.charAt(l >> 18), m.charAt(l >> 12 & 63), m.charAt(l >> 6 & parseInt('6' + '3', 10)), m.charAt(l & 63))
            }
            return f.join('')
        }

        var r = x(n)
        var e = [3, r];
        g(n, 0, e, 2, r)
        return w(e)
    }
}

function getCookieV(){
    const ts = (new Date()).getTime()
    return btoa(tools.encode(
        S().toBuffer()
    ) + ts)
}

const getPage = async(page) => {

    const cookieV = getCookieV()

    const response = await fetch(`https://www.mashangpa.com/api/problem-detail/15/data/?page=${page}`, {
        "headers": {
            "accept": "*/*",
            "accept-language": "zh-TW,zh;q=0.9,en;q=0.8,en-US;q=0.7",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "cookie": `sessionid=xxxxxxxxxxxxxxxxxxxx; v=${cookieV};`,
            "Referer": "https://www.mashangpa.com/problem-detail/15/",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
            "hexin-v": cookieV
        },
        "method": "POST",
        "body": JSON.stringify({
            page: `${page}`
        }),
    });

    let json = await response.json()

    return json.current_array.reduce((a, b) => a + b, 0);
}

const run = async() => {
    let total = 0;
    for(let i = 1; i <= 20; i++){
        total += (await getPage(i))
    }

    console.log(`total: ${total}`)
}


run()
