import React, { useState, useContext } from 'react';
import styles from './Manager.module.scss';
import Button from 'components/Button';
// import { PermissionsContext} from 'Permissions';
import {usePermissions, Can} from 'Permissions';
const Manager = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: 'This is a post on a service' },
    { id: 2, title: 'A second post? It will shock you' },
    { id: 3, title: 'What even are these' },
    { id: 4, title: 'This is the last one' },
    { id: 5, title: 'I lied' },
  ]);
// const pcValue = useContext(PermissionsContext)
// if(pcValue === null){
//   throw new Error('Must be inside of PermissionsProvider')
// }
// //can't destructure null value so check if null and throw error otherwise can't be null so can destructure
// const {permissions} = pcValue
const {permissions} = usePermissions()
  const remove = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1>Manager</h1>
      <ul className={styles.posts}>
        {posts.map(post => (
          <li className={styles.post} key={post.id}>
            <div className={styles.post_title}>
              {post.title}
            </div>
            {/* TODO: Only render this for users that are allowed to delete posts */}
            <div className={styles.post_buttons}>
              <Can permissions="user:write">
                <Button palette="danger" onClick={() => remove(post.id)}>
                 Delete
                </Button>
              </Can>
              <Button palette="danger" onClick={() => remove(post.id)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Manager;
