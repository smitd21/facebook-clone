import Image from 'next/image';
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from '@heroicons/react/solid';
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import HeaderIcon from './HeaderIcon';
import { signOut, useSession } from 'next-auth/client';
import useDarkMode from '../hooks/useDarkMode';
import { LightBulbIcon, MoonIcon } from '@heroicons/react/solid';

function Header() {
  const [session] = useSession(); //! useSession hook to pull th session information from anywhere within the app
  const [colorTheme, setTheme] = useDarkMode();
  return (
    <div
      className="sticky top-0 z-50 bg-white flex
    items-center p-2 lg:px-5 shadow-md dark:bg-gray-800 dark:text-white"
    >
      {/* Left */}
      <div className="flex items-center">
        <Image
          src="http://links.papareact.com/5me"
          width={40}
          height={40}
          layout="fixed"
        />
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hidden md:inline-flex ml-2 items-center bg-transparent outline-none 
            placeholder-gray-500 dark:text-black flex-shrink"
          />
        </div>
      </div>

      {/* Center */}
      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon active Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center sm:space-x-2 justify-end">
        {/* Profile pic*/}
        {colorTheme === 'light' ? (
          <LightBulbIcon
            onClick={() => setTheme('light')}
            className="h-8 text-gray-400 dark:text-gray-200 ml-2 cursor-pointer"
          />
        ) : (
          <MoonIcon
            onClick={() => setTheme('dark')}
            className="h-8 text-[#023047]  ml-2 cursor-pointer"
          />
        )}
        <Image
          onClick={signOut}
          className="rounded-full cursor-pointer"
          src={session.user.image}
          width="40"
          height="40"
          layout="fixed"
        />
        <p className="whitespace-nowrap font-semibold pr-3">
          {session.user.name}
        </p>
        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </div>
    </div>
  );
}

export default Header;
