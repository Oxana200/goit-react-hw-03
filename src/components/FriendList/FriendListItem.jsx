import styles from './FriendListItem.module.css';

const FriendListItem = ({ avatar, name, isOnline }) => {
  return (
    <div className={styles['friend-card']}>
      <img src={avatar} alt="Avatar" width="48" />
      <p className={styles['friend-name']}>{name}</p>
      <p className={isOnline ? styles['friend-status-online'] : styles['friend-status-offline']}>
        {isOnline ? 'Online' : 'Offline'}
      </p>
    </div>
  );
};


export default FriendListItem;
