import Image from 'next/image'; //the Image of Next by default has lazy loading and it coverts it to webp format - super optimized images
import { ChatAltIcon, ShareIcon, ThumbUpIcon } from '@heroicons/react/outline';

function Post({ name, message, email, image, postImage, timestamp }) {
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
        <div className="flex items-center space-x-2">
          <img
            className="rounded-full"
            src={image}
            width={40}
            height={40}
            alt=""
          />
          <div className="">
            <p className="font-medium">{name}</p>

            {/* As for prefetched post the timestamp isn't loaded so at that time show 'Loading' and when realtime i.e when timestamp is there show the server actual date&time */}

            {timestamp ? (
              // For realtime posts (i.e when Realtime post are rendered)
              <p className="text-xs text-gray-400">
                {new Date(timestamp?.toDate()).toLocaleString()}
                {/* Takes the timestamp from firebase toDate & then converts it Locale to user */}
              </p>
            ) : (
              // For prefetched posts show 'Loading'
              <p className="text-xs text-gray-400">Loading</p>
            )}
          </div>
        </div>
        <p className="pt-4">{message}</p>
      </div>
      {/* Only if there is a postImage */}
      {postImage && (
        <div className="relative h-56 md:h-96 bg-white">
          {/* relative is important */}
          <Image src={postImage} objectFit="cover" layout="fill" />
        </div>
      )}
      {/* Footer of the post */}
      <div
        className="flex justify-between items-center rounded-b-2xl bg-white 
      shadow-md text-gray-400 border-t"
      >
        <div className="inputIcon rounded-none rounded-bl-2xl">
          <ThumbUpIcon className="h-4" />
          <p className="text-xs sm:text-base">Like</p>
        </div>
        <div className="inputIcon rounded-none">
          <ShareIcon className="h-4" />
          <p className="text-xs sm:text-base">Comment</p>
        </div>
        <div className="inputIcon rounded-none rounded-br-2xl">
          <ChatAltIcon className="h-4" />
          <p className="text-xs sm:text-base">Share</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
