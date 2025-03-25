import { Navigate } from 'react-router-dom';

const Publicroute = ({ children }) => {

    if (!localStorage.getItem('logintoken')) {
        return (
            <>
                {children}
            </>
        )
    }
    return <Navigate to='/todo' />

}

export default Publicroute