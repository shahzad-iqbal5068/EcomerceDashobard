
import Footer from './Footer'
import Nav from './Nav'
import { Outlet } from 'react-router-dom'

const  AppLayout = () => {
    return (
        <div>
            <Nav />
            <Outlet/>
            <Footer />
        </div>
    )
}

export default AppLayout
