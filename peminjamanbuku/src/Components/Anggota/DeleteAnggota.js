import React from 'react'
import { Modal, Header, Button } from 'semantic-ui-react'

function DeleteAnggota(props) {
    return (
        <Modal size={props.size} open={props.open} onClose={props.close}>
            <Modal.Header textAlign='center'>Hapus Anggota ?</Modal.Header>
            <Modal.Content>
                <Header as='h3' textAlign='center'>Data ini akan terhapus dan tidak dapat dikembalikan</Header>
            </Modal.Content>
            <Modal.Actions>
                <Button negative size='tiny' floated='left'
                    onClick={props.close}>Batal</Button>
                <Button
                    size='tiny'
                    positive
                    content='Setuju'
                    onClick={(event) => props.handleSubmitDeleteAnggota(event, props.data.id)}
                />
            </Modal.Actions>
        </Modal>
    )
}
export default DeleteAnggota