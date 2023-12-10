import React from 'react'

const JoinTaskForm = () => {
  return (
    <div className="p-6 border-solid border-1 rounded-md shadow-md m-2">
    <div>Join the task</div>
    <form className="flex flex-col">
    <label>
        GitHub username
        <input type="text"></input>
      </label>
      <label>
        Task ID
        <input type="text"></input>
      </label>
      <label>
        Repo ID
        <input type="text"></input>
      </label>
      <button>Join</button>
    </form>
  </div>
  )
}

export default JoinTaskForm