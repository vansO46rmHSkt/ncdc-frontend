import Main from '@/app/routes/content/Main';
import SideMenu from '@/app/routes/content/SideMenu';

const ContentRoot = () => {
  return (
    <div className="flex h-screen">
      <SideMenu />
      <Main />
    </div>
  );
};

export default ContentRoot;
