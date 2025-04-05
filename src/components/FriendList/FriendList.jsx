import FriendListItem from './FriendListItem'; 
import styles from './FriendList.module.css';

const FriendList = ({ friends }) => {
  return (
    <ul className={styles['friend-list']}>
      {friends.map(({ id, avatar, name, isOnline }) => (
        <li key={id} className={styles['friend-list-item']}>
          <FriendListItem avatar={avatar} name={name} isOnline={isOnline} />
        </li>
      ))}
    </ul>
  );
};


export default FriendList;

