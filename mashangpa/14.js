function getUrlM() {
    const ts = new Date().getTime()

    function t1(str) {
        let n = 0;
        for (let i = 0; i < str.length; i++) {
            var charCode = str.charCodeAt(i);
            for (let j = 0; j < 20; j++)
                switch (j % 3) {
                    case 0:
                        n = n ^ (charCode << j % 8);
                        break;
                    case 1:
                        n = (n ^ charCode >> j % 8)
                        break;
                    case 2:
                        n = n ^ charCode;
                }
        }
        return n.toString(16);
    }

    function t2(N) {
        var W = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        let O = '', L, y, k, H, D, K, S, I = 0;
        while(I < N.length){
            L = N.charCodeAt(I++)
            y = I < N.length ? N.charCodeAt(I++) : 0
            k = I < N.length ? N.charCodeAt(I++) : 0
            H = L >> 2
            D = (3 & L) << 4 | (y >> 4)
            K = (((15 & y) << 2) | (k >> 6))
            S = 63 & k
            isNaN(y) ? K = S = 64 : isNaN(k) && (S = 64)
            O = (O + W.charAt(H)) + W.charAt(D) + W.charAt(K) + W.charAt(S)
        }
        return O;
    }

    let p = t1('dasdasdarqwdasdasqwdasda' + ts)
    return t2(`${p}${ts}`)
}


const getPage = async(page) => {

    const urlM = getUrlM()

    const response = await fetch(`https://www.mashangpa.com/api/problem-detail/14/data/?m=${urlM}`, {
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
            "cookie": "sessionid=xxxxxxxxxxxxxxxxxxxx;",
            "Referer": "https://www.mashangpa.com/problem-detail/14/",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        },
        "body": null,
        "method": "GET"
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
