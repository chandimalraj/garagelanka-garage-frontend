import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserValid } from '../../../hooks/authentication'

export default function Dashboard() {
  const navigate = useNavigate()
  const toGarage = ()=>{
        navigate('/nav')
  }
  useUserValid()
  return (
    <div className='mt-5 pt-5'>
      {/* <button onClick={toGarage}>submit</button> */}
    </div>
  )
}
