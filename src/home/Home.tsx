import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div className="form">
            <h1>Skyler's DB Sandbox</h1>
            <button className="form-button">
                <Link to={'/add'}>Add User</Link>
            </button>
            <button className="form-button">
                <Link to={'/retrieve'}>Retrieve User</Link>
            </button>
            <button className="form-button">
                <Link to={'/delete'}>Delete User</Link>
            </button>
            <button className="form-button">
                <Link to={'/retrieveAll'}>Retrieve All Users</Link>
            </button>
            <button className="form-button">
                <Link to={'/edit'}>Edit User</Link>
            </button>
        </div>
    )
}