import { useCollection } from 'react-firebase-hooks/firestore'; //! Awesome hook
import { db } from '../firebase';
import Post from './Post';

// Below posts is for prefetched
function Posts({ posts }) {
  const [realtimePosts] = useCollection(
    //look inside db and display them order by timestamp - most recent at the top
    db.collection('posts').orderBy('timestamp', 'desc')
  );
  return (
    <div>
      {/* 1. have realtime post 2. prefetched server side posts */}

      {/* list of docs me se render each post */}

      {/* If we have relatimePosts render those */}
      {realtimePosts
        ? realtimePosts?.docs.map((post) => (
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
          ))
        : // And for prefetched serververside posts render those - do not letting to scroll down unless realtime loaded
          posts.map((post) => (
            <Post
              key={post.id}
              //  Since there is no data (&also no timestamp) at the time of prefetching so direct post.name ...
              name={post.name}
              message={post.message}
              email={post.email}
              timestamp={post.timestamp}
              image={post.image}
              postImage={post.postImage}
            />
          ))}
    </div>
  );
}

export default Posts;
