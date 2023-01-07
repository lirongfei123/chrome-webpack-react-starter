var qs = require('qs');
async function getInfo() {
    var games = document.querySelectorAll(`a[class*='Grid__PageHomeSummaryTile-'][class*='SummaryTile__SummaryTileBaseTile-'][class*='BaseTile__BaseTileWrapper']`);
    if (games.length == 0) {
        games = document.querySelectorAll(`a[class*='Grid__PageGameSummaryTile'][class*='SummaryTile__SummaryTileBaseTile-'][class*='BaseTile__BaseTileWrapper']`);
    }
    if (games.length == 0) {
        games = document.querySelectorAll(`a[class*='Grid__PageCategorySummaryTile'][class*='SummaryTile__SummaryTileBaseTile-'][class*='BaseTile__BaseTileWrapper']`);
    }
    var gameElements = [...games];
    const requestData = [];
    for (var i = 0; i < gameElements.length; i++) {
        const gameElement = gameElements[i];
        // 至少包含图片和标题, 否则就不管
        // console.log(gameElement.className);
        // const imageClass = '.' + gameElement.className.split(' ').join('.') + ` picture`;
        const pictureElement = gameElement.querySelector('img');
        const titleElement = gameElement.querySelector(`span[class^='SummaryTile__SummaryTileTitle-sc-']`);
        const gameUrl = gameElement.href;
        const gameDomain = gameUrl.substring(gameElement.href.lastIndexOf('/') + 1);
        const data: any = {
            gameUrl: gameElement.href,
            gameDomain: gameDomain,
            infoRefer: location.href,
            infoCookie: document.cookie,
            infoAgent: navigator.userAgent
        };
        if (pictureElement) {
            const imgUrl = pictureElement.src;
            // 获取后缀名, 文件名
            const full_filename = imgUrl.substring(imgUrl.lastIndexOf('/') + 1);
            const nameArr = full_filename.split('.');
            const filename = nameArr[0];
            const extname = nameArr[1];
            const fileImgUrl = `https://img.poki.com/cdn-cgi/image/quality=100/${filename}.${extname}`;
            data.extname = extname;
            data.imgUrl = fileImgUrl;
            // 拼接完整的url
        }
        if (titleElement) {
            data.title = titleElement.innerHTML;
        }
        var video = gameElement.querySelector('video');
        if (video) {
            data.video = {};
            var sources = [...video.getElementsByTagName('source')];
            for (let j = 0; j < sources.length; j++) {
                var source = sources[j];
                if (source) {
                    const sourceSrc3 = source.src.replace('2x2', '3x3');
                    console.log(sourceSrc3);
                    const videoFileName = sourceSrc3.substring(sourceSrc3.lastIndexOf('/') + 1);
                    data.video[videoFileName] = sourceSrc3;
                }
                
            }
        }
        console.log(data);
        requestData.push(data);
    }
    runRequest(requestData);
};
function runRequest(requestData) {
    var index = 0;
    const _run = () => {
        const data = requestData[index];
        requestAjax('check', data).then((checkRes) => {
            if (checkRes.exist) {
                if (index < requestData.length - 1) {
                    index++;
                    _run();
                }
            } else {
                requestAjax('save', data).then(() => {
                    if (index < requestData.length - 1) {
                        index++;
                        setTimeout(() => {
                            _run();
                        }, 5000);
                    }
                });
            }
        });
    }
    _run();
}
var button = document.createElement('button');
button.innerHTML = '获取游戏信息';
button.style.cssText = 'position: fixed; z-index: 10000; top: 0; left: 0;'
document.body.appendChild(button);
button.onclick = () => {
    getInfo();
}
function requestAjax(type: string, params: any) {
    const urlObj = {
        save: 'saveGameImgAndTitle',
        check: 'checkGameInfoExist'
    }
    return fetch('https://www.fit.kim/download/' + urlObj[type], {
        method: 'post',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify(params)
    }).then(async (res) => {
        try {
            return await res.json();
        } catch (e) {
            console.error(e);
            return {};
        }
    });
}