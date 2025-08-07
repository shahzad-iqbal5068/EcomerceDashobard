import React,{useState} from 'react'
import Modal from "./Modal";

const ReadModal = ({item}) => {
    const [showModal, setShowModal] = useState(false);
    console.log(item)
  return (
    <div>
       <button  className='app-button'onClick={()=>setShowModal(true)}>Read More</button>
       {showModal && <Modal onClose={()=>setShowModal(false)}/>}
    </div>
  )
}

export default ReadModal;
