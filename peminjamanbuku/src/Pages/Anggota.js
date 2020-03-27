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
import { toasting } from '../Components/Toasting'
import {SemanticToastContainer} from 'react-semantic-toasts'
import TambahAnggota from '../Components/Anggota/TambahAnggota'
import EditAnggota from '../Components/Anggota/EditAnggota'
import DeleteAnggota from '../Components/Anggota/DeleteAnggota'

class Anggota extends React.Component {
    componentDidMount() {
        this.getDataAnggota()
    }

    state = {
        modalTambahAnggota: false,
        modalEditAnggota: false,
        modalDeleteAnggota: false,
        dataAnggotaTerpilih: {}
    }

    closeTambahAnggota = () => this.setState({ modalTambahAnggota: false })
    closeEditAnggota = () => this.setState({ modalEditAnggota:false })
    closeDeleteAnggota = () => this.setState({ modalDeleteAnggota:false })

    getDataAnggota = () => {
        axios.get(`http://127.0.0.1:3001/anggota`)
            .then(res => {
                if (res.status === 200) {
                    this.props.setDataAnggota(res.data.data)
                }
            })
    }

    handleOpenModalTambahAnggota = () => {
        this.setState({
            modalTambahAnggota: true
        })
    }

    handleInputNama = (value) => {
        this.setState({
            nama_anggota: value
        })
    }

    handleInputKota = (value) => {
        this.setState({
            kota: value
        })
    }

    handleSubmitTambahAnggota = (event) => {
        event.preventDefault()
        if (!this.state.nama_anggota || !this.state.kota) {
            toasting('Peringatan', 'Semua form harus terisi', 'warning')
        } else {
            const body = {
                nama_anggota: this.state.nama_anggota,
                kota: this.state.kota
            }
            axios.post(`http://127.0.0.1:3001/anggota`, body)
                .then(res => {
                    if (res.status === 200) {
                        this.setState({
                            modalTambahAnggota: false,
                            nama_anggota: '',
                            kota: ''
                        })
                        this.getDataAnggota()
                        toasting('Sukses', 'Anggota berhasil ditambahkan')
                    }
                })
                .catch(() => {
                    toasting('Error', 'Anggota gagal ditambahkan', 'error')
                })
        }
    }

    handleDataAnggotaTerpilih=(event,data)=>{
        event.preventDefault()
        this.setState({
            dataAnggotaTerpilih: data,
            modalEditAnggota: true
        })
    }

    handleEditNama=(value)=>{
        this.setState({
            dataAnggotaTerpilih:{
                ...this.state.dataAnggotaTerpilih,
                nama_anggota: value
            }
        })
    }

    handleEditKota=(value)=>{
        this.setState({
            dataAnggotaTerpilih:{
                ...this.state.dataAnggotaTerpilih,
                kota: value
            }
        })
    }

    handleSubmitEditBuku=(event,id)=>{
        event.preventDefault()
        const {dataAnggotaTerpilih} = this.state
        if (!dataAnggotaTerpilih.nama_anggota || !dataAnggotaTerpilih.kota) {
            toasting('Peringatan', 'Semua form harus terisi', 'warning')
        } else {
            const body={
                nama_anggota: dataAnggotaTerpilih.nama_anggota,
                kota: dataAnggotaTerpilih.kota
            }
            axios.put(`http://127.0.0.1:3001/anggota/${id}`, body)
            .then(res=>{
                if (res.status===200) {
                    this.setState({
                        modalEditAnggota:false
                    })
                    this.getDataAnggota()
                    toasting('Sukses', 'Anggota berhasil diedit')
                }
            })
            .catch(() => {
                toasting('Error', 'Anggota gagal ditambahkan', 'error')
            })
        }
    }

    handleDeleteAnggota=(event,data)=>{
        event.preventDefault()
        this.setState({
            dataAnggotaTerpilih: data,
            modalDeleteAnggota:true
        })
    }

    handleSubmitDeleteAnggota=(event,id)=>{
        event.preventDefault()
        axios.delete(`http://127.0.0.1:3001/anggota/${id}`)
        .then(res=>{
            if (res.status===200) {
                this.setState({
                    modalDeleteAnggota:false
                })
                this.getDataAnggota()
                toasting('Sukses', 'Anggota berhasil dihapus')
            }
        })
        .catch(()=>{
            toasting('Gagal', 'Anggota gagal dihapus', 'error')
        })
    }

    render() {
        const {
            modalTambahAnggota,
            modalEditAnggota,
            modalDeleteAnggota,
            dataAnggotaTerpilih
        } = this.state
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
                            <Header as='h2'>Daftar Anggota</Header>
                            <Button color='blue' icon labelPosition='left'
                                onClick={() => this.handleOpenModalTambahAnggota()}>
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
                                    {this.props.getAnggota.dataAnggota.map((item) => {
                                        return (
                                            <Table.Row>
                                                <Table.Cell textAlign='center'>{item.nama_anggota}</Table.Cell>
                                                <Table.Cell textAlign='center'>{item.kota}</Table.Cell>
                                                <Table.Cell textAlign='center'>{Moment(item.data_created).format('DD/MM/YYYY')}</Table.Cell>
                                                <Table.Cell textAlign='center'>
                                                    <Button primary size='mini'
                                                    onClick={(event)=>this.handleDataAnggotaTerpilih(event,item)}
                                                    >Edit</Button>
                                                    <Button negative size='mini'
                                                    onClick={(event)=>this.handleDeleteAnggota(event, item)}
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

                <TambahAnggota
                    size={'mini'}
                    open={modalTambahAnggota}
                    close={this.closeTambahAnggota}
                    handleInputNama={this.handleInputNama}
                    handleInputKota={this.handleInputKota}
                    handleSubmitTambahAnggota={this.handleSubmitTambahAnggota}
                />
                <EditAnggota 
                    size={'mini'}
                    open={modalEditAnggota}
                    close={this.closeEditAnggota}
                    data={dataAnggotaTerpilih}
                    handleEditNama={this.handleEditNama}
                    handleEditKota={this.handleEditKota}
                    handleSubmitEditBuku={this.handleSubmitEditBuku}
                /> 
                <DeleteAnggota 
                    size={'mini'}
                    open={modalDeleteAnggota}
                    close={this.closeDeleteAnggota}
                    data={dataAnggotaTerpilih}
                    handleSubmitDeleteAnggota={this.handleSubmitDeleteAnggota}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        getAnggota: state.getAnggota
    }
}

const mapDispatchToProps = dispatch => ({
    setDataAnggota: payload => dispatch({
        type: 'GET_ANGGOTA_FULFILLED',
        payload
    })
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Anggota))