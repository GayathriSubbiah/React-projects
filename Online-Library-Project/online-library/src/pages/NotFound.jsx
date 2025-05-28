import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="container not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Page Not Found</p>
      <Link 
        to="/" 
        className="btn btn-primary"
      >
        Return to Home
      </Link>
    </div>
  )
}

export default NotFound