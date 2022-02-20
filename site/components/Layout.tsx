import Head from 'next/head';

type Props = {
  children: JSX.Element[] | JSX.Element;
};

function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Lecture Ranking!</title>
      </Head>
      <div className="flex flex-col pt-5 border-t border-base-300 bg-base-200 border border-base-200 rounded-2xl min-h-screen">
        {children}
      </div>
    </>
  );
}

export default Layout;
