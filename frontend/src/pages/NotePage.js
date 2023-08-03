import React, {useState, useEffect} from 'react'
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import { Link } from "react-router-dom"


const NotePage = ({id,history}) => {
    let [note,setNote] = useState(null)

    useEffect(() => {
        getNote()
    },[id])

    let getNote = async () => {
        let response = await fetch(`/api/notes/${id}/`)
        let data = await response.json()

        setNote(data)
    }

    let updateNote = async () => {
        fetch(`/api/notes/${id}/update`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }
        
        

    let handleSubmit = () =>{
        updateNote()
        history.push('/')
    }

    let handleChange = (value) => {
        setNote(note => ({ ...note, 'body': value }))
        console.log('Handle Change:', note)
    }


    return (
        <div>
           <p className='note'>
            <div className='note-header'>
                <h3 className=''>
                <Link to="/"> 
                    <ArrowLeft onClick={handleSubmit}/>
                </Link>
                </h3>
                
            </div>

            <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
            
           </p>
        </div>
    )
}

export default NotePage
