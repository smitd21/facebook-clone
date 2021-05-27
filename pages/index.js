import { getSession } from 'next-auth/client';
import Head from 'next/head';
import Feed from '../components/Feed';
import Header from '../components/Header';
import Login from '../components/Login.js';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';
import { db } from '../firebase';

// Below posts is for prefetched
export default function Home({ session, posts }) {
  //passed (fed) the session prop (session&posts)

  if (!session) return <Login />;

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Facebook</title>
      </Head>
      {/* Header */}
      <Header />

      <main className="flex">
        {/* Sidebar */}
        <Sidebar />
        {/* Feed - also consume the prefetched posts in Feed component alse*/}
        <Feed posts={posts} />
        {/* Widgets */}
        <Widgets />
      </main>
    </div>
  );
}

//! Incooperate sever side rendering in our next js app
// This will tell next js that now we are gonna have ssr

export async function getServerSideProps(context) {
  //Get the user props
  const session = await getSession(context);

  /*
   * Prefetch the post on the server (Motive: Not to be able to scrolldown or show any picture/data until everything is loaded/rendered
   * just show 'Loading' (for post date&time (coz thats realtime not loaded yet right) coz better than showing noting) until then the datetime is loaded completely
   */
  const posts = await db.collection('posts').orderBy('timestamp', 'desc').get();

  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
    //Note - while prefetching we do not fetch timestamp
  }));

  //! Our user makes a request to go to oursite.com wherever your nextjs application is
  // That request hits the server, the server then gets the user's session our the logged in/out
  // user is waiting at that point right and sever has that information about it so server basically prepares the page
  // and that session information it passes it to the component as props and then all this information is the rendered on the user's browser

  return {
    props: {
      // NOW passing this as prop to render it above as in Home Component
      session,
      posts: docs, // posts being prefetch before even it reaches the browser

      //* now go up and feed all these props (session & posts)
    },
  };
}
