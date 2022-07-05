import { signIn } from 'next-auth/react';

const Home = () => {
  return (
    <button className="btn btn-primary" onClick={() => signIn()}>
      Login
    </button>
  );
};

export default Home;
