import ErrorBoundary from '@/app/ErrorBoundary';
import CancelButton from '@/components/ui/button/CancelButton';
import EditButton from '@/components/ui/button/EditButton';
import SaveButton from '@/components/ui/button/SaveButton';
import Textarea from '@/components/ui/input/Textarea';
import TextField from '@/components/ui/input/TextField';
import Loading from '@/components/ui/loading/Loading';
import { useContent } from '@/features/contents/hooks/useContent';
import { Suspense, useReducer, useRef, useState } from 'react';

const SaveCancelButtonSet = ({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: () => Promise<void>;
}) => {
  const [canSave, setCanSave] = useState(true);

  const handleSave = async () => {
    setCanSave(false);
    await onSave();
    setCanSave(true);
  };

  return (
    <div className="flex w-22.5 justify-between gap-2.5">
      <CancelButton onClick={onCancel} />
      <SaveButton onClick={handleSave} disabled={!canSave} />
    </div>
  );
};

const TitleArea = ({
  title,
  inputValue,
  error,
  onChange,
  onCancel,
  onSave,
}: {
  title: string | null;
  inputValue: string;
  error?: string;
  onChange: (title: string) => void;
  onCancel: () => void;
  onSave: () => Promise<boolean>;
}) => {
  const [canEdit, toggleCanEdit] = useReducer((prev) => !prev, false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="mb-5 flex">
      {canEdit ? (
        <div className="w-227.5">
          <TextField
            name="title"
            inputRef={inputRef}
            placeholder="タイトルを入力してください"
            className="text-title font-bold"
            error={!!error}
            helperText={error}
            value={inputValue}
            onChange={(e) => {
              onChange(e.currentTarget.value);
            }}
          />
        </div>
      ) : (
        <h2 className="text-title w-227.5 truncate pl-7.5 font-bold">
          {title}
        </h2>
      )}
      <div className="ml-5">
        {canEdit ? (
          <SaveCancelButtonSet
            onCancel={() => {
              onCancel();
              toggleCanEdit();
            }}
            onSave={async () => {
              const result = await onSave();
              if (result) {
                toggleCanEdit();
              } else {
                inputRef.current?.focus();
              }
            }}
          />
        ) : (
          <EditButton onClick={toggleCanEdit} />
        )}
      </div>
    </div>
  );
};

const BodyArea = ({
  body,
  inputValue,
  error,
  onChange,
  onCancel,
  onSave,
}: {
  body: string | null;
  inputValue: string;
  error?: string;
  onChange: (body: string) => void;
  onCancel: () => void;
  onSave: () => Promise<boolean>;
}) => {
  const [canEdit, toggleCanEdit] = useReducer((prev) => !prev, false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <div className="flex min-h-0 grow">
      {canEdit ? (
        <div className="w-227.5 overflow-y-auto">
          <Textarea
            name="body"
            inputRef={inputRef}
            placeholder="本文を入力してください"
            className="field-sizing-content"
            error={!!error}
            helperText={error}
            value={inputValue}
            onChange={(e) => {
              onChange(e.currentTarget.value);
            }}
          />
        </div>
      ) : (
        <div className="w-227.5 overflow-y-auto rounded-lg bg-white p-7.5 whitespace-pre-wrap">
          <p>{body}</p>
        </div>
      )}
      <div className="ml-5">
        {canEdit ? (
          <SaveCancelButtonSet
            onCancel={() => {
              onCancel();
              toggleCanEdit();
            }}
            onSave={async () => {
              const result = await onSave();
              if (result) {
                toggleCanEdit();
              } else {
                inputRef.current?.focus();
              }
            }}
          />
        ) : (
          <EditButton onClick={toggleCanEdit} />
        )}
      </div>
    </div>
  );
};

const ContentDetailInner = ({ id }: { id: number }) => {
  const { content, inputValues, change, update, errors, cancel } =
    useContent(id);

  return (
    <>
      <TitleArea
        title={content.title}
        inputValue={inputValues.title}
        error={errors.title}
        onChange={(value) => change('title', value)}
        onCancel={() => cancel('title')}
        onSave={async () => await update('title')}
      />
      <BodyArea
        body={content.body}
        inputValue={inputValues.body}
        error={errors.body}
        onChange={(value) => change('body', value)}
        onCancel={() => cancel('body')}
        onSave={async () => await update('body')}
      />
    </>
  );
};

const ContentDetail = ({ id }: { id: number }) => {
  return (
    <div className="bg-light-blue1 flex min-h-0 flex-col rounded-2xl p-7.5">
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <ContentDetailInner key={id} id={id} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default ContentDetail;
