import React from "react";
import CommonCheckBoxText from "./CommonCheckBoxText";

const TaskBox = (props) => {
    return (
        props.tasks.map((taskDetail) => {
            return (
                <div className="taskContent">
                    <div className="eachTask">
                        <input className="checkboxinput" type="checkbox" checked={taskDetail.completed} onChange={() => props.setTaskAsCompleted(taskDetail.id)} />
                        {
                            taskDetail.id !== props.taskEdit ? (
                                <CommonCheckBoxText task={taskDetail} />
                            ) : (
                                <input type="text" required placeholder={taskDetail.taskName} onChange={props.editTask} />
                            )
                        }
                        <div className="taskactions">
                            {
                                taskDetail.id !== props.taskEdit ? (
                                    <button onClick={() => props.setTaskEdit(taskDetail.id)}>Edit</button>
                                ) : (
                                    <button onClick={() => props.editTaskDetails(taskDetail.id)}>Submit</button>
                                )
                            }
                            <button onClick={() => props.deleteTaskDetails(taskDetail.id)}>Delete</button>
                        </div>
                    </div>
                </div>
            )
        })
    )

}

export default TaskBox; 