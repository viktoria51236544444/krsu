import React, { useState, useRef, useEffect } from 'react';
import { UseRegister } from '../../Context/ContextProviderRegister';

const Password = () => {
  const { sendVerificationEmail, email } = UseRegister();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleVerificationCodeChange = (index, value) => {
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus(); 
    }
  };

  const handleSubmit = async () => {
    const verificate_email = verificationCode.join('');
    const data = {
      email: email,
      verificate_email: verificate_email
    };
    sendVerificationEmail(data);
  };

  return (
    <div className="container-fluid">
      <div className="card text-black m-5" style={{ borderRadius: '25px', border: 'none', textAlign: 'center',  }}>
        <div className="card-body" style={{ margin: 'auto', marginTop: '5vw' }}>
          <div className="row">
            <div className="col-12">
              <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">Подтверждение</p>
              <p>Код был отправлен вам на почту, введите его</p>

              <div className="d-flex justify-content-center">
                {verificationCode.map((value, index) => (
                  <input
                    key={index}
                    ref={(el) => inputRefs.current[index] = el}
                    style={{border: "1px solid #999"}}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                    className="verification-code-box"
                  />
                ))}
              </div>
              <button className="btn btn-primary btn-lg mt-4" onClick={handleSubmit}>Подтвердить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;

