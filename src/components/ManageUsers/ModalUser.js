import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import _ from 'lodash'

import { fetchGroup, createNewUser } from '../../services/userService';
import { useEffect, useState } from 'react';

function ModalUser(props) {
    const { action, ModalUser, dataModalUser } = props
    const [userGroup, setUserGroup] = useState([])

    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: ''
    }

    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
    }
    const [validInpus, setValidInpus] = useState(validInputsDefault)
    const [userData, setUserData] = useState(defaultUserData)

    useEffect(() => {
        getGroup()
    }, [])

    useEffect(() => {
        if (action === 'UPDATE') {
            setUserData({
                ...dataModalUser,
                group: dataModalUser.Group ? dataModalUser.Group.id : ''
            })
        }
    }, [dataModalUser])

    useEffect(() => {
        if (action === 'CREATE') {
            if (userGroup && userGroup.length > 0) {
                setUserData({ ...userData, group: userGroup[0].id })
            }
        }
    }, [action])

    const getGroup = async () => {
        const response = await fetchGroup()

        if (response && response.data && response.data.EC === 0) {
            setUserGroup(response.data.DT)

            if (response.data.DT && response.data.DT.length > 0) {
                const groups = response.data.DT
                setUserData({ ...userData, group: groups[0].id })
            }
        } else {
            toast.error(response.data.EM)
        }
    }

    const handleOnchangeInput = (value, name) => {
        const _userData = _.cloneDeep(userData)
        _userData[name] = value
        setUserData(_userData)
    }

    const checkValidInputs = () => {
        setValidInpus(validInputsDefault)

        const arrInputs = ['email', 'username', 'phone', 'password', 'address']

        let check = true
        for (let i = 0; i < arrInputs.length; i++) {
            if (!userData[arrInputs[i]]) {
                const _validInput = _.cloneDeep(validInputsDefault)
                _validInput[arrInputs[i]] = false
                setValidInpus(_validInput)
                check = false
                toast.error(`Trường ${arrInputs[i]} không được trống!`)
                break
            }
        }
        return check
    }

    const handleCloseModalUser = () => {
        props.onHide()
        setUserData(defaultUserData)
        setValidInpus(validInputsDefault)
    }

    const handleConfirmUser = async () => {
        const check = checkValidInputs()

        if (check) {
            const response = await createNewUser({ ...userData, groupId: userData['group'] })

            if (response.data && response.data.EC === 0) {
                toast.success(response.data.EM)
                props.onHide()
                setUserData({ ...defaultUserData, group: userGroup[0].id })
            } else {
                const _validInput = _.cloneDeep(validInputsDefault)
                _validInput[response.data.DT] = false
                setValidInpus(_validInput)
                toast.error(response.data.EM)
            }
        }
    }

    return (
        <>
            <Modal
                size='lg'
                show={props.show}
                onHide={() => handleCloseModalUser()}
            >
                <Modal.Header
                    closeButton
                >
                    <Modal.Title>{action === 'CREATE' ? 'Tạo mới người dùng' : 'Chỉnh sửa người dùng'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-6 mt-3 col-sm-6 form-group'>
                            <label className='form-label'>Email</label>
                            <input
                                disabled={action === 'UPDATE'}
                                value={userData.email}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'email')}
                                className={
                                    validInpus.email ? 'form-control' : 'form-control is-invalid'
                                }
                                type='email' />
                        </div>
                        <div className='col-6 mt-3 col-sm-6 form-group'>
                            <label className='form-label'>Tên người dùng</label>
                            <input
                                value={userData.username}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'username')}
                                className={
                                    validInpus.username ? 'form-control' : 'form-control is-invalid'
                                }
                                type='text' />
                        </div>
                        <div className='col-6 mt-3 col-sm-6 form-group'>
                            <label className='form-label'>Số điện thoại</label>
                            <input
                                disabled={action === 'UPDATE'}
                                value={userData.phone}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'phone')}
                                className={
                                    validInpus.phone ? 'form-control' : 'form-control is-invalid'
                                }
                                type='number' />
                        </div>
                        <div className='col-6 mt-3 col-sm-6 form-group'>
                            <label className='form-label'>Mật khẩu</label>
                            <input
                                value={userData.password}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'password')}
                                className={
                                    validInpus.password ? 'form-control' : 'form-control is-invalid'
                                }
                                type='password' />
                        </div>
                        <div className='col-12 mt-3 form-group'>
                            <label className='form-label'>Địa chỉ</label>
                            <input
                                value={userData.address}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'address')} className={
                                    validInpus.address ? 'form-control' : 'form-control is-invalid'
                                }
                                type='text' />
                        </div>
                        <div className='col-6 mt-3 col-sm-6 form-group'>
                            <label className='form-label'>Giới tính</label>
                            <select
                                value={userData.sex}
                                className="form-select form-select-sm" aria-label=".form-select-sm example"
                                onChange={(e) => handleOnchangeInput(e.target.value, 'sex')}
                            >
                                <option defaultValue value="1">Nam</option>
                                <option value="2">Nữ</option>
                            </select>
                        </div>
                        <div className='col-6 mt-3 col-sm-6 form-group'>
                            <label className='form-label'>Nhóm</label>
                            <select
                                value={userData.group}
                                className="form-select form-select-sm" aria-label=".form-select-sm example"
                                onChange={(e) => handleOnchangeInput(e.target.value, 'group')}
                            >
                                {userGroup && userGroup.length > 0 &&
                                    userGroup.map((group, index) => (
                                        <option key={index} value={group.id}>{group.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={() => handleCloseModalUser()}
                    >
                        Huỷ
                    </Button>
                    <Button variant="primary"
                        onClick={() => handleConfirmUser()}
                    >
                        {action === 'CREATE' ? 'Tạo' : 'Cập nhật'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUser;