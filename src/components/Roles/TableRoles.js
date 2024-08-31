import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { toast } from 'react-toastify'

import { fetchAllRole, deleteRole } from '../../services/roleService';

function TableRoles(props, ref) {
    const [listRoles, setListRoles] = useState([])

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
        if (response && +response.EC === 0) {
            setListRoles(response.DT)
        } else {
            toast.error(response.EM)
        }
    }

    const handleDeleteRole = async (role) => {
        const response = await deleteRole(role)

        if (response && +response.EC === 0) {
            toast.success(response.EM)
            await getAllRoles()
        } else {
            toast.error(response.EM)
        }
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
                                            className='btn btn-danger'>
                                            <i className="fa-solid fa-trash me-2"></i>
                                            Xoá
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
        </>
    );
}

export default forwardRef(TableRoles);