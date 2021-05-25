import Footer from './footer'
import Header from './header'

const Layout: React.FC<React.ReactNode> = ({ children }) => (
  <>
    <Header />
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex-grow my-10">{children}</main>
      <Footer />
    </div>
  </>
)

export default Layout
