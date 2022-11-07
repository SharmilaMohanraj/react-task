import React from "react";
import "./ToDoList.css";
import TaskBox from "./TaskBox";
//import  {CalendarComponent} from "@syncfusion/ej2-react-calendars";

function ToDoList() {
    const [inputValue, setInputValue] = React.useState('');
    const [tasks, setTasks] = React.useState([]);
    const [completedTasks, setCompletedTasks] = React.useState([]);
    const [taskEdit, setTaskEdit] = React.useState([]);
    const [displayAll, setDisplayAll] = React.useState(true);
    const [sortOrder, setSortOrder] = React.useState(true);
    const [taskEditText, setTaskEditText] = React.useState('');
    //const [taskDate,setTaskDate] = React.useState(new Date());

    React.useEffect(() => {
        console.log("tasks", localStorage.getItem("AllTasks"))
        if (localStorage.getItem("AllTasks")) {
            setTasks(JSON.parse(localStorage.getItem("AllTasks")));
        }
    }, []);

    function inputHandler(event) {
        if (event.target.value) {
            setInputValue(event.target.value);
        }
    }

    function editTask(event) {
        if (event.target.value) {
            setTaskEditText(event.target.value);
        }
    }
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            if (inputValue && inputValue !== '') {
                setDisplayAll(true);
                setTasks([...tasks, { taskName: inputValue, completed: false, id: new Date().getTime() }]);
                localStorage.setItem("AllTasks", JSON.stringify([...tasks, { taskName: inputValue, completed: false, id: new Date().getTime() }]));
            }
            setInputValue('');
        }
    };

    function toAddTaskHandler(event) {
        event.preventDefault();
        if (inputValue && inputValue !== '') {
            setDisplayAll(true);
            setTasks([...tasks, { taskName: inputValue, completed: false, id: new Date().getTime() }]);
            localStorage.setItem("AllTasks", JSON.stringify([...tasks, { taskName: inputValue, completed: false, id: new Date().getTime() }]));
        }
        setInputValue('');
    }

    function sortInOrder() {
        const sortedTasks = [...tasks];
        const sortedCompTasks = [...completedTasks];
        if (sortOrder) {
            setSortOrder(false);
            setTasks(sortedTasks.sort((a, b) => a.taskName.localeCompare(b.taskName)));
            setCompletedTasks(sortedCompTasks.sort((a, b) => a.taskName.localeCompare(b.taskName)));
        }
        else {
            setSortOrder(true);
            setTasks(sortedTasks.sort((a, b) => b.taskName.localeCompare(a.taskName)));
            setCompletedTasks(sortedCompTasks.sort((a, b) => b.taskName.localeCompare(a.taskName)));
        }
    }

    function setTaskAsCompleted (taskId) {
        const updatedTasks = [...tasks];
        updatedTasks.forEach((task) => {
            if (task.id === taskId) {
                task.completed = !task.completed;
                //setCompletedTasks([...completedTasks, task]);
            }
        })
        setTasks([...updatedTasks]);
        localStorage.setItem("AllTasks", JSON.stringify([...tasks]));
    }

    function getCompletedTasks() {
        setDisplayAll(false);
        setCompletedTasks(tasks.filter(a => a.completed === true));
        console.log("completedTasks:", completedTasks);
    }

    function clearAll() {
        setCompletedTasks([]);
        setTasks([]);
        setInputValue('');
        localStorage.setItem("AllTasks", "");
    }
    function editTaskDetails(taskId) {
        const updatedTasks = [...tasks].map(
            (task) => {
                if (taskId === task.id) {
                    if (taskEditText && taskEditText !== '')
                        task.taskName = taskEditText;
                }
                return task;
            });
        setTasks([...updatedTasks]);
        const updateCompletedTasks = [...completedTasks].map(
            (task) => {
                if (taskId === task.id) {
                    if (taskEditText && taskEditText !== '')
                        task.taskName = taskEditText;
                }
                return task;
            });
        setCompletedTasks([...updateCompletedTasks]);
        localStorage.setItem("AllTasks", JSON.stringify([...updatedTasks]));
        setTaskEdit(null);
    }

    function deleteTaskDetails(taskId: any) {
        const updatedTasksList = [...tasks].filter(task => task.id !== taskId);
        const completedTasksList = [...completedTasks].filter(task => task.id !== taskId);
        setTasks([...updatedTasksList]);
        setCompletedTasks([...completedTasksList]);
        localStorage.setItem("AllTasks", JSON.stringify([...updatedTasksList]));
    }

    return (
        <div className="fullScreen">
            <div className="contentbox">
                <div className="formStyle">
                    <input type="text" className="forminput" value={inputValue} required placeholder="Enter task name here" onChange={inputHandler} onKeyDown={handleKeyDown}></input>
                    <button onClick={toAddTaskHandler}>Add Task</button>
                </div>
                <div className="contentCards">
                    <div>
                        {
                            displayAll ? (
                                <TaskBox tasks={tasks} taskEdit={taskEdit} setTaskAsCompleted={setTaskAsCompleted} editTask={editTask}
                                    setTaskEdit={setTaskEdit} editTaskDetails={editTaskDetails} deleteTaskDetails={deleteTaskDetails} />
                            ) : (
                                <TaskBox tasks={completedTasks} taskEdit={taskEdit} setTaskAsCompleted={setTaskAsCompleted} editTask={editTask}
                                    setTaskEdit={setTaskEdit} editTaskDetails={editTaskDetails} deleteTaskDetails={deleteTaskDetails} />
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="Actions">
                <div> Total Tasks : {tasks.length}</div>
                <button onClick={() => setDisplayAll(true)}>All Tasks</button>
                <button onClick={getCompletedTasks}>Completed Tasks</button>
                <button onClick={sortInOrder}>Sort tasks</button>
                <button onClick={clearAll}>Clear All</button>

            </div>
        </div>

    );

}

export default ToDoList;
