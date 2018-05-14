
declare namespace PB {
}

declare namespace PB {
  type RequestType<T> = {new (req: Partial<T>)}
  type ResponseType<T> = {
    decode: (data: any) => T,
  }
  interface ActiveBannerInfo{
    activeId : number;
    activeTitle : string;
    activeTypeBanners : Array<BannerInfo>;
    activeCategory : string;
  }
  namespace Activity{
    namespace LaxinAmount{
      interface RequestT {
        zuid : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        amount : number;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace LaxinDiamond{
      interface RequestT {
        zuid : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        diamond : number;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace LaxinUserinfo{
      interface RequestT {
        zuid : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        UserInfo : Array<ActivityUserInfo>;
      }
      var Response : ResponseType<ResponseT>
      interface ActivityUserInfo{
        uid : number;
        avatar : string;
      }
    }
    namespace ShareDiamond{
      interface RequestT {
        zuid : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        diamond : number;
      }
      var Response : ResponseType<ResponseT>
    }
  }
  namespace AdminQualityAuth{
    namespace Add{
      interface RequestT {
        uid : number;
        qualityAuth : number;
      }
      var Request : RequestType<RequestT>
    }
  }
  namespace Admin{
    namespace RemoveHotList{
      interface RequestT {
        rid : number;
      }
      var Request : RequestType<RequestT>
    }
  }
  namespace App{
    namespace Log{
      interface RequestT {
        content : string;
      }
      var Request : RequestType<RequestT>
    }
    namespace Manage{
      namespace Request{
      }
      interface ResponseT {
        versionCode : string;
        versionName : string;
        url : string;
        forceUpdate : number;
        forceUpdateAnyway : number;
        versionId : string;
        versionTitle : string;
        versionDescription : string;
        description : string;
        descriptionUrl : string;
      }
      var Response : ResponseType<ResponseT>
    }
  }
  interface BannerInfo{
    images : string;
    rank : number;
    endTime : number;
    jump : string;
    type : number;
    activeBeginTime : number;
    activeEndTime : number;
    activeLabel : string;
  }
  interface BaseUserInfo{
    uid : number;
    username : string;
    upliveCode : string;
    avatar : string;
    gender : number;
    signature : string;
    grade : number;
    officialAuth : number;
    officialAuthContent : string;
    qualityAuth : number;
  }
  namespace Bind{
    namespace Mobilephone{
      interface RequestT {
        mobilephone : string;
        smsCode : string;
      }
      var Request : RequestType<RequestT>
    }
  }
  namespace ChatRoomProfile{
    namespace Get{
      interface RequestT {
        vuid : number;
        roomId : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        chatRoomProfileInfo : ChatRoomProfileInfo;
        userLabels : Array<LabelInfo>;
        canPermissions : Array<PermissionInfo>;
        disablePermissions : Array<PermissionInfo>;
      }
      var Response : ResponseType<ResponseT>
    }
  }
  interface ChatRoomProfileInfo{
    uid : number;
    avatar : string;
    username : string;
    gender : number;
    grade : number;
    location : string;
    upliveCode : string;
    signature : string;
    fanTotal : number;
    followTotal : number;
    followType : number;
    balance : UserBalanceInfo;
    officialAuth : number;
    officialAuthContent : string;
    qualityAuth : number;
    rankAvatar : string;
    rankUid : number;
    rankUserName : string;
    countryCode : string;
  }
  namespace Configinfo{
    namespace Get{
      interface RequestT {
        lastTime : number;
        countryCode : string;
        zuid : number;
        roomId : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        lastTime : number;
        systemAnnouncements : Array<SystemAnnouncement>;
        highLevelTexts : Array<HighLevelText>;
        lowLevelLimit : Array<LowLevelLimit>;
        fightInfo : FightInfo;
        countryPhoneAuth : CountryPhoneAuth;
        redPackey : RedPacket;
        labels : Array<LabelDetailInfo>;
        permissions : Array<PermissionDetailInfo>;
        userLabels : Array<LabelInfo>;
        minSpeakGrade : number;
      }
      var Response : ResponseType<ResponseT>
      interface RedPacket{
        redPacketMessage : string;
        redPacketContent : string;
        redPacketBestLucky : string;
      }
      interface SystemAnnouncement{
        content : string;
        url : string;
      }
      interface HighLevelText{
        prekey : string;
        value : string;
        extend : string;
      }
      interface LowLevelLimit{
        prekey : string;
        value : string;
        extend : string;
      }
      interface FightInfo{
        sid : number;
        rid : number;
        roomId : number;
        targetGiftId : number;
        targetTransactionId : string;
        energy : number;
        startTime : number;
        deadlineTime : number;
        finishTime : number;
        action : number;
        status : number;
        createTime : number;
        updateTime : number;
        timeLeft : number;
        fightUserInfo : FightUserInfo;
      }
      interface FightUserInfo{
        uid : number;
        userName : string;
        userIcon : string;
        userGrade : number;
        userSex : number;
        officialAuth : number;
        qualityAuth : number;
      }
      interface CountryPhoneAuth{
        country : string;
        phoneAuth : number;
      }
    }
  }
  namespace Country{
    namespace LiveList{
      interface RequestT {
        page : number;
        pageSize : number;
        country : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        infos : Array<LiveDetailInfo>;
        banners : Array<BannerInfo>;
      }
      var Response : ResponseType<ResponseT>
    }
  }
  namespace Email{
    namespace RegisterVerify{
      interface RequestT {
        verifyCode : string;
      }
      var Request : RequestType<RequestT>
    }
    namespace RegisterVerifyCheck{
      interface RequestT {
        emailCheckCode : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        profile : ProfileInfo;
      }
      var Response : ResponseType<ResponseT>
    }
  }
  namespace Request{
  }
  namespace Feed{
    namespace ActivityBannerList{
      interface RequestT {
        countryCode : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        bannerInfos : Array<ActiveBannerInfo>;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace FollowList{
      interface RequestT {
        page : number;
        pageSize : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        infos : Array<LiveDetailInfo>;
        banners : Array<BannerInfo>;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace HotList{
      interface RequestT {
        page : number;
        pageSize : number;
        countryCode : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        infos : Array<LiveDetailInfo>;
        banners : Array<BannerInfo>;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace LableList{
      interface RequestT {
        page : number;
        pageSize : number;
        lable : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        infos : Array<LiveDetailInfo>;
        recommends : Array<FollowInfo>;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace LatestList{
      interface RequestT {
        page : number;
        pageSize : number;
        countryCode : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        infos : Array<LiveDetailInfo>;
        languages : Array<CountryLanguage>;
        banners : Array<BannerInfo>;
      }
      var Response : ResponseType<ResponseT>
      interface CountryLanguage{
        languageKey : string;
        languageValue : string;
        languageUserInfos : Array<LiveDetailInfo>;
      }
    }
  }
  namespace Follow{
    namespace FansList{
      interface RequestT {
        page : number;
        pageSize : number;
        vuid : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        total : number;
        infos : Array<FollowInfo>;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace UserAdd{
      interface RequestT {
        fuid : number;
      }
      var Request : RequestType<RequestT>
    }
    namespace UserList{
      interface RequestT {
        page : number;
        pageSize : number;
        vuid : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        total : number;
        infos : Array<FollowInfo>;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace UserMultiAdd{
      interface RequestT {
        fuids : Array<number>;
      }
      var Request : RequestType<RequestT>
    }
    namespace UserUnfollow{
      interface RequestT {
        fuid : number;
      }
      var Request : RequestType<RequestT>
    }
  }
  interface FollowInfo{
    uid : number;
    username : string;
    avatar : string;
    gender : number;
    signature : string;
    grade : number;
    location : string;
    followType : number;
    upliveCode : string;
    officialAuth : number;
    officialAuthContent : string;
    qualityAuth : number;
  }
  namespace GameEntry{
    namespace List{
      interface RequestT {
        countryCode : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        GameInfo : Array<EntryGameInfo>;
      }
      var Response : ResponseType<ResponseT>
      interface EntryGameInfo{
        gameId : number;
        gameName : string;
        bigPicUrl : string;
        smallPicUrl : string;
        redirectUrl : string;
      }
    }
  }
  interface LabelDetailInfo{
    label : string;
    name : string;
    icon : string;
    iconSize : string;
  }
  interface LabelInfo{
    label : string;
  }
  namespace LbsGeo{
    namespace Location{
      interface RequestT {
        lat : number;
        lng : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        country : string;
        province : string;
        city : string;
      }
      var Response : ResponseType<ResponseT>
    }
  }
  interface LiningTest{
    uid : number;
    name : string;
    age : number;
  }
  interface LiveDetailInfo{
    uid : number;
    username : string;
    avatar : string;
    gender : number;
    signature : string;
    grade : number;
    location : string;
    roomId : number;
    onlineTotal : number;
    roomTitle : string;
    liveMsg : string;
    officialAuth : number;
    officialAuthContent : string;
    qualityAuth : number;
    upliveCode : string;
    countryCode : string;
  }
  namespace Live{
    namespace Share{
      interface RequestT {
        roomId : number;
        zuid : number;
        liveEnd : number;
        needShortUrl : Boolean;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        title : string;
        desc : string;
        content : string;
        url : string;
        facebookUrl : string;
        ifOpenShareTask : number;
        channles : string;
        shortUrl : string;
      }
      var Response : ResponseType<ResponseT>
    }
  }
  namespace Local{
    namespace HotList{
      interface RequestT {
        page : number;
        pageSize : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        infos : Array<LiveDetailInfo>;
        banners : Array<BannerInfo>;
      }
      var Response : ResponseType<ResponseT>
    }
  }
  namespace Mall{
    namespace BalanceInfo{
      interface RequestT {
        uid : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        bill : number;
        diamond : number;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace BillExchangeDiamondAccounts{
      interface RequestT {
        uid : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        bindUserInfoList : Array<BindUserInfo>;
      }
      var Response : ResponseType<ResponseT>
      interface BindUserInfo{
        uid : number;
        upLiveCode : string;
        username : string;
        avatar : string;
        bill : number;
        diamond : number;
      }
    }
    namespace BillExchangeDiamondConfig{
      interface ResponseT {
        exchangeConfigs : Array<BillExchangeDiamondConfig>;
      }
      var Response : ResponseType<ResponseT>
      interface BillExchangeDiamondConfig{
        configId : number;
        description : string;
        bill : number;
        diamond : number;
        icon : string;
      }
    }
    namespace BillExchangeDiamondExchange{
      interface RequestT {
        configId : number;
        transactionId : string;
        uid : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        bill : number;
        diamond : number;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace BillExchangeDiamondResult{
      interface RequestT {
        transactionId : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        bill : number;
        diamond : number;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace ContributionRank{
      interface RequestT {
        uid : number;
        pageNo : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        contributions : Array<UserBillContribution>;
      }
      var Response : ResponseType<ResponseT>
      interface UserBillContribution{
        contribution : number;
        userInfo : BaseUserInfo;
        userLabels : Array<string>;
      }
    }
    namespace GiftAll{
      interface ResponseT {
        gifts : Array<Mall.GiftList.GiftInfo>;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace GiftGuard{
      interface RequestT {
        uid : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        diamond : number;
        stepLength : number;
        guardUserInfo : GuardUserInfo;
      }
      var Response : ResponseType<ResponseT>
      interface GuardUserInfo{
        uid : number;
        upliveCode : string;
        username : string;
        avatar : string;
        grade : number;
        timeLeft : number;
        gender : number;
      }
    }
    namespace GiftList{
      interface ResponseT {
        gifts : Array<GiftInfo>;
        amountConfigs : Array<AmountConfig>;
      }
      var Response : ResponseType<ResponseT>
      interface GiftInfo{
        giftId : number;
        name : string;
        intro : string;
        type : number;
        url : string;
        price : number;
        experience : number;
        canCombo : Boolean;
        version : number;
        onLined : Boolean;
        countryCode : string;
        language : string;
        needLoad : Boolean;
        showType : number;
        resources : Array<GiftResourceInfo>;
        vipGrade : number;
        playTimes : number;
      }
      interface GiftResourceInfo{
        type : number;
        url : string;
      }
      interface AmountConfig{
        amount : number;
        description : string;
      }
    }
    namespace GiftSend{
      interface RequestT {
        rid : number;
        giftId : number;
        roomId : number;
        comboTimes : number;
        transactionId : string;
        diamond : number;
        amount : number;
        content : string;
        clientType : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        diamond : number;
        receiveGiftId : number;
        receiveGifts : Array<ReceiveGift>;
        sendUserInfo : BaseUserInfo;
        comboTimes : number;
        batchedRedPacketInfos : Array<RedPacketInfo>;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace GiftSendResult{
      interface RequestT {
        transactionId : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        diamond : number;
        receiveGiftId : number;
        receiveGifts : Array<ReceiveGift>;
        sendUserInfo : BaseUserInfo;
        comboTimes : number;
        batchedRedPacketInfos : Array<RedPacketInfo>;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace PayH5Url{
      interface ResponseT {
        url : string;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace PayOrder{
      interface RequestT {
        purpose : number;
        productId : number;
        channel : string;
        tradeType : string;
        tuid : number;
        returnUrl : string;
        clientType : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        orderInfo : OrderInfo;
        wxpay : string;
        iap : string;
        alipay : string;
        iab : string;
        h5 : string;
      }
      var Response : ResponseType<ResponseT>
      interface OrderInfo{
        orderId : string;
      }
    }
    namespace PayValidate{
      interface RequestT {
        orderId : string;
        receipt : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        diamond : number;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace RechargeConfig{
      interface RequestT {
        uid : number;
        channel : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        rechargeConfigs : Array<RechargeConfig>;
        channels : Array<string>;
        wxpay : Array<RechargeConfig>;
        alipay : Array<RechargeConfig>;
        IAP : Array<RechargeConfig>;
        IAB : Array<RechargeConfig>;
        others : Array<RechargeConfig>;
        groups : Array<ChannelGroup>;
      }
      var Response : ResponseType<ResponseT>
      interface RechargeConfig{
        configId : number;
        description : string;
        amount : number;
        icon : string;
        money : number;
        type : number;
        currency : string;
        currencySymbol : string;
      }
      interface RechargeConfigList{
        rechargeConfigList : Array<RechargeConfig>;
      }
      interface ChannelGroup{
        groupCode : string;
        channels : Array<string>;
        channelRechargeConfigMap : Array<RechargeConfigList>;
        groupName : string;
        channelNameMap : Array<string>;
      }
    }
    namespace TranslateAction{
      interface RequestT {
        rid : number;
        roomId : number;
        opType : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        diamond : number;
        sendUserInfo : BaseUserInfo;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace VoiceTranslate{
      interface RequestT {
        rid : number;
        roomId : number;
        transactionId : string;
        functionType : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        diamond : number;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace WithdrawAccount{
      interface ResponseT {
        users : Array<WithdrawAccount>;
      }
      var Response : ResponseType<ResponseT>
      interface WithdrawAccount{
        uid : number;
        username : string;
        upliveCode : string;
        avatar : string;
        status : WithdrawStatus;
      }
    }
    namespace WithdrawBind{
      interface RequestT {
        openid : string;
        type : number;
        unionId : string;
      }
      var Request : RequestType<RequestT>
    }
    namespace WithdrawExecute{
      interface RequestT {
        bill : number;
        transactionId : string;
        verifyCode : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        status : WithdrawStatus;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace WithdrawList{
      interface RequestT {
        pageNo : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        records : Array<WithdrawRecord>;
        totalMoney : number;
      }
      var Response : ResponseType<ResponseT>
      interface WithdrawRecord{
        bill : number;
        money : number;
        createTime : number;
        tradeStatus : number;
      }
    }
    namespace WithdrawMax{
      interface RequestT {
        transactionId : string;
        uid : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        money : number;
        status : WithdrawStatus;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace WithdrawResult{
      interface RequestT {
        transactionId : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        status : WithdrawStatus;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace WithdrawStatus{
      interface ResponseT {
        status : WithdrawStatus;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace WithdrawStatusNew{
      interface ResponseT {
        status : WithdrawStatus;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace WithdrawSummary{
      interface RequestT {
        pageNo : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        records : Array<WithdrawRecord>;
        summary : Array<WithdrawSummary>;
      }
      var Response : ResponseType<ResponseT>
      interface WithdrawRecord{
        bill : number;
        money : number;
        currency : string;
        createTime : number;
        tradeStatus : number;
        currencySymbol : string;
      }
      interface WithdrawSummary{
        currency : string;
        totalMoney : number;
        currencySymbol : string;
      }
    }
  }
  namespace MallVerifyCode{
    interface ResponseT {
      verifyCode : string;
    }
    var Response : ResponseType<ResponseT>
  }
  namespace Message{
    namespace Translate{
      interface RequestT {
        message : string;
        language : string;
        giftId : number;
        rid : number;
        roomId : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        messageTranslation : string;
        diamond : number;
      }
      var Response : ResponseType<ResponseT>
    }
  }
  interface PackGiftResult{
    sendAmount : number;
    leftAmount : number;
    chestGifts : Array<ReceiveGift>;
    sendUserInfo : BaseUserInfo;
    comboTimes : number;
    batchedRedPacketInfos : Array<RedPacketInfo>;
  }
  namespace Pack{
    namespace GiftSend{
      interface RequestT {
        rid : number;
        gridId : string;
        giftId : number;
        roomId : number;
        transactionId : string;
        amount : number;
        clientType : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        result : PackGiftResult;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace GiftSendResult{
      interface RequestT {
        transactionId : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        result : PackGiftResult;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace InfoExpire{
      interface RequestT {
        pageNo : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        currentTime : number;
        grids : Array<PackGrid>;
        giftInfos : Array<Mall.GiftList.GiftInfo>;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace InfoValid{
      interface ResponseT {
        currentTime : number;
        grids : Array<PackGrid>;
        giftInfos : Array<Mall.GiftList.GiftInfo>;
      }
      var Response : ResponseType<ResponseT>
    }
  }
  interface PackGrid{
    gridId : string;
    giftId : number;
    valuable : number;
    lastIncreaseTime : number;
    expireTime : number;
    amount : number;
  }
  interface PermissionDetailInfo{
    permission : string;
    name : string;
    icon : string;
    disableIcon : string;
    iconSize : string;
  }
  interface PermissionInfo{
    permission : string;
    leftover : number;
    recoveryTime : number;
    keepTime : number;
  }
  interface PointExchangeConfig{
    configId : number;
    type : number;
    amount : number;
    point : number;
    sortNo : number;
    canReward : Boolean;
  }
  namespace Point{
    namespace ExchangeConfigGet{
      namespace Request{
      }
      interface ResponseT {
        exchangeConfigs : Array<PointExchangeConfig>;
        point : number;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace ExchangeReward{
      interface RequestT {
        configId : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        exchangeConfigs : Array<PointExchangeConfig>;
        point : number;
      }
      var Response : ResponseType<ResponseT>
    }
  }
  namespace PopUp{
    namespace Get{
      interface RequestT {
        country : string;
      }
      var Request : RequestType<RequestT>
      interface PopUp{
        title : string;
        content : string;
        images : string;
        jumpUrl : string;
        rank : number;
        showTime : number;
        showLocation : number;
        type : number;
        version : number;
        country : string;
      }
      interface ResponseT {
        popups : Array<PopUp>;
      }
      var Response : ResponseType<ResponseT>
    }
  }
  namespace Profile{
    namespace Get{
      interface RequestT {
        vuid : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        profile : ProfileInfo;
        userLabels : Array<LabelInfo>;
        canPermissions : Array<PermissionInfo>;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace Set{
      interface RequestT {
        username : string;
        setting : string;
        upliveCode : string;
        signature : string;
        pushType : PushType;
        pushToken : string;
        location : string;
        gender : number;
        language : string;
        countryCode : string;
        userRealNameAuthInfo : string;
        acceptAgreement : string;
        timeZone : string;
      }
      var Request : RequestType<RequestT>
    }
  }
  interface ProfileInfo{
    uid : number;
    username : string;
    upliveCode : string;
    avatar : string;
    gender : number;
    setting : string;
    password : string;
    userToken : string;
    signature : string;
    grade : number;
    location : string;
    mobilePhone : string;
    fanTotal : number;
    followTotal : number;
    balance : UserBalanceInfo;
    chatroomid : number;
    followType : number;
    exp : number;
    currentExp : number;
    nextExp : number;
    officialAuth : number;
    officialAuthContent : string;
    qualityAuth : number;
    countryCode : string;
    admin : number;
    userRealNameAuth : number;
    acceptAgreement : string;
    upliveCodeStatus : number;
  }
  namespace Ranking{
    namespace HostGiftstar{
      interface RequestT {
        type : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        GiftsList : Array<GiftRankingInfo>;
      }
      var Response : ResponseType<ResponseT>
      interface GiftRankingInfo{
        giftId : number;
        giftVersion : number;
        GiftRankingList : Array<TopHostInfo>;
        countryCode : string;
        giftLargePicURL : string;
        giftSmallPicURL : string;
      }
      interface TopHostInfo{
        uid : number;
        upLiveCode : string;
        username : string;
        avatar : string;
        gender : number;
        grade : number;
        moneyAmount : number;
        officialAuth : number;
      }
    }
    namespace HostGiftstarList{
      interface RequestT {
        type : number;
        giftId : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        GiftRankingList : Array<TopHostInfo>;
      }
      var Response : ResponseType<ResponseT>
      interface TopHostInfo{
        uid : number;
        upLiveCode : string;
        username : string;
        avatar : string;
        gender : number;
        grade : number;
        moneyAmount : number;
        officialAuth : number;
      }
    }
    namespace HostReceive{
      interface RequestT {
        type : number;
        pageNo : number;
        pageSize : number;
        period : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        secondsLeft : number;
        topHostInfoList : Array<TopHostInfo>;
      }
      var Response : ResponseType<ResponseT>
      interface TopHostInfo{
        uid : number;
        upLiveCode : string;
        username : string;
        avatar : string;
        gender : number;
        grade : number;
        moneyAmount : number;
        officialAuth : number;
      }
    }
    namespace HostSuggest{
      interface RequestT {
        type : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        topHostInfoList : Array<TopHostInfo>;
      }
      var Response : ResponseType<ResponseT>
      interface TopHostInfo{
        uid : number;
        upLiveCode : string;
        username : string;
        avatar : string;
        gender : number;
        grade : number;
        signature : string;
        officialAuth : number;
      }
    }
    namespace UserSend{
      interface RequestT {
        type : number;
        pageNo : number;
        pageSize : number;
        period : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        secondsLeft : number;
        topUserInfoList : Array<TopUserInfo>;
      }
      var Response : ResponseType<ResponseT>
      interface TopUserInfo{
        uid : number;
        upLiveCode : string;
        username : string;
        avatar : string;
        gender : number;
        grade : number;
        moneyAmount : number;
        officialAuth : number;
      }
    }
  }
  interface ReceiveGift{
    giftId : number;
    amount : number;
  }
  interface RedPacketInfo{
    redpacketTransaction : string;
    beginTime : number;
    effectiveTime : number;
  }
  namespace Redpacket{
    namespace NormalTake{
      interface RequestT {
        redpacketTransaction : string;
        uid : number;
        giftId : number;
        roomId : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        userAccount : number;
        redpacketAmount : number;
      }
      var Response : ResponseType<ResponseT>
    }
  }
  namespace Report{
    namespace Add{
      interface RequestT {
        accusedId : number;
        reason : string;
      }
      var Request : RequestType<RequestT>
    }
  }
  namespace Room{
    namespace AdminDisabledAnchor{
      interface RequestT {
        uid : number;
        disabledDesc : string;
      }
      var Request : RequestType<RequestT>
      namespace Response{
      }
    }
    namespace AdminShutup{
      interface RequestT {
        roomId : number;
        uids : Array<number>;
      }
      var Request : RequestType<RequestT>
      namespace Response{
      }
    }
    namespace AnchorCreate{
      interface RequestT {
        liveType : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        roomId : number;
        ip : string;
        port : number;
        m1 : ArrayBuffer;
        liveMsg : string;
        moneyTotal : number;
        peoples : number;
      }
      var Response : ResponseType<ResponseT>
      interface GradeNotEnoughResponse{
        canLiveGrade : number;
      }
    }
    namespace AnchorDisabledGet{
      interface RequestT {
        roomId : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        status : Status;
        disabledDesc : string;
        liveTimes : number;
        moneyTotal : number;
        peoples : number;
        likeNum : number;
      }
      var Response : ResponseType<ResponseT>
      enum Status{
        'OPEN',
        'DISABLED',
        'FORCE_DISABLED',
      }
    }
    namespace AnchorPurlGet{
      interface RequestT {
        roomId : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        purl : ArrayBuffer;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace AnchorQuit{
      interface RequestT {
        roomId : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        liveTimes : number;
        moneyTotal : number;
        peoples : number;
        likeNum : number;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace AnchorStart{
      interface RequestT {
        roomId : number;
        title : string;
        noShowLocal : Boolean;
      }
      var Request : RequestType<RequestT>
    }
    namespace CommonAddrlist{
      interface RequestT {
        addrType : AddrType;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        addrs : Array<ArrayBuffer>;
      }
      var Response : ResponseType<ResponseT>
      enum AddrType{
        'TCP',
        'WEPSOCKET',
      }
    }
    namespace CommonUserlist{
      interface RequestT {
        roomId : number;
        page : number;
        pageSize : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        peoples : number;
        chatroomUserInfos : Array<ChatroomUserInfo>;
      }
      var Response : ResponseType<ResponseT>
      interface ChatroomUserInfo{
        uId : number;
        userName : string;
        userIcon : string;
        userGrade : number;
        userSex : number;
        vip : number;
        uType : number;
        officialAuth : number;
        qualityAuth : number;
        acceptLanguage : string;
        userLabels : Array<string>;
        labelHighest : number;
      }
    }
    namespace LiveStatusGet{
      interface RequestT {
        liveType : number;
        liveId : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        status : Status;
      }
      var Response : ResponseType<ResponseT>
      enum Status{
        'PRESERVE_STATUS',
        'OPEN',
        'DISABLED',
      }
    }
    namespace NormalInto{
      interface RequestT {
        roomId : number;
        checkLifted : Boolean;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        ip : string;
        port : number;
        m1 : ArrayBuffer;
        liveMsg : string;
        uid : number;
        liveTimes : number;
        moneyTotal : number;
        peoples : number;
        acceptLanguage : string;
        checkLiftedR : Boolean;
        userLabels : Array<string>;
        labelHighest : number;
        policyMsg : string;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace NormalMGet{
      interface RequestT {
        roomId : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        m1 : ArrayBuffer;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace WebNormalInto{
      interface RequestT {
        roomId : number;
        wType : WebType;
        checkLifted : Boolean;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        liveMsg : string;
        uid : number;
        liveTimes : number;
        peoples : number;
        acceptLanguage : string;
        wsIp : string;
        wsPort : number;
        wsPath : string;
        time : number;
        nonce : string;
        sec : string;
        userInfo : string;
        termType : number;
        sid : number;
        checkLiftedR : Boolean;
        userLabels : Array<string>;
        labelHighest : number;
        policyMsg : string;
      }
      var Response : ResponseType<ResponseT>
      enum WebType{
        'WEB',
        'WAP',
      }
    }
  }
  namespace Search{
    namespace User{
      interface RequestT {
        content : string;
        page : number;
        pageSize : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        infos : Array<FollowInfo>;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace UserCode{
      interface RequestT {
        upliveCode : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        userInfo : BaseUserInfo;
      }
      var Response : ResponseType<ResponseT>
    }
  }
  namespace SensitiveWords{
    namespace Get{
      interface RequestT {
        lastTime : number;
        extLastTime : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        words : Array<SensitiveWords>;
        hasNext : Boolean;
        updateTime : number;
        extUpdateTime : number;
      }
      var Response : ResponseType<ResponseT>
      interface SensitiveWords{
        type : number;
        content : string;
        status : number;
        lang : string;
        iden : number;
      }
      enum SensitiveType{
        'DEFAULT',
        'USERNAME',
        'SIGNATURE',
        'CHAT',
        'LIVENAME',
        'LETTER',
        'AUTH',
      }
    }
    namespace List{
      interface RequestT {
        lastTime : number;
        extLastTime : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        words : Array<SensitiveWords>;
        hasNext : Boolean;
        updateTime : number;
        extUpdateTime : number;
      }
      var Response : ResponseType<ResponseT>
      interface SensitiveWords{
        type : number;
        content : string;
        status : number;
        lang : string;
        iden : number;
      }
      enum SensitiveType{
        'DEFAULT',
        'USERNAME',
        'SIGNATURE',
        'CHAT',
        'LIVENAME',
        'LETTER',
        'AUTH',
      }
    }
  }
  namespace Sms{
    namespace SendCode{
      interface RequestT {
        mobilePhone : string;
        deviceId : string;
        signature : string;
        module : string;
      }
      var Request : RequestType<RequestT>
    }
  }
  namespace SystemConfig{
    namespace Get{
      interface RequestT {
        os : number;
        osVersion : string;
        pushSDK : string;
        pushSDKVersion : string;
        brand : string;
        model : string;
        androidCPUABI : string;
        androidRAM : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        videoFPS : number;
        videoBitRate : string;
        audioFPS : number;
        audioBitRate : number;
        keyFrameInterval : number;
        reconnectionInterval : number;
        hardCode : Boolean;
        resolution : number;
        openBeautity : Boolean;
      }
      var Response : ResponseType<ResponseT>
    }
  }
  namespace System{
    namespace Preload{
      interface RequestT {
        lastTime : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        ips : Array<Ip>;
        lastTime : number;
        systemAnnouncements : Array<SystemAnnouncement>;
        targetLanguages : Array<TargetLanguage>;
        highLevelTexts : Array<HighLevelText>;
        acceptAgreement : Array<AcceptAgreement>;
        labels : Array<LabelDetailInfo>;
        permissions : Array<PermissionDetailInfo>;
      }
      var Response : ResponseType<ResponseT>
      interface AcceptAgreement{
        country : string;
        value : string;
      }
      interface SystemAnnouncement{
        language : string;
        countryCode : string;
        content : string;
        url : string;
      }
      interface TargetLanguage{
        language : string;
        content : string;
        description : string;
      }
      interface HighLevelText{
        country : string;
        language : string;
        prekey : string;
        value : string;
        extend : string;
      }
      interface Ip{
        domain : string;
        ipAddress : Array<string>;
      }
    }
  }
  namespace ThirdCheck{
    namespace Register{
      interface RequestT {
        bindType : BindType;
        thirdId : string;
        thirdToken : string;
        extension : string;
        gender : number;
        mobilePhone : string;
        username : string;
        signature : string;
        avatar : string;
        location : string;
        pushType : PushType;
        pushToken : string;
        deviceId : string;
        smsCode : string;
        countryCode : string;
        password : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        profile : ProfileInfo;
        exmailCheckCode : string;
      }
      var Response : ResponseType<ResponseT>
    }
  }
  namespace ThirdGame{
    namespace WhiteList{
      interface RequestT {
        timestamp : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        incremental : number;
        thirdGameInfos : Array<ThirdGameInfo>;
        timestamp : number;
      }
      var Response : ResponseType<ResponseT>
      interface ThirdGameInfo{
        hostName : string;
        status : number;
      }
    }
  }
  namespace ThirdParty{
    namespace Check{
      interface RequestT {
        bindType : BindType;
        thirdId : string;
        thirdToken : string;
        extension : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        profile : ProfileInfo;
      }
      var Response : ResponseType<ResponseT>
    }
  }
  namespace TwoDimensionalCode{
    namespace Create{
      interface ResponseT {
        randomCode : string;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace Query{
      interface RequestT {
        randomCode : string;
        deviceId : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        profile : ProfileInfo;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace Scan{
      interface RequestT {
        randomCode : string;
      }
      var Request : RequestType<RequestT>
    }
  }
  namespace Common{
    namespace Domain{
      interface RequestT {
        uid : number;
      }
      var Request : RequestType<RequestT>
    }
  }
  interface UserBalanceInfo{
    inBill : number;
    outDiamond : number;
    bill : number;
    diamond : number;
  }
  namespace UserBlock{
    namespace Add{
      interface RequestT {
        fuid : number;
      }
      var Request : RequestType<RequestT>
    }
    namespace Delete{
      interface RequestT {
        fuid : number;
      }
      var Request : RequestType<RequestT>
    }
    namespace List{
      interface RequestT {
        start : number;
        pageSize : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        infos : Array<UserBriefInfo>;
      }
      var Response : ResponseType<ResponseT>
      interface UserBriefInfo{
        uid : number;
        username : string;
        avatar : string;
        gender : number;
        signature : string;
        grade : number;
        officialAuth : number;
        officialAuthContent : string;
        qualityAuth : number;
        upliveCode : string;
      }
    }
  }
  namespace User{
    namespace FindPassword{
      interface RequestT {
        bindType : BindType;
        thirdId : string;
      }
      var Request : RequestType<RequestT>
    }
    namespace Login{
      interface RequestT {
        loginType : number;
        bindType : BindType;
        thirdId : string;
        uid : number;
        password : string;
        location : string;
        pushType : PushType;
        pushToken : string;
        deviceId : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        profile : ProfileInfo;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace Register{
      interface RequestT {
        bindType : BindType;
        thirdId : string;
        thirdToken : string;
        extension : string;
        gender : number;
        mobilePhone : string;
        username : string;
        signature : string;
        avatar : string;
        location : string;
        pushType : PushType;
        pushToken : string;
        countryCode : string;
        password : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        profile : ProfileInfo;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace SetPassword{
      interface RequestT {
        bindType : BindType;
        thirdId : string;
        verifyCode : string;
        password : string;
      }
      var Request : RequestType<RequestT>
    }
  }
  namespace UserLabel{
    namespace List{
      interface RequestT {
        labels : Array<string>;
        ruid : number;
        roomId : number;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        users : Array<UserInfo>;
      }
      var Response : ResponseType<ResponseT>
      interface UserInfo{
        uid : number;
        username : string;
        avatar : string;
        gender : number;
        grade : number;
        labels : Array<LabelInfo>;
        permissions : Array<PermissionInfo>;
      }
    }
    namespace PermissionUse{
      interface RequestT {
        puid : number;
        ruid : number;
        roomId : number;
        permission : string;
        ext : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        nextUseTime : number;
      }
      var Response : ResponseType<ResponseT>
    }
  }
  namespace UserLogout{
    namespace Request{
      
    }
  }
  namespace UserVip{
    namespace Info{
      namespace Request{
      }
      interface ResponseT {
        vipGrade : number;
        rechargeCount : number;
        gradeStatus : number;
        nextGradeCount : number;
        keepGradeCount : number;
        expireTime : number;
        maxVipGrade : number;
      }
      var Response : ResponseType<ResponseT>
    }
  }
  namespace Visitor{
    namespace Register{
      interface RequestT {
        location : string;
        countryCode : string;
        selectLanguage : string;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        profile : ProfileInfo;
        watchTime : number;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace RegisterH5{
      interface RequestT {
        location : string;
        countryCode : string;
        selectLanguage : string;
        source : BindType;
      }
      var Request : RequestType<RequestT>
      interface ResponseT {
        profile : ProfileInfo;
        watchTime : number;
      }
      var Response : ResponseType<ResponseT>
    }
    namespace Update{
      interface RequestT {
        pushType : PushType;
        pushToken : string;
        language : string;
      }
      var Request : RequestType<RequestT>
    }
  }
  interface WithdrawStatus{
    bill : number;
    diamond : number;
    todayAlreadyCount : number;
    todayAlreadyMoney : number;
    totalLeftMoney : number;
    todayLeftMoney : number;
    timesPerDay : number;
    quotaPerDay : number;
    ratio : number;
    hasBindWechat : Boolean;
    currency : string;
    rate : number;
    hasBindPayPal : Boolean;
    bindOpenid : string;
    withdrawType : number;
    currencySymbol : string;
    withdrawRule : WithdrawRule;
    h5WithdrawUrl : string;
  }
  interface WithdrawRule{
    maxValue : number;
    minValue : number;
  }
  namespace Wx{
    namespace BindUser{
      interface UpLiveCode{
        upLiveCode : string;
      }
      interface UserId{
        unbindUserId : number;
      }
      interface ResponseT {
        bindUserInfoList : Array<BindUserInfo>;
      }
      var Response : ResponseType<ResponseT>
      interface BindUserInfo{
        uid : number;
        upLiveCode : string;
        userName : string;
        avatar : string;
      }
    }
  }
  namespace Zmxy{
    namespace Get{
      interface RequestT {
        name : string;
        certNo : string;
        mobileNo : string;
      }
      var Request : RequestType<RequestT>
    }
  }
  enum BindType{
    'DEFAULT_TYPE',
    'MOBILE_PHONE',
    'QQ',
    'WEIXIN',
    'FACEBOOK',
    'SINA_WEIBO',
    'GOOGLE',
    'TWITTER',
    'EMAIL',
  }
  enum PushType{
    'DEFAULT_PUSHTYPE',
    'IOS',
    'JPUSH',
    'XIAOMI',
    'GETUI',
    'GOOGLE_PUSH',
    'GOOGLE_FCM',
  }
}
export default PB