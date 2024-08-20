import { useEffect, useState } from 'react';
import { fetchAllUser } from '../../services/userService';

function User() {
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await fetchAllUser();
        if (response && response.data && response.data.EC === 0) {
            setListUsers(response.data.DT);
        }
    };

    return (
        <div className='manage-users-container'>
            <div className='user-header'>
                <div className='title'>
                    <h3>Table Users</h3>
                </div>
                <div className='actions'>
                    <button className='btn btn-success'>Refresh</button>
                    <button className='btn btn-primary'>Add new user</button>
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

            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default User;
