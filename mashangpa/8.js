// 需要 hook 底下js function

// javascript:setInterval = () => {};for(let i = 0 ; i<999999;i++){clearInterval(i)};


const CryptoJS = require('crypto-js')

function generatorCookieS(time){
    function groupMessage(str) {
        const fragments = str.split('');
        const newArr = [];
        for (let i = 0; i < fragments.length; i += 4){
            newArr.push(fragments.slice(i, i + 4));
        }
        return newArr;
    }

    function encryptGroup(charsArr) {
        return charsArr.map((chars) => {
            return chars.map((char) => {
                const charCode = char.charCodeAt(0)
                const a1 = charCode << 3 | charCode >>> 5
                const a2 = a1 ^ 0x5a
                const a3 = (a2 << 2) | (a2 >>> 6)
                const a4 = a3 ^ 0x3f
                const a5 = a4 % 256
                return String.fromCharCode(a5)
            })
        })
    }

    function mergeGroups(charsArr) {
        return charsArr.flat().join('')
    }

    function toHexString(_0x1ebd7f) {
        return Array.from(_0x1ebd7f).map(_0xc67c4c => {
            return _0xc67c4c.charCodeAt(0).toString(16).padStart(2, '0')
        }).join('');
    }

    const charsArr = groupMessage(`xoxoxoxo${time}`)
    const encryptCharsArr = encryptGroup(charsArr)
    const t1 = mergeGroups(encryptCharsArr)
    const t2 = toHexString(t1)

    return t2
}

function generatorHeaderM(page, time) {
    const text = `oooooo${time}${page}`
    const key = 'oooooo'

    const fragmentsTexts = text.split('')
    const fragmentKeys = key.split('')

    let _0x5ad857 = [];
    for (let i = 0; i < fragmentsTexts.length; i += 4) {
        let _0x38ae5f = fragmentsTexts.slice(i, i + 4);
        for (let j = 0; j < _0x38ae5f.length; j++) {
            const a1 = _0x38ae5f[j].charCodeAt(0)
            const a2 = fragmentKeys[(j % fragmentKeys.length)].charCodeAt(0)
            const a3 = ((a1 + a2) % 256)
            _0x38ae5f[j] = String.fromCharCode(a3);
        }
        _0x5ad857 = _0x5ad857.concat(_0x38ae5f);
    }
    const _0x28d8b9 = _0x5ad857.join('')
    const _0x36bdd2 = Array.from(_0x28d8b9).map(_0x3c7e7a => _0x3c7e7a.charCodeAt(0).toString(16).padStart(2, '0')).join('');
    return _0x36bdd2;
}
function generatorHeaderT(time) {
    return btoa(`${time}`)
}

const getPage = async(page) => {
    const time = new Date().getTime();

    const cookieS = generatorCookieS(time)
    const headerM = generatorHeaderM(time)
    const headerT = generatorHeaderT(time)

    const response = await fetch(`https://www.mashangpa.com/api/problem-detail/8/data/`, {
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
            "cookie": `sessionid=xxxxxxxxxxxxxxxxxxxx; s=${cookieS};`,
            "Referer": "https://www.mashangpa.com/problem-detail/8/",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
            "m": headerM,
            "t": headerT
        },
        "body": JSON.stringify({
            "page": page
        }),
        "method": "POST",
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