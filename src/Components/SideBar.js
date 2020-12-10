import React from 'react'
import { Container } from 'reactstrap';
import Example from "./Admin/AdminProfile";
import pkg from 'semantic-ui-react/package.json'
import { List } from '@material-ui/core';

const App = ({ children }) => (
    <Container >
         <Header as="h3">This example is powered by Semantic UI React {pkg.version} 😊</Header>
    <List bulleted>
      <List.Item
        as="a"
        content="💌 Official documentation"
        href="https://react.semantic-ui.com/"
        target="_blank"
      />
      <List.Item
        as="a"
        content="💡 StackOverflow"
        href="https://stackoverflow.com/questions/tagged/semantic-ui-react?sort=frequent"
        target="_blank"
      />
    </List>
        {children}
    </Container>
);
// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

function Header() {
    return (
        <div>
            <App>
                        <Example />
                    </App>,
        </div>
    )
}

export default Header
