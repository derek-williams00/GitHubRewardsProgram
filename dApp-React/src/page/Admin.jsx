import CreateTaskForm from '../component/CreateTaskForm';
import CancelTaskForm from '../component/CancelTaskForm';
import KickContributorForm from '../component/KickContributorForm';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <h1 className="w-screen text-2xl font-extrabold mb-4 cursor-default">Admin</h1>
      <div className="flex flex-row w-screen justify-center">
        <CreateTaskForm />
        <CancelTaskForm />
        <KickContributorForm />
      </div>
      <div className="flex flex-row">
        <Link
          to="/"
          className="py-4 px-6 border-solid border-1 rounded-lg shadow-md mt-5 mx-3 bg-github-black text-white ease-in-out transition hover:bg-black">
          Go home
        </Link>
        <Link
          to="/contributor"
          className="py-4 px-6 border-solid border-1 rounded-lg shadow-md mt-5 mx-3 bg-github-black text-white ease-in-out transition hover:bg-black">
          Switch to Contributor
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
