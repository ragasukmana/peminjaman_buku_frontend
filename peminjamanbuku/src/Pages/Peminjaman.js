import React from 'react'
import { withRouter } from 'react-router-dom'
import {
    Grid,
    Table,
    Button,
    Header,
    Icon
} from 'semantic-ui-react'

class Peminjaman extends React.Component {
    render() {
        return (
            <div style={{ padding: 50 }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={2}>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Header as='h2'>Daftar Peminjaman Buku</Header>
                            <Button color='blue' icon labelPosition='left'>
                                <Icon name='plus' />
                                Tambah Data Peminjaman
                            </Button>
                            <Table celled inverted padded>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell textAlign='center' width={2}>Nomor</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center'>Nama Peminjam</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center' width={3}>Judul Buku</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center'>Harga Sewa</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center'>Tanggal Peminjaman</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center' width={3}>Action</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell textAlign='center'>Nomor</Table.Cell>
                                        <Table.Cell textAlign='center'>Nama</Table.Cell>
                                        <Table.Cell textAlign='center'>Judul</Table.Cell>
                                        <Table.Cell textAlign='center'>Rp.</Table.Cell>
                                        <Table.Cell textAlign='center'>Tanggal Peminjaman</Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            <Button primary size='mini'>Edit</Button>
                                            <Button negative size='mini'>Delete</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                        <Grid.Column width={2}>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default withRouter(Peminjaman)