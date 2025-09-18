const CryptoJS = require('crypto-js');

function getUUIDVersion4() {
    var _0xee3b28 = [];
    var _0x454710 = '0123456789abcdef';
    for (var i = 0; i < 32; i++) {
        _0xee3b28[i] = _0x454710.substr(Math.floor((Math.random() * 16)), 1);
    }
    _0xee3b28[14] = '4';
    _0xee3b28[19] = _0x454710.substr(
        ((_0xee3b28[19] & 3) | 8),
        1
    );
    _0xee3b28[8] = _0xee3b28[13] = _0xee3b28[18] = _0xee3b28[23];

    return _0xee3b28.join('');
}

function getHeaderT() {
    return Date.now()
}
function getHeaderR() {
    return getUUIDVersion4()
}
function getHeaderS(page, uuid, timestamp) {
    const rawText = `{"page":"${page}"}${uuid}${timestamp}`
    const md5String = CryptoJS.MD5(rawText).toString(CryptoJS.enc.Hex)
    return md5String
}

const getPage = async(page) => {
    const headerT = getHeaderT()
    const headerR = getHeaderR()
    const headerS = getHeaderS(page, headerR, headerT)

    const response = await fetch("https://www.mashangpa.com/api/problem-detail/13/data/", {
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
            "Referer": "https://www.mashangpa.com/problem-detail/13/",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
            "t": headerT,
            "r": headerR,
            "s": headerS,
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