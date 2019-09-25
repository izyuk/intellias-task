import React, {Component} from 'react';

import Feed from './feed';

class FeedsList extends Component {

    state = {
        feeds: []
    };

    formatViews = (views) => {
        let result = '';
        if (views >= 1000000) {
            result = views.toString().split('');
            result.length = result.length - 5;
            result.splice(result.length - 1, 0, '.');
            result = Number.parseFloat(result.join('')) + 'M';
        } else {
            result = views;
        }
        return result;
    };

    getFeeds = async (filter = null) => {
        let url = 'http://localhost:8000';
        url = filter ? `${url}/feeds/?searchBy=${filter}` : `${url}/feeds`;
        await fetch(url)
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.setState({
                    feeds: [...data.items]
                })
            })
            .catch(err => console.log(err));
    };

    componentDidMount() {
        this.getFeeds();
    }

    filter = (e) => {
        this.getFeeds(e.target.value);
    };

    render() {
        const feeds = this.state.feeds.map((e, i) => Feed(i, e.title, this.formatViews(e.views), e.source, e.videoId, e.url));
        return (
            <>
                <header>
                    <nav>
                        <h1>VIDEO FEED</h1>
                        <div className='filter'>
                            <label htmlFor='filter'>Filter by:</label>
                            <select id='filter' onChange={this.filter}>
                                <option value=''>All</option>
                                <option value='url'>Url</option>
                                <option value='facebook'>Facebook</option>
                                <option value='playbuzz'>Playbuzz</option>
                                <option value='youtube'>Youtube</option>
                            </select>
                        </div>
                    </nav>
                </header>
                <section className="feed">
                    {feeds}
                </section>
            </>
        )
    }
}

export default FeedsList;