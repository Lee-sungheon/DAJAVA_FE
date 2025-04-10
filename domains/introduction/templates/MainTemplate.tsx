import MainBanner from '../components/main/MainBanner';
import MainFetureCards from '../components/main/MainFetureCards';
import MainFooter from '../components/main/MainFooter';

const MainTemplate = () => {
  return (
    <>
      <MainBanner />
      <MainFetureCards />
      <MainFooter />
    </>
  );
};

MainTemplate.displayName = 'MainTemplate';

export default MainTemplate;
