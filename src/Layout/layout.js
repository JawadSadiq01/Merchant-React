import Header from "../Components/Common/Header";
import Footer from "../Components/Common/Footer";
const Layout = ({ children }) => {
  return (
    <div>
      <Header />
        {children}
      <Footer />
    </div>
  );
};

export default Layout;
