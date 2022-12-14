import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser} from '../context/user/userSlice';
import { useChangeUserProfileMutation } from '../context/user/userApiSlice';
import { setCredentials } from '../context/authSlice';
import { changeUser } from '../context/user/userSlice';
import DatePicker from "react-datepicker";
import { ToastContainer } from 'react-toastify';
import { showErrorToastMessage, showSuccessToastMessage } from '../components/ToastNotifications';

import "../../node_modules/react-datepicker/dist/react-datepicker.css";
import '../assets/styles/Profile.css';

const Profile= () =>{

  const user = useSelector(selectCurrentUser)
  const [name, setName] = useState(user.name);
  const [last_name, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [birthday, setBirthday] = useState(new Date(user.birthday));

  let content
  const dispatch = useDispatch()
  const [changeUserProfile] = useChangeUserProfileMutation()

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try{
      const response = await changeUserProfile({name, last_name, email, password, birthday, password_again: passwordAgain})

      if(response?.data[0]?.error){
          const message = response.data[0].error
          showErrorToastMessage(message)
      }
      else if (response?.data[0]?.token){
        showSuccessToastMessage("Successfully updated updated profile")
        dispatch(setCredentials({...response.data[0]}))
        const right_format_birthday_created = new Date(new Date(birthday) - new Date().getTimezoneOffset() * 60000).toISOString()
        const right_format_birthday = right_format_birthday_created.slice(0,19)
        dispatch(changeUser({name, last_name, email,birthday: right_format_birthday}))
      }
    }catch(error){
        showErrorToastMessage(error)
    }   
  }

  content = 
      <div className="container rounded bg-white" style={{marginTop: "10%", marginBottom: "8%"}}>
        <div className="row">
          <div className="col-md-4 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  <img className="rounded-circle mt-5" width="150px" alt="profilePicture" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/>
                  <div className="font-weight-bold" style={{color: 'black'}}>{name} {last_name}</div>
                  <div className="text-black-50" style={{color: 'black'}}>{email}</div>
              </div>
          </div>
          <div className="col-md-6 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Settings</h4>
                </div>
              <form className="formFields" onSubmit={handleSubmit}>
                    <div className="row mt-2">
                        <div className="col-md-6">
                          <label className="labels">Name</label>
                          <input 
                              type="text" 
                              name="name" 
                              required
                              className="form-control" 
                              placeholder="first name" 
                              value={name} 
                              onChange={(e) => setName(e.target.value)}
                          />
                        </div> 
                        <div className="col-md-6">
                          <label className="labels">Last name</label>
                          <input 
                              type="text" 
                              name="last_name" 
                              required 
                              className="form-control"  
                              placeholder="last name"
                              value={last_name}
                              onChange={(e) => setLastName(e.target.value)}
                          />
                          </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12 mt-2">
                          <label className="labels mb-2">Birthday</label>
                          <DatePicker selected={birthday} onChange={(date) => setBirthday(date)} />
                        </div>
                        <div className="col-md-12 mt-3">
                          <label className="labels mt-1 mb-2">Email</label>
                          <input 
                              type="email" 
                              name="mail" 
                              required 
                              className="form-control" 
                              placeholder="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="col-md-12 mt-3">
                          <label className="labels mt-1 mb-2">Password</label>
                          <input 
                              type="password" 
                              name="password"
                              className="form-control" 
                              placeholder="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="col-md-12 mt-3">
                          <label className="labels mt-1 mb-2">Confirm password</label>
                          <input 
                              type="password"
                              name="second_password"
                              className="form-control" 
                              placeholder="confirm password"
                              value={passwordAgain}
                              onChange={(e) => setPasswordAgain(e.target.value)}
                          />
                        </div>
                    </div>
                    <br></br>
                    <div className="mt-5 text-center">
                        <button type="submit" className="btn btn-primary profile-button" >Save profile</button>
                    </div>
                </form>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div>

  return content
}
export default Profile;