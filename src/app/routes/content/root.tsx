import EditPage from '@/app/routes/content/EditPage';
import SideMenu from '@/app/routes/content/SideMenu';

const ContentRoot = () => {
  return (
    <div className="flex h-screen">
      <SideMenu />
      <EditPage />
    </div>
  );
};

export default ContentRoot;
