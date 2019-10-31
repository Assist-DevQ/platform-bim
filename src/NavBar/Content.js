import React from "react";
import { MDBMask, MDBView, MDBContainer } from "mdbreact";
import logo from '../assets/img/logo.svg';
//import img_index from '../assets/img/img_index.svg';

class Content extends React.Component {
    render() {
        return (
            <div>
                <MDBView>
                    <MDBMask className="h-100 justify-content-center align-items-center">
                        <MDBContainer>
                                <h1 className="text h1-responsive font-weight-bold mt-sm-5"><img className="cl-img" src={logo} alt=""/>Automatic visual QA tool</h1>
                                <hr className="hr-light" />
                        </MDBContainer>
                    </MDBMask>
                </MDBView>
            </div>
        );
    }
}

export default Content;
