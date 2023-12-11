import { Link } from 'react-router-dom';

const RoleButton = ({ link, children }) => {
  return (
    <Link
      to={link}
      className="py-4 px-6 border-solid text-white rounded-lg shadow-md m-2 transition ease-in-out bg-github-black hover:bg-black">
      {children}
    </Link>
  );
};

export default RoleButton;
