import Head from 'next/head';
import { Navbar, SideMenu } from '../';

type Props = {
  pageTitle: string;
  pageDescription: string;
  imgFullUrl?: string;
  children: React.ReactNode;
};

const ShopLayout = ({ children, pageTitle, pageDescription, imgFullUrl }: Props) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>

        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={pageTitle} />
        <meta name="og:description" content={pageDescription} />
        {imgFullUrl && <meta name="og:image" content={imgFullUrl} />}
      </Head>
      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <main
        style={{
          margin: '80px auto',
          maxWidth: '1440px',
          padding: '0 30px',
        }}
      >
        {children}
      </main>

      <footer>{/* TODO: footer */}</footer>
    </>
  );
};

export default ShopLayout;
