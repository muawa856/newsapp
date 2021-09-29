import React, { Component } from 'react'

export class Newsitem extends Component {




    render() {

        let { title, description, pic, newsurl, author, date, source } = this.props;
        return (
            <div style={{ margin: '5px 20px' }}>
                <div className="card">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'88%',zIndex:'1'}}>
                        {source}

                    </span>
                    <img src={pic} className="card-img-top" alt="Loading..." />
                    <div className="card-body" >
                        <h5 className="card-title">{title}
                        </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">by {!author ? "unknown" : author} on {date}</small></p>
                        <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-primary">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitem
