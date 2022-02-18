type Props = {
  children: JSX.Element[] | JSX.Element;
};

function Layout({ children }: Props) {
  return (
    <div className="flex flex-col justify-center pt-5 border-t border-base-300 bg-base-200 border border-base-200 rounded-2xl">
      {children}
    </div>
  );
}

export default Layout;
