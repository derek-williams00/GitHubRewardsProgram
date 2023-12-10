import CreateTaskForm from "../component/CreateTaskForm"
import CancelTaskForm from "../component/CancelTaskForm"
import KickContributorForm from "../component/KickContributorForm"
import { Link } from "react-router-dom"

const AdminPage = () => {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
        <div>Admin</div>
        <div className="flex flex-row">
            <CreateTaskForm />
            <CancelTaskForm />
            <KickContributorForm />
        </div>
        <Link to="/" className="py-4 px-6 border-solid border-1 rounded-lg shadow-md m-2">Go back</Link>
    </div>
  )
}

export default AdminPage