import Footer from "./footer"
import Navbar from "./navbar"

const Layoutcomponent = ({ children }) => {
    return (
        <div className="max-w-8xl">
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layoutcomponent