import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UseRegister } from '../../Context/ContextProviderRegister';

const Auth = () => {
  const { signin } = UseRegister();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    signin(formData);
    setFormData({
      email: '',
      password: ''
    });
  };

  return (
    <div className="container d-flex flex-column align-items-center" style={{ marginTop: '5vw' }}>
      <div className="card text-black p-4" style={{ borderRadius: '25px', width: '100%', maxWidth: '500px', border: 'none' }}>
        <div className="card-body">
          <p className="text-center h1 fw-bold mb-5">Авторизация</p>

          <form onSubmit={handleSubmit}> 
            <div className="form-group mb-4">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control form-control-lg"
                style={{border: "1px solid #999", fontSize: "12px", height: "3rem"}}
                placeholder="example@gmail.com"
                name="email"
                value={formData.email}
                onChange={handleChange} 
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="password" className="form-label">Пароль</label>
              <input
               style={{border: "1px solid #999", fontSize: "12px", height: "3rem"}}
                type="password"
                className="form-control form-control-lg"
                placeholder="******"
                name="password"
                value={formData.password}
                onChange={handleChange} 
              />
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary px-5 py-2">Войти</button>
            </div>
          </form>

          <p className="text-center mt-4">Нет аккаунта? <Link to="/register">Регистрация</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
