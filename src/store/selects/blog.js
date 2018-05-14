

export const getNewsByLanguage = function (posts = [], {
  langname = 'en',
  max = 3,
} = {}) {


  const weeksym = ({
    'en': 'GIFTO Weekly Update',
    'zh': 'GIFTO 週報',
    'ko': '위클리 업데이트'
  })[langname]

  const matchLanguages = posts
    .filter(e => e.detectedLanguage == langname)

  const matchPosts = matchLanguages
    .filter(e => e.title.indexOf(weeksym) == -1)

  if (matchPosts.length <= max) {
    matchPosts.push(
      ...matchLanguages.filter((e, i) => e.title.indexOf(weeksym) > -1 && i < max)
    )
  }

  return matchPosts.splice(0, max)
  
}

export const getWeeklyUpdateByLanguage = function (posts = [], {
  langname = 'en',
  max = 3,
} = {}) {




  const weeksym = ({
    'en': 'GIFTO Weekly Update',
    'zh': 'GIFTO 週報',
    'ko': '위클리 업데이트'
  })[langname]

  const matchLanguages = posts
    .filter(e => e.detectedLanguage == langname)

  const matchPosts = matchLanguages
    .filter(e => e.title.indexOf(weeksym) > -1)

  return matchPosts.splice(0, max)
}



export const getPostByLanguage = function (posts = [], {
  max = 10,
  langname = 'en',
} = {}) {


  const matchLanguages = posts
    .filter(e => e.detectedLanguage == langname)

  return matchLanguages.splice(0, max)

}

export const getWeeklyUpdate = function (posts = [], {
  langname = 'en',
  max = 3,
} = {}) {

  const weeksym = ({
    'en': 'GIFTO Weekly Update',
    'ko': 'GIFTO 週報',
    'zh': '위클리 업데이트'
  })

  const lg = ({
    'en': 'English',
    'ko': 'Korean',
    'zh': 'Chinese'
  })

  const result = {}

  for (var post of posts) {
    const { detectedLanguage, title } = post
    if (result[detectedLanguage])
      continue
    if (weeksym[detectedLanguage] && title.indexOf(weeksym[detectedLanguage] > -1)) {
      result[detectedLanguage] = { ...post, lang: lg[detectedLanguage] };
    }
  }

  return Object.values(result)

}

