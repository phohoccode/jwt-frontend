import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import { resetPassword } from "../../services/userService";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";

function ResetPassword() {
    const navigate = useNavigate()
    const { logout } = useContext(UserContext)
    const [value, setValue] = useState('')

    const validPass = () => {
        let check = true
        if (value === '') {
            toast.error('Vui lòng nhập mật khẩu!')
            check = false
            return
        }

        if (value.length < 5) {
            toast.error('Mật khẩu phải lớn hơn 5 kí tự!')
            check = false
            return
        }

        return check
    }

    const handleResetPassword = async () => {
        const check = validPass()

        if (!check) {
            return
        }

        const response = await resetPassword(value)

        if (response && +response.EC === 0) {
            toast.success(response.EM)
            logout()
            localStorage.getItem('isLogin', false)
            localStorage.removeItem('jwt')
            navigate('/login')
        } else {
            toast.error(response.EM)
        }
    }

    return (
        <>
            <div className="d-flex justify-content-center  align-items-center" style={{ minHeight: '100vh' }}>
                <div style={{
                    width: '440px',
                    borderRadius: '16px',
                    boxShadow: '1px 1px 20px rgba(204, 204, 204, 0.5)'
                }}>
                    <div className="pt-3 px-3">
                        <h3 className="">
                            Đặt lại mật khẩu của bạn
                        </h3>
                    </div>
                    <hr />
                    <div className="px-3 pb-3">
                        <div>
                            <div className="form-floating mb-3">
                                <input
                                    onChange={(e) => setValue(e.target.value)}
                                    value={value}
                                    type="password"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Mật khẩu mới</label>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end gap-2">
                            <Link to='/login/identify' className="btn btn-secondary">Huỷ bỏ</Link>
                            <button onClick={() => handleResetPassword()} className="btn btn-primary">Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;