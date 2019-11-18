import React from "react";
import logo from '../assets/img/logo.svg';
//import img_index from '../assets/img/img_index.svg';

class Content extends React.Component {
    render() {
        return (
            <div className="container">
                <h1 className="text-center font-weight-bold mt-sm-5"><img className="img-fluid" src={logo} alt="" />Automatic visual QA tool</h1>
                <hr className="hr-light" />
            </div>
        );
    }
}

export default Content;
