import { Link } from "react-router-dom"

const RoleButton = ({ link, children }) => {
  return (
    <Link to={link} className="py-4 px-6 border-solid border-1 rounded-lg shadow-md m-2">{ children }</Link>
  )
}

export default RoleButton