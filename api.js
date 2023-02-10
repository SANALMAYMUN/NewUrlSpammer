const axios = require('axios');
const { exit } = require('process');
const fs = require('fs').promises;
const token = "OTAzNjYzMzg0NjQ4NjQ2NzE4.GbGcQD.wRXW-reQbPI4M_nIK6PV06CR7im-mVWO5tbLjI";
const url = "quarex"
const guild = "1071197375470784612";
proxyyjson = {}
fs.readFile('proxy.txt', 'utf8').then(async (data) => {
    const proxies = data.split("\r\n");
    setInterval(async () => {
        const proxy = proxies[Math.floor(Math.random() * proxies.length)]
        axios.get('https://api.ipify.org?format=json', {
            proxy: {
                protocol: 'http',
                host: proxy.split(":")[0],
                port: proxy.split(":")[1]
            }
        }).then(async (res) => {
            await changeVanity(proxy)
        }).catch((err) => {
            console.log("\x1b[33m [URL MERT] PROXY ERROR : " + proxy)
        })
    }, 1500)
})


async function changeVanity(proxy) {
    const res = await axios.patch(`https://discord.com/api/v6/guilds/${guild}/vanity-url`, {
        code: url
    }, {
        headers: {
            "Authorization": token
        },
        proxy: {
            protocol: 'http',
            host: proxy.split(":")[0],
            port: proxy.split(":")[1]
        }
    }).then((res) => {
        console.log(res.data)
        if (res.status == 200) {
            console.log("\x1b[32m [URL MERT] VANITY URL CHANGED : " + proxy + " | " + "discord.gg/" + url)
            exit()
        } 
    }).catch((err) => { 
        if (err.response.status == 429) {
            console.log("\x1b[33m [URL MERT] RATE LIMIT : " + proxy + " | " + "discord.gg/" + url)
        } else if (err.response.status == 400) {
            console.log("\x1b[33m [URL MERT] VANITY URL ALREADY EXISTS : " + proxy + " | " + "discord.gg/" + url)
        } else {
        console.log("\x1b[33m [URL MERT] VANITY URL NORMAL ERROR : " + proxy + " | " + "discord.gg/" + url)
    
        }
    })
}