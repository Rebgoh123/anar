import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import {NavLink} from "react-router-dom";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';


const activeStyle = {
    color: '#C4161C'
};
const nonactiveStyle = {
    color: 'green'
};

class CustomizedMenu extends React.Component {

    state = {
        open: false
    };
    handleClick = event => {
        event.preventDefault();
        this.setState(state => ({ open: !state.open }));
    };

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
        const { classes } = this.props;

        var regexConst = new RegExp( '\/'+this.props.to+'\\\/.*');

        return (
              <div>
                    <Button
                        aria-haspopup="true"
                        onClick={this.handleClick}
                        buttonRef={node => {
                            this.anchorEl = node;
                        }}
                        className={classes.button}
                        style={regexConst.test(this.props.location.pathname) ? activeStyle : {}}
                    >
                        {this.props.title} {this.props.logo}
                    </Button>

                    <Popper open={open} anchorEl={this.anchorEl} disablePortal transition style={{marginLeft:this.props.left}}>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{
                                    transformOrigin:
                                        placement === "bottom" ? "left top" : "left bottom",
                                    marginTop:"25px",
                                    zIndex:"99",
                                }}
                            >
                                <Paper  className={classes.paper}>
                                    <ClickAwayListener onClickAway={this.handleClose}>
                                        <MenuList >
                                            {this.props.type.map((type, index) =>
                                                type === "divider" ?
                                                    <Divider key={index} style={{backgroundColor:"white"}} />      :
                                                    <MenuItem style={{ color: "white"}} key={index} onClick={this.handleMenuSClose}>{type}</MenuItem>
                                                )}

                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
        );
    }
}

const styles = {
    paper: {
        borderTop:"5px solid #C4161C",
        backgroundColor: "#828F97"
    },
    button: {
        color: "#828F97",
        textTransform: 'capitalize',
        fontSize: '18px'
    }
};

function mapStateToProps(props){
    return props;

}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(CustomizedMenu)));
