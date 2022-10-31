import React from "react";

function TasksList({tasks}) {
    return (
        <>
        <ul>
            {tasks?.map((task,index) => {
                return(
                    <li type = "checkBox" key={index}>{task}</li>
                )
            })}
        </ul>
        </>
    )
}

export default TasksList;