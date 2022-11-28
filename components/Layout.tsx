import Footer from './Footer';
import Header from './Header';
import SubHeader from './SubHeader';

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <SubHeader />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
