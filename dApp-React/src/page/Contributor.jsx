import JoinTaskForm from "../component/JoinTaskForm"
import LeaveTaskForm from "../component/LeaveTaskForm"
import { Link } from "react-router-dom"

const Contributor = () => {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
        <div>Contributor</div>
        <div className="flex flex-row">
            <JoinTaskForm />
            <LeaveTaskForm />
        </div>
        <Link to="/" className="py-4 px-6 border-solid border-1 rounded-lg shadow-md m-2">Go back</Link>
    </div>
  )
}

export default Contributor