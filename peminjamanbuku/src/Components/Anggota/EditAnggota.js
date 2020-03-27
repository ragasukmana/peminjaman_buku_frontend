import React from 'react'
import {
    Modal,
    Form,
    Button,
} from 'semantic-ui-react'

function EditAnggota(props) {
    return (
        <Modal size={props.size} open={props.open} onClose={props.close}>
            <Modal.Header>Edit Anggota</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Nama Anggota</label>
                        <input placeholder='Nama'
                        defaultValue={props.data.nama_anggota}
                            onChange={(event) => props.handleEditNama(event.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Kota</label>
                        <input placeholder='Kota'
                        defaultValue={props.data.kota}
                            onChange={(event) => props.handleEditKota(event.target.value)}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button negative size='tiny' onClick={props.close}>Batal</Button>
                <Button
                    size='tiny'
                    positive
                    content='Simpan Data'
                    onClick={(event) => props.handleSubmitEditBuku(event, props.data.id)}
                />
            </Modal.Actions>
        </Modal>
    )
}

export default EditAnggota