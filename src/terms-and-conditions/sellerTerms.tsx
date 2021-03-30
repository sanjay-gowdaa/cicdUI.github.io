import React from 'react';
import { Space, Typography } from 'antd';

import { contactUs } from '../constants';

import './termsAndConditions.scss';

const { Text, Title, Paragraph } = Typography;

const SellerTerms = () => {
    return (
        <div className="general-terms">
            <Title className="font-size-small" level={5}>Seller Terms</Title>
            <Title className="font-size-small" level={5}>1. Definitions</Title>
            <Paragraph>
                <ol className="upper-roman-list-style">
                    <Space direction="vertical">
                    <li>Account -̶ profile to be created by the Seller to have free access and use of the Platform</li>
                    <li>
                        Buyer(s) -̶ means purchaser or agent or wholesaler or retailer who wants to buy produce 
                        for reselling for consideration and registered on the Platform
                    </li>
                    <li>
                        Facilitation fees - would involve insurance, technology/back-end support, handling, charges 
                        towards development of software and maintenance, hardware, documentation, labour charges and 
                        stationery and miscellaneous charges
                    </li>
                    <li>
                        Request -̶ intention to request or requesting by the Buyer of (i) the product that he/she 
                        intends to purchase and / or (ii) the Service that he/she intends to be provided by the Seller/ 
                        Services Provider registered on the Platform
                    </li>
                    <li>
                        Services Provider(s) -̶ legal person(s) registered on the Platform to provide logistics and 
                        agricultural products transportation services to the Seller or the Buyer, at his/her(their) request
                    </li>
                    <li>Payment Service Provider -̶ <a href="https://www.cashfree.com/" target="_blank"><b>Cashfree</b></a>,
                        with registered office at <address>Cashfree Payments India Private Limited,
                        612/1, 4th Floor, 80 Feet Rd, Koramangala 4th Block,
                        Bengaluru, Karnataka - 560034, India.</address>
                    </li>
                    <li>
                        Platform -̶ an online platform developed by SamparkBindhu for the purchasing and selling of 
                        agricultural Products and logistics and agricultural Products transportation services, 
                        in a wide variety of formats, prices and locations
                    </li>
                    <li>
                        Product (s)– means crop or agricultural produce grown on agricultural land and is 
                        made available for selling for a consideration
                    </li>
                    <li>Service(s) -̶ logistics and agricultural Products transportation services</li>
                    <li>
                        Seller(s) -̶ means a farmer or agent or farmer self-help group or party who is in 
                        possession of produce and wishes to sell for a consideration and registered on the Platform
                    </li>
                    <li>
                        User(s) -  means a person(s) accessing the Platform for the purpose of availing services 
                        provided by the Platform
                    </li>
                    </Space>
                </ol>
            </Paragraph>
            <Title className="font-size-small" level={5}>2. Rights And License To Use</Title>
            <Paragraph>
                <ol className="lower-roman-list-style">
                    <Space direction="vertical">
                    <li>
                        Subject to acceptance by the Seller of these Terms and Conditions, SamparkBindhu offers 
                        the Seller a limited, non-exclusive, non-sublicensable, revocable and non-transferable license 
                        to: (a) commercial use; (b) access to the platform on his/her personal equipment, solely for the 
                        purpose of using the platform services; and (c) access to and use any content, information and 
                        related materials that may be made available through the services of the Platform. Any rights not 
                        expressly granted in these terms are reserved to SamparkBindhu
                    </li>
                    <li>
                        All rights on the Platform are and remain the property of SamparkBindhu or its licensors. Neither 
                        these Terms and Conditions, nor the use of the services of the Platform, gives the Seller any rights: 
                        (a) on or related to the services, except for the limited license granted above; or (b) to use or, 
                        in any way, to refer to the company names of SamparkBindhu, its affiliates or, where applicable, 
                        its licensors, its logos, product and service names, trademarks or other distinctive elements of 
                        SamparkBindhu ownership
                    </li>
                    <li>
                        The Seller is not authorized: (a) to remove any indication of intellectual property, including, 
                        without limitation, any trademark or other notices related to the intellectual property of any 
                        space of the services of the Platform; b) to reproduce, modify, perform derivative works, destroy, 
                        license, rent, sell, resell, transfer, display or publicly perform, transmit, reproduce, broadcast, 
                        or otherwise exploit the services of the Platform, except to the extent expressly permitted by 
                        SamparkBindhu; (c) to decompile, reverse engineer or disassemble the Platform, except to the extent 
                        permitted by applicable law; (d) to create links or frame any part of the Platform; (e) to create or 
                        launch any programs or scripts to capture, index, collect or otherwise extract data from any part of 
                        the Platform, or unduly overloading and / or preventing the operation and /or functionality of the Platform; 
                        or (f) to attempt to get unauthorized access to the Platform or impair any aspect of the Platform or its 
                        systems or networks
                    </li>
                    </Space>
                </ol>
            </Paragraph>
            <Title className="font-size-small" level={5}>3. Conditions Of Use And Operation Of The Platform</Title>
            <Text strong={true} underline={true}>Conditions for access of the platform</Text>
            <Paragraph>
                <ol className="upper-roman-list-style">
                    <Space direction="vertical">
                    <li>
                        To access the services of the Platform, in addition to the acceptance of these Terms and Conditions, 
                        it is necessary for the Seller to create an Account and register with the Platform either in the 
                        category of Business or Individual through OTP based verification which may or may not include Aadhar 
                        OTP based verification. Upon registration with the Platform, the Seller shall receive a unique ID.(“<b>Seller’s Code</b>”)
                    </li>
                    <li>The Seller must be at least 18 years of age to obtain an Account</li>
                    <li>
                        The process of creating an Account requires the Seller to fill in certain personal information such as 
                        for Business, the seller shall have to specify Business Type (Agent, Cold storage, processing), name, address, 
                        mobile phone number, email address, among others and for individual the Seller has to  specify name, address, 
                        mobile phone number, email address, among others and accept the terms and conditions
                    </li>
                    <li>
                        KYC data of the Seller shall be validated by SamparkBindhu back office, within a period of 
                        upto 5 working days. After this validation and approval, the Seller may use the Platform
                    </li>
                    <li>The Platform only allows one Account per Seller per location unless expressly provided otherwise</li>
                    <li>
                        The Seller guarantees the accuracy, completeness and timeliness of the information that he/she 
                        submits. If the information submitted proves to be false, incomplete or outdated, SamparkBindhu 
                        may disable the Seller's access to the Platform
                    </li>
                    <li>
                        The Seller is responsible for all activity in his/her Account and undertakes to always keep the 
                        security and confidentiality of his/her User name and password
                    </li>
                    <li>
                        The Seller undertakes to immediately notify SamparkBindhu if he/she becomes aware of an 
                        unauthorized use or any other breach of security relating to his/her Account
                    </li>
                    <li>
                        The Seller agrees that all activities that occur through his/her Account (including but not 
                        limited to posting any information about the Seller and / or the Product and / or the Service, 
                        clicking to accept any additional terms or rules, subscribing or making any payment for any 
                        service, etc., among others shall be considered as authorized by the Seller
                    </li>
                    <li>
                        With the creation of the Account, the Seller is entitled to access the network provided by 
                        the Platform, according to these Terms and Conditions
                    </li>
                    <li>
                        The Seller undertakes to keep his/her  Account (Bank, KYC)  updated at all times and shall 
                        immediately notify SamparkBindhu operations team in the event any error found in the data of 
                        the Seller and request to update the same by providing the relevant supporting document to 
                        SamparkBindhu operations team. Further at no point of time SamparkBindhu shall be liable for 
                        any false, incomplete or outdated information provided by the Seller in the Account
                    </li>
                    </Space>
                </ol>
            </Paragraph>
            <Text strong={true} underline={true}>Platform</Text>
            <Paragraph>
                <ol className="lower-roman-list-style">
                    <Space direction="vertical">
                    <li>
                        The Platform allows: (a) the placement of information regarding the sale of the Products and / 
                        or provision of Services; (b) to make orders for purchase of Products and / or provision of 
                        Services to the Seller and / or Services Providers; and (c) intermediation by Platform of any 
                        payments to be made by the Buyer to the Seller and / or Services Providers, against the payment 
                        of Facilitation Fees to SamparkBindhu. This Facilitation Fees shall be paid to SamparkBindhu by 
                        the Buyer and/or  the Seller as the case maybe
                    </li>
                    <li>
                        Through the Platform, the Seller may (a) place any information on the selling of agricultural 
                        Products by uploading the details of the Products (Crop category, Crop Sub type, Crop grade, 
                        Quantity Price per quintal, Upload photos Quality, Terms & condition) and (b) release on the 
                        Platform this intention to sell agricultural Products or send invitation to Buyers to purchase 
                        the agriculture Product, which shall include Seller’s Code
                    </li>
                    <li>
                        In turn, the Buyer may: (a) launch in the Platform his/her intention to request the purchase 
                        of agricultural Products through a purchase order (“Purchase Order”) which shall include the 
                        Buyer’s Code. To this end, the Buyer shall indicate in the Platform any data requested, namely 
                        the product that he/she intends to purchase, the price, location and intended date for delivery 
                        and  provision of the Service
                    </li>
                    <li>
                        Based on the request of the Buyer, the Platform shall match a prospective Seller from the pool 
                        of Sellers registered on the Platform with the Buyer as per the request of the Buyer. The intention 
                        of the Seller or Buyer to request, respectively, the sale or purchase of agricultural Products 
                        and the provision of Services set forth in paragraph ii (b) and iii (a) shall be valid for the 
                        period indicated upon the launch of intention to sell / purchase or until such time that the sale 
                        and provision of Services takes place or the Seller or Buyer withdraw their intent to sell or 
                        request by notifying SamparkBindhu in writing and subject to the approval of SamparkBindhu
                    </li>
                    <li>
                        In the case referred to in the preceding paragraph, the Seller  and the Buyer interested in the 
                        sale or purchase and provision of Services shall respond to the request of the Seller or the Buyer, 
                        and the provisions of paragraphs vii and viii, below, shall apply
                    </li>
                    <li>
                        In the event that the Buyer places the request referred to in paragraph iii (a) purchase of 
                        agricultural product through the Purchase Order, the Seller shall confirm, within 72 hours, 
                        the receipt of the Purchase Order and inform the Buyer of the estimated time for delivery, and 
                        the estimated time for the beginning of the provision of the Service
                    </li>
                    <li>
                        Upon receipt of the confirmation and the estimated time for delivery of the Product and the 
                        beginning of the provision of the Services, the Buyer decides whether to accept the order and 
                        the service under the proposed conditions; in which case the Buyer shall select the option to 
                        proceed with the payment in the Platform
                    </li>
                    <li>
                        The Seller shall receive the information of the acceptance of the order of the product and the 
                        service in the conditions presented, thus initiating the conclusion of the process
                    </li>
                    <li>
                        Subject to clause (iv) above, in the event, the Seller withdraw his/her intent to sell, the Seller 
                        shall go back to the pool and other potential buyer (old n new) will be matched with the Seller
                    </li>
                    </Space>
                </ol>
            </Paragraph>
            <Text strong={true} underline={true}>Conditions for publication of information on the Products and Services</Text>
            <Paragraph>
                <ol className="upper-roman-list-style">
                    <Space direction="vertical">
                    <li>The Seller agrees to comply with the rules of SamparkBindhu on the publication of information and sales practices</li>
                    <li>The Seller is responsible for the truthfulness, accuracy and content of the information of the Products provided</li>
                    <li>The Seller undertakes to only sell and provide services that are lawful and in accordance with the law in force</li>
                    <li>
                        The Seller Product may not be published on the Platform immediately upon its submission by 
                        the Seller and may take up to 5 working days  to be available on the Platform subject to inspection 
                        and approval by the SamparkBindhu operations team of the listed Products
                    </li>
                    <li>
                        SamparkBindhu does not undertake to create a market where Seller find what 
                        they are looking for, therefore the appearance or placement in the search and 
                        browsing results list shall depend on a variety of factors, including, but not limited to
                        <ul>
                            <li>Location of the Buyer, search query, navigation website and history</li>
                            <li>
                                Location of the content format, price, terms of service, 
                                history and relevance to Buyer content
                            </li>
                            <li>History of the Buyer</li>
                        </ul>
                        </li>
                    <li>
                        The Seller agrees not to submit any content that is defamatory, libellous, violent, 
                        obscene, illegal, or in any way offensive, whether or not this material is protected by law
                    </li>
                    <li>
                        SamparkBindhu reserves the right (but shall have no obligation) to decide 
                        whether the contents meet the requirements of these Terms and Conditions 
                        and may at any time and without notice remove such content and / or terminate 
                        a Seller’s access to the Platform for providing content that violates these Terms and Conditions
                    </li>
                    </Space>
                </ol>
            </Paragraph>
            <Text strong={true} underline={true}>Conditions for Selling</Text>
            <Paragraph>
                <ol className="lower-roman-list-style">
                    <Space direction="vertical">
                    <li>
                        The Seller agree that he shall be responsible for reading any information on 
                        the Product requested by the Buyer before accepting the sale of Product and service provision
                    </li>
                    <li>
                        The Seller acknowledge that when placing and accepting an order for a Product 
                        from the Buyer, the Buyer and the Seller are entering into a legally binding 
                        purchase agreement (“<b>Purchase Agreement</b>”)
                    </li>
                    <li>
                        Subject to clause (ii) above, the Seller and the Buyer shall electronically 
                        execute the Purchase Agreement within 24 hours period. In the event, the Seller 
                        and the Buyer fails to execute the Purchase Agreement within 24 hours period the 
                        Purchase Agreement shall lapse and the Seller and the Buyer shall go back to the 
                        pool and other potential buyer or seller (old n new) will be matched 
                        with the Seller and the Buyer respectively
                    </li>
                    </Space>
                </ol>
            </Paragraph>
            <Text strong={true} underline={true}>Facilitation Fees</Text>
            <Paragraph>
                The Seller may be charged to pay Facilitation Fees. This amount shall be added to 
                the price applicable for selling the agricultural products and for provision of Services, 
                the amount due to SamparkBindhu shall be deducted from the price indicated to the Seller for this purpose    
            </Paragraph>
            <Text strong={true} underline={true}>Transportation Fees</Text>
            <Paragraph>
                The Seller may be charged for the Services provided by the Service Provider ("<b>Transportation Fees</b>"). This amount 
                shall be added to the price applicable for selling the agricultural products and for provision of Services, 
                the amount due to SamparkBindhu shall be deducted from the price indicated to the Seller for this purpose
            </Paragraph>
            <Text strong={true} underline={true}>Payment method for the Products and Services to the Seller</Text>
            <Paragraph>
                <ol className="upper-roman-list-style">
                    <Space direction="vertical">
                    <li>
                        Payment to be done online using SamparkBindhu secured payment gateway. 
                        Any fees received by the payment gateway service provider to be borne 
                        by the payee. All transaction to be done on cash and carry basis
                    </li>
                    <li>
                        SamparkBindhu shall maintain a nodal account (“<b>Nodal Account</b>”) 
                        and the Payment Services Provider shall be responsible for transferring 
                        the money into Nodal Account on behalf of the Seller or the Buyer. All 
                        disbursement shall be controlled by SamparkBindhu and shall be made by 
                        SamparkBindhu to the Sellers and Buyers account. The price of the Products 
                        and services charged to the Buyer shall be transferred to the Nodal Account 
                        and thereafter the same shall be disbursed by SamparkBindhu  to the bank account 
                        of the Seller subject to the terms of this Terms and Conditions. This process shall 
                        be repeated for all payments that may be made as a result of the payment terms agreed upon
                    </li>
                    <li>
                        Upon acceptance of purchase order of the Buyer  by the Seller, invoice 
                        regarding the Price of Products due to the Seller shall be issued and 
                        sent to the Buyer by SamparkBindhu on behalf of the Seller
                    </li>
                    <li>
                        The Payments made to the Seller shall be in phases, wherein the Seller 
                        shall receive the first 10% of the price due to the Seller, when the Seller 
                        and the Buyer have accepted each other intent and request to sell and purchase 
                        the Product. Upon Buyer being in receipt of information from the Seller that the 
                        Product picked up delivery, the Seller shall receive an additional 70% of the price 
                        due to Seller or such amount after deduction of fees for provision of Services. 
                        Subsequent to buyer receiving the delivery of the Products, the Seller shall receive 
                        the balance 20% of the price due to the Seller
                    </li>
                    <li>
                        Notwithstanding the listed percentages above, the administrator of 
                        the Platform shall have the discretion to change the percentages 
                        mentioned in clause (iv) above from time to time and notify the same 
                        to the Seller through the Platform
                    </li>
                    <li>
                        Notwithstanding anything to the contrary, the Seller agrees that 
                        receipt of payments pursuant to clause (iv) above is conditioned 
                        upon Seller’s compliance with all the milestones set out in clause 
                        (iv). Seller further agrees that in the event of Seller’s failure to 
                        comply with any of the milestones set out in clause (iv), SamparkBindhu 
                        shall be entitled to discontinue further payments and suspend the Account 
                        of the Seller for a period of 3 months or for such longer period as 
                        decided by SamparkBindhu, and Seller shall be required to pay back to 
                        SamparkBindhu within a period of 15 days, any payments received pursuant 
                        clause (iv); provided, further, and without limiting the preceding, 
                        SamparkBindhu shall have the right to adjust the payment s received by 
                        the Seller pursuant to clause (iv) against any future transaction done by the 
                        Seller. The foregoing shall be in addition to any other remedies or rights 
                        that SamparkBindhu may have at law or at equity as a result of the Seller’s 
                        failure to comply with clause (iv) above
                    </li>
                    <li>
                        For the services provided by SamparkBindhu through Platform, 
                        SamparkBindhu shall raise a maximum of  3 invoices for the Seller, 
                        i.e., Bill of Sale and Facilitation Invoice and/or Transportation 
                        invoice and 3 invoices for the Buyer, i.e., Bill of Purchase, 
                        Transportation invoice and Facilitation invoice. These invoices would 
                        be electronically delivered for maintaining records and easy movement of material
                    </li>
                    <li>
                        SamparkBindhu reserves the right to split the cost of Transportation 
                        and Facilitation Fees between seller and buyer in the ratio as deemed fit. 
                        The split ratio could be changed without any prior information or notice
                    </li>
                    </Space>
                </ol>
            </Paragraph>
            <Title className="font-size-small" level={5}>4. Seller's Obligations</Title>
            <Paragraph>
                <ol className="lower-roman-list-style">
                    <Space direction="vertical">
                    <li>
                        The Seller undertakes not to directly contract or make any direct payments 
                        to other Seller of the SamparkBindhu network, with whom he/she has had contacts 
                        through this network, other than through the Platform
                    </li>
                    <li>
                        The Seller further undertakes not to create, copy, reproduce, modify or use 
                        in any way any content of the Platform, and not to use works and requests that 
                        have been made known to him/her by this means directly with the Seller
                    </li>
                    <li>
                        The Seller agrees not to use services for purposes other than those for which 
                        they are intended, namely illicit purposes
                    </li>
                    <li>
                        The Seller undertakes not to send to third parties or otherwise disclose any 
                        request existing on the Platform or to distribute or publicly display any content 
                        of the Platform without prior and express permission of SamparkBindhu
                    </li>
                    <li>
                        The content published by the Seller on the Platform is owned by the Seller. 
                        However, the Seller assigns to SamparkBindhu, to the extent permitted by law, 
                        a free and perpetual license to use, copy, modify, create derivative works, 
                        distribute, perform in any way, or otherwise exploit the content in all formats 
                        and distribution channels, without the need for any prior notice or consent of the 
                        Seller and without there being any compensation to this effect
                    </li>
                    <li>
                        The Seller further declares that: (a) the activities pursued through the Platform 
                        comply with the applicable rules, regulations and legislation in force; (b) he/she 
                        carries out commercial transactions with other Seller in good faith; (c) he/she 
                        complies with the agreements concluded through the Platform and in the terms indicated 
                        therein; (d) he/she shall not impersonate any other person or entity or misrepresenting 
                        his/her relationship with any other entity
                    </li>
                    <li>
                        Upon knowledge of any violation or potential violation of these Terms and Conditions, 
                        SamparkBindhu reserves the right (but shall have no obligation) to decide whether the 
                        Seller meets the requirements of these Terms and Conditions and may, at any time and 
                        without prior notice, terminate any Seller’s access to the Platform
                    </li>
                    <li>
                        The Seller undertakes to respect the personal data submitted on the Platform and further 
                        undertakes not to proceed to its disclosure, publication or interception
                    </li>
                    <li>
                        The Seller is responsible for obtaining the necessary access to the data network in order to 
                        use the services provided by the Platform. The normal fees and data charges as maybe applicable 
                        to the Seller, should the Seller access to or use the Platform from a wireless device, and the 
                        Seller is responsible for paying such fees and charges. The Platform services may be subject to 
                        failures and / or delays inherent to the use of the Internet and electronic communications. 
                        SamparkBindhu does not guarantee the operation of the Platform or that the Platform services or 
                        any part thereof will work on a particular equipment or device
                    </li>
                    <li>
                        <b>Quality Assessment</b>: upon acceptance of the Purchase Order of the Buyer by the Seller, 
                        the Seller shall be responsible for providing 2 sample of the Products to SamparkBindhu operations 
                        teams. SamparkBindhu operations team shall conduct a quality control check of the Products at the 
                        time of unloading at the facility of the Buyer along with the QC team of the Buyer and subject to 
                        satisfaction of the QC team of the Buyer, SamparkBindhu operations team and the QC team of the Buyer 
                        shall jointly sign the quality assessment report, and accordingly the remaining balance shall made to the Seller
                    </li>
                    </Space>
                </ol>
            </Paragraph>
            <Title className="font-size-small" level={5}>5. SamparkBindhu Liability And Limitation Of Liability</Title>
            <Paragraph>
                <ol className="upper-roman-list-style">
                    <Space direction="vertical">
                    <li>SamparkBindhu guarantees that it is in a legitimate and legal position to market and provide the Platform</li>
                    <li>
                        There is no relationship between SamparkBindhu, the Buyer, and the Seller other 
                        than the availability of the Platform, as provided in these Terms and Conditions. 
                        The Buyer acknowledges that the purchase and sale of Products and the Services 
                        provided or rendered by the Seller, which act on their own account and responsibility, 
                        and that SamparkBindhu is not, in any way, part the contractual relationship established 
                        between the Buyer, and the Seller
                    </li>
                    <li>
                        SamparkBindhu is not responsible for the execution of the agreement between Buyer 
                        and the Seller, for the proper performance of the agreement signed between them, 
                        for the fulfilment of any conditions agreed between the Buyer and the Seller or 
                        for the quality, suitability, safety and competence of the Product purchased from the Seller
                    </li>
                    <li>
                        Similarly, SamparkBindhu shall not be liable before the Seller and/or Buyer 
                        and / or any third party for any direct or indirect damages, warranties, lost 
                        profits or any damages that may result from the contractual relationship between 
                        the Buyer, and the Seller. The Seller accepts all risk arising from any Product and Services request
                    </li>
                    <li>
                        SamparkBindhu and the Seller have a relationship of total technical-operational 
                        independence without obligations of exclusivity or economic dependence, and do not 
                        have a subordinate relationship with each other or any employment relationship, 
                        partnership, association, trust or any other type of relationship of a similar 
                        nature. The supply and the provision of the services are performed with full 
                        autonomy and independence by the Seller
                    </li>
                    <li>
                        In order to meet the Buyer’s trust and expectation, SamparkBindhu 
                        verifies whether the Seller comply with the quality standards of 
                        SamparkBindhu to sell the Products and provide the services made 
                        available on the Platform. SamparkBindhu also ensures the binding 
                        of the Seller registered in the Platform network to the obligation 
                        to supply the Products and to perform the services with the greatest 
                        accuracy, fairness, and diligence
                    </li>
                    <li>
                        Notwithstanding the foregoing, SamparkBindhu is not responsible 
                        for, nor does it guarantee, the fulfilment of any requirements or 
                        conditions necessary for the provision of the services by the Seller 
                        or for the sale of Products by the Seller, namely, (a) compliance with 
                        the technical requirements required by law; (b) the existence of consent 
                        by all governing, regulatory and inspection bodies for the execution of 
                        the orders and services requested; (c) experience, knowledge and technical 
                        ability for the sale of Products and provision of the services requested; 
                        (d) existence of civil liability insurance or other
                    </li>
                    <li>
                        SamparkBindhu is not responsible in any way for: (a) any type of 
                        dispute, default or damage arising from the contractual relationship 
                        between the Buyer and the Seller through the use of Platform; (b) any 
                        damage caused to third parties as a result of the supply of the Products 
                        by the Seller; (c) any damage, injury or loss arising from the use or 
                        trust created in the services provided by SamparkBindhu, including any 
                        failures or interruptions in the functioning of the Platform and the 
                        inability to access the Platform; (d) any damage that may result from a 
                        malfunction of the Platform, either by computer failure, viruses, Trojan 
                        horses, worms or something causing interference in the system
                    </li>
                    <li>
                        The information available on the Platform concerning the Products, 
                        the Seller, the Buyer and the Services, SamparkBindhu assumes no 
                        responsibility for any error, omission, inaccuracy or falsity of the 
                        information transmitted by the Seller and Buyer. SamparkBindhu is in 
                        no way responsible for the information contained on the Platform
                    </li>
                    <li>
                        The Platform may be made available or accessible within the scope 
                        of a third-party service and content outside the control of SamparkBindhu. 
                        The Seller acknowledges that the use of a third-party services and content 
                        may be subject to their terms of use and privacy policies. SamparkBindhu 
                        provides no warranty and is not responsible for such third-party services 
                        and content. Additionally, any use of the Platform by third-party beneficiaries 
                        does not create any relationship between the Buyer/Seller and SamparkBindhu or 
                        between Buyer and Seller. Access to the SamparkBindhu services, by the Seller, 
                        through a third-party equipment, services and / or content is subject to the 
                        conditions stipulated in the terms and conditions applicable to the service of the third-party.
                    </li>
                    <li>
                        Unless intimated by the Seller, SamparkBindhu shall not be responsible 
                        updating KYC and Account details of the Seller and the Seller shall be 
                        solely liable for any false, incomplete or outdated information
                    </li>
                    </Space>
                </ol>
            </Paragraph>
            <Title className="font-size-small" level={5}>6. Cancellation Of Transaction</Title>
            <Paragraph>
                <ol className="lower-roman-list-style">
                    <Space direction="vertical">
                    <li>
                        SamparkBindhu reserves the right to administrate any cancellations 
                        that may arise during the course of the deal between the Seller and the Buyer
                    </li>
                    <li>
                        Once the 10% advance amount is credited to Seller account, under 
                        no circumstances can the Seller refuse to sell or withdraw from 
                        the deal. In the event of insisting of cancellation, the Seller 
                        shall be liable to pay the whole advance along with 10% penalty to the 
                        Buyer to cover the loss of time and effort that the Buyer has taken to 
                        formalise the deal and 10% to SamparkBindhu towards Facilitation Fees
                    </li>
                    </Space>
                </ol>
            </Paragraph>
            <Title className="font-size-small" level={5}>7. Return And Refund Policy</Title>
            <Paragraph>
                <ol className="upper-roman-list-style">
                    <Space direction="vertical">
                    <li>
                        If the Produce at the time of delivery does not meet the approved sample, 
                        the Buyer shall have the right to reject the complete lot subject to 
                        detailed investigation by SamparkBindhu Field Officers. However, the 
                        Buyer shall not be require to make remaining payment first to complete 
                        the delivery. On approval from SamparkBindhu team, the Product, if 
                        rejected shall be sent back to the Seller and the provision of Services 
                        expenses would be borne by the Seller. Amount paid by the Buyer towards 
                        the purchase shall be refunded within 3 working days along with 20% penalty 
                        amount to the Seller. SamparkBindhu would facilitate such transaction 
                        for speedy recovery and resolution
                    </li>
                    <li>
                        SamparkBindhu does not take the responsibility of the QC check at the 
                        time of dispatch or delivery. It shall be the responsibility of the Seller 
                        and the Buyer to do so at the time of dispatch and delivery respectively
                    </li>
                    </Space>
                </ol>
            </Paragraph>
            <Title className="font-size-small" level={5}>8. Software Updates/Upgradation</Title>
            <Paragraph>
                <ol className="lower-roman-list-style">
                    <Space direction="vertical">
                    <li>
                        SamparkBindhu reserves the right to continuously update/upgrade the software for better 
                        service delivery during the course of the business and does not need to take consent of the Seller
                    </li>
                    <li>
                        Updated version once released, would be notified to the Seller for downloading through 
                        Google Store for enhanced features and better experience
                    </li>
                    </Space>
                </ol>
            </Paragraph>
            <Title className="font-size-small" level={5}>9. User Data Privacy And Collection Of Personal Information</Title>
            <Paragraph>
                <ol className="upper-roman-list-style">
                    <Space direction="vertical">
                    <li>
                        The personal information / data including but not limited to the Information provided by 
                        the User to the Platform shall be treated as strictly confidential and retained in 
                        accordance with the Privacy Policy which is incorporated herein by reference and 
                        applicable laws and regulations including but not limited to Information Technology 
                        Act, 2000 and rules there under
                    </li>
                    <li>
                        By using the Platform and/or by providing information, User consent to the collection 
                        and use of such information disclosed by the User on the Platform by SamparkBindhu 
                        and as per the terms of the Privacy Policy. The usage of information provided by User 
                        shall be for the following purposes:
                        <ol className="lower-alpha-list-style">
                            <li>Provide User with information that may be requested by User from time to time</li>
                            <li>Provide information regarding managing User account </li>
                            <li>
                                Contact User to ensure that the information SamparkBindhu have in their records is 
                                accurate or when in need of additional information to complete User profile
                            </li>
                            <li>
                                Contact User to ensure that the information SamparkBindhu have in 
                                their records is accurate or when in need of additional information to complete User profile
                            </li>
                            <li>Prevent activity SamparkBindhu determine to be potentially illegal</li>
                        </ol>
                    </li>
                    <li>
                        SamparkBindhu protects User’s information in the following manner:<br/>
                        SamparkBindhu undertakes the following steps to protect User data:
                        <ol className="lower-alpha-list-style">
                            <li>
                                Personal data such as Mobile number, PAN card, Aadhar Card, GST No., 
                                agriculture produce details, land ownership details, etc collected during 
                                the course of business shall be safely stored in SamparkBindhu Cloud and 
                                shall be used for the purpose of business transactions only shall be further 
                                protected, secured and encrypted in compliance with the reasonable security 
                                practices and procedures. The server of SamparkBindhu is hosted in Asia and 
                                all the data is safely backed-up automatically on SamparkBindhu Cloud for retrieving and use
                            </li>
                            <li>
                                The security procedures, practices and other security protocols are regularly 
                                audited and updated to comply with industry best practices
                            </li>
                            <li>Any information provided by the User shall not be published or made available in the public domain</li>
                            <li>
                                The relevant data User provide shall be stored only for the period of 
                                time it is essential to provide the Platform services. Data may be stored 
                                for a longer period of time in the event of an investigation or otherwise 
                                mandated by any Government agency
                            </li>
                            <li>
                                Any data and information shall not be provided to any third party 
                                except for the processes required to give effect to the services and 
                                to improve or expand upon the services provided, subject to the Platform 
                                terms and conditions. Data shall only be shared with a third party for 
                                background services including but not limited to, Aadhar verification, 
                                storage, processing, encryption etc
                            </li>
                        </ol>
                    </li>
                    <li>
                        SamparkBindhu does not sell or rent or otherwise disclose Users personal 
                        information to third parties for their marketing purposes without User explicit 
                        consent and SamparkBindhu reserves the right to use the personal data for pushing 
                        any promotional messages or information related to agriculture produce, prices, 
                        weather forecasts, fertilizers or any other information related to agriculture 
                        that would be of use to the User from time to time. The User shall have the right 
                        to forward such messages to third party as the User may deem fit
                    </li>
                    <li>
                        The Platform, support or services employs applications and tools to 
                        collect user’s information, materials etc. (which may include identifiable, 
                        sensitive or non –public information or other information). By entering into 
                        this Agreement, or using Platform, User agrees to this Privacy Policy and 
                        to the collection, processing, copying, and backup, storage, transfer and 
                        use of this Data by SamparkBindhu. This Privacy Policy is in furtherance of 
                        the Privacy Policy displayed on the website for its use
                    </li>
                    <li>
                        Platform also uses tools and applications to detect, censor and filter 
                        unlawful content. In the event of detection of such content, Platform 
                        reserves the right to suspend users accounts, services and terminate any agreements in force
                    </li>
                    <li>
                        Any change in personal data of the User shall be notified to field 
                        officers for updating the same on the SamparkBindhu system
                    </li>
                    <li>
                        Data provided by the User shall to be thoroughly checked by the User 
                        and the sole responsibility of the correctness rests with the User. 
                        Any error found in the data of the User shall be immediately brought to 
                        the notice of field officers and/or admin for making change by providing 
                        the relevant supporting document
                    </li>
                    <li>
                        The Invoices issued shall not include any personal information of the Users 
                        except the name and location of the User and the payment details. However, the 
                        transportation invoice shall include the designated address of the Buyer for the 
                        purpose of delivery of the Products at the designated locality of the Buyer
                    </li>
                    <li>SamparkBindhu/Platform shall not be held accountable for any incorrect data provided by the Users</li>
                    </Space>
                </ol>
            </Paragraph>
            <Title className="font-size-small" level={5}>10. Suspension And Cancellation Of The Account</Title>
            <Paragraph>
                SamparkBindhu reserves the right to suspend for any period of time it will define, 
                to cancel, at its discretion and whenever it deems necessary, to the extent permitted by law, 
                the account of the Seller who violates or, regarding whom there is suspicion of violation, 
                present or future, of any of the obligations under these Terms and Conditions and / or the law, 
                namely in case of false information to be provided by the Seller.
            </Paragraph>
            <Title className="font-size-small" level={5}>11. Final Provisions</Title>
            <Paragraph>
                <ol className="lower-roman-list-style">
                    <Space direction="vertical">
                    <li>
                        The Seller may not assign or transfer these Terms and Conditions, in whole or in part, 
                        without the prior written consent of SamparkBindhu
                    </li>
                    <li>
                        The Seller authorizes SamparkBindhu to assign or transfer these Terms and Conditions, in whole or in 
                        part, to: (i) a subsidiary or affiliate; (ii) an acquirer of SamparkBindhu’s capital or assets; or 
                        (iii) any successor
                    </li>
                    <li>
                        These Terms and Conditions do not determine the existence of any vertical relationship, partnership, 
                        work or agency relationship between the Seller, SamparkBindhu and any third party
                    </li>
                    <li>
                        If any provision of these Terms and Conditions is found to be unlawful, invalid or unenforceable, 
                        in whole or in part, under any law, such provision or part thereof shall to this extent be understood 
                        as not forming part of these Terms and Conditions, and the legality, validity and enforceability of the 
                        remaining provisions shall not be affected. In this case, the part of the illegal, invalid or unenforceable 
                        provision shall be replaced by a (part of a) provision that is legal, valid and enforceable and that has, to 
                        the greatest extent possible, a similar effect to the provision or its illegal, invalid or unenforceable part, 
                        taking into account the contents and purpose of these Terms and Conditions
                    </li>
                    <li>
                        These Terms and Conditions contain the entire agreement between SamparkBindhu and the Seller. 
                        SamparkBindhu reserves the right to, at any time, alter these Terms and Conditions in any way. 
                        Whenever changes are made to the applicable Terms and Conditions, Seller shall be presented, when 
                        accessing the Platform, a notice informing them of such fact and a request for acceptance of the new 
                        Terms and Conditions. Without this acceptance, Seller shall not be able to continue to access and 
                        use the Platform. Any notices of modification of these Terms and Conditions shall also be published 
                        on the website: <a href="https://vikasbandhu.in" target="_blank">
                            https://vikasbandhu.in</a>. Changes made to the Terms and Conditions shall not be retroactive and shall not 
                        take effect within a period of less than fourteen (14) days after their publication. Changes to the 
                        Terms and Conditions that result from (i) modifications or new features of the Platform, or 
                        (ii) legal impositions, which shall produce immediate effects, are excepted
                    </li>
                    </Space>
                </ol>
            </Paragraph>
            <Title className="font-size-small" level={5}>12. Arbitration</Title>
            <Paragraph>
                <ol className="upper-roman-list-style">
                    <Space direction="vertical">
                    <li>
                        Any dispute that arises during course of business that couldn’t be solved mutually can be brought 
                        to the notice of the courts in Bangalore for effective redressal
                    </li>
                    <li>
                        Expenses related to court, hiring of lawyers, legal proceedings, etc need to be paid by the Seller and 
                        SamparkBindhu shall not be held liable for any compensation thereof unless directed by Honourable Courts
                    </li>
                    </Space>
                </ol>
            </Paragraph>
            <Title className="font-size-small" level={5}>13. Contacts</Title>
            <Space direction="vertical">
                <Text>Web page: <a href="https://vikasbandhu.in" target="_blank">https://vikasbandhu.in</a> </Text>
                <Text>Email: {contactUs.emailId} </Text>
                <Text>Tel.: {contactUs.phoneNumber}</Text>
            </Space>
        </div>
    );
};

export default SellerTerms;
