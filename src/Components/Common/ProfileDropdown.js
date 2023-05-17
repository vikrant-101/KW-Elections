import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import avatar1 from "../../assets/images/users/user-dummy-img.jpg";

const ProfileDropdown = () => {
    const { i18n, t } = useTranslation();
    const [userName, setUserName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const { user } = useSelector(state => ({
        user: state.Profile.user,
    }));


    useEffect(() => {
        if (sessionStorage.getItem("auth")) {
            const obj = JSON.parse(sessionStorage.getItem("auth"));
            setUserName(i18n.language === 'ar' ? obj?.FullNameArabic : obj?.FullNameEnglish);
            setMobileNumber(obj?.phoneNumber)
        }
    }, [userName, user, i18n.language]);

    //Dropdown Toggle
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };
    return (
        <React.Fragment>
            <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
                <DropdownToggle tag="button" type="button" className="btn">
                    <span className="d-flex align-items-center">
                        <img className="rounded-circle header-profile-user" src={avatar1}
                            alt="Header Avatar" />
                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{userName}</span>
                            <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{mobileNumber}</span>
                        </span>
                    </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <h6 className="dropdown-header">{t('Welcome')} {userName} !</h6>
                    <h4 className="dropdown-header">{mobileNumber}</h4>
                    <DropdownItem href={process.env.PUBLIC_URL + "/logout"}><i
                        className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle" data-key="t-logout">Logout</span></DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ProfileDropdown;