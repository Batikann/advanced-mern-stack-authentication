import Header from '../header/header'
import Footer from '../footer/Footer'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  )
}
export default Layout
