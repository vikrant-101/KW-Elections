import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
	Button,
	Col,
	Input,
	InputGroup,
	Row,
	InputGroupText,
} from "reactstrap";
// import SelectDropDown from "../Select-DropDown/SelectDropDown";

// ************* MODAL FORM ****************
const AddUsersForm = ({
	onChangeHandler,
	countryData,
	labels,
	classRow,
	isAddOrEdit,
	onTranslateClickHandler,
	show,
}) => {
	const { t, i18n } = useTranslation();
	const [formData, setFormData] = useState({
		ScreenID: null,
		ScreenNameEnglish: "",
		ScreenNameArabic: "",
		LabelNameEnglish: "",
		LabelNameArabic: "",
		LabelKey: ""
	});
	const [lang, setLang] = useState();
	const [shouldUpdate, setShouldUpdate] = useState(false);
	const [referedVoterDetails, setReferedVoterDetails] = useState({});

	const { Roles } = useSelector((state) => ({
		Roles: state.Roles.roles,
	}));


	const onOtherClickHandler = () => {
		setShouldUpdate(!shouldUpdate);
	};

	useEffect(() => {
		setFormData(classRow);
	}, [classRow]);

	useEffect(() => {
		if (show) {
			setLang("");
		}
	}, [show]);

	const isInValidNumber =
	(referedVoterDetails?.MobileNumber?.length < 8 &&
		referedVoterDetails?.MobileNumber?.length > 0) ||
	referedVoterDetails?.MobileNumber?.length > 8;


	return (
		<Row>
			{labels.map((items) => {
				switch (items?.fieldName || items?.labelName) {
					case "text-box":
						return (
							<Col key={items?.id} sm={6}>
								<div className="mb-3">
									<label htmlFor={items?.labelName} className="col-form-label">
										{t(items?.labelName)}
									</label>

									<div className="lang-change-wrap">
										<Input
											type="text"
											className="form-control"
											placeholder={t(items.labelName)}
											defaultValue={formData[items?.value]}
											name={items?.name}
											disabled={
												items?.name === "LabelKey" && isAddOrEdit === "isEdit"
													? true
													: false
											}
											onChange={(e) => onChangeHandler(e)}
											id={items?.labelName}
											required
										/>
									</div>
								</div>
							</Col>
						);

					case "mobile-number":
						return (
							<Col key={items?.id} sm={6}>
								<div className="mb-3">
									<label htmlFor={items?.labelName} className="col-form-label">
										{t(items?.labelName)}
									</label>

									<div className="lang-change-wrap">
										<InputGroup>
											<InputGroupText>+965</InputGroupText>
											<Input
												placeholder={t(items?.labelName)}
												defaultValue={(isAddOrEdit === 'isEdit' && formData[items?.value]) ? formData[items?.value].replace("+965", "") : ""}
												name={items?.name}
												type="number"
												maxLength={8} 
												invalid={isInValidNumber}
												onChange={(e) => onChangeHandler(e)}
												onInput={(e) => {
													e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 8); // Limit the input to 8 characters
												}}
							
												id={items?.labelName}
												required
											/>
										</InputGroup>
									</div>
								</div>
							</Col>
						);

					case "role-drop-down":
						return (
							<Col key={items?.id} sm={6}>
								<div className="mb-3">
									<label htmlFor="country" className="col-form-label">
										{t(items?.labelName)}
									</label>
									<select
										className="form-control"
										id={items.labelName}
										defaultValue={classRow[items?.value]}
										name={items?.name}
										onChange={(e) => onChangeHandler(e)}
									>
										<option value="">{t('Choose Role')}</option>
										{Roles?.map((item) => {
											return (
												<option key={item?._id} value={item?.RoleID}>
													{i18n?.language === "en"
														? item?.RoleNameEnglish
														: item?.RoleNameArabic}
												</option>
											);
										})}
									</select>
								</div>
							</Col>
						);
					default:
						return null;
				}
			})}
		</Row>
	);
};

export default AddUsersForm;
