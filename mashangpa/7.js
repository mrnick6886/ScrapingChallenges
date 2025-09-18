const CryptoJS = require('crypto-js')

function generatorUrlX(headerM) {
    return encodeURIComponent(
        CryptoJS.SHA256(headerM + "xxoo")
    )
}

function generatorHeaderM(time) {
    const data = "xialuo" + time

    return CryptoJS.MD5(data).toString()
}

const decrypt = (encryptedHex) => {
    let key = CryptoJS.enc.Utf8.parse("xxxxxxxxoooooooo");
    let iv = CryptoJS.enc.Utf8.parse("0123456789ABCDEF");

    let parseEncryptedHex = CryptoJS.enc.Hex.parse(encryptedHex);
    let decryptBuffer = CryptoJS.AES.decrypt({
            ciphertext: parseEncryptedHex
        },
        key,
        {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
            iv: iv,
        });
    return decryptBuffer.toString(CryptoJS.enc.Utf8);
}

const getPage = async(page) => {
    const time = new Date().getTime();
    const headerM = generatorHeaderM(time);
    const urlX = generatorUrlX(headerM);

    const response = await fetch(`https://www.mashangpa.com/api/problem-detail/7/data/?page=${page}&x=${urlX}`, {
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
            "Referer": "https://www.mashangpa.com/problem-detail/7/",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
            "m": generatorHeaderM(time),
            "ts": time,
        },
        "body": null,
        "method": "GET"
    });

    let json = await response.json()

    json = JSON.parse(decrypt(json.r))

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