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
    const [isCheckedAllRoles, setIsCheckedAllRoles] = useState(false)

    useEffect(() => {
        getGroup()
        getAllRoles()
    }, [])

    useEffect(() => {
        const isCheckedAllRoles = assignRolesByGroup.some(role => !role.isAssigned)
        setIsCheckedAllRoles(isCheckedAllRoles ? false : true)
    }, [assignRolesByGroup])

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

            if (response && +response.EC === 0) {
                const result = buildDataRolesByGroup(response.DT.Roles, listRoles)

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

    const handleSelectAllRole = (event) => {
        const isChecked = event.target.checked
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup)

        _assignRolesByGroup.map(role => role.isAssigned = isChecked)
        setAssignRolesByGroup(_assignRolesByGroup)
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
                    <>
                        <div>
                            <h4 className="my-3">Chỉnh sửa quyền hạn nhóm</h4>
                            <div className="form-check">
                                <input
                                    checked={isCheckedAllRoles}
                                    className="form-check-input"
                                    type="checkbox"
                                    id='checkall'
                                    onChange={(e) => handleSelectAllRole(e)}
                                />
                                <label className="form-check-label" htmlFor='checkall'>
                                    Chọn tất cả
                                </label>
                            </div>
                            <hr />
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
                        </div>
                        <button onClick={() => handleSave()} className="btn btn-primary mt-3">Lưu</button>
                    </>

                }
            </div>
        </div>
    );
}

export default GroupRole;