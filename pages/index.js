import { getSession } from 'next-auth/client';
import Head from 'next/head';
import Feed from '../components/Feed';
import Header from '../components/Header';
import Login from '../components/Login.js';
import Sidebar from '../components/Sidebar';

export default function Home({ session }) {
  //passed the session prop

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
        {/* Feed */}
        <Feed />
        {/* Widgets */}
      </main>
    </div>
  );
}

// Incooperate sever side rendering in our next js app
// This will tell next js that now we are gonna have ssr

export async function getServerSideProps(context) {
  //Get the user props
  const session = await getSession(context);

  //! Our user makes a request to go to oursite.com wherever your nextjs application is
  // That request hits the server, the server then gets the user's session our the logged in/out
  // user is waiting at that point right and sever has that information about it so server basically prepares the page
  // and that session information it passes it to the component as props and then all this information is the rendered on the user's browser
  return {
    props: {
      session,
      // NOW passing this prop it above as in Home Component
    },
  };
}
