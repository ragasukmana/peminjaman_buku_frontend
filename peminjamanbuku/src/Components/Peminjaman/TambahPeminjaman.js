import React from 'react'
import {
    Modal,
    Form,
    Button,
} from 'semantic-ui-react'

function TambahPeminjaman(props) {
    return (
        <Modal size={props.size} open={props.open} onClose={props.close}>
            <Modal.Header>Tambah Peminjaman</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Select
                    fluid
                    label='Nama Peminjam'
                    placeholder='Nama'
                    options={props.selectNama}
                    onChange={(event, {value})=>props.handleInputNama(value)}
                    />

                    <Form.Select
                    fluid
                    label='Judul Buku'
                    placeholder='Judul'
                    options={props.selectJudul}
                    onChange={(event, {value})=>props.handleInputJudul(value)}
                    />

                    <Form.Field>
                        <label>Harga Sewa</label>
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
                    onClick={(event) => props.handleSubmitTambahPeminjaman(event)}
                />
            </Modal.Actions>
        </Modal>
    )
}

export default TambahPeminjaman