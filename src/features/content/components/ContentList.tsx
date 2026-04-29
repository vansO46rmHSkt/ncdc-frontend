import NewPageButton from '@/components/ui/button/NewPageButton';
import DoneButton from '@/components/ui/button/DoneButton';
import EditButton from '@/components/ui/button/EditButton';
import { useContents } from '@/features/content/hooks/useContents';
import { Suspense, useCallback, useReducer, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router';
import DeleteIconButton from '@/components/ui/button/DeleteIconButton';
import ErrorBoundary from '@/app/ErrorBoundary';
import Loading from '@/components/ui/loading/Loading';

const DeleteIconButtonWrapper = ({
  onClick,
}: {
  onClick: () => Promise<void>;
}) => {
  const [canDelete, setCanDelete] = useState(true);

  const handleDelete = useCallback(async () => {
    setCanDelete(false);
    await onClick();
    setCanDelete(true);
  }, [onClick]);

  return <DeleteIconButton disabled={!canDelete} onClick={handleDelete} />;
};

const NewPageButtonWrapper = ({
  onClick,
}: {
  onClick: () => Promise<void>;
}) => {
  const [canAdd, setCanAdd] = useState(true);

  const handleAdd = useCallback(async () => {
    setCanAdd(false);
    await onClick();
    setCanAdd(true);
  }, [onClick]);

  return <NewPageButton disabled={!canAdd} onClick={handleAdd} />;
};

const ContentListInner = () => {
  const { contentId } = useParams();
  const navigate = useNavigate();

  const { contents, add, remove } = useContents();
  const [canEdit, toggleCanEdit] = useReducer((prev) => !prev, false);

  const handleDelete = useCallback(
    async (id: number) => {
      await remove(id);
      if (contentId && id === parseInt(contentId)) {
        navigate('/content');
      }
    },
    [contentId, navigate, remove],
  );

  const handleAdd = useCallback(async () => {
    const result = await add();
    navigate(`/content/${result.id}`);
  }, [add, navigate]);

  return (
    <div className="flex h-full min-h-0 w-70 flex-col">
      <div className="ml-10 overflow-y-auto">
        <div className="truncate pl-2.5">
          {contents.map((content) => (
            <div key={content.id} className="flex h-11 items-center gap-2.5">
              <NavLink
                className="w-46.5 truncate"
                to={`/content/${content.id}`}
                title={content.title ?? '(タイトルを入力)'}
              >
                {content.title ?? '(タイトルを入力)'}
              </NavLink>
              {canEdit && (
                <DeleteIconButtonWrapper
                  onClick={() => handleDelete(content.id)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-light-blue1 mt-auto flex h-15 justify-between py-2.5 pr-2.5 pl-10">
        {canEdit ? (
          <>
            <NewPageButtonWrapper onClick={handleAdd} />
            <DoneButton onClick={toggleCanEdit} />
          </>
        ) : (
          <>
            <div />
            <EditButton onClick={toggleCanEdit} />
          </>
        )}
      </div>
    </div>
  );
};

const ContentList = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <ContentListInner />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ContentList;
