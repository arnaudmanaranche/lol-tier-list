import Footer from './footer'
import Header from './header'

const Layout: React.FC<React.ReactNode> = ({ children }) => (
  <>
    <Header />
    <main className="relative p-5">{children}</main>
    <Footer />
  </>
)

export default Layout
