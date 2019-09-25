import React from 'react';
import './index.less';
import {Route, Switch} from 'react-router-dom';
import Header from './header/header';
import FeedsList from './content/feeds-list';

function App() {
    return (
        <div className="App">
            <FeedsList/>
        </div>
    );
}

export default App;
