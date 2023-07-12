import axios from 'axios';
const testGroup = {
  groupImage: 'hi.jpeg',
  groupName: 'Konstanz',
  firstDay: '2022-09-5',
  headCounts: 7,
  leader: {
    id: Math.random().toString(),
    nickname: 'yuna',
    profile: '1f640ace-bdc7-4333-9fab-56e9b6817a.jpeg',
  },
  members: ['a'],
  notice: ['b'],
  places: ['c'],
  memos: ['d'],
  dday: 30,
};

export type GroupType = {
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
  for (const key in response) {
    const groupObj = {
      groupImage: response.data[key].groupImage,
      groupName: response.data[key].groupName,
      firstDay: response.data[key].firstDay,
      headCounts: response.data[key].headCounts,
      leader: {
        id: response.data[key].leader.id,
        nickname: response.data[key].leader.nickname,
        profile: response.data[key].leader.profile,
      },
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
