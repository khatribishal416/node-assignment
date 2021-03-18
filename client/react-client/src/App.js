import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
const App = () => {

  //States
  const [users,setUsers] = useState([])
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [age,setAge] = useState('')
  const [gender,setGender] = useState('')
  const [dob,setDob] = useState('')
  const [phone,setPhone] = useState('')
  const [userType,setUserType] = useState('')
  const [updatedFirstName,setUpdatedFirstName] = useState(null)
  const [updatedLastName,setupdatedLastName] = useState(null)
  const [updatedAge,setupdatedAge] = useState(null)
  const [updatedGender,setupdatedGender] = useState(null)
  const [updatedDob,setupdatedDob] = useState(null)
  const [updatedPhone,setupdatedPhone] = useState(null)
  const [deletedData, setDeletedData] = useState(false)

  const addData = async() => {
    await axios({
      method:'POST',
      url:'https://node-assignment-deployed.herokuapp.com/api/user/add',
      data:{
        first_name:firstName,
        last_name:lastName,
        age:age,
        gender:gender,
        dob:dob,
        phone:phone,
        user_type:userType
      }
    }).then(res => {
      getUserData()
      setFirstName('')
    }).catch(err => {
      console.log(err)
    })
  }

  const updateUserData = async(val) => {
    if(updatedFirstName == null){
      setUpdatedFirstName(val.first_name) 
    }else if(updatedLastName == null){
      setupdatedLastName(val.last_name)
    }else if(updatedAge == null){
      setupdatedAge(val.age)
    }else if(updatedGender == null){
      setupdatedGender(val.gender)
    }else if(updatedDob == null){
      setupdatedDob(val.dob)
    }else if(updatedPhone == null){
      setupdatedPhone(val.phone)
    }

    await axios({
      method:'POST',
      url:'https://node-assignment-deployed.herokuapp.com/api/user/update',
      data:{
        first_name:updatedFirstName,
        last_name:updatedLastName,
        age:updatedAge,
        gender:updatedGender,
        dob:updatedDob,
        phone:updatedPhone,
        id:val._id
      }
    }).then(res=> {
      getUserData()
    }).catch(err => {
      console.log(err)
    })
  }

  const getUserData = async() => {
    await axios({
      method:'GET',
      url:'https://node-assignment-deployed.herokuapp.com/api/user'
    }).then(res => {
      console.log(res.data)
        setUsers(res.data)
    })
  }


  const deleteUser = async(val) => {
    await axios({
      method:'POST',
      url:'https://node-assignment-deployed.herokuapp.com/api/user/delete',
      data:{
        id:val._id
      }
    }).then(res => {
      getUserData(res)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getUserData()
  },[])

  return (
    <div>
      <div>
        <h3 style={{textAlign:'center'}}>All Users</h3>
        <hr/>
      </div>
      <div>
      {
          deletedData ?
          (
            <div>
              <table className="table">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Date Of Birth</th>
              <th>Phone</th>
            </tr>
            {
              users.map((s => (
                s.deleted &&
                <tr>
                  <td>
                    <input style={{marginRight:5}} className="form-control"  type="text" defaultValue={s.first_name} onChange={(e)=>setUpdatedFirstName(e.target.value)}/>
                  </td>
                  <td>
                    <input style={{marginRight:5}} className="form-control"  type="text" defaultValue={s.last_name} onChange={(e)=>setupdatedLastName(e.target.value)}/>
                  </td>
                  <td>
                    <input style={{marginRight:5}} className="form-control"  type="text" defaultValue={s.age} onChange={(e)=>setupdatedAge(e.target.value)}/>
                  </td>
                  <td>
                    <input style={{marginRight:5}} className="form-control"  type="text" defaultValue={s.gender} onChange={(e)=>setupdatedGender(e.target.value)}/>
                  </td>
                  <td>
                    <input style={{marginRight:5}} className="form-control"  type="text" defaultValue={s.dob} onChange={(e)=>setupdatedDob(e.target.value)}/>
                  </td>
                  <td>
                    <input style={{marginRight:5}} className="form-control"  type="text" defaultValue={s.phone} onChange={(e)=>setupdatedPhone(e.target.value)}/>
                  </td>
                </tr>
              )))
            }
          </table>
            </div>
          ):
          (
            <>
            <div style={{display:'flex', margin:10}}>
            <input style={{marginRight:5}} className="form-control" type="text" placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)}/>
            <input style={{marginRight:5}} className="form-control" type="text" placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)}/>
            <input style={{marginRight:5}} className="form-control" type="text" placeholder="Age" onChange={(e)=>setAge(e.target.value)}/>
            <input style={{marginRight:5}} className="form-control" type="text" placeholder="Gender" onChange={(e)=>setGender(e.target.value)}/>
            <input style={{marginRight:5}} className="form-control" type="text" placeholder="Dob" onChange={(e)=>setDob(e.target.value)}/>
            <input style={{marginRight:5}} className="form-control" type="text" placeholder="Phone" onChange={(e)=>setPhone(e.target.value)}/>
            <input style={{marginRight:5}} className="form-control" type="text" placeholder="Type" onChange={(e)=>setUserType(e.target.value)}/>

          </div>
          <div style={{display:'flex',justifyContent:'center'}}>
            <Button onClick={()=>addData()} variant="dark">Add User</Button>
          </div>
          <div style={{marginTop:20}}>
          <table className="table">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Date Of Birth</th>
              <th>Phone</th>
              <th></th>
              <th></th>
            </tr>
            {
              users.map((s => (
                !s.deleted &&
                <tr>
                  <td>
                    <input style={{marginRight:5}} className="form-control" type="text" defaultValue={s.first_name} onChange={(e)=>setUpdatedFirstName(e.target.value)}/>
                  </td>
                  <td>
                    <input style={{marginRight:5}} className="form-control" type="text" defaultValue={s.last_name} onChange={(e)=>setupdatedLastName(e.target.value)}/>
                  </td>
                  <td>
                    <input style={{marginRight:5}} className="form-control" type="text" defaultValue={s.age} onChange={(e)=>setupdatedAge(e.target.value)}/>
                  </td>
                  <td>
                    <input style={{marginRight:5}} className="form-control" type="text" defaultValue={s.gender} onChange={(e)=>setupdatedGender(e.target.value)}/>
                  </td>
                  <td>
                    <input style={{marginRight:5}} className="form-control" type="text" defaultValue={s.dob} onChange={(e)=>setupdatedDob(e.target.value)}/>
                  </td>
                  <td>
                    <input style={{marginRight:5}} className="form-control" type="text" defaultValue={s.phone} onChange={(e)=>setupdatedPhone(e.target.value)}/>
                  </td>
                  <td>
                    <Button style={{marginRight:5}} onClick={()=>updateUserData(s)} variant="secondary">Update</Button>
                    <Button style={{marginRight:5}} onClick={()=>deleteUser(s)} variant="danger">Delete</Button>
                  </td>
                </tr>
              )))
            }
          </table>
          </div>
          </>
          )
        }
      </div>
      <div style={{display:'flex', justifyContent:'center'}}>
      <Button style={{marginRight:5}} variant="danger" onClick={()=>setDeletedData(!deletedData)}>
        {
          deletedData ? 'Show Undeleted Data' : 'Show Deleted Data'
        }
      </Button>
      </div>

    </div>
  )
}

export default App