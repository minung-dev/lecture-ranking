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
      <div className="flex flex-col pt-5 bg-base-200 border border-base-200 min-h-screen">
        {children}
      </div>
    </>
  );
}

export default Layout;
