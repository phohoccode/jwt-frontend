import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { toast } from 'react-toastify'
import _ from 'lodash'

import { fetchAllRole, deleteRole, updateRole } from '../../services/roleService';
import ModalDeleteRole from './ModalDeleteRole';
import ModalUpdateRole from './ModalUpdateRole';

function TableRoles(props, ref) {
    const [listRoles, setListRoles] = useState([])
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false)
    const [dataModalDelete, setDataModalDelete] = useState({})
    const [dataModalUpdate, setDataModalUpdate] = useState({})
    const [isCheckedAllRoles, setIsCheckedAllRoles] = useState(false)

    useEffect(() => {
        getAllRoles()
    }, [])

    useImperativeHandle(ref, () => ({
        fetchListRolesAgian() {
            getAllRoles()
        }
    }))

    useEffect(() => {
        const isCheckedAllRoles = listRoles.some(role => !role.isChecked)
        setIsCheckedAllRoles(isCheckedAllRoles ? false : true)
    }, [listRoles])

    const handleCheckedAllRoles = (e) => {
        const isChecked = e.target.checked
        const _listRole = _.cloneDeep(listRoles)

        _listRole.map(role => role.isChecked = isChecked)
        setListRoles(_listRole)
    }

    const getAllRoles = async () => {
        const response = await fetchAllRole();

        if (response && +response.EC === 0) {
            const data = response.DT.map(role => {
                const newRole = role
                newRole.isChecked = false
                return newRole
            })
            setListRoles(data)
        } else {
            toast.error(response.EM)
        }
    }

    const handleDeleteRole = async (role) => {
        setDataModalDelete(role)
        setIsShowModalDelete(true)
    }

    const handleCloseModaDelete = () => {
        setIsShowModalDelete(false)
    }

    const buildDataIdRoles = () => {
        return listRoles
            .filter(role => role.isChecked === true)
            .map(role => { return role.id })
    }

    const handleCreateMessage = async (response) => {
        if (response && +response.EC === 0) {
            toast.success(response.EM)
            await getAllRoles()
            setIsShowModalDelete(false)
        } else {
            toast.error(response.EM)
        }
    }

    const handleDeleteAllRole = async () => {

        const isCofirm = window.confirm('Bạn có chắn chắn xoá những quyền hạn này không?')

        if (!isCofirm) return

        const data = buildDataIdRoles()

        if (data.length > 0) {
            const response = await deleteRole(data)
            handleCreateMessage(response)
        } else {
            toast.error('Vui lòng chọn quyền hạn cần xoá')
        }
    }

    const confirmDeleteRole = async () => {
        const response = await deleteRole([dataModalDelete.id])
        handleCreateMessage(response)
    }

    const handleUpdateRole = (role) => {
        setDataModalUpdate(role)
        setIsShowModalUpdate(true)

    }

    const handleCloseModaUpdate = () => {
        setIsShowModalUpdate(false)
    }

    const handleSelectRole = (roleId) => {
        const _listRole = _.cloneDeep(listRoles)
        const foundIndex = _listRole.findIndex(role => +role.id === +roleId)

        if (foundIndex !== -1) {
            _listRole[foundIndex].isChecked = !_listRole[foundIndex].isChecked
            setListRoles(_listRole)
        }
    }

    return (
        <>
            <div className='my-5 d-flex justify-content-between'>
                <h4 >Danh sách quyền hạn</h4>
                <button onClick={() => handleDeleteAllRole()} className='btn btn-danger'>
                    <i className="fa-solid fa-trash me-2"></i>
                    Xoá
                </button>
            </div>
            <table style={{ overflowX: 'auto' }} className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope='col'>
                            <div className="form-check">
                                <input
                                    checked={isCheckedAllRoles}
                                    onChange={(e) => handleCheckedAllRoles(e)}
                                    className="form-check-input"
                                    type="checkbox"
                                />
                            </div>
                        </th>
                        <th scope="col">STT</th>
                        <th scope="col">Id</th>
                        <th scope="col">Url</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listRoles && listRoles.length > 0 ? (
                        <>
                            {listRoles.map((role, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="form-check">
                                            <input
                                                checked={role.isChecked}
                                                onChange={() => handleSelectRole(role.id)}
                                                className="form-check-input"
                                                type="checkbox"
                                            />
                                        </div>
                                    </td>
                                    <td>{++index}</td>
                                    <td>{role.id}</td>
                                    <td>{role.url}</td>
                                    <td>{role.description}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteRole(role)}
                                            className='btn btn-danger me-2'>
                                            <i className="fa-solid fa-trash me-2"></i>
                                            Xoá
                                        </button>
                                        <button
                                            onClick={() => handleUpdateRole(role)}
                                            className='btn btn-warning'>
                                            <i className="fa-solid fa-trash me-2"></i>
                                            Chỉnh sửa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </>
                    ) : (
                        <tr>
                            <td colSpan="5"><span>Danh sách quyền hạn trống</span></td>
                        </tr>
                    )}
                </tbody>
            </table>

            <>
                <ModalDeleteRole
                    handleClose={handleCloseModaDelete}
                    show={isShowModalDelete}
                    dataModal={dataModalDelete}
                    confirmDeleteRole={confirmDeleteRole}
                />
                <ModalUpdateRole
                    onHide={handleCloseModaUpdate}
                    show={isShowModalUpdate}
                    dataModal={dataModalUpdate}
                    getAllRoles={getAllRoles}
                />
            </>
        </>
    );
}

export default forwardRef(TableRoles);