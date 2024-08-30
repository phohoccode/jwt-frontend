import { useState } from 'react'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify'

import { createRoles } from '../../services/roleService';

function Roles() {
    const dataChildDefault = { url: '', description: '', isValidUrl: true }
    const [listChilds, setListChilds] = useState({
        child1: dataChildDefault
    })

    const handleOnchangeInput = (name, value, key) => {
        const _listChilds = _.cloneDeep(listChilds)
        _listChilds[key][name] = value

        if (value && name === 'url') {
            _listChilds[key]['isValidUrl'] = true
        }

        setListChilds(_listChilds)
    }

    const handleAddNewRoles = () => {
        const _listChilds = _.cloneDeep(listChilds)
        _listChilds[`child-${uuidv4()}`] = dataChildDefault
        setListChilds(_listChilds)
    }

    const handleRemoveRoles = (key) => {
        const _listChilds = _.cloneDeep(listChilds)
        delete _listChilds[key]
        setListChilds(_listChilds)
    }

    const buildDataToPersist = () => {
        const _listChilds = _.cloneDeep(listChilds)
        let result = []
        Object.entries(_listChilds).find(([key, child], index) => {
            result.push({
                url: child.url,
                description: child.description
            })
        })
        return result
    }
    const handleSave = async () => {
        const invalidObj = Object.entries(listChilds).find(([key, child], index) => {
            return child && !child.url
        })

        if (!invalidObj) {
            const data = buildDataToPersist()
            const response = await createRoles(data)

            if (response && response.EC === 0) {
                toast.success(response.EM)
                setListChilds({ child1: dataChildDefault })
            } else {
                toast.error(response.EM)
            }
        } else {
            const _listChilds = _.cloneDeep(listChilds)
            const key = invalidObj[0]
            _listChilds[key]['isValidUrl'] = false
            setListChilds(_listChilds)
            toast.error('Url không được trống!')
        }
    }

    return (
        <div className='container'>
            <div className='mt-3'>
                <div>
                    <h4 className='mb-3'>Thêm quyền hạn</h4>
                </div>
                <div>
                    {Object.entries(listChilds).map(([key, child], index) => (
                        <div className='row' key={key}>
                            <div className={`col-5 form-group ${key}`}>
                                <label className='form-label'>URL:</label>
                                <input
                                    value={child.url}
                                    onChange={(e) => handleOnchangeInput('url', e.target.value, key)}
                                    type='text'
                                    className={child.isValidUrl ? 'form-control' : 'form-control is-invalid'} />
                            </div>
                            <div className='col-5 form-group'>
                                <label className='form-label'>Mô tả quyền hạn:</label>
                                <input
                                    value={child.description}
                                    onChange={(e) => handleOnchangeInput('description', e.target.value, key)}
                                    type='text'
                                    className='form-control' />
                            </div>
                            <div className='col-2 mt-4'>
                                <div className='form-label'></div>
                                <button onClick={() => handleAddNewRoles()} className='btn btn-primary mx-2'>
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                                {index >= 1 && <button onClick={() => handleRemoveRoles(key)} className='btn btn-danger'>
                                    <i className="fa-solid fa-trash"></i>
                                </button>}
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <button onClick={() => handleSave()} className='btn btn-warning mt-4'>Lưu</button>
                </div>
            </div>
        </div>
    );
}

export default Roles;