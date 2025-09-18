const CryptoJS = require('crypto-js')

function generatorPostM(time) {
    const text = `9527${time}`
    return CryptoJS.HmacSHA1(text, "xxxooo").toString();
}

function generatorPostTt(time) {
    return btoa(`${time}`)
}

const getPage = async(page) => {
    const time = new Date().getTime();

    const postM = generatorPostM(time);
    const postT = generatorPostTt(time)

    const response = await fetch(`https://www.mashangpa.com/api/problem-detail/9/data/`, {
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
            "Referer": "https://www.mashangpa.com/problem-detail/9/",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        },
        "body": JSON.stringify({
            "page": page,
            "m": postM,
            "tt": postT,
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

for(let i = 0 ; i < 999999 ; i++){clearInterval(i);}