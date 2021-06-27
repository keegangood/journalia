import React from 'react'
import {BsPlusCircleFill} from 'react-icons/bs';
import './scss/PlusButton.scss';

const PlusButton = () => {
  return (
    <div className="w-auto position-fixed bottom-0 end-0 m-2 p-0" id="plus-button">
      <BsPlusCircleFill/>
    </div>
  )
}

export default PlusButton
