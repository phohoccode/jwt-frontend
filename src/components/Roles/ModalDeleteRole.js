import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

function ModalDeleteRole(props) {

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xoá quyền hạn</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn chắc chắn quyền hạn {props.dataModal.url}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Huỷ
                    </Button>
                    <Button variant="danger" onClick={props.confirmDeleteRole}>
                        Xoá
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteRole;