import { useContext, useEffect } from "react";

import { UserContext } from "../../context/UserContext";

function Info() {
    const { user } = useContext(UserContext)

    useEffect(() => {
        console.log(user);

    }, [user])

    return (
        <div className="container">
            <h2 className="my-3">Thông tin người dùng</h2>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên người dùng</th>
                        <th scope="col">Email</th>
                        <th scope="col">Quyền hạn</th>
                        <th scope="col">Mô tả</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>{user.account.username}</td>
                        <td>{user.account.email}</td>
                        <td>
                            <ul className="d-flex flex-column" style={{ backgroundColor: 'unset' }}>
                                {user?.account?.groupWithRoles?.Roles?.map((role, index) => (
                                    <li key={index}>{role.url}</li>
                                ))}
                            </ul>
                        </td>
                        <td>
                            <ul className="d-flex flex-column" style={{ backgroundColor: 'unset' }}>
                                {user?.account?.groupWithRoles?.Roles?.map((role, index) => (
                                    <li key={index}>{role.description}</li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Info;