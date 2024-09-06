import React, { useState, useEffect } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    selectOption: ''
  });
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = formData;
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setEditIndex(null);
    } else {
      const newUsers = [...users, formData];
      setUsers(newUsers);
      localStorage.setItem('users', JSON.stringify(newUsers));
    }
    setFormData({ name: '', email: '', password: '', gender: '', selectOption: '' });
  };

  const handleEdit = (index) => {
    setFormData(users[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group mt-4">
              <label className='fw-bold mb-3'>Name</label>
              <input type="text" className="form-control fw-bold mb-3" name="name" placeholder="Enter Your Name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className='fw-bold mb-3'>Email</label>
              <input type="email" className="form-control fw-bold mb-3" name="email"placeholder="Enter Your Email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className='fw-bold mb-3'>Password</label>
              <input type="password" className="form-control fw-bold mb-3" placeholder="Enter Your Password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className='fw-bold mb-3'>Gender</label>
              <div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input fw-bold" type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} required />
                  <label className="form-check-label fw-bold mb-3">Male</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} required />
                  <label className="form-check-label fw-bold mb-3">Female</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="gender" value="other" checked={formData.gender === 'other'} onChange={handleChange} required />
                  <label className="form-check-label fw-bold mb-3">Other</label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className='fw-bold my-3'>Select Hobby</label>
              <select className="form-control fw-bold mb-3" name="selectOption" value={formData.selectOption} onChange={handleChange} required>
                <option value="">Select Hobby</option>
                <option value="Coding">Coding</option>
                <option value="UI / UX">UI / UX</option>
                <option value="Ios Devloper">Ios Devloper</option>
                <option value="Android Devloper">Android Devloper</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary fw-bold mt-3">
              {editIndex !== null ? 'Update' : 'Add'}
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <div className="row">
            {users.map((user, index) => (
              <div key={index} className="col-md-6 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title fw-bold mb-3">{user.name}</h5>
                    <p className="card-text">
                      <strong>Email:</strong> {user.email}<br />
                      <strong>Gender:</strong> {user.gender}<br />
                      <strong>Select Option:</strong> {user.selectOption}
                    </p>
                    <button className="btn btn-warning me-2 fw-bold" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="btn btn-danger fw-bold" onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;