const Loading = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex h-full items-center justify-center`}
    >
      <div
        className={`border-light-blue h-10 w-10 animate-spin rounded-full border-4 border-t-transparent`}
      />
    </div>
  );
};

export default Loading;
