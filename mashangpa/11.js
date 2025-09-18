const fs = require('fs')

window = global

const loadWasm = async() => {
    const wasmBuffer = fs.readFileSync('./11.wasm')
    const result = await WebAssembly.instantiate(wasmBuffer)
    window.exports = result.instance.exports
}

const generatorUrlM = (page, time) => {
    return window.exports.encrypt(page, time)
}


const getPage = async(page) => {
    const time = Math.floor((new Date()).getTime() / 1000);

    const urlM = generatorUrlM(page, time)

    const response = await fetch(`https://www.mashangpa.com/api/problem-detail/11/data/?page=${page}&m=${urlM}&_ts=${time}`, {
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
            "Referer": "https://www.mashangpa.com/problem-detail/11/",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        },
        "body": null,
        "method": "GET"
    });

    let json = await response.json()

    return json.current_array.reduce((a, b) => a + b, 0);
}

const run = async() => {
    await loadWasm()
    let total = 0;
    for(let i = 1; i <= 20; i++){
        total += (await getPage(i))
    }

    console.log(`total: ${total}`)
}


run()
