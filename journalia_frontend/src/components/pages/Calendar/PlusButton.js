import React from 'react'
import {AiOutlinePlus} from 'react-icons/ai';
import './scss/PlusButton.scss';

const PlusButton = () => {
  return (
    <div className="w-auto position-fixed bottom-0 end-0 m-2 p-0" id="plus-button">
      <AiOutlinePlus/>
    </div>
  )
}

export default PlusButton
