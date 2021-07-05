import React, {useState} from 'react'

import './scss/HourContainer.scss';

const HourContainer = ({hour}) => {

  const [todos, setTodos] = useState([
    {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: "quis ut nam facilis et officia qui",
      completed: false,
    },
    {
      userId: 1,
      id: 3,
      title: "fugiat veniam minus",
      completed: false,
    },
  ]);


  return (
    <div className="col col-12 hour-container d-flex py-3">
      <div className="d-flex align-items-center py-4">lalalala</div>
      {/* <div className="d-flex align-items-center py-4">{hour}</div> */}
      <div className="ps-3 d-flex">
        {todos.map((todo, i)=>(
          <div key={i} className="px-4">{todo.title}</div>
        ))}
      </div>
    </div>
  )
}

export default HourContainer
