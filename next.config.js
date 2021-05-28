//! From what domains we are allowing the images - A Security procedure - allows our app to make bit more secure and kind of optimizes what it's doing
module.exports = {
  images: {
    domains: [
      //Whitelisting the domains from where we gettin the images
      'links.papareact.com',
      'platform-lookaside.fbsbx.com', //Where FB stores alot of pictures
      'firebasestorage.googleapis.com', //For firebase firestore - real time db functionality, firebase storage sdk and firepicker API

      // For the Google Acc image
      'lh3.googleusercontent.com',
    ],
  },
};
