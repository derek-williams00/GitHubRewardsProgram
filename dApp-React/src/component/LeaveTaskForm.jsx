const LeaveTaskForm = () => {
  return (
    <div className="p-6 border-solid border-1 rounded-md shadow-md m-2">
      <div>Leave the task</div>
      <form className="flex flex-col">
        <label>
          Task ID
          <input type="text"></input>
        </label>
        <label>
          Repo ID
          <input type="text"></input>
        </label>
        <button>Leave</button>
      </form>
    </div>
  )
}

export default LeaveTaskForm