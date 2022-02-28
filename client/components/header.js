import Link from 'next/link';

export default ({ currentUser }) => {
  return (
    <nav className="navbar navbar-light bg-light">
        <Link href="/">
          <a className="navbar-brand nav-link">GitTix</a>
        </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center nav-link">
          {currentUser ? 'Sign Out' : 'Sign in/up'}
        </ul>
      </div>
    </nav>
  );
};
