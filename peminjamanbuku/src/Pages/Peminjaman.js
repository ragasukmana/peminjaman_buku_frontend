import React from 'react'
import { withRouter } from 'react-router-dom'
import {
    Grid,
    Table,
    Button,
    Header,
    Icon
} from 'semantic-ui-react'
import axios from 'axios'
import { connect } from 'react-redux'
import Moment from 'moment'
import TambahPeminjaman from '../Components/Peminjaman/TambahPeminjaman'
import EditPeminjaman from '../Components/Peminjaman/EditPeminjaman'
import DeletePeminjaman from '../Components/Peminjaman/DeletePeminjaman'
import { SemanticToastContainer } from 'react-semantic-toasts'
import { toasting } from '../Components/Toasting'

class Peminjaman extends React.Component {
    componentDidMount() {
        this.getDataPeminjaman()
    }

    state = {
        modalTambahPeminjaman: false,
        modalEditPeminjaman: false,
        modalDeletePeminjaman: false,
        dataPeminjamanTerpilih: {}
    }

    closeModalTambahPeminjaman = () => this.setState({ modalTambahPeminjaman: false })
    closeModalEditPeminjaman = () => this.setState({ modalEditPeminjaman: false })
    closeModalDelete = () => this.setState({ modalDeletePeminjaman: false })

    getDataPeminjaman = () => {
        axios.get(`http://127.0.0.1:3001/peminjaman`)
            .then(res => {
                if (res.status === 200) {
                    this.props.setDataPeminjaman(res.data.data)
                }
            })
    }

    handleModalTambahPeminjaman = () => {
        this.setState({
            modalTambahPeminjaman: true
        })
    }

    handleInputNama = (value) => {
        this.setState({
            id_anggota: value
        })
    }

    handleInputJudul = (value) => {
        this.setState({
            id_buku: value
        })
    }

    handleInputHarga = (value) => {
        this.setState({
            harga_sewa: value
        })
    }

    handleSubmitTambahPeminjaman = (event) => {
        event.preventDefault()
        if (!this.state.id_anggota || !this.state.id_buku || !this.state.harga_sewa) {
            toasting('Peringatan', 'Semua form harus terisi', 'warning')
        } else {
            const body = {
                id_anggota: this.state.id_anggota,
                id_buku: this.state.id_buku,
                harga_sewa: this.state.harga_sewa
            }
            axios.post(`http://127.0.0.1:3001/peminjaman`, body)
                .then(res => {
                    if (res.status === 200) {
                        this.setState({
                            modalTambahPeminjaman: false,
                            id_anggota: '',
                            id_buku: '',
                            harga_sewa: ''
                        })
                        toasting('Sukses', 'Peminjaman berhasil ditambah')
                        this.getDataPeminjaman()
                    }
                })
                .catch(() => {
                    toasting('Error', 'Peminjaman gagal ditambahkan', 'error')
                })
        }

    }

    handleModalEditPeminjaman = (event, data) => {
        event.preventDefault()
        this.setState({
            dataPeminjamanTerpilih: data,
            modalEditPeminjaman: true
        })
    }

    handleEditNama = (value) => {
        this.setState({
            dataPeminjamanTerpilih: {
                ...this.state.dataPeminjamanTerpilih,
                id_anggota: value
            }
        })
    }

    handleEditJudul = (value) => {
        this.setState({
            dataPeminjamanTerpilih: {
                ...this.state.dataPeminjamanTerpilih,
                id_buku: value
            }
        })
    }

    handleEditHarga = (value) => {
        this.setState({
            dataPeminjamanTerpilih: {
                ...this.state.dataPeminjamanTerpilih,
                harga_sewa: value
            }
        })
    }

    handleSubmitEditPeminjaman = (event, id) => {
        event.preventDefault()
        const { dataPeminjamanTerpilih } = this.state
        if (!dataPeminjamanTerpilih.id_anggota || !dataPeminjamanTerpilih.id_buku 
            || !dataPeminjamanTerpilih.harga_sewa) {
            toasting('Peringatan', 'Semua form harus terisi', 'warning')
        } else {
            const body = {
                id_anggota: dataPeminjamanTerpilih.id_anggota,
                id_buku: dataPeminjamanTerpilih.id_buku,
                harga_sewa: dataPeminjamanTerpilih.harga_sewa
            }
            axios.put(`http://127.0.0.1:3001/peminjaman/${id}`, body)
                .then(res => {
                    if (res.status === 200) {
                        this.setState({
                            modalEditPeminjaman: false
                        })
                        this.getDataPeminjaman()
                        toasting('Sukses', 'Peminjaman berhasil diedit')
                    }
                })
                .catch(() => {
                    toasting('Error', 'Peminjaman gagal diedit', 'error')
             })
        }
    }

