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
  image: string;
  name: string;
  firstDay: string;
  lastDay: string;
  leader: GroupMember;
  members: Array<GroupMember>;
  notices: Array<NoticeType>;
  places: Array<PlaceType>;
  memos: Array<NoticeType>;
  tags: string[];
};

export type NoticeType = {
  id: number;
  data: string;
};

export type PlaceType = {
  id: number;
  link: URL;
  name: string;
};

export type GroupMember = {
  id: number;
  nickname: string;
  profile: string | null;
};

export const defaultGroupMember = {
  id: 0,
  nickname: '',
  profile: null,
};

export async function fetchGroup(api: string = '') {
  const response = await axios.get(process.env.API_KEY + '/groups/' + api);
  const groups: GroupType = {
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
    tags: response.data.tags,
  };
  return groups;
}

export type MyGroupType = {
  id: number;
  dday: number;
  image?: string[] | null;
  name: string;
  firstDay: string;
  leader: {
    id: string;
    nickname: string;
    profile: string;
  };
};

export async function fetchGroupList() {
  const response = await axios.get(process.env.API_KEY + '/groups');
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
      members: response.data[key].members,
      notices: response.data[key].notices,
      places: response.data[key].places,
      memos: response.data[key].memos,
      tags: response.data[key].tags,
    };
    groups.push(groupObj);
  }

  return groups;
}

export const fetchMemberList = async (groupId: string) => {
  const response = await axios.get(
    process.env.API_KEY + '/groups/' + groupId + '/members',
  );
  const members = new Array<GroupMember>();
  for (const key in response.data) {
    const memberObj = {
      id: response.data[key].id,
      nickname: response.data[key].nickname,
      profile: response.data[key].profile,
    };
    members.push(memberObj);
  }
  console.log(members);
  return members;
};

export const storeNotice = async (groupId: string, notice: string) => {
  const response = await axios.post(
    process.env.API_KEY +
      '/groups/' +
      groupId +
      '/notice' +
      '?contents=' +
      notice,
  );
  return response.data;
};

export const patchList = async (
  type: string,
  groupId: string,
  id: number,
  notice: string,
) => {
  const response = await axios.patch(
    process.env.API_KEY +
      '/groups/' +
      groupId +
      `/${type}/` +
      id +
      '?contents=' +
      notice,
  );
  return response.data;
};

export const deleteList = async (type: string, groupId: string, id: number) => {
  const response = await axios.delete(
    process.env.API_KEY + '/groups/' + groupId + `/${type}/` + id,
  );
  return response.data;
};

export const storeMemo = async (groupId: string, memo: string) => {
  const response = await axios.post(
    process.env.API_KEY + '/groups/' + groupId + '/memo' + '?contents=' + memo,
  );
  return response.data;
};

export const storePlace = async (
  groupId: string,
  name: string,
  link: string,
) => {
  const response = await axios.post(
    process.env.API_KEY +
      '/groups/' +
      groupId +
      '/link' +
      '?link=' +
      link +
      '&description=' +
      name,
  );
  return response.data;
};

export const inviteMember = async (groupId: string, userId: string) => {
  const response = await axios.post(
    process.env.API_KEY + '/groups/' + userId + '/invite/' + groupId,
  );
  return response;
};

export type AlarmType = {
  id: string;
  message: string;
  type: string;
  groupId: string;
  createdAt: string;
  read: boolean;
};

export const defaultAlarm = {
  id: 0,
  message: '',
  type: '',
  groupId: 0,
  createdAt: '',
  read: false,
};

export const patchAlarms = async () => {
  const response = await axios.get(
    process.env.API_KEY + '/notifications?isInvite=true',
  );
  const alarms: AlarmType[] = response.data;
  // console.log(alarms, 'Alarms');
  return alarms;
};

export const acceptInvitation = async (id: string) => {
  const response = await axios.post(
    process.env.API_KEY + '/notifications/' + id + '?sAccept=true',
  );
  return response.data;
};
