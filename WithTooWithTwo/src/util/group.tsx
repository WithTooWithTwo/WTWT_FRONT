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
  groupId: string;
  groupImage?: string;
  groupName: string;
  firstDay: string;
  headCounts: number;
  leader: {
    id: string;
    nickname: string;
    profile: string;
  };
  members: Array<string>;
  notice: Array<string>;
  places: Array<string>;
  memos: Array<string>;
  dday: number;
};

const URL = 'https://wtwt-test-c77ec-default-rtdb.firebaseio.com';
export async function storeGroup() {
  const response = await axios.post(URL + '/groups.json', testGroup);
  // const id = response.data.id;
  return response;
}

export async function fetchGroup() {
  const response = await axios.get(URL + '/groups.json');
  const groups = new Array<GroupType>();
  for (const key in response.data) {
    const groupObj = {
      groupId: response.data[key].groupId,
      groupImage: response.data[key].groupImage,
      groupName: response.data[key].groupName,
      firstDay: response.data[key].firstDay,
      headCounts: response.data[key].headCounts,
      leader: response.data[key].leader,
      members: response.data[key].members,
      notice: response.data[key].notice,
      places: response.data[key].places,
      memos: response.data[key].memos,
      dday: response.data[key].dday,
    };
    groups.push(groupObj);
  }
  return groups;
}
