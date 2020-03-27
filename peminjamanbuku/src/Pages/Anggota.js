import React from 'react'
import { withRouter } from 'react-router-dom'
import {
    Grid,
    Table,
    Button,
    Header,
    Icon
} from 'semantic-ui-react'

class Anggota extends React.Component {
    render() {
        return (
            <div style={{ padding: 50 }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={2}>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Header as='h2'>Daftar Anggota</Header>
                            <Button color='blue' icon labelPosition='left'>
                                <Icon name='plus' />
                                Tambah Anggota
                            </Button>
                            <Table celled inverted padded>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell textAlign='center' width={4}>Nama Anggota</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center' width={3}>Kota</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center' width={4}>Tanggal Daftar</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center' width={3}>Action</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell textAlign='center'>Nama</Table.Cell>
                                        <Table.Cell textAlign='center'>Kota</Table.Cell>
                                        <Table.Cell textAlign='center'>Tanggal</Table.Cell>
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

export default withRouter(Anggota)