    handleDeletePeminjaman=(event, data)=>{
        event.preventDefault()
        this.setState({
            dataPeminjamanTerpilih:data,
            modalDeletePeminjaman:true
        })
    }

    handleSubmitDeletePeminjaman=(event,id)=>{
        event.preventDefault()
        axios.delete(`http://127.0.0.1:3001/peminjaman/${id}`)
        .then(res=>{
            if (res.status===200) {
                this.setState({
                    modalDeletePeminjaman:false
                })
                this.getDataPeminjaman()
                toasting('Sukses', 'Peminjaman berhasil dihapus')
            }
        })
        .catch(()=>{
            toasting('Gagal', 'Peminjaman gagal dihapus', 'error')
        })
    }

    render() {
        const {
            modalTambahPeminjaman,
            modalEditPeminjaman,
            modalDeletePeminjaman,
            dataPeminjamanTerpilih
        } = this.state
        const optionNama = this.props.getAnggota.dataAnggota.map(item => ({
            key: item.id,
            text: item.nama_anggota,
            value: item.id
        }))
        const optionJudul = this.props.getBuku.dataBuku.map(item => ({
            key: item.id,
            text: item.judul,
            value: item.id
        }))

        return (
            <div style={{ padding: 50 }}>
                <div style={{ 'zIndex': 1500, 'position': 'absolute' }}>
                    <SemanticToastContainer position="top-left" />
                </div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={2}>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Header as='h2'>Daftar Peminjaman Buku</Header>
                            <Button color='blue' icon labelPosition='left'
                                onClick={() => this.handleModalTambahPeminjaman()}
                            >
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
                                    {this.props.getPeminjaman.dataPeminjaman.map((item) => {
                                        return (
                                            <Table.Row>
                                                <Table.Cell textAlign='center'>{item.invoice}</Table.Cell>
                                                <Table.Cell textAlign='center'>{item.nama_anggota}</Table.Cell>
                                                <Table.Cell textAlign='center'>{item.judul}</Table.Cell>
                                                <Table.Cell textAlign='center'>Rp {item.harga_sewa}</Table.Cell>
                                                <Table.Cell textAlign='center'>{Moment(item.data_created).format('DD/MM/YYYY')}</Table.Cell>
                                                <Table.Cell textAlign='center'>
                                                    <Button primary size='mini'
                                                        onClick={(event) => this.handleModalEditPeminjaman(event, item)}
                                                    >Edit</Button>
                                                    <Button negative size='mini'
                                                        onClick={(event)=>this.handleDeletePeminjaman(event,item)}
                                                    >Delete</Button>
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                        <Grid.Column width={2}>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <TambahPeminjaman
                    size={'mini'}
                    open={modalTambahPeminjaman}
                    close={this.closeModalTambahPeminjaman}
                    selectNama={optionNama}
                    selectJudul={optionJudul}
                    handleInputNama={this.handleInputNama}
                    handleInputJudul={this.handleInputJudul}
                    handleInputHarga={this.handleInputHarga}
                    handleSubmitTambahPeminjaman={this.handleSubmitTambahPeminjaman}
                />
                <EditPeminjaman
                    size={'mini'}
                    open={modalEditPeminjaman}
                    close={this.closeModalEditPeminjaman}
                    data={dataPeminjamanTerpilih}
                    selectNama={optionNama}
                    selectJudul={optionJudul}
                    selectedAnggota={dataPeminjamanTerpilih.id_anggota}
                    selectedBuku={dataPeminjamanTerpilih.id_buku}
                    handleEditNama={this.handleEditNama}
                    handleEditJudul={this.handleEditJudul}
                    handleEditHarga={this.handleEditHarga}
                    handleSubmitEditPeminjaman={this.handleSubmitEditPeminjaman}
                />
                <DeletePeminjaman 
                    size={'mini'}
                    open={modalDeletePeminjaman}
                    close={this.closeModalDelete}
                    data={dataPeminjamanTerpilih}
                    handleSubmitDeletePeminjaman={this.handleSubmitDeletePeminjaman}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        getBuku: state.getBuku,
        getAnggota: state.getAnggota,
        getPeminjaman: state.getPeminjaman
    }
}

const mapDispatchToProps = dispatch => ({
    setDataPeminjaman: payload => dispatch({
        type: 'GET_PEMINJAMAN_FULFILLED',
        payload
    })
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Peminjaman))