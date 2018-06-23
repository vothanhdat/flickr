import PB from '../protos'
import pbajax from '../pbajax'

const [THIS,LAST] = [0,-1]
const [ALL,HOUR,DAY,WEEK] = [0,1,2,3,0]


const RankingAPIs = {
    
    TopGiftTime: {THIS,LAST},

    getRankingHostGift: async function (last) {

        let {Ranking: {HostGiftstar: {Request, Response}}} = PB

        let sendData = new Request({
            type : last ? LAST : THIS,
        })

        var rawdata = await pbajax.do(
            {
                service: 'event', // java service name
                api: '/ranking/host/giftstar',  // java api
            },
            sendData,
        )

        var data =  pbajax.getPlainObject(Response.decode(rawdata))

        return { GiftsList : data.GiftsList.map(e => ({...e,giftImage : e.giftLargePicURL }))  }
    },

    TopHostsTime: {ALL,HOUR,DAY,WEEK},

    getRankingTopHosts: async function (time,last) {

        let {Ranking: {HostReceive: {Request, Response}}} = PB

        let sendData = new Request({
            type: time,
            pageNo: 1,
            pageSize: 50,
            period : last ? LAST : THIS,
        })

        var rawdata = await pbajax.do(
            {
                service: 'event', // java service name
                api: '/ranking/host/receive',  // java api
            },
            sendData,
        )

        return pbajax.getPlainObject(Response.decode(rawdata))
    },

    TopUsersTime: {ALL,DAY,WEEK},

    getRankingTopUsers: async function (time,last) {
        
            let {Ranking: {UserSend: {Request, Response}}} = PB

            let sendData = new Request({
                type : time,
                pageNo: 1,
                pageSize: 50,
                period : last ? LAST : THIS,
            })

            var rawdata = await pbajax.do(
                {
                    service: 'event', // java service name
                    api: '/ranking/user/send',  // java api
                },
                sendData,
            )

            return pbajax.getPlainObject(Response.decode(rawdata))
    }
}



export default RankingAPIs
