import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import MoreIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CustomizedMenu from './_customized_menu';
import NavButtonLink from './_nav_link';

//Icons
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';
import Home from '@material-ui/icons/Home';
import Star from '@material-ui/icons/Star';
import Count from '@material-ui/icons/Category';
import Team from '@material-ui/icons/Group';
import FAQ from '@material-ui/icons/ContactSupport';
import Contact from '@material-ui/icons/Contacts';
import MenuIcon from '@material-ui/icons/Menu';

import logo from '../../assets/logo_aa_capital.png';

const styles = theme => ({
    root: {
        width: '100%',
        zIndex:'99',
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    header: {
        padding:'12px',
        backgroundColor:"white",
        boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.1), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
    },
    title: {
        maxWidth: '100%',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            width:'50%'
        },
        [theme.breakpoints.up('md')]: {

        },
        [theme.breakpoints.up('lg')]: {

        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    list: {
        width: 250,
    },
});

class NavBar extends React.Component {
    state = {
        anchorElServices: null,
        anchorElCalculators: null,
    };

    handleSClick = () => {
        this.setState(state => ({ openS: !state.openS }));
    };

    handleCClick = () => {
        this.setState(state => ({ openC: !state.openC }));
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const { classes } = this.props;

        const services = ['New Loan', 'Refinancing','divider','Residential Property', 'Commercial Loan', 'Home Construction', 'Bridging Loan' ];
        const calculators = ['Eligibility(TDSR)', 'Mortgage Repayment', 'Seller Stamp Duty', 'Buyer Stamp Duty', 'Return Of Investment'  ];

        const sideList = (
            <div className={classes.list}>
                <List>
                    <ListItem button onClick={this.toggleDrawer('right', false)}>
                        <ListItemIcon>
                            <Close />
                        </ListItemIcon>
                        <ListItemText inset primary="Close" />
                    </ListItem>

                    <Divider/>

                    <ListItem button>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText inset primary="Home" />
                    </ListItem>

                    <ListItem button onClick={this.handleSClick}>
                        <ListItemIcon>
                            <Star />
                        </ListItemIcon>
                        <ListItemText inset primary="Services" />
                        {this.state.openS ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.openS} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {services.map((services, index) =>
                                services === "divider" ?
                                    <Divider key={index}/>      :
                                    <ListItem button key={index}  >
                                        <ListItemText inset primary={services} />
                                    </ListItem>
                            )}
                        </List>
                    </Collapse>

                    <ListItem button onClick={this.handleCClick}>
                        <ListItemIcon>
                            <Count />
                        </ListItemIcon>
                        <ListItemText inset primary="Calculators" />
                        {this.state.openC ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.openC} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {calculators.map((calculators, index) =>
                                <ListItem button key={index}  >
                                    <ListItemText inset primary={calculators} />
                                </ListItem>
                            )}
                        </List>
                    </Collapse>

                    <ListItem button>
                        <ListItemIcon>
                            <Team />
                        </ListItemIcon>
                        <ListItemText inset primary="A&A Team" />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <FAQ />
                        </ListItemIcon>
                        <ListItemText inset primary="FAQ" />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <Contact />
                        </ListItemIcon>
                        <ListItemText inset primary="Contact Us" />
                    </ListItem>
                </List>
            </div>
        );

        const renderMobileMenu = (
            <Drawer anchor="right" open={this.state.right}>
                <div>
                    {sideList}
                </div>
            </Drawer>
        );


        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.header}>

                    <Toolbar style={{margin:"0 auto", }}>
                        <Link to=''><img src={logo} className={classes.title} style={{marginRight:'2rem'}}/></Link>

                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop} >
                            {/*style={{width:"900px"}}*/}
                            <NavButtonLink title='home' to=''/>

                            <CustomizedMenu  title="Services"
                                             logo={<ArrowDown/>}
                                             type={services}
                                             left={"4.5rem"}
                                             to="services"
                            />

                            <CustomizedMenu  title="Calculators"
                                             logo={<ArrowDown/>}
                                             type={calculators}
                                             left={"3.8rem"}
                                             to="calculator"
                            />

                            <NavButtonLink title='A&A Team' to='team'/>

                            <NavButtonLink title='FAQ' to='faq'/>

                            <NavButtonLink title='Contact Us' to='contact'/>

                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.toggleDrawer('right', true)} style={{color:"black"}}>
                                <MenuIcon />
                            </IconButton>
                        </div>

                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
            </div>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);