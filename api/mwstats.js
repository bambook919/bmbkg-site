const mongo = require('mongoose');
    mongo.connect('mongodb+srv://junytwork:ADMIN1@mnstr.wiubncu.mongodb.net/general?retryWrites=true&w=majority&appName=MNSTR', { useUnifiedTopology: true, useNewUrlParser: true });

    const Player = mongo.model('Player',
        new mongo.Schema({
            id: Number,
            login: String,
            password: String,
            data: Object,
            enemyData: Object,
            regDate: Number,
            ban: Boolean,
            banTop: Boolean,
            authDate: Number,
            apiToken: String,
            friends: Array,
            isAdmin: Boolean,
            tradeCode: String,
            tradeRequests: Array,
            tradesComplete: Array,
            ipAddress: String,
            dailyQuestUntil: Number,
            weeklyQuestUntil: Number,
            banPromo: Boolean,
            tg: Number,
            loginDays: Number,
            nextBonusDate: Number,
            nickname: String,
            vkplay: String
        })
    );

export async function GET(request) {
    /*await fetch("http://91.245.227.195:1518/mwstats").then(async res => {
        return new Response.json(await res.json());
    }).catch(() => { return new Response.json({ success: false }) });*/
    
    const players1 = (await Player.find({ })).filter(x=> Object.keys(x.data || {}).includes('atk'));
    const pt = players1.map(x=> x.data.totalPlaytime || 0).reduce((partialSum, a) => partialSum + a, 0);
    const g = players1.map(x=> x.data.gold || 0).reduce((partialSum, a) => partialSum + a, 0);
    const oa = players1.map(x=> (x.data.atk * x.data.atkMult * (x.data.critChance < 1 ? 1 : 3))).reduce((partialSum, a) => partialSum + a, 0);
    const asc = players1.map(x=> x.data.ascension || 0).reduce((partialSum, a) => partialSum + a, 0);
    const k = players1.map(x=> x.data.totalKills || 0).reduce((partialSum, a) => partialSum + a, 0);
    
    return new Response.json({
        players: players1.length || 0,
        playtime: Math.ceil(pt / 3600) || 0,
        kills: k || 0,
        ascension: asc || 0,
        overallAtk: Math.ceil(oa) || 0,
        gold: Math.ceil(g) || 0
    });
}