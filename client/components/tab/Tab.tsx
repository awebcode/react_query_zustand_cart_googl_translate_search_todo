export const Tab = ({ tabName, isActive, onClick }: any) => (
  <div
    className={`cursor-pointer px-4 py-2 ${
      isActive ? "bg-blue-500 text-white" : "bg-gray-200"
    }`}
    onClick={() => onClick(tabName)}
  >
    {tabName}
  </div>
);
