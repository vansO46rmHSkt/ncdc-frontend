import ContentDetail from '@/features/contents/components/ContentDetail';
import { useParams } from 'react-router';

const Main = () => {
  const { contentId } = useParams();

  return (
    <div className="flex w-290 flex-col px-10 pt-7.5">
      {contentId ? (
        <ContentDetail id={parseInt(contentId)} />
      ) : (
        <p>コンテンツが選択されていません。</p>
      )}
      <div className="text-caption mt-auto flex min-h-15 items-center justify-between">
        <span>Copyright © 2021 Sample</span>
        <span>運営会社</span>
      </div>
    </div>
  );
};

export default Main;
