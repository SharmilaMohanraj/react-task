import React from "react";

const CommonCheckBoxText = ({task}) => { 
   return (
      task.completed ?
      (
         <div key={task.id} style={{textDecoration:'line-through',textDecorationColor:'red' }}> {task.taskName} </div>
      ) : (
         <div key={task.id} style={{textDecoration:'none' }}> {task.taskName} </div>
      )
   )
}
export default CommonCheckBoxText;