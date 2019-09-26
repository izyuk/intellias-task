import React from 'react';
import ReactPlayer from 'react-player';

/**
 * Represents Feed item
 *
 * @param {Number}          key         unique key value for React
 * @param {String}          title       title of feed
 * @param {String}          views       formatted number of views
 * @param {String}          source      video source name
 * @param {String|Number}   videoId     videoId from different source
 * @param {String}          url         full specified url
 * @returns {HTMLObjectElement}         feed template
 */

const Feed = (key, title, views, source, videoId, url) => {

    let src = '';
    let element = '';

    /**
     * Loading PlaybuzzSDK with feeds to define all playbuzz elements when you are trying to filter by source
     */

    const loadScript = function () {
        const [d, s, id] = [document, 'script', 'playbuzz-sdk'];
        if (d.getElementById(id)) d.getElementById(id).parentNode.removeChild(d.getElementById(id));
        var js, fjs = d.getElementsByTagName(s)[0];
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://embed.playbuzz.com/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
    };

    switch (source.toLowerCase()) {
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
            loadScript();
            element = React.createElement('div', {
                className: 'playbuzz',
                'data-id': videoId,
                'data-show-share': false,
                'data-show-info': false,
                'data-comments': false
            });
            break;
        default:
            //Should not happened
            break;
    }

    return (
        <article key={key}>
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