export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
