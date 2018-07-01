
interface Iconurls {
  retina: string;
  large: string;
  medium: string;
  small: string;
  default: string;
}

interface Description {
  _content: string;
}

interface Permissions {
  permcomment: number;
  permaddmeta: number;
}

declare interface FlickrPhotoObj {
  id: string;
  secret: string;
  server: string;
  farm: number;
  owner: string;
  username: string;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
  iconurls: Iconurls;
  license: string;
  safety_level: string;
  needs_interstitial: number;
  description: Description;
  rotation: number;
  dateupload: string;
  datetaken: string;
  datetakengranularity: string;
  datetakenunknown: string;
  ownername: string;
  owner_datecreate: string;
  realname: string;
  count_views: string;
  count_faves: string;
  count_comments: string;
  count_notes: string;
  can_comment: number;
  permissions: Permissions;
  can_addmeta: number;
  can_share: number;
  can_download: number;
  isfavorite: number;
  media: string;
  media_status: string;
  url_c: string;
  height_c: number;
  width_c: string;
  url_h: string;
  height_h: number;
  width_h: string;
  url_k: string;
  height_k: number;
  width_k: string;
  url_l: string;
  height_l: string;
  width_l: string;
  url_m: string;
  height_m: string;
  width_m: string;
  url_n: string;
  height_n: string;
  width_n: string;
  url_o: string;
  height_o: string;
  width_o: string;
  url_q: string;
  height_q: string;
  width_q: string;
  url_s: string;
  height_s: string;
  width_s: string;
  url_sq: string;
  height_sq: string;
  width_sq: string;
  url_t: string;
  height_t: string;
  width_t: string;
  url_z: string;
  height_z: string;
  width_z: string;
  secret_k: string;
  secret_h: string;
  pathalias?: any;
  contact_iscontact: number;
  contact_isfriend: string;
  contact_isfamily: string;
  ispro: number;
  has_invalid_colorspace_for_print: boolean;
  is_invalid_for_print: boolean;
}



interface CoverphotoUrl {
  h: string;
  l: string;
  s: string;
  t: string;
}

interface Used {
  _content: string;
}

interface Total {
  _content: number;
}

interface Storage {
  used: Used;
  total: Total;
}

interface Username {
  _content: string;
}

interface Realname {
  _content: string;
}

interface Email {
  _content: string;
}

interface MboxSha1sum {
  _content: string;
}

interface Location {
  _content: string;
}

interface Timezone {
  label: string;
  offset: string;
  timezone_id: string;
}

interface Datecreate {
  _content: string;
}


interface Photosurl {
  _content: string;
}

interface Profileurl {
  _content: string;
}

interface Mobileurl {
  _content: string;
}

interface Firstdatetaken {
  _content: string;
}

interface Firstdate {
  _content: string;
}

interface Count {
  _content: number;
}

interface Views {
  _content: string;
}

interface Photos {
  firstdatetaken: Firstdatetaken;
  firstdate: Firstdate;
  count: Count;
  views: Views;
}

interface ProfileWebsite {
  url: string;
}

declare interface FlickrUserObj {
  id: string;
  nsid: string;
  ispro: number;
  can_buy_pro: number;
  iconserver: string;
  iconfarm: number;
  path_alias: string;
  has_stats: string;
  coverphoto_server: string;
  coverphoto_farm: number;
  is_ad_free: number;
  iconurls: Iconurls;
  coverphoto_url: CoverphotoUrl;
  storage: Storage;
  username: Username;
  realname: Realname;
  email: Email;
  mbox_sha1sum: MboxSha1sum;
  location: Location;
  timezone: Timezone;
  datecreate: Datecreate;
  description: Description;
  photosurl: Photosurl;
  profileurl: Profileurl;
  mobileurl: Mobileurl;
  photos: Photos;
  rev_ignored: number;
  contacts: string;
  reverse_contacts: string;
  profile_website: ProfileWebsite;
  count_groups_admin: string;
  favorites_count: string;
}


