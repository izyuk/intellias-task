import React from 'react';
import ReactPlayer from 'react-player';

const Feed = (i, title, views, source, videoId, url) => {

    let src = '';
    let element = '';

    switch (source) {
        case 'facebook':
            src = `https://www.facebook.com/watch?v=${videoId}`;
            break;
        case 'youtube':
            src = `https://www.youtube.com/watch?v=${videoId}`;
            break;
        case 'url':
            src = url;
            break;
        case 'playbuzz':
            element = React.createElement('div', {
                className: 'playbuzz',
                'data-id': videoId,
                'data-show-share': false,
                'data-show-info': false,
                'data-comments': false
            });
            break;
    }

    return (
        <article key={i}>
            <header className="infoRow">
                <h5 className="item-title">{title}</h5>
                <span className="item-views">{views} views</span>
            </header>
            <div className='player-wrapper'>
                {
                    ReactPlayer.canPlay(src) ?
                        <ReactPlayer
                            className='react-player'
                            width='100%'
                            height='320px'
                            url={src}
                            controls={true}
                        /> : (element ? element : <p>This video is not available.</p>)
                }
            </div>
        </article>
    )
};

export default Feed;