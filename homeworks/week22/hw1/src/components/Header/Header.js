import styled from "styled-components";
import avatar from '../trump.jpg';
import { useContext } from "react";
import { AuthContext } from "../../contexts";
import { setAuthToken, successAlert } from "../../utils";
import {
  Link,
  useLocation,
  useHistory
} from "react-router-dom";

const Root = styled.div`
  border-bottom: 1.5px solid rgb(228, 225, 225, 0.7);
`

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100px;
  padding: 40px 0px 0px 0px;
  align-items: baseline;
  max-width: 1200px;
  margin: 0 auto;
`

const NavbarLeft = styled.div`
  display: flex;
  align-items: baseline;
`

const NavbarRight = styled.div`
  display: flex;
  align-items: baseline;
 
`

const NavbarSiteName = styled.div`
  color: #191919;
  font-size:26px;
  font-weight: 650;
  
`

const NavbarList = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 20px;
  
`

const Nav = styled(Link)`
  text-decoration: none;
  color: #787878;
  font-size: 18px;
  cursor:pointer;
  margin: 12px;
  font-weight: 480;

  &:hover {
    color: black;
  }
`

const NavbarListRight = styled.div`
  right: 0px;
`

const NavbarAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
`

const NavbarAvatarImage = styled.div`
  background-image: url(${avatar});
  width: 100%;
  height: 100%;
  background-size:cover;
  background-position: center center
`


export default function Header() {
  const location = useLocation();
  const history = useHistory()
  const { user, setUser } = useContext(AuthContext)

  const handleLogout = () => {
    setAuthToken("")
    setUser(null)
    successAlert("log out successfully!", "See you soon!", "success")
    if (location.pathname !== "/") {
      history.push("/")
    }
  }

  return(
    <Root>
      <Navbar>
        <NavbarLeft>
          <NavbarSiteName>共筆部落格</NavbarSiteName>
          <NavbarList>
            <Nav to="/">Lists</Nav>
            <Nav to="/about">About</Nav>
          </NavbarList>
        </NavbarLeft>
        <NavbarRight>
          <NavbarList>
            <NavbarListRight>
              {user && <Nav to="/write" $active={location.pathname === "/write"}>Write a story</Nav>}
              {user && <Nav to="/" onClick={handleLogout}>Sign out</Nav>}
              {!user && <Nav to="/signin" $active={location.pathname === "/signin"}>Sign in</Nav>}
              {!user && <Nav to="/signup" $active={location.pathname === "/signup"}>Sign up</Nav>}
            </NavbarListRight>
            <NavbarAvatar>
              <NavbarAvatarImage/>
            </NavbarAvatar>
          </NavbarList>      
        </NavbarRight>
      </Navbar>
    </Root>
  )
}
