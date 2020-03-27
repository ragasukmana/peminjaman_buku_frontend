import React from 'react'
import {
    Modal,
    Form,
    Button,
} from 'semantic-ui-react'

function EditBuku(props) {
    return (
        <Modal size={props.size} open={props.open} onClose={props.close}>
            <Modal.Header>Edit Buku</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Judul Buku</label>
                        <input placeholder='Judul buku'
                        defaultValue={props.data.judul}
                            onChange={(event) => props.handleEditJudul(event.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Nama Pengarang</label>
                        <input placeholder='Nama pengarang'
                        defaultValue={props.data.pengarang}
                            onChange={(event) => props.handleEditPengarang(event.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Harga</label>
                        <input placeholder='Rp.' type='number'
                        defaultValue={props.data.harga}
                            onChange={(event) => props.handleEditHarga(event.target.value)}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button negative floated='left' size='tiny'
                    onClick={(event) => props.deleteBuku(event, props.data)}>Hapus Data</Button>
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

export default EditBuku