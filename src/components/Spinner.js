import React, { Component } from 'react'
import loader from './loader.gif'
export class Spinner extends Component {
    render() {
        return (
            <div style={{ margin:'200px 880px' }}>
                <img src={loader} alt="Loading..." />
            </div>
        )
    }
}

export default Spinner
