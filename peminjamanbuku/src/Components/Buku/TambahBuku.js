import React from 'react'
import {
    Modal,
    Form,
    Button,
} from 'semantic-ui-react'

function TambahBuku(props) {
    return (
        <Modal size={props.size} open={props.open} onClose={props.close}>
            <Modal.Header>Tambah Buku</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Judul Buku</label>
                        <input placeholder='Judul buku'
                            onChange={(event) => props.handleInputJudul(event.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Nama Pengarang</label>
                        <input placeholder='Nama pengarang'
                            onChange={(event) => props.handleInputPengarang(event.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Harga</label>
                        <input placeholder='Rp.' type='number'
                            onChange={(event) => props.handleInputHarga(event.target.value)}
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
                    onClick={(event) => props.handleSubmitTambahBuku(event)}
                />
            </Modal.Actions>
        </Modal>
    )
}

export default TambahBuku