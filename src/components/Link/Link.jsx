import { Link as NavLink } from 'react-router-dom';



function Link({to, ...props}) {
  return (
    <NavLink {...props} to={process.env.PUBLIC_URL + to} />
  );
}

export default Link;