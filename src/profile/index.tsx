import React, { useEffect, useState } from 'react';
import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    Modal,
    PageHeader,
    Row,
    Tag,
    Typography,
    Upload
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CaretRightFilled, CheckCircleFilled } from '@ant-design/icons';
import { cloneDeep, isEmpty } from 'lodash';

import './profile.scss';
import {
    fieldLayout,
    kycFlagDetails,
    requiredDocumentList
} from './constants';
import BankDocuments from './bankDocuments';
import BuyerWorkingHours from './buyerWorkingHours';
import DocumentsUploaded from './documentsUploaded';
import { emailValidator, generateFormData, normFile, validateUpload } from './utils';
import ConfirmationMessage from './confirmationMessage';

import Header from '../header';
import { UserTypes } from '../store/genericTypes';
import { RootState } from '../store/rootReducer';
import CancelBtn from '../app-components/cancelBtn';
import PrimaryBtn from '../app-components/primaryBtn';
import { getUserFiles, saveKyc } from '../store/loginReducer/actions';

const { Title, Text } = Typography;

const Profile = (props: any) => {
    const { history } = props;
    const dispatch = useDispatch();
    const [changeEmail, setChangeEmail] = useState(false);
    const [isAddClicked, setAddClicked] = useState(false);
    const [isChangeClicked, setChangeClicked] = useState(false);
    const [showProfilePic, setProfilePic] = useState(true);
    const [kycFlag, setKycFlag] = useState("");
    const [showConfirmation, setConfirmation] = useState(false);
    const [isSave, setSaveFlag] = useState(false);
    const [disableSave, setDisableSave] = useState(true);
    const [imageSrc, setImageSrc] = useState();
    const [isPDF, setPDF] = useState(false);
    const [kycFormValues, setKycFormValues] = useState({});
    const [formSubmitValue, setFormSubmitValue] = useState({});
    
    const loginState = useSelector((state: RootState) => state.loginUser);
    const { bank_info, bank_doc, configs , working_hours, category } = loginState;
    const { PAN, UIDAI, pan_card, aadhar_card, rtc, rtc_card, kisancard, kisancard_card } = loginState;
    const userType = loginState.is_buyer ? UserTypes.BUYER : UserTypes.SELLER;
    const subType = userType === UserTypes.BUYER ? loginState.buyer_type : loginState.seller_type;
    const addBankInfo = isEmpty(bank_info?.account_holder_name) && isEmpty(bank_info?.account_no)
        && isEmpty(bank_info?.ifsc_code) && isEmpty(bank_info?.upi_id);

    useEffect(() => {
        // Do this if the profile is not verified else set kyc flag to completed
        const bankSubmitted = !isEmpty(loginState?.bank_info?.account_holder_name) && !isEmpty(loginState?.bank_info?.account_no)
            && !isEmpty(loginState?.bank_info?.ifsc_code) && !isEmpty(loginState?.bank_doc);
        
        const aadharSubmitted = !isEmpty(loginState.UIDAI) && !isEmpty(loginState?.aadhar_card);
        const panSubmitted = !isEmpty(loginState.PAN) && !isEmpty(loginState?.pan_card);
        const rtcSubmitted = !isEmpty(loginState.rtc) && !isEmpty(loginState?.rtc_card);
        const kisanSubmitted = !isEmpty(loginState.kisancard) && !isEmpty(loginState?.kisancard_card);

        if(userType === UserTypes.BUYER){
            if(isEmpty(loginState.category)){
                (panSubmitted && aadharSubmitted) ?
                    setKycFlag("submitted") : setKycFlag("incomplete");
            } else {
                (panSubmitted && !isEmpty(loginState.gstin))?
                    setKycFlag("submitted") : setKycFlag("incomplete");
            }
        } else {
            if(isEmpty(loginState.category)){
                ((aadharSubmitted && bankSubmitted) &&
                    ((kisanSubmitted && !rtcSubmitted) || (!kisanSubmitted && rtcSubmitted)
                        || (kisanSubmitted && rtcSubmitted))) ?
                    setKycFlag("submitted") : setKycFlag("incomplete");
                } else {
                (panSubmitted && !isEmpty(loginState.gstin) && !isEmpty(loginState.fpo) && bankSubmitted) ?
                    setKycFlag("submitted") : setKycFlag("incomplete");
            }
        }
    },[loginState]);

    useEffect(() => {
        if(!isEmpty(loginState.profile_picture))
            dispatch(getUserFiles(loginState?.profile_picture?.doc_key, setImageSrc, setPDF));
    },[loginState]);

    const uploadProfilePic = (event: any) => {
        (isEmpty(event.fileList)) ? setProfilePic(true) : setProfilePic(false);
        setDisableSave(false);
        console.log(isPDF);
    };

    const setKycToComplete = (values: any) => {
        delete values["profile_picture"];
        delete values["email"];
        delete values["upi_id"];
        if(userType === UserTypes.BUYER){
            delete values["account_holder_name"];
            delete values["bank_info"];
            delete values["account_no"];
            delete values["ifsc_code"];
            delete values["bank_doc"];
            delete values["weekday"];
            delete values["sunday"];
            delete values["saturday"];
        }
        
        var count = 0;
        for(const key in values) {
            (values.hasOwnProperty(key)) && count++
        }
        const length = count;
        for(const key in values) {
            if(isEmpty(values[key])){
                count --;
            }
        }
        if(count === length){
            setKycFlag("submitted");
        }
    };

    const docErrorMessage = () =>{
        Modal.error({
            title: "Document field partially filled",
            content: "If you wish to enter the document, kindly enter both value and upload image together!"
        })
    };

    const bankErrorMessage = () => {
        Modal.error({
            title: "Bank field partially filled",
            content: "If you wish to enter the bank details, kindly enter all the fields together!"
        })
    }

    const onSave = () => {
        setKycToComplete(formSubmitValue);
        const registerDataPromise = generateFormData(cloneDeep(kycFormValues));
        registerDataPromise.then((data) => 
            dispatch(saveKyc(data))
        );
    };
    
    const checkForError = (name: any, field: any) => {
        const a = isEmpty(name);
        const b = isEmpty(field);
        return ((a && !b) || (!a && b));
    };

    const onFinish = (values: any) => {
        console.log("Success:", values);
        setFormSubmitValue(values);
        const a = isEmpty(values.account_name);
        const b = isEmpty(values.account_number);
        const c = isEmpty(bank_doc)? isEmpty(values.bank_doc) : (isEmpty(values.account_name)? true :false);
        const d = isEmpty(values.ifsc_code);
        var bankError = !((a && b && c && d) || (!a && !b && !c && !d));
        
        var panError, rtcError, kisanError, aadharError;
        
        if(isEmpty(kisancard_card) && isEmpty(kisancard)){
            kisanError = checkForError(values.kisancard, values.kisancard_card);
        }
        if(isEmpty(pan_card) && isEmpty(PAN)){
            panError = checkForError(values.pan, values.pan_card);
        }
        if(isEmpty(rtc_card) && isEmpty(rtc)){
            rtcError = checkForError(values.rtc, values.rtc_card);
        }
        if(isEmpty(UIDAI) && isEmpty(aadhar_card)){
            aadharError = checkForError(values.uidai, values.aadhar_card);
        }
        
        const docError = panError || rtcError || kisanError || aadharError;

        if(docError){
            docErrorMessage();
        } else if (bankError){
            bankErrorMessage();
        } else {
            var formSubmitValues = values;
            // Grouping working_hours
            if(userType === UserTypes.BUYER){
                const {weekday, saturday, sunday} = values;
                var working_hours: any = {};
                
                if(!isEmpty(weekday) ||!isEmpty(saturday) || !isEmpty(sunday)) {
                    working_hours = {
                        weekday: loginState.working_hours.weekday,
                        sunday: loginState.working_hours.sunday,
                        saturday: loginState.working_hours.saturday
                    }
                    working_hours = !isEmpty(weekday) ? {...working_hours, weekday} : working_hours;
                    working_hours = !isEmpty(saturday) ? {...working_hours, saturday}: working_hours;
                    working_hours = !isEmpty(sunday) ? {...working_hours, sunday}: working_hours;
                }
                
                delete values.weekday;
                delete values.sunday;
                delete values.saturday;
                formSubmitValues = {...formSubmitValues, working_hours};
            }
            var finalValues: any = {};
            for(const property in formSubmitValues){
                if(!isEmpty(formSubmitValues[property])) {
                    console.log("send value",[property],":", formSubmitValues[property]);
                    finalValues = {...finalValues, [property]: formSubmitValues[property]};
                }
            }
            setKycFormValues(finalValues);
            if(!isEmpty(finalValues)){
                setSaveFlag(true);
                setConfirmation(true);
            }
        }
    };
    
    const onFinishFailed = (error: any) => {
        console.log("Failed:", error);
    };

    return (
        <div className="profile-page">
            <Header history={history} showActions isLoggedIn />
            <PageHeader
                onBack={() =>window.history.back()}
                title="My Profile"
                tags={
                    kycFlagDetails.map((list) => {
                    return (kycFlag === list.flag) ?
                        <Tag color={list.backgroundColor} style={{color: list.color, fontSize: "large", padding: "0.5em"}} >
                            {list.title} {(list.icon) ? <CheckCircleFilled />: null }
                        </Tag>:
                        <Tag style={{display: 'none'}}></Tag>
                    })
                }
            />
            <Divider className="margin-zero" />
            <Row style={{ paddingLeft: "3em"}}>
                <Col span={12} style={{ paddingTop: "2em" }}>
                    <Form
                        labelAlign='left'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 18 }}
                        scrollToFirstError
                        colon={false}
                        name="profile"
                        initialValues= {{loginState}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="profile_picture"
                            className="profile-picture"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[{ validator: (rule, value) => validateUpload(rule, value)}]}
                        >
                            { isEmpty(loginState.profile_picture) ?
                                <Upload
                                    accept="image/*"
                                    beforeUpload={(file) => {
                                        return false;
                                    }}
                                    name="picture"
                                    listType="picture-card"
                                    maxCount={1}
                                    onChange={uploadProfilePic}
                                >
                                    <Text>Upload Photo</Text>
                                </Upload>:
                                <>
                                    <Upload
                                        accept="image/*"
                                        beforeUpload={(file) => {
                                            return false;
                                        }}
                                        name="picture"
                                        listType="picture-card"
                                        maxCount={1}
                                        onChange={uploadProfilePic}
                                    >
                                        {showProfilePic? <img src={imageSrc}/>: null}
                                    </Upload>
                                    {showProfilePic? <Text className="change-profile-pic-text">Click on the Profile Picture to change</Text>: null}
                                </>
                            }
                        </Form.Item>
                        <div className={kycFlag === "incomplete" ? `add-details-text` : `display-none`}>
                            <Text>Add details of fields with <CaretRightFilled style={{ color: "#FF9900"}} /> to complete KYC</Text>
                        </div>
                        <Col span={20} className="kyc-form-elements">
                            <Form.Item
                                {...fieldLayout}
                                label={<span className="kyc-form-label">User Type</span>}
                                className="margin-zero"
                            >
                                : {userType}
                            </Form.Item>
                            <Form.Item
                                {...fieldLayout}
                                label={<span className="kyc-form-label">{userType} Type</span>}
                                className="margin-zero"
                            >
                                <Text style={{textTransform: "capitalize"}}>: {subType}</Text>
                            </Form.Item>
                            { !isEmpty(category) ?
                                <Form.Item
                                    {...fieldLayout}
                                    label={<span className="kyc-form-label">{userType} Category</span>}
                                    className="margin-zero"
                                >
                                    <Text style={{textTransform: "capitalize"}}>: {category}</Text>
                                </Form.Item> : null
                            }
                            <Form.Item
                                {...fieldLayout}
                                label={<span className="kyc-form-label">Name</span>}
                                className="margin-zero"
                            >
                                : {loginState.name}
                            </Form.Item>
                            <Form.Item
                                {...fieldLayout}
                                label={<span className="kyc-form-label">Phone Number</span>}
                                className="margin-zero"
                            >
                                : {loginState.phone_no}
                            </Form.Item>
                            <Form.Item
                                {...fieldLayout}
                                label={<span className="kyc-form-label">Email</span>}
                                className="margin-zero"
                            >
                                {changeEmail || isEmpty(loginState.email) ?
                                <>
                                    <Form.Item
                                        className="margin-zero float-left"
                                        name={(isEmpty(loginState.email) || changeEmail) ? "email" : undefined}
                                        rules={[{ validator: (rule, value) => emailValidator(rule, value)}]}
                                    >
                                        <Input
                                            className={ changeEmail ? `custom-input kyc-input-field width-85` : `custom-input kyc-input-field`}
                                            defaultValue={loginState.email}
                                            onChange={() => setDisableSave(false)}
                                            contentEditable
                                        />
                                    </Form.Item>
                                    {
                                        changeEmail &&
                                            <Button
                                                type="link"
                                                danger
                                                onClick={() => {setChangeEmail(false)}}
                                            >
                                                Cancel
                                            </Button>
                                    }
                                </> :
                                <Text>:&nbsp;{loginState.email}
                                    <Button type="link" className="email-change " onClick={() => setChangeEmail(true)}>Change</Button>
                                </Text>}
                            </Form.Item>
                            <DocumentsUploaded
                                config={configs}
                                kycFlag={kycFlag}
                                userDetails={loginState}
                                setDisableSave={setDisableSave}
                            />
                            <Form.Item
                                {...fieldLayout}
                                label={<span className="kyc-form-label">Address</span>}
                                className="margin-zero"
                            >
                                : {loginState.address1},
                                <br/>{loginState.address2},
                                <br/>{loginState.zip}
                            </Form.Item>
                            { userType === UserTypes.BUYER && <BuyerWorkingHours workingHours={working_hours} setDisableSave={setDisableSave} /> }
                            <div className="add-details-text add-bank-details">
                                <Title level={5} style={{ width: "fit-content", float: "left"}}>Bank Details</Title>
                                {
                                    addBankInfo ?
                                        <Button type="link" style={{marginLeft: "6em"}} onClick={() => setAddClicked(!isAddClicked)}>
                                            { isAddClicked ? <Text type='danger'>Cancel</Text>: <Text>Update</Text>}
                                        </Button>:
                                        <Button type="link" style={{marginLeft: "6em"}} onClick={() => setChangeClicked(!isChangeClicked)}>
                                            { isChangeClicked ? <Text type='danger'>Cancel</Text>: <Text>Change</Text>}
                                        </Button>
                                }
                            </div>
                            <BankDocuments
                                bankInfo={bank_info}
                                bank_doc={bank_doc}
                                userType={userType}
                                kycFlag={kycFlag}
                                isAddClicked={isAddClicked}
                                isChangedClicked={isChangeClicked}
                                setDisableSave={setDisableSave}
                            />
                        </Col>
                        <PrimaryBtn
                            disabled={disableSave}
                            htmlType="submit"
                            style={{ margin: "2em"}}
                            content="Save"
                        />
                        <CancelBtn onClick={() => {
                            setConfirmation(true);
                            setSaveFlag(false);
                            }}
                        />
                    </Form>
                </Col>
                {
                    kycFlag === "incomplete" &&
                        <Col>
                            <div className="kyc-required-doc-list">
                                <Title level={4}>Add following details to complete KYC</Title>
                                <ul>
                                        { requiredDocumentList.map((list) => {
                                            return (<>{
                                                list.userType === userType && list.subType === subType &&
                                                <li>{list.title}</li>    
                                            }</>)
                                        })}
                                </ul>
                            </div>
                        </Col>
                }
            </Row>
            <ConfirmationMessage
                showConfirmation={showConfirmation}
                setConfirmation={setConfirmation}
                response={loginState}
                isSave={isSave}
                disableSave={disableSave}
                onConfirm={isSave ? onSave: null }
            />
        </div>
    );
};

export default Profile;
