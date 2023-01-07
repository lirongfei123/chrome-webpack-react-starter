// setTimeout(() => {
//     console.log(document.documentElement.innerHTML);
// }, 4000);
// fetch('').then(async data => {
//     console.log(data);
//     console.log(await data.text());
// });
// https://74b97156-f40b-11e9-859c-c6053849a814.poki-gdn.com/7e2950e6-774d-44a0-bd90-36a3cf4aaaf6/index.html?country=CN&url_referrer=https%3A%2F%2Fpoki.com%2F&tag=pg-v3.21.0-exp-gpt-preload&categories=4%2C9%2C53%2C64%2C96%2C183%2C750%2C929%2C1120%2C1140%2C1143%2C1147%2C1156%2C1159&site_id=3&ab=v2.300.0&experiment=a-8142ceae&iso_lang=en&poki_url=https%3A%2F%2Fpoki.com%2Fen%2Fg%2Fsushi-party-io&v=1663495936001&game_id=74b97156-f40b-11e9-859c-c6053849a814&game_version_id=7e2950e6-774d-44a0-bd90-36a3cf4aaaf6
const qs = require('qs');
const gameframe = document.getElementById('gameframe');
console.log(location.href);
const href = location.href;
const urlObj = new URL(href);
const params = qs.parse(location.search);
console.log(params);
fetch(href).then(async data => {
    const html = await data.text();
    const poki_url = params.poki_url;
    const gameId = poki_url.slice(poki_url.lastIndexOf('/') + 1);
    fetch('https://www.fit.kim/download/saveHtml', {
        method: 'post',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify({
            gameId: gameId,
            gameVersion: params.game_version_id,
            extraParams: JSON.stringify({
                ...params,
                refer: location.href,
                'user-agent': navigator.userAgent,
                cookie: document.cookie
            }),
            html: html.replace(/(https:)?\/\/game-cdn\.poki\.com\/scripts\/v(?:2|3)\/poki-sdk\.js/g, '/lrp_sdk/poki-sdk.js')
                .replace(/(https:)\/\/game-cdn\.poki\.com\/loaders\/v(?:1|2|3)\/master-loader\.js/, '/lrp_sdk/master-loader.js')
            
        })
    });
});