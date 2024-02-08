export const TabContent = ({ isActive, children }: any) => (
  <div className={`text-white mt-4 p-4 border ${isActive ? "block" : "hidden"}`}>
    {children}
  </div>
);
