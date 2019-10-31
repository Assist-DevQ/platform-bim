import React from 'react';
import Content from '../NavBar/Content';
import NavBar from '../NavBar/NavBar'

class HomePage extends React.Component {

    render() {
        return (
            <div>
                <NavBar />
                <Content />
            </div>
        );
    }
}

export { HomePage }