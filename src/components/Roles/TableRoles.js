import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { toast } from 'react-toastify'

import { fetchAllRole, deleteRole, updateRole } from '../../services/roleService';
import ModalDeleteRole from './ModalDeleteRole';
import ModalUpdateRole from './ModalUpdateRole';

function TableRoles(props, ref) {
    const [listRoles, setListRoles] = useState([])
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false)
    const [dataModalDelete, setDataModalDelete] = useState({})
    const [dataModalUpdate, setDataModalUpdate] = useState({})

    useEffect(() => {
        getAllRoles()
    }, [])

    useImperativeHandle(ref, () => ({
        fetchListRolesAgian() {
            getAllRoles()
        }
    }))

    const getAllRoles = async () => {
        const response = await fetchAllRole();
        console.log(response);
        
        if (response && +response.EC === 0) {
            setListRoles(response.DT)
        } else {
            toast.error(response.EM)
        }
    }

    const handleDeleteRole = async (role) => {
        console.log('>>> role', role)
        setDataModalDelete(role)
        setIsShowModalDelete(true)
    }

    const handleCloseModaDelete = () => {
        setIsShowModalDelete(false)
    }

    const confirmDeleteRole = async () => {
        const response = await deleteRole(dataModalDelete)

        if (response && +response.EC === 0) {
            toast.success(response.EM)
            await getAllRoles()
            setIsShowModalDelete(false)
        } else {
            toast.error(response.EM)
        }
    }

    const handleUpdateRole = (role) => {
        console.log('>>> role', role)
        setDataModalUpdate(role)
        setIsShowModalUpdate(true)
    }

    const handleCloseModaUpdate = () => {
        setIsShowModalUpdate(false)
    }

    return (
        <>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Id</th>
                        <th scope="col">
                            Url</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listRoles && listRoles.length > 0 ? (
                        <>
                            {listRoles.map((role, index) => (
                                <tr key={index}>
                                    <th scope="row">{++index}</th>
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