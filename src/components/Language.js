import * as LangData from '../../languages'
export * from 'react-collections/Language'

import { keyGeneration, registerLang, } from 'react-collections/Language'


for (var i in LangData)
  registerLang(i, LangData[i]);

export const T = keyGeneration(LangData.en);
export { registerLang, LangData }


