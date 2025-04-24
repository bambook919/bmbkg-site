let statsData = {};
const client = new Ably.Realtime("cCwCqw.sBu_jQ:hAHwDUUdG_w0EAxyMY3TzRf6aQkIKDgTcQlAOav81ME");
        const utils = {
            rn: (count) => {
                count = Math.floor(count);
                let i = 0 === count ? count : Math.floor(Math.log(count) / Math.log(1000)); 
                let result = parseFloat((count / Math.pow(1000, i)).toFixed(2)); 
                if (i > 25) return "TOO MUCH";
                    result += "" + ["", "K", "KK", "KKK", "KKKK", "KKKKK", "KKKKKK", "KKKKKKK", "KKKKKKKK", "KKKKKKKKK", "KKKKKKKKKK", "KKKKKKKKKKK", "KKKKKKKKKKKK", "KKKKKKKKKKKKK", "KKKKKKKKKKKKKK", "KKKKKKKKKKKKKKK", "KKKKKKKKKKKKKKKK", "KKKKKKKKKKKKKKKKK", "KKKKKKKKKKKKKKKKKK", "KKKKKKKKKKKKKKKKKKK", "KKKKKKKKKKKKKKKKKKK", "KKKKKKKKKKKKKKKKKKKK", "KKKKKKKKKKKKKKKKKKKKK", "KKKKKKKKKKKKKKKKKKKKKK", "KKKKKKKKKKKKKKKKKKKKKK"][i];
                return result;
            },
            decl: (n, titles) => { return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2] },
        }
        function SetStats(data) {
            if(data.data.players && Number.isNaN(data.data.players) == false) document.getElementById('players-count').innerText = (+data.data.players || 0).toLocaleString('en');
            if(data.data.playtime && Number.isNaN(data.data.playtime) == false) document.getElementById('playtime-count').innerText = (+data.data.playtime || 0).toLocaleString('en');
            if(data.data.kills && Number.isNaN(data.data.kills) == false) document.getElementById('kills-count').innerText = (+data.data.kills || 0).toLocaleString('en');
            if(data.data.ascension && Number.isNaN(data.data.ascension) == false) document.getElementById('ascension-count').innerText = (+data.data.ascension || 0).toLocaleString('en');
            if(data.data.gold && Number.isNaN(data.data.gold) == false) document.getElementById('gold-count').innerText = utils.rn(+data.data.gold || 0);
            if(data.data.overallAtk && Number.isNaN(data.data.overallAtk) == false) document.getElementById('overallatk-count').innerText = utils.rn(+data.data.overallAtk || 0);
            data.data.leaderboard.forEach((t, i) => {
                document.getElementById(`lb${i}-login-text`).innerText = t.login;
                document.getElementById(`lb${i}-ascension-text`).innerHTML = `ASCENSION #${t.ascension.toLocaleString('en')}<br>ENEMIES KILLED: ${(t.totalKills || 0).toLocaleString('en')}`;
            });
            document.getElementById('serverstatus').innerText = "Server Status: OK";
        }
        setTimeout(() => {
        client.channels.get('site').subscribe('stats', async (d) => {
            SetStats(d);
        });
        client.channels.get('site').publish('getstats', { });
        }, 5);