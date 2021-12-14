import React, { useState } from "react";
import axios from "axios";
//import Task from "./TaskList";

const URL = "https://ws-api-backend.herokuapp.com/task";
// const URL = "http://localhost:5000/task";
const AXIOS_CONFIG = {
  headers: {
    "Content-Type": "application/json",
    token: localStorage.getItem("token")
  }
};

const TaskForm = ({ refetch, tasks, setTasks }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const PARAMS = {
    title: title,
    date: new Date(date)
  };

  const handleChange = e => {
    e.preventDefault();
    const input = e.target.value;
    setTitle(input);
  };

  const handleChangeDate = e => {
    console.log(`e.target.value`, e.target.value);
    e.preventDefault();
    const inputDate = e.target.value;
    setDate(inputDate);
  };

  const onSubmit = () => {
    if (title.length > 0) {
      axios
        .post(URL, PARAMS, AXIOS_CONFIG)
        .then(res => {
          if (res.status === 200) {
            setTitle("");
          }
        })
        .then(() => refetch());
    }
  };

  return (
    <div className="justify-between mb-12">
      <input
        className="w-full px-3 py-2 border border-green-400 rounded-md mr-4 mb-4"
        type="text"
        placeholder="Add Task..."
        onChange={e => handleChange(e)}
        value={title}
      />
      <input
        className="w-full px-3 py-2 border border-green-400 rounded-md mr-4 mb-4"
        type="datetime-local"
        onChange={e => handleChangeDate(e)}
        value={date}
      />
      <input
        type="button"
        className="w-full py-2 px-5 bg-green-400 text-white rounded-md cursor-pointer"
        value="Add"
        onClick={() => onSubmit()}
      />
    </div>
  );
};

export default TaskForm;
