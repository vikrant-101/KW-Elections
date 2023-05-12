import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Social Media Imports
import { GoogleLogin } from "react-google-login";
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// actions
import { loginUser, socialLogin, resetLoginFlag, checkPhoneNumber } from "../../store/actions";

import logoLight from "../../assets/images/logo-light.png";
import KwElectionsLight from '../../assets/images/KW-Elections-Light.png'
//Import config
import { facebook, google } from "../../config";
import withRouter from "../../Components/Common/withRouter";
//import images
import { get, map } from "lodash";
import languages from '../../common/languages';
import { useTranslation } from 'react-i18next';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from 'react-toastify';
import { auth } from "../../helpers/firebaseConfig";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import OtpInput from "otp-input-react";
import OtpModal from '../../Components/Common/OtpModal';
import Toaster from '../../Components/Common/Toaster';



const Login = (props) => {
    const dispatch = useDispatch();
    const { i18n, t } = useTranslation();
    // const { user, errorMsg, loading, error } = useSelector(state => ({
    //     user: state.Account.user,
    //     errorMsg: state.Login.errorMsg,
    //     loading: state.Login.loading,
    //     error: state.Login.error,
    // }));


    const [userLogin, setUserLogin] = useState([]);
    const [passwordShow, setPasswordShow] = useState(false);
    const [selectedLang, setSelectedLang] = useState("");
    const [isLanguageDropdown, setIsLanguageDropdown] = useState(false);
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState();


    // function onCaptchVerify(e) {

    //     if (!window.recaptchaVerifier) {

    //       window.recaptchaVerifier = new RecaptchaVerifier(
    //         "recaptcha-container",
    //         {
    //           size: "invisible",
    //           callback: (response) => {
    //             onSignup(e);
    //           },
    //           "expired-callback": () => {},
    //         },
    //         auth
    //       );
    //     }
    //   }

    useEffect(() => {
        if (!window.recaptchaVerifier) {

            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {

                    },
                    "expired-callback": () => { },
                },
                auth
            );
        }
    })

    const { Phone } = useSelector((state) => ({
        Phone: state.Phone.phone,
    }));


    async function onSignup(e) {
        e.preventDefault();
        setLoading(true);
        let payload = {
            MobileNumber: '+' + ph,
        };
        dispatch(checkPhoneNumber(payload));
    }

    useEffect(() => {
        if (Phone[0] !== null && Phone.length !== 0) {
            const appVerifier = window.recaptchaVerifier;
            const formatPh = '+' + ph;
            signInWithPhoneNumber(auth, formatPh, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    setShowDelete(true);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }
    }, [Phone]);

    function onOTPVerify() {
        setLoading(true);
        setShowDelete(false)
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                const responseObj = {
                    emailVerified:res.user.emailVerified,
                    isAnonymous: res.user.isAnonymous,
                    phoneNumber: res.user.phoneNumber,
                    RoleID: Phone[0].RoleID,
                    id: Phone[0]._id,
                    idToken:res._tokenResponse.idToken,
                }
                if (res.user) {
                   sessionStorage.setItem('auth', JSON.stringify(responseObj))
                    props.router.navigate('/dashboard');
                    setUser(res.user);
                    setLoading(false);
                } else {
                    props.router.navigate('/login');
                }

            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    // const validation = useFormik({
    //     // enableReinitialize : use this flag when initial values needs to be changed
    //     enableReinitialize: true,

    //     initialValues: {
    //         email: userLogin.email || "vikrant.r@cisinlabs.com" || '',
    //         password: userLogin.password || "123456789" || '',
    //     },
    //     validationSchema: Yup.object({
    //         email: Yup.string().required("Please Enter Your Email"),
    //         password: Yup.string().required("Please Enter Your Password"),
    //     }),
    //     onSubmit: (values) => {
    //         if(values.email === 'vikrant.r@cisinlabs.com' && values.password === '123456789'){
    //             props.router.navigate('/dashboard')
    //         } else {
    //             props.router.navigate('/login')
    //         }
    //         dispatch(loginUser(values, props.router.navigate));
    //     }
    // });

    // const signIn = (res, type) => {
    //     if (type === "google" && res) {
    //         const postData = {
    //             name: res.profileObj.name,
    //             email: res.profileObj.email,
    //             token: res.tokenObj.access_token,
    //             idToken: res.tokenId,
    //         };
    //         dispatch(socialLogin(postData, props.router.navigate, type));
    //     } else if (type === "facebook" && res) {
    //         const postData = {
    //             name: res.name,
    //             email: res.email,
    //             token: res.accessToken,
    //             idToken: res.tokenId,
    //         };
    //         dispatch(socialLogin(postData, props.router.navigate, type));
    //     }
    // };

    //handleGoogleLoginResponse
    // const googleResponse = response => {
    //     signIn(response, "google");
    // };

    //handleTwitterLoginResponse
    // const twitterResponse = e => {}

    //handleFacebookLoginResponse
    // const facebookResponse = response => {
    //     signIn(response, "facebook");
    // };

    // useEffect(() => {
    //     if (error) {
    //         setTimeout(() => {
    //             dispatch(resetLoginFlag());
    //         }, 3000);
    //     }
    // }, [dispatch, error]);
    useEffect(() => {
        const currentLanguage = localStorage.getItem("I18N_LANGUAGE");
        setSelectedLang(!currentLanguage ? 'en' : currentLanguage);
    }, []);

    const changeLanguageAction = lang => {
        //set language as i18n
        localStorage.setItem("I18N_LANGUAGE", lang);
        i18n.changeLanguage(lang);
        document.body.dir = i18n.dir();
        setSelectedLang(lang);

    };



    const toggleLanguageDropdown = () => {
        setIsLanguageDropdown(!isLanguageDropdown);
    };

    document.title = t('SignIn | KW-Elections');

    return (
        <React.Fragment>
            <Toaster />
            <OtpModal otp={otp} showDelete={showDelete} setShowDelete={setShowDelete} onOTPVerify={onOTPVerify} setOtp={setOtp} />
            <ParticlesAuth>
                <div id="recaptcha-container"></div>

                <div className="auth-page-content">
                    <Container>
                        <Row>

                            <Col lg={12}>

                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            <img src={KwElectionsLight} alt="" height="40" />
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-15 fw-medium">{t('KW-Elections Template')}</p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">
                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">{t('Welcome Back !')}</h5>
                                            <p className="text-muted">{t('Sign in to continue to KW-Elections.')}</p>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <Form
                                                onSubmit={(e) => { onSignup(e) }}
                                            >

                                                <div className="mb-3">
                                                    <Label htmlFor="phone" className="form-label">{t('Mobile Number')}</Label>
                                                    <PhoneInput country={"in"} value={ph} onChange={setPh} />
                                                    {/* {validation.touched.email && validation.errors.email ? (
                                                        <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                                    ) : null} */}
                                                </div>

                                                <div className="mb-3">
                                                    <div className="float-end">

                                                    </div>


                                                </div>

                                                {/* <div className="form-check">
                                                    <Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                    <Label className="form-check-label" htmlFor="auth-remember-check">{t('Remember me')}</Label>
                                                </div> */}

                                                <div className="mt-4">
                                                    <Button color="success" className="btn btn-success w-100" type="submit">
                                                        <i className="ri-smartphone-line"></i>
                                                        {t('Send code via SMS')}
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>

                                        <Dropdown isOpen={isLanguageDropdown} toggle={toggleLanguageDropdown} className="ms-1 topbar-head-dropdown header-item">
                                            <span>{t('Language')}</span>
                                            <DropdownToggle className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" tag="button">
                                                <img
                                                    src={get(languages, `${selectedLang}.flag`)}
                                                    alt="Header Language"
                                                    height="20"
                                                    className="rounded"
                                                />
                                            </DropdownToggle>
                                            <DropdownMenu className="notify-item language py-2">
                                                {map(Object.keys(languages), key => (
                                                    <DropdownItem
                                                        key={key}
                                                        onClick={() => changeLanguageAction(key)}
                                                        className={`notify-item ${selectedLang === key ? "active" : "none"
                                                            }`}
                                                    >
                                                        <img
                                                            src={get(languages, `${key}.flag`)}
                                                            alt="Skote"
                                                            className="me-2 rounded"
                                                            height="18"
                                                        />
                                                        <span className="align-middle">
                                                            {get(languages, `${key}.label`)}
                                                        </span>
                                                    </DropdownItem>
                                                ))}
                                            </DropdownMenu>
                                        </Dropdown>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>)


                {/* <div className="auth-page-content">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            <img src={KwElectionsLight} alt="" height="40" />
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-15 fw-medium">{t('KW-Elections Template')}</p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">
                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">{t('Welcome Back !')}</h5>
                                            <p className="text-muted">{t('Sign in to continue to KW-Elections.')}</p>
                                        </div>
                                        {errorMsg && errorMsg ? (<Alert color="danger"> {errorMsg} </Alert>) : null}
                                        <div className="p-2 mt-4">
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                action="#">

                                                <div className="mb-3">
                                                    <Label htmlFor="email" className="form-label">{t('Email')}</Label>
                                                    <Input
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Enter email"
                                                        type="email"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.email || ""}
                                                        invalid={
                                                            validation.touched.email && validation.errors.email ? true : false
                                                        }
                                                    />
                                                    {validation.touched.email && validation.errors.email ? (
                                                        <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                    <div className="float-end">
                                                      
                                                    </div>
                                                    <Label className="form-label" htmlFor="password-input">{t('Password')}</Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input
                                                            name="password"
                                                            value={validation.values.password || ""}
                                                            type={passwordShow ? "text" : "password"}
                                                            className="form-control pe-5"
                                                            placeholder="Enter Password"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            invalid={
                                                                validation.touched.password && validation.errors.password ? true : false
                                                            }
                                                        />
                                                        {validation.touched.password && validation.errors.password ? (
                                                            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                        ) : null}
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></button>
                                                    </div>
                                                </div>

                                                <div className="form-check">
                                                    <Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                    <Label className="form-check-label" htmlFor="auth-remember-check">{t('Remember me')}</Label>
                                                </div>

                                                <div className="mt-4">
                                                    <Button color="success" disabled={error ? null : loading ? true : false} className="btn btn-success w-100" type="submit">
                                                        {error ? null : loading ? <Spinner size="sm" className='me-2'> Loading... </Spinner> : null}
                                                        {t('Sign In')}
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>
                                        
                                        <Dropdown isOpen={isLanguageDropdown} toggle={toggleLanguageDropdown} className="ms-1 topbar-head-dropdown header-item">
                                            <span>{t('Language')}</span>
                                            <DropdownToggle className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" tag="button">
                                                <img
                                                    src={get(languages, `${selectedLang}.flag`)}
                                                    alt="Header Language"
                                                    height="20"
                                                    className="rounded"
                                                />
                                            </DropdownToggle>
                                            <DropdownMenu className="notify-item language py-2">
                                                {map(Object.keys(languages), key => (
                                                    <DropdownItem
                                                        key={key}
                                                        onClick={() => changeLanguageAction(key)}
                                                        className={`notify-item ${selectedLang === key ? "active" : "none"
                                                            }`}
                                                    >
                                                        <img
                                                            src={get(languages, `${key}.flag`)}
                                                            alt="Skote"
                                                            className="me-2 rounded"
                                                            height="18"
                                                        />
                                                        <span className="align-middle">
                                                            {get(languages, `${key}.label`)}
                                                        </span>
                                                    </DropdownItem>
                                                ))}
                                            </DropdownMenu>
                                        </Dropdown>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div> */}

            </ParticlesAuth>
        </React.Fragment>
    );
};

export default withRouter(Login);