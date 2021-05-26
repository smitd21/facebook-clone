import { useCollection } from 'react-firebase-hooks/firestore'; //! Awesome hook
import { db } from '../firebase';
import Post from './Post';

function Posts() {
  const [realtimePosts] = useCollection(
    //look inside db and display them order by timestamp - most recent at the top
    db.collection('posts').orderBy('timestamp', 'desc')
  );
  return (
    <div>
      {/* list of docs me se render each post */}
      {realtimePosts?.docs.map((post) => (
        //   for every single post render Post component
        <Post
          key={post.id}
          //   to acces the data of post inside we do .data(). - we pushed all of these and now render it
          name={post.data().name}
          message={post.data().message}
          email={post.data().email}
          timestamp={post.data().timestamp}
          image={post.data().image}
          postImage={post.data().postImage}
        />
      ))}
    </div>
  );
}

export default Posts;
