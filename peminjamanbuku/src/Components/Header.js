import React from 'react'
import {
    withRouter,
    Link
} from 'react-router-dom'
import { Menu, Image } from 'semantic-ui-react'

class Headers extends React.Component {

    state = {
        activeItem: ''
    }

    handlePageClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
        return (
            <Menu inverted>
                <Menu.Item>
                    <Image src={require('../Public/Assets/Logo/logo.png')} href='/Buku' size='tiny' />
                </Menu.Item>
                <Menu.Item
                    as={Link}
                    name='Buku'
                    to='/Buku'
                    active={activeItem === 'Buku'}
                    onClick={this.handlePageClick}
                />
                <Menu.Item
                    as={Link}
                    name='Anggota'
                    to='/Anggota'
                    active={activeItem === 'Anggota'}
                    onClick={this.handlePageClick}
                />
                <Menu.Item
                    as={Link}
                    name='Peminjaman'
                    to='Peminjaman'
                    active={activeItem === 'Peminjaman'}
                    onClick={this.handlePageClick}
                />
            </Menu>
        )
    }
}

export default withRouter(Headers)