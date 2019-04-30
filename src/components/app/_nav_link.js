import React from 'react';
import _ from 'lodash';
import { NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {withStyles} from "@material-ui/core";

const activeStyle = {
    color: '#C4161C'
};

const buttonStyle ={
    color: "#828F97",
    textTransform: 'capitalize',
    fontSize: '18px',
};

class NavButtonLink extends React.Component {

    render() {


        var link = this.props.location.pathname === '/' ? '' : _.isEmpty(this.props.to) ? '/' : this.props.to;
        var regexConst = new RegExp( '\/'+link);

        return (
            <Button component={NavLink} to={'/'+this.props.to} style={buttonStyle} activeStyle={regexConst.test(this.props.location.pathname) ? activeStyle : {}}>
                {this.props.title}
            </Button>
        );
    }
}

function mapStateToProps(props){
    return props;

}

export default withRouter(connect(mapStateToProps)(NavButtonLink));
