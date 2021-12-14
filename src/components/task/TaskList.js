import React from "react";
import axios from "axios";

const URL = "https://ws-api-backend.herokuapp.com/task";
const AXIOS_CONFIG = {
  headers: {
    "Content-Type": "application/json",
    token: localStorage.getItem("token")
  }
};

const displayDate = (startdate, duedate) => {
  let start = new Date(startdate);
  let end = new Date(duedate);

  // elapsed time in milliseconds
  var elapsed = Math.abs(end.getTime() - start.getTime());
  // time differences
  var diffDays = Math.floor(elapsed / (1000 * 3600 * 24));
  var diffHours = Math.floor(elapsed % (1000 * 3600 * 24) / (1000 * 60 * 60));
  var diffMinutes = Math.floor(elapsed % (1000 * 60 * 60) / (1000 * 60));

  return `${diffDays} day, ${diffHours} hour, ${diffMinutes} minutes left`;
};

const TaskList = ({ refetch, tasks, setTasks }) => {
  const toggleDone = id => {
    axios
      .put(`${URL}/${id}`, {}, AXIOS_CONFIG)
      .then(res => {
        if (res.status === 200) {
          console.log(`res`, res);
        }
      })
      .then(() => refetch())
      .catch(err => console.log(`err`, err));
  };

  return (
    <div className="grid grid-cols-2 gap-4 justify-items-center px-4">
      <div className="container border border-green-400 rounded-md">
        <h1 className="py-2 bg-green-200 text-black text-center mb-4">
          INCOMPLETE
        </h1>
        <div className="w-full px-4 mb-4">
          {tasks.filter(task => !task.isCompleted).map(task =>
            <div
              className="border border-gray-400 p-4 rounded-md flex justify-between items-center mb-4"
              key={task._id}
            >
              <div className="flex-row">
                <div className="text-xl font-semibold mb-2">
                  {task.title}
                </div>
                <div className="text-md mb-1">
                  {new Date(task.date).toUTCString()}
                </div>
                <div className="text-sm text-green-400 mb-2">
                  {displayDate(task.createdAt, task.date)}
                </div>
              </div>
              <div>
                <input
                  type="button"
                  onClick={() => toggleDone(task._id)}
                  className="py-2 px-5 bg-green-400 text-white rounded-md cursor-pointer"
                  value="COMPLETE"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container border border-blue-400 rounded-md">
        <h1 className="py-2 bg-blue-200 text-black text-center mb-4">
          COMPLETED
        </h1>
        <div className="w-full px-4 mb-4">
          {tasks.filter(task => task.isCompleted).map(task =>
            <div
              className="border border-gray-400 bg-grey-400 text-lighter p-4 rounded-md mb-4 flex justify-between items-center"
              key={task._id}
            >
              <div className="flex-row">
                <div className="text-xl font-semibold mb-2">
                  {task.title}
                </div>
                <div className="text-md mb-1">
                  {new Date(task.date).toUTCString()}
                </div>
                <div className="text-sm text-blue-400 mb-2">
                  {displayDate(task.createdAt, task.date)}
                </div>
              </div>
              <input
                type="button"
                onClick={() => toggleDone(task._id)}
                className="py-2 px-5 bg-gray-400 text-white rounded-md cursor-pointer"
                value="UNDO"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
