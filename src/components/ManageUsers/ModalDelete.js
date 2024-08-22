import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

function ModalDelete(props) {

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xoá người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn chắc chắn xoá người dùng {props.dataModal.username}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Huỷ
                    </Button>
                    <Button variant="danger" onClick={props.confirmDeleteUser}>
                        Xoá
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDelete;