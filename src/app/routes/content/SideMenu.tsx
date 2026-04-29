import logo from '@/assets/logo.svg';
import ContentList from '@/features/contents/components/ContentList';
import { NavLink } from 'react-router';

const SideMenu = () => {
  return (
    <div className="border-light-blue1 box-content flex min-w-70 flex-col border-r">
      <NavLink
        className="mt-7.5 mb-7.5 ml-10 flex h-8 items-center gap-2"
        to={'/content'}
      >
        <img src={logo} />
        <h1 className="text-title font-bold">ServiceName</h1>
      </NavLink>
      <ContentList />
    </div>
  );
};

export default SideMenu;
