

const Device = (function () {

    const RSS = !(typeof window == 'object' && typeof navigator == 'object' && typeof navigator.userAgent == 'string')

    const isEDGE = !RSS && /Edge/.test(navigator.userAgent)
    const isChrome = !RSS && /Chrome/.test(navigator.userAgent) && !isEDGE
    const isAndroid = !RSS && /Android/.test(navigator.userAgent)
    const isiOS = !RSS && /(iPad|iPhone|iPod)/.test(navigator.userAgent)
    const isMobile = !RSS && /Mobi/.test(navigator.userAgent)
    const isFBIAB = !RSS && /(FBAN|FB_IAB)/.test(navigator.userAgent)
    const isIE = !RSS && /(MSIE|Trident|Edge)/.test(navigator.userAgent)
    const isFireFox = !RSS && /(Firefox)/.test(navigator.userAgent)
    const isSafari = !RSS && /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && !isEDGE
    const isWechat = !RSS && /MicroMessenger/.test(navigator.userAgent)
    const isSPA = !RSS && typeof __PRERENDER_SPA != "undefined"

    return {
        RSS,
        isChrome,
        isAndroid,
        isiOS,
        isMobile,
        isFBIAB,
        isIE,
        isFireFox,
        isSafari,
        isWechat,
        isSPA
    }
})()

export default Device