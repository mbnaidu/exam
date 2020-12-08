import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'
import {Navbar, NavbarBrand,Nav} from 'reactstrap'
import '../../styles/AdminHeader.css'
class AdminHeader extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            hover1:false,
            hover2:false,
            
        }
    }
    
    men(){this.setState({hover1: true})}
    omen(){this.setState({hover1: false})}

    women(){this.setState({hover2: true})}
    owomen(){this.setState({hover2: false})}

    render() {
        var a,b;
        if (this.state.hover1) {
          a = {
            borderWidth: 4,
            borderColor: 'red',
        }
        }
        if (this.state.hover2) {
          b = {
            borderWidth: 4,
            borderColor: 'deeppink'}
        }    
        return (
            <div>
            <Navbar className="p-0 navbar-expand-lg " >
                <NavbarBrand className="ml-5" href="/">
                    <img  top height="120" className="loginlogo" src={require('../../Shared/vit.ico')} alt="Card image cap"  />
                </NavbarBrand>
                <Nav Navbar className="pt-3 mr-4">
                    <NavLink className="navbar__link block-example" style={a} onMouseOver={()=>this.men()}   onMouseOut={()=>this.omen()}   exact activeClassName="navbar__link--active" className="navbar__link"to="/admin" >
                        PROFILE
                    </NavLink>
                    <NavLink activeClassName="navbar__link--active" style={b} onMouseOver={()=>this.women()} onMouseOut={()=>this.owomen()}  className="navbar__link" to="/adminexam">
                        EXAMS             
                    </NavLink>
                </Nav>
            </Navbar>
        </div>
        )
    }
}

export default AdminHeader