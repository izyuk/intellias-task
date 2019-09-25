import React from 'react';

function Header() {

    return (
        <header>
            <nav>
                <h1>VIDEO FEED</h1>
                <div className='filter'>
                    <label htmlFor='filter'>Filter by source: </label>
                    <select id='filter'>
                        <option value=''>All</option>
                        <option value='url'>Url</option>
                        <option value='facebook'>Facebook</option>
                        <option value='youtube'>Youtube</option>
                    </select>
                </div>
            </nav>
        </header>
    );
}

export default Header;