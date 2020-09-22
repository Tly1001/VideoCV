import React from 'react'
import { useHistory } from 'react-router-dom'
import { register } from '../../lib/api'

function Register() {
  const history = useHistory()
  const [formData, setFormData] = React.useState({
    userName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    jobseeker: true,
    gender: 'Male',
    github: '',
    linkedIn: '',
    tagLine: '',
    bio: '',
    portfolio: ''
  })
  const [errors, setErrors] = React.useState('')

  const handleChange = (e) => {
    setErrors('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitRegister = async (e) => {
    e.preventDefault()
    try {
      await register(formData)
      history.push('/login')
    } catch (err) {
      setErrors(err.response.data)
    }
  }

  return (
    <div className="page">
      <div className="form-wrapper">
        <form onSubmit={submitRegister}>

          <label>Email:</label>
          <input
            placeholder="Enter your email here"
            className={`input ${errors ? 'red' : ''}`}
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className="red">{errors.email}</small>}

          <label>Username:</label>
          <input
            placeholder="Enter your username here"
            className={`input ${errors.userName ? 'red' : ''}`}
            type="text" name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
          {errors.userName && <small className="red">{errors.userName}</small>}

          <label>Password:</label>
          <input
            name="password"
            className={`input ${errors.password ? 'red' : ''}`}
            type="password"
            onChange={handleChange} />
          {errors.password && <small className="red">{errors.password}</small>}

          <label>Confirm Password:</label>
          <input
            name="passwordConfirmation"
            type="password"
            className={`input ${errors.passwordConfirmation ? 'red' : ''}`}
            onChange={handleChange} />
          {errors.passwordConfirmation && <small className="red">{errors.passwordConfirmation}</small>}

          <label>Gender:</label>
          <select
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}>

            <option value="Male">Male</option>
            <option value="Female">Female</option>

          </select>

          <label>Are you a job Seeker?</label>
          <select
            type="text"
            name="jobseeker"
            value={formData.jobseeker}
            onChange={handleChange}
          >

            <option value={true}>Yes</option>
            <option value={false}>No</option>

          </select>

          <button type="submit">Submit</button>

        </form>
      </div>
    </div>

  )
}

export default Register