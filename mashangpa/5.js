const CryptoJS = require('crypto-js')

function encrypt(data) {
    const key = CryptoJS.enc.Utf8.parse('jo8j9wGw%6HbxfFn');
    const iv = CryptoJS.enc.Utf8.parse('0123456789ABCDEF');
    const parseData = CryptoJS.enc.Utf8.parse(data);
    const encryptData = CryptoJS.AES.encrypt(
        parseData,
        key,
        {
            'mode': CryptoJS.mode.CBC,
            'padding': CryptoJS.pad.Pkcs7,
            'iv': iv
        }
    )
    return encryptData.ciphertext.toString(CryptoJS.enc.hex)
}

const getPage = async(page) => {
    const timestamp = new Date().getTime();

    const xl = encrypt(JSON.stringify({
        page: page,
        _ts: timestamp,
    }))

    const response = await fetch("https://www.mashangpa.com/api/problem-detail/5/data/", {
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
            "Referer": "https://www.mashangpa.com/problem-detail/5/",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        },
        "body": JSON.stringify({
            "xl": xl
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