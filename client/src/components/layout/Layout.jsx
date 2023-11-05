import Header from '../header/header'
import Footer from '../footer/Footer'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="min-h-[830px] ">{children}</div>
      <Footer />
    </>
  )
}
export default Layout
