import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { findAccount } from "../../services/userService";
import { toast } from "react-toastify";

function FindAccount() {
    const navigate = useNavigate()
    const [value, setValue] = useState('')

    const handleFindAccount = async () => {
        if (value === '') {
            toast.error('Vui lòng nhập thông tin!')
            return
        }

        const response = await findAccount(value)

        if (response && +response.EC === 0) {
            console.log(response.DT)
            toast.success(response.EM)
            navigate('/reset-password')
        } else {
            console.log(response.DT)
            toast.error(response.EM)
        }
    }

    return (
        <div className="d-flex justify-content-center  align-items-center" style={{ minHeight: '100vh' }}>
            <div className="w-25" style={{
                borderRadius: '16px',
                boxShadow: '1px 1px 20px rgba(204, 204, 204, 0.5)'
            }}>
                <div className="pt-3 px-3">
                    <h3 className="">Tìm tài khoản của bạn</h3>
                </div>
                <hr />
                <div className="px-3 pb-3">
                    <p>Vui lòng nhập địa chỉ email hoặc số điện thoại di động để tìm kiếm tài khoản của bạn.</p>
                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address or phone number</label>
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                        <Link to='/login' className="btn btn-secondary">Huỷ bỏ</Link>
                        <button onClick={() => handleFindAccount()} className="btn btn-primary">Tìm kiếm</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FindAccount;