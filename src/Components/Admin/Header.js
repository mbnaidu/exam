import React from 'react'
import Example from "./AdminProfile";

const App = ({ children }) => (
    <div >
        {children}
    </div>
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
