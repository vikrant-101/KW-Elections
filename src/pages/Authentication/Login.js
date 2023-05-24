import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, Spinner, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { checkPhoneNumber } from "../../store/actions";
import KwElectionsLight from '../../assets/images/KW-Elections-Light.png'
import withRouter from "../../Components/Common/withRouter";
//import images
import { get, map } from "lodash";
import languages from '../../common/languages';
import { useTranslation } from 'react-i18next';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../helpers/firebaseConfig";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import OtpModal from '../../Components/Common/OtpModal';
import Toaster from '../../Components/Common/Toaster';
import { toast } from 'react-toastify';



const Login = (props) => {
    const dispatch = useDispatch();
    const { i18n, t } = useTranslation();
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
    const [otpErrorMsg, setOTPErrorMsg] = useState('')

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
        if (Phone[0] !== null && Phone.length !== 0 && Phone[0].IsActive === true && Phone[0].IsDelete === false) {
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
        } else {
            setLoading(false)  
        }
    }, [Phone]);

    function onOTPVerify() {
        setLoading(true);
        setShowDelete(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                const responseObj = {
                    emailVerified: res.user.emailVerified,
                    isAnonymous: res.user.isAnonymous,
                    phoneNumber: res.user.phoneNumber,
                    RoleID: Phone[0].RoleID,
                    id: Phone[0]._id,
                    FullNameEnglish: Phone[0].FullNameEnglish,
                    FullNameArabic: Phone[0].FullNameArabic,
                    idToken: res._tokenResponse.idToken,
                }
                
                if (res.user) {
                    sessionStorage.setItem('auth', JSON.stringify(responseObj));
                    props.router.navigate('/dashboard');
                    setUser(res.user);
                    setLoading(false);
                   
                } else {
                    props.router.navigate('/login');
                }

            })
            .catch((err) => {
                console.log(err);
                setOTPErrorMsg(t('Wrong OTP'))
                setLoading(false);
            });
    }


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
            <OtpModal otp={otp} showDelete={showDelete} setShowDelete={setShowDelete} otpErrorMsg={otpErrorMsg} onOTPVerify={onOTPVerify} setOtp={setOtp} />
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
                                    <p className="mt-3 fs-15 fw-medium"></p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">
                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">{t('Welcome Back !')}</h5>
                                            <p className="text-muted">{t('Sign in to continue')}</p>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <Form
                                                onSubmit={(e) => { onSignup(e) }}
                                            >

                                                <div className="mb-3">
                                                    <Label htmlFor="phone" className="form-label">{t('Mobile Number')}</Label>
                                                    <PhoneInput country={"kw"} onlyCountries={['kw']} value={ph} onChange={setPh} />
                                                </div>

                                                <div className="mb-3">
                                                    <div className="float-end">
                                                    </div>
                                                </div>
                                                  <div className="mt-4">
                                                    <Button color="success" className="btn btn-success w-100" type="submit">
                                                    {loading ? <Spinner size="sm" className='me-2'> Loading... </Spinner> : null}
                                                        {t('Send code via SMS ')}
                                                        <i className="ri-phone-lock-line"></i>
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
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default withRouter(Login);