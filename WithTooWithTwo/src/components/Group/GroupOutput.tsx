import {GroupType} from '../../util/group';
import GroupItem from './GroupItem';
import {FlatList, View} from 'react-native';

function GroupOutput({groups}: {groups: GroupType[]}) {
  const renderGroupItem = ({item}: {item: GroupType}) => {
    return <GroupItem {...item} />;
  };

  return (
    <>
      <FlatList
        style={{paddingHorizontal: 30, paddingVertical: 30}}
        data={groups}
        renderItem={renderGroupItem}
        keyExtractor={(item, index) =>
          item?.groupId?.toString() || index.toString()
        }
      />
    </>
  );
}

export default GroupOutput;
