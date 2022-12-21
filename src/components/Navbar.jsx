import './Navbar.css'

const Navbar = ({ children }) => {
    return (
        <div className='navbar'>
            <h2 className='title'>Front Challenge Alejandro Ríos</h2>
            {children}
            <p>Doble click en cada elemento para eliminarlo</p>
        </div>
    )
}

export default Navbar