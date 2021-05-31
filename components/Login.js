import { signIn } from 'next-auth/client';
import Image from 'next/image';

function Login() {
  return (
    <div className="grid place-items-center">
      <Image
        className="hover:animate-spin"
        src="https://links.papareact.com/t4i"
        height={400}
        width={400}
        objectFit="contain"
      />
      <h1 className="text-xl mb-10 text-gray-400">F A C E B O O K</h1>
      <h1
        onClick={signIn}
        className="p-5 bg-blue-500 rounded-full cursor-pointer text-white text-center hover:animate-pulse"
      >
        Login with Facebook
      </h1>
    </div>
  );
}

export default Login;
