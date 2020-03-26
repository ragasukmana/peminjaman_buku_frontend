import React from 'react'
import { withRouter } from 'react-router-dom'

class Buku extends React.Component {
    render() {
        return (
            <div>
                <p>Hello ini buku</p>
            </div>
        )
    }
}

export default withRouter(Buku)