import axios from 'axios';
const testGroup = {
  groupId: Math.random().toString(),
  groupImage: 'hi.jpeg',
  groupName: '독일 여행팟',
  firstDay: '2023-02-12',
  headCounts: 6,
  leader: {
    id: Math.random().toString(),
    nickname: '유나',
    profile: '1f640ace-bdc7-9fab-56e9b6817a.jpeg',
  },
  members: ['의진', '지현', '해민', '동영', '재웅'],
  notice: ['3/12일 12시 도착하기', '차 렌트 연락 주기'],
  places: ['La Favola', 'Ober Mamma'],
  memos: ['독일의 맛집 거리'],
  dday: 10,
};

export type GroupType = {
  id: number;
  dday: number;
  image?: null;
  name: string;
  firstDay: string;
  lastDay: string;
  leader: {
    id: string;
    nickname: string;
    profile: string;
  };
  members: Array<GroupMember>;
  notices: Array<NoticeType>;
  places: Array<PlaceType>;
  memos: Array<NoticeType>;
};

type NoticeType = {
  id: number;
  data: string;
};

type PlaceType = {
  id: number;
  link: URL;
  name: string;
};

export type GroupMember = {
  id: number;
  nickname: string;
  profile: null;
};

//const URL = 'https://wtwt-test-c77ec-default-rtdb.firebaseio.com';

export async function storeGroup() {
  const response = await axios.post(URL + '/groups.json', testGroup);
  // const id = response.data.id;
  return response;
}

export async function fetchGroup() {
  const URL = 'http://10.50.45.55:8080/groups';

  const response = await axios.get(URL);
  const groups = {
    id: response.data.id,
    dday: response.data.dday,
    image: response.data.image,
    name: response.data.name,
    firstDay: response.data.firstDay,
    lastDay: response.data.lastDay,
    leader: response.data.leader,
    members: response.data.members,
    notices: response.data.notices,
    places: response.data.places,
    memos: response.data.memos,
  };

  // console.log(groups);
  console.log(groups);
  return groups;
}

export type MyGroupType = {
  id: number;
  dday: number;
  image?: null;
  name: string;
  firstDay: string;
  leader: {
    id: string;
    nickname: string;
    profile: string;
  };
};

//const URL = 'https://wtwt-test-c77ec-default-rtdb.firebaseio.com';

export async function fetchGroupList() {
  const URL = 'http://10.50.45.55:8080/groups';
  const response = await axios.get(URL);
  const groups = new Array<GroupType>();
  for (const key in response.data) {
    const groupObj = {
      id: response.data[key].id,
      dday: response.data[key].dday,
      image: response.data[key].image,
      name: response.data[key].name,
      firstDay: response.data[key].firstDay,
      lastDay: response.data[key].lastDay,
      leader: response.data[key].leader,
      members: response.data.members,
      notices: response.data[key].notices,
      places: response.data[key].places,
      memos: response.data[key].memos,
    };
    groups.push(groupObj);
  }
  return groups;
}
