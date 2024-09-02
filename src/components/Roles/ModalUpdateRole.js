import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import _ from 'lodash'
import { useEffect, useState } from 'react';
import { updateRole } from '../../services/roleService';

function ModalUpdateRole(props) {
    const defaultInfoRole = {
        url: '',
        description: ''
    }
    const validDefaultUrl = true
    const [validUrl, setValidUrl] = useState(validDefaultUrl)
    const [infoRole, setInfoRole] = useState(defaultInfoRole)

    useEffect(() => {
        setInfoRole({
            url: props.dataModal.url,
            description: props.dataModal.description
        })
    }, [props.dataModal])

    const handleCloseModalUpdate = () => {
        props.onHide()
        setValidUrl(defaultInfoRole)
        setInfoRole({
            url: props.dataModal.url,
            description: props.dataModal.description
        })
    }

    const handleOnchangeInput = (value, name) => {
        const _infoRole = _.cloneDeep(infoRole)
        _infoRole[name] = value
        setInfoRole(_infoRole)

        if (name === 'url') {
            setValidUrl(true)
        }
    }

    const checkValidInputs = () => {
        const isValid = infoRole.url !== ''
        setValidUrl(isValid)
        return isValid
    }
    const confirmUpdateRole = async () => {
        const validUrl = checkValidInputs()

        if (!validUrl) {
            toast.error('Url không được để trống!')
            return
        }

        const response = await updateRole({ ...infoRole, id: props.dataModal.id })

        if (response && response.EC === 0) {
            toast.success(response.EM)
            handleCloseModalUpdate()
            props.getAllRoles()
        } else {
            toast.error(response.EM)
        }
    }

    return (
        <>
            <Modal
                size='lg'
                show={props.show}
                onHide={() => handleCloseModalUpdate()}
            >
                <Modal.Header
                    closeButton
                >
                    <Modal.Title>Chỉnh sửa quyền hạn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-6 mt-3 col-sm-6 form-group'>
                            <label className='form-label'>Url</label>
                            <input
                                value={infoRole.url || ''}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'url')}
                                className={
                                    validUrl ? 'form-control' : 'form-control is-invalid'
                                }
                                type='text' />
                        </div>
                        <div className='col-6 mt-3 col-sm-6 form-group'>
                            <label className='form-label'>Mô tả quyền hạn</label>
                            <input
                                value={infoRole.description || ''}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'description')}
                                className='form-control'
                                type='text' />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={() => handleCloseModalUpdate()}
                    >
                        Huỷ
                    </Button>
                    <Button variant="primary"
                        onClick={() => confirmUpdateRole()}
                    >
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateRole;