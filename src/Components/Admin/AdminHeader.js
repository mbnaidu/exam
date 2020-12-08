import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'
import {Navbar, NavbarBrand,Nav, InputGroupAddon, InputGroup, InputGroupText} from 'reactstrap'
import '../../styles/AdminHeader.css'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


class AdminHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hover1:false,
            hover2:false, 
        }
    }
    
    profile(){this.setState({hover1: true})}
    setProfile(){this.setState({hover1: false})}

    exam(){this.setState({hover2: true})}
    setExam(){this.setState({hover2: false})}

    render() {
        var a,b;
        if (this.state.hover1) {
          a = {
            borderWidth: 4,
            borderColor: 'green',
        }
        }
        if (this.state.hover2) {
          b = {
            borderWidth: 4,
            borderColor: 'red'}
        }    
        return (
            <div>
            <Navbar className="head">
                <NavbarBrand  href="/">
                    <img  top  height="80" className="loginlogo" src={require('../../Shared/vit.ico')} alt="Card image cap"  />
                </NavbarBrand>
                <Nav >
                    <NavLink className="navbar__link block-example" style={a} onMouseOver={()=>this.profile()}   onMouseOut={()=>this.setProfile()}   exact activeClassName="navbar__link--active" className="navbar__link"to="/admin" >
                        PROFILE
                    </NavLink>
                    <NavLink activeClassName="navbar__link--active" style={b} onMouseOver={()=>this.exam()} onMouseOut={()=>this.setExam()}  className="navbar__link" to="/adminexam">
                        EXAMS             
                    </NavLink>
                    <NavLink className="navbar_signout" to="/"> 
                        <ExitToAppIcon style={{color:"rgb(110,94,254)"}} /> 
                            SIGN OUT
                    </NavLink>
                </Nav>
            </Navbar>
        </div>
        )
    }
}

export default AdminHeader