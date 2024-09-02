import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import _ from 'lodash'

import { fetchGroup } from "../../services/userService";
import { assignRoleToGroup, fetchAllRole } from "../../services/roleService";
import { fetchRolesByGroup } from '../../services/roleService'

function GroupRole() {
    const [userGroup, setUserGroup] = useState([])
    const [selectGroup, setSelectGroup] = useState('')
    const [listRoles, setListRoles] = useState([])
    const [assignRolesByGroup, setAssignRolesByGroup] = useState([])

    useEffect(() => {
        getGroup()
        getAllRoles()
    }, [])

    const getGroup = async () => {
        const response = await fetchGroup()

        if (response && response.EC !== 0) {
            toast.error(response.EM)
            return
        }

        setUserGroup(response.DT)
    }

    const getAllRoles = async () => {
        const response = await fetchAllRole();
        console.log(response);

        if (response && +response.EC === 0) {
            setListRoles(response.DT)
        } else {
            toast.error(response.EM)
        }
    }

    const handleOnchangeGroup = async (value) => {
        setSelectGroup(value)
        if (value) {
            const response = await fetchRolesByGroup(value);
            console.log(response);

            if (response && +response.EC === 0) {
                const result = buildDataRolesByGroup(response.DT.Roles, listRoles)
                console.log(result)
                setAssignRolesByGroup(result)
            } else {
                toast.error(response.EM)
            }
        }
    }

    const buildDataRolesByGroup = (groupRoles, allRoles) => {
        const result = []
        if (allRoles && allRoles.length > 0) {
            allRoles.map(role => {
                const object = {}
                object.id = role.id
                object.url = role.url
                object.description = role.description
                object.isAssigned = false

                if (groupRoles && groupRoles.length > 0) {
                    object.isAssigned = groupRoles.some(role => role.url === object.url)
                }

                result.push(object)
            })
        }

        return result
    }

    const handleSelectRole = (value) => {
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup)
        const foundIndex = _assignRolesByGroup.findIndex(role => +role.id === +value)

        if (foundIndex !== -1) {
            _assignRolesByGroup[foundIndex].isAssigned = !_assignRolesByGroup[foundIndex].isAssigned
            setAssignRolesByGroup(_assignRolesByGroup)
        }
    }

    const buildDataToSave = () => {
        const result = {}
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup)
        const groupRolesFilter = _assignRolesByGroup.filter(role => role.isAssigned === true)
        const finalGroupRoles = groupRolesFilter.map(role => {
            const newRole = { groupId: +selectGroup, roleId: +role.id }
            return newRole
        })

        result.groupId = selectGroup
        result.groupRoles = finalGroupRoles
        return result
    }

    const handleSave = async () => {
        const data = buildDataToSave()
        console.log(data.groupId)
        const response = await assignRoleToGroup(data)

        if (response && +response.EC === 0) {
            toast.success(response.EM)
        }
    }

    return (
        <div className="container">
            <div className='col-6 mt-3 col-sm-6 form-group'>
                <label className='form-label'>Danh sách nhóm người dùng</label>
                <select
                    onChange={(e) => handleOnchangeGroup(e.target.value)}
                    className="form-select form-select-sm" aria-label=".form-select-sm example"
                >
                    <option value={''}>----Chọn nhóm----</option>
                    {userGroup && userGroup.length > 0 &&
                        userGroup.map((group, index) => (
                            <option key={index} value={group.id}>{group.name}</option>
                        ))
                    }
                </select>
                <hr />
                {selectGroup &&
                    <div>
                        <h2>Quyền của nhóm</h2>
                        {assignRolesByGroup.map((role, index) => (
                            <div className="form-check" key={index}>
                                <input
                                    value={role.id}
                                    checked={role.isAssigned}
                                    className="form-check-input"
                                    type="checkbox"
                                    id={index}
                                    onChange={(e) => handleSelectRole(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor={index}>
                                    {role.url}
                                </label>
                            </div>
                        ))}
                    </div>}
                <div>
                    <button onClick={() => handleSave()} className="btn btn-primary mt-3">Lưu</button>
                </div>
            </div>
        </div>
    );
}

export default GroupRole;