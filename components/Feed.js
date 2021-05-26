import Stories from './Stories';

function Feed() {
  return (
    <div
      className="flex-grow h-screen pb-44 pt-6 mr-4
    xl:mr-40 overflow-y-auto"
    >
      {/* mx-auto will keep inside the middle feed at the center */}
      <div className="mx-auto max-w-md md:max-w-lg xl:max-w-2xl">
        {/* Stories */}
        <Stories />
        {/* InputBox */}
        {/* Posts */}
      </div>
    </div>
  );
}

export default Feed;
