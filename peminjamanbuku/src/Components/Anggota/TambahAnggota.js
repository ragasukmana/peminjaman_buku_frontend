import React from 'react'
import {
    Modal,
    Form,
    Button,
} from 'semantic-ui-react'

function TambahAnggota(props) {
    return (
        <Modal size={props.size} open={props.open} onClose={props.close}>
            <Modal.Header>Tambah Anggota</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Nama Anggota</label>
                        <input placeholder='Nama'
                            onChange={(event) => props.handleInputNama(event.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Kota</label>
                        <input placeholder='Kota'
                            onChange={(event) => props.handleInputKota(event.target.value)}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={props.close}>Batal</Button>
                <Button
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content='Simpan Data'
                    onClick={(event) => props.handleSubmitTambahAnggota(event)}
                />
            </Modal.Actions>
        </Modal>
    )
}

export default TambahAnggota