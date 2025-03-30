import { redirect } from 'next/navigation';

import { ROUTES } from '@dajava/constants/routes';

const Home = () => {
  redirect(ROUTES.MAIN);
};

Home.displayName = 'Home';

export default Home;
