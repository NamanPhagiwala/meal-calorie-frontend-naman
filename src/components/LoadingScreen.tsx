export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-teal-600 dark:border-teal-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
