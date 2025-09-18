const CryptoJS = require('crypto-js');


function decryptFontNumber(c) {
    const FONT_DECRYPT_MAP = {
        'ꙮ': '0',
        'ઊ': '1',
        'સ': '2',
        'ત': '3',
        'ধ': '4',
        'ન': '5',
        'પ': '6',
        'ફ': '7',
        'બ': '8',
        'ભ': '9'
    };

    return c.split('').map(f => FONT_DECRYPT_MAP[f]).join('');
}

const getPage = async(page) => {

    const response = await fetch(`https://www.mashangpa.com/api/problem-detail/17/data/?page=${page}`, {
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
            "cookie": `sessionid=xxxxxxxxxxxxxxxxxxxx;`,
            "Referer": "https://www.mashangpa.com/problem-detail/17/",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        },
        "body": null,
        "method": "GET"
    });

    let json = await response.json()

    return json.current_array.reduce((a, b) => {
        const newB = decryptFontNumber(b)
        return a + (+newB)
    }, 0);
}

const run = async() => {
    let total = 0;
    for(let i = 1; i <= 20; i++){
        total += (await getPage(i))
    }

    console.log(`total: ${total}`)
}


run()
