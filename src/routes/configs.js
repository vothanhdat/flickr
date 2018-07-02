import Device from '../utils/utils/device'
import CountryConfig from './CountryConfig'


/**
 * @type {Object}
 */
const countryConfig = {
  ...process.env.COUNTRY
  ? CountryConfig[process.env.COUNTRY]
  : {}
}

const config =  {
  enableFeeds: !Device.isMobile,
  enableMessagePanel : true,
  defaultCountry : process.env.COUNTRY || '',
  ...CountryConfig._default,
  ...countryConfig
}

console.log('config',config)
export default config
export {CountryConfig}
export const SUPPORT_COUNTRY = ['TW','CN','JP','VN','HK','EG']