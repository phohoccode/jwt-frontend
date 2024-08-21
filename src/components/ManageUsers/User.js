import { useEffect, useState } from 'react';
import { fetchAllUser, deleteUser } from '../../services/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';

import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';

function User() {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(2)
    const [totalPages, setTotalPages] = useState(0)

    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataModal, setDataModal] = useState({})

    const [isShowModalUser, setIsShowModalUser] = useState(false)

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        const response = await fetchAllUser(currentPage, currentLimit);

        if (response && response.data && response.data.EC === 0) {
            setTotalPages(response.data.DT.totalPages)
            setListUsers(response.data.DT.users);
        }
    };

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
    }

    const handleDeleteUser = (user) => {
        setDataModal(user)
        setIsShowModalDelete(true)
    }

    const handleClose = () => {
        setDataModal({})
        setIsShowModalDelete(false)
    }

    const confirmDeleteUser = async () => {
        const response = await deleteUser(dataModal)

        if (response && response.data.EC === 0) {
            toast.success(response.data.EM)
            await fetchUsers()
            setIsShowModalDelete(false)
        } else {
            toast.error(response.data.EM)
        }
    }

    const onHideModalUser = () => {
        setIsShowModalUser(false)
    }

    return (
        <>
            <div className='manage-users-container container'>
                <div className='user-header'>
                    <div className='title'>
                        <h3>Table Users</h3>
                    </div>
                    <div className='actions mt-4 mb-4'>
                        <button className='btn btn-success me-2'>Refresh</button>
                        <button onClick={() => setIsShowModalUser(true)} className='btn btn-primary'>Add new user</button>
                    </div>
                </div>
                <div className='user-body'>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Id</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Group</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers && listUsers.length > 0 ? (
                                <>
                                    {listUsers.map((user, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{user.id}</td>
                                            <td>{user.email}</td>
                                            <td>{user.username}</td>
                                            <td>{user.Group ? user.Group.name : ''}</td>
                                            <td>
                                                <button className='btn btn-warning me-2'>Edit</button>
                                                <button
                                                    onClick={() => handleDeleteUser(user)}
                                                    className='btn btn-danger'>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <tr>
                                    <td colSpan="5"><span>Not found user</span></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className='user-pagination d-flex justify-content-center'>
                    {totalPages > 0 &&
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={totalPages}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />}
                </div>
            </div>

            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                dataModal={dataModal}
                confirmDeleteUser={confirmDeleteUser}
            />

            <ModalUser 
                title='Thêm người dùng mới'
                onHide={onHideModalUser}
                show={isShowModalUser}
            />
        </>
    );
}

export default User;
