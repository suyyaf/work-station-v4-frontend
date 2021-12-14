import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/task/TaskForm";
import TaskList from "../components/task/TaskList";
import axios from "axios";

// const URL = "http://localhost:5000/tasks";
const URL = "https://ws-api-backend.herokuapp.com/tasks";
const AXIOS_CONFIG = {
  headers: {
    "Content-Type": "application/json",
    token: localStorage.getItem("token")
  }
};

const Dashboard = () => {
    const [taskList, setTaskList] = useState([])

    const fetchTasks = async () => {
      await axios.get(URL, AXIOS_CONFIG)
        .then(res => {
            if (res.status === 200) {
                setTaskList(res.data.tasks)
            }
        })
        .catch(err => console.log('err', err))
    }

    useEffect(() => {
      fetchTasks()
    }, [])

  return (
    <> 
        <Navbar />
        <div className="container mb-24">
            <h1 className="font-bold text-green-400 text-center text-xl py-12">Work Space Dashboard</h1>
            <div className="max-w-lg mx-auto">
              <TaskForm refetch={fetchTasks} tasks={taskList} setTasks={setTaskList}/>
            </div>
            <TaskList refetch={fetchTasks} tasks={taskList} setTasks={setTaskList}/>
        </div>
    </>
  );
};

export default Dashboard;
