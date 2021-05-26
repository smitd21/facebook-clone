import { useSession } from 'next-auth/client';
import Image from 'next/image';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { useRef, useState } from 'react';
import { db, storage } from '../firebase';
import firebase from 'firebase';

function InputBox() {
  const [session] = useSession();
  const inputRef = useRef(null); //! A finger pointer (in this finger pointing to our inpu field)
  const filepickerRef = useRef(null); // finger pointing to our image picker input

  const [imageToPost, setImageToPost] = useState(); // When the image to be posted is selected show besides our input field

  const sendPost = (e) => {
    e.preventDefault();

    //Empty Input block it
    if (!inputRef.current.value) return; //won't do anything if empty

    //* Make a collection of 'posts' and add whatever u want
    db.collection('posts')
      .add({
        message: inputRef.current.value,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(), //Server's Timestamp - Take timestamp where the db is located - This is awesome
      })
      .then((doc) => {
        //! Start upload
        //if image is to post
        if (imageToPost) {
          //Create a storage of image to post
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imageToPost, 'data_url'); //string coz- bunch pf letters that build up a image url // we read it in data url and post it in data url - goes hand in hand
          removeImage();

          //! Listen to state change - show error in log if any & upload if not render the state
          uploadTask.on(
            'state_change',
            null, //progress - but not using here
            (error) => console.error(error),
            () => {
              //When the upload completes - the complete state
              //Into the storage
              storage
                .ref('posts') //
                .child(doc.id)
                .getDownloadURL() // download url of image and us it
                .then((url) => {
                  db.collection('posts').doc(doc.id).set(
                    //into post collection you set
                    {
                      postImage: url,
                    },
                    { merge: true } //Important
                  );
                });
            }
          );
        }
      });

    //After posting set our ref (i.e input) to empty
    inputRef.current.value = '';
  };

  const addImageToPost = (e) => {
    const reader = new FileReader(); // using FileReader api

    //take the option user has clicked - e.target.files
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // we read that as a data url
    }

    //when it loads and (readerevent) comes back it comes back as result
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        {/* flex-1 takes majority of space */}
        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            placeholder={`What's on your mind, ${session.user.name}?`}
            ref={inputRef}
          />
          <button hidden onClick={sendPost} type="submit">
            Submit
          </button>
        </form>

        {/* Rendering Image Preview - if there is an image to post i.e something is added to store */}
        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 
          transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img
              className="h-10 object-contain"
              src={imageToPost}
              src={imageToPost}
              alt=""
            />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>
      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div
          onClick={() => filepickerRef.current.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            ref={filepickerRef}
            onChange={addImageToPost}
            type="file"
            hidden
          />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
