// rce
import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: "general"
    }
    static propTypes = {
        country: propTypes.string,
        pageSize: propTypes.number,
        category: propTypes.string
    }

    articles = []
    capital = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        console.log("constructor")
        this.state = {

            articles: this.articles,
            loader: false,
            page: 1,
            totalResults: 0
        }
        document.title = `muawa856-${this.capital(this.props.category)}`


    }

    async updateNews() {
        this.props.setProgress(0);
        console.log("cdm");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff1bb821faa340dc848b08be0048d49e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loader: true
        })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json();
        this.props.setProgress(70);
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loader: false });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        // console.log("cdm");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff1bb821faa340dc848b08be0048d49e&pageSize=${this.props.pageSize}`;
        // this.setState({
        //     loader: true
        // })
        // let data = await fetch(url);
        // let parseData = await data.json();
        // this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loader: false });

        this.updateNews();
    }

    next = async () => {
        // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        // }
        // else {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff1bb821faa340dc848b08be0048d49e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({
        //         loader: true
        //     })
        //     let data = await fetch(url);
        //     let parseData = await data.json();
        //     this.setState({ articles: parseData.articles });

        //     this.setState({

        //         page: this.state.page + 1,
        //         loader: false
        //     })
        // }
        this.setState({ page: this.state.page + 1 })
        this.updateNews();
    }
    previous = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff1bb821faa340dc848b08be0048d49e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({
        //     loader: true
        // })
        // let data = await fetch(url);
        // let parseData = await data.json();
        // this.setState({ articles: parseData.articles });

        // this.setState({

        //     page: this.state.page - 1,
        //     loader: false
        // })


        this.setState({ page: this.state.page - 1 })
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff1bb821faa340dc848b08be0048d49e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loader: true
        })
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults,
            loader: false
        });
    };



    render() {
        return (
            <>
                <h1 className="text-center my-4" style={{ color: 'grey', fontStyle: 'italic' }}  ><strong>muawa856-Top  {this.capital(this.props.category)} HeadLines  </strong></h1>
                {
                    this.state.loader && <Spinner />}
                {/* !this.state.loader&& */}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container ">
                        <div className="row my-1">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 my-4" key={element.url}>
                                    <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} pic={element.urlToImage ? element.urlToImage : "https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/pys0yqxl5g4uzb3t_1632646727.jpeg"} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} /></div>

                            })}

                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.previous}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.next}>Next &rarr;</button>
                </div>
 */}


            </>
        )
    }
}

export default News



