import React from 'react'
import {
    Modal,
    Form,
    Button,
} from 'semantic-ui-react'

function EditPeminjaman(props) {
    return (
        <Modal size={props.size} open={props.open} onClose={props.close}>
            <Modal.Header>Edit Peminjaman</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Select
                    fluid
                    label='Nama Peminjam'
                    placeholder='Nama'
                    options={props.selectNama}
                    defaultValue={props.selectedAnggota}
                    onChange={(event, {value})=>props.handleEditNama(value)}
                    />

                    <Form.Select
                    fluid
                    label='Judul Buku'
                    placeholder='Judul'
                    options={props.selectJudul}
                    defaultValue={props.selectedBuku}
                    onChange={(event, {value})=>props.handleEditJudul(value)}
                    />

                    <Form.Field>
                        <label>Harga Sewa</label>
                        <input placeholder='Rp.' type='number'
                            defaultValue={props.data.harga_sewa}
                            onChange={(event) => props.handleEditHarga(event.target.value)}
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
                    onClick={(event) => props.handleSubmitEditPeminjaman(event)}
                />
            </Modal.Actions>
        </Modal>
    )
}

export default EditPeminjaman