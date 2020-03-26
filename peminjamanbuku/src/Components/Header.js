import React from 'react'
import {
    withRouter,
} from 'react-router-dom'

class Headers extends React.Component {
    render() {
        return (
            <div class="ui fixed menu" style={{ padding: 10 }}>
                <a href="/Buku">
                    <img alt="logo" src={require('../Public/Assets/Logo/logo.jpg')} style={{ height: 60, width: 140, marginLeft: 25 }} />
                </a>
            </div>
        )
    }
}

export default withRouter(Headers)