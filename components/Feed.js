import InputBox from './InputBox';
import Posts from './Posts';
import Stories from './Stories';

// Below posts is for prefetched
function Feed({ posts }) {
  return (
    <div
      className="flex-grow h-screen pb-44 pt-6 mr-4
    xl:mr-40 overflow-y-auto scrollbar-hide"
    >
      {/* mx-auto will keep inside the middle feed at the center */}
      <div className="mx-auto max-w-md md:max-w-lg xl:max-w-2xl">
        {/* Stories */}
        <Stories />
        {/* InputBox */}
        <InputBox />
        {/* Posts posts={posts} - are the prefetched*/}
        <Posts posts={posts} />
      </div>
    </div>
  );
}

export default Feed;
