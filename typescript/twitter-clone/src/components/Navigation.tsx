import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Navigation = (userObj: any) => {
    const faIcon = faTwitter as IconProp
    const userIcon = faUser as IconProp
    return(
    <nav>
        <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
            <li>
                <Link to="/" style={{ marginRight: 10 }}>
                <FontAwesomeIcon icon={faIcon} color={"#04AAFF"} size="2x" />
                </Link>
            </li>
            <li>
                <Link to="/Profile"
                style={{
                    marginLeft: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    fontSize: 12,
                }}
                >
                    <FontAwesomeIcon icon={userIcon} color={"#04AAFF"} size="2x" />
                    <span style={{marginTop: 10}}>
                    {userObj.userObj.displayName ? `${userObj.userObj.displayName}의 profile` : "Profile"}
                    </span>
                </Link>
            </li>
        </ul>
    </nav>
    )
};

export default Navigation;