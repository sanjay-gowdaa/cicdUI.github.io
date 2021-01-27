import React from 'react';
import { Table, Typography } from 'antd';

import Header from '../header';
import Footer from '../footer';
import { columns, data } from './utils';

import './purchaseAgreement.scss';

const { Paragraph, Text, Title } = Typography;

export const PurchaseAgreement = () => {
    const date = new Date().toLocaleDateString();
    const day = new Date().getDay();

    return (
        <>
            <Header showActions={false} />
            <div className="purchase-agreement">
                <Title level={2} underline>AGREEMENT FOR PURCHASE</Title>
                <Text className="float-right">Agreement no: </Text>
                <Text>
                    <b>THIS Agreement for Purchase</b>("<b>Purchase Agreement</b>")
                    made on {day} day of {date} ("<b>Execution Date</b>")by:
                </Text>
                <Table bordered columns={columns} dataSource={data} />
                <Text>
                    (The Seller and the Buyer are hereinafter collectively 
                    referred to as the “<b>Parties</b>” and individually as a “<b>Party</b>”.)
                </Text>
                <Title level={5}>WHEREAS</Title>
                <Paragraph>
                    <ol>
                        <li>
                            The Buyer has agreed to purchase agricultural produce more fully described in 
                            purchase order through an online platform developed by SamparkBindhu for 
                            purchasing and selling of agricultural produce (“<b>Platform</b>”) vide 
                            Purchase Order dated {date} (“<b>Purchase Order</b>”) as set out in Schedule 
                            I of the Agreement from the Seller.
                        </li>
                    </ol>
                    <Text strong>NOW THEREFORE</Text>, in consideration of the mutual covenants and 
                    promises contained herein and other good and valuable consideration the adequacy 
                    of which is hereby acknowledged, it is hereby agreed by and between the Parties 
                    hereto and this Agreement witnesseth as under:
                </Paragraph>
                <Title level={5}>1. DEFINITIONS</Title>
                <Paragraph>
                    <ol>
                        <li>
                            <b>Buyer(s)</b> - means purchaser or agent or wholesaler or retailer who 
                            wants to buy produce for reselling for consideration and registered on 
                            the Platform
                        </li>
                        <li>
                            <b>Services Provider(s)</b> - legal person(s) registered on the Platform 
                            to provide logistics and agricultural products transportation services to 
                            the Seller or the Buyer, at his/her(their) request
                        </li>
                        <li>
                            <b>Platform</b> - an online platform developed by SamparkBindhu for the 
                            purchasing and selling of agricultural Products and providing quality / 
                            quality certification services and logistics and agricultural Products 
                            transportation services, in a wide variety of formats, prices and locations
                        </li>
                        <li>
                            <b>Product (s)</b> – means crop or agriculture produce grown on 
                            agricultural land and is made available for selling for a consideration
                        </li>
                        <li>
                            <b>Seller(s)</b> - means a farmer or agent or party who is in possession 
                            of produce and wishes to sell for a consideration and registered on the 
                            Platform
                        </li>
                    </ol>
                </Paragraph>
                <Title level={5}>2.PURCHASE OF PRODUCTS</Title>
                <Paragraph>
                    Upon acceptance of request of the Seller by the Buyer to purchase the Products, 
                    the Seller shall sell and deliver to the Buyer and the Buyer shall purchase 
                    from the Seller all the Products as set forth in the Purchase Order more fully 
                    described in Schedule I of this Agreement.
                </Paragraph>
                <Title level={5}>3. PAYMENT SCHEDULE</Title>
                <Paragraph>
                    The payment for the Products ordered hereby shall be the price stated in the 
                    accompanying Purchase Order and as per the payment schedule mentioned in the 
                    Purchase Order. Price is inclusive of applicable taxes, freight, all packaging 
                    and handling, and transportation unless explicitly indicated on the face of the 
                    Purchase Order or agreed to in writing by the Buyer and the Seller
                </Paragraph>
                <Title level={5}>4. DELIVERY</Title>
                <Paragraph>
                    The delivery of the Product shall be at the designated locality of the Buyer as 
                    set out in the Purchase Order unless otherwise agreed between the Parties in 
                    writing. However, the transportation invoice shall include the designated address 
                    of the Buyer for the purpose of delivery of the Products at the designated locality 
                    of the Buyer. The Delivery of the Product shall be as per the delivery schedule 
                    set out in the Purchase Order.  Further, the cost for delivery of the products 
                    shall be borne by [∙].
                </Paragraph>
                <Title level={5}>5. SELLER’s OBLIGATIONS</Title>
                <Paragraph>
                    <ol>
                        <li>The Seller shall sell Products as per the terms of the Purchase Order</li>
                        <li>
                            It is understood between the Parties that, the Seller shall be responsible 
                            for quantity, quality, packing marking and/or other arrangements of the 
                            Products to be delivered to the Buyer
                        </li>
                        <li>
                            The Seller shall be responsible for loading and handling of the Product for 
                            the purpose of transportation of the Products to the Buyer
                        </li>
                        <li>
                            The Seller shall be responsible for any and all the loss suffered by it 
                            till the time the Products order through the Purchase Order is in the 
                            possession of the Seller or is during the transits.
                        </li>
                    </ol>
                </Paragraph>
                <Title level={5}>6. BUYER’s OBLIGATION</Title>
                <Paragraph>
                    <ol>
                        <li>
                            The Buyer shall make timely payments of the invoice raised against the 
                            said Purchase Order
                        </li>
                        <li>
                            The Buyer shall be responsible for unloading and handling of the Product 
                            upon Product reaching the facility/ the designated address of the Buyer as 
                            per the Purchase Order
                        </li>
                        <li>
                            The Buyer shall be responsible for any and all the loss suffered by it once 
                            the Product has reached the facility/ the designated locality of the Buyer 
                            and the is in the possession of the Buyer.
                        </li>
                        <li>
                            Both Parties agree and acknowledge that neither the Platform/ Vikasbandhu 
                            nor Sampark Bindhu is a party to this Agreement and this transaction is 
                            directly between the Seller and the Buyer and at no point of time will the 
                            Platform/ Vikasbandhu or Sampark Bindhu be considered a party to the 
                            transaction between the Buyer and the Seller as a result of use of the 
                            Platform/ Vikasbandhu by the Buyer or the Seller.
                        </li>
                        <li>
                            Parties agree and acknowledge that this Agreement shall be signed by both 
                            the Parties electronically.
                        </li>
                    </ol>
                </Paragraph>
                <Title level={5}>7. NOTICES</Title>
                <Paragraph>
                    All notices and other communications relating to this Agreement provided from one party 
                    hereto to the other shall be done through VikasBandhu Platform.
                </Paragraph>
                <Title level={5}>8. ARBITRATION</Title>
                <Paragraph>
                    All disputes, controversies or differences in opinion which may arise between the 
                    parties hereto, out of, in relation to or in connection with this Agreement, shall 
                    be finally settled by arbitration in the English language in Bangalore, India in 
                    accordance with the Arbitration and Conciliation Act 1998. Any award rendered by 
                    the arbitrator(s) shall be final and binding upon both parties.
                </Paragraph>
                <Title level={5}>9. FORCE MAJEURE</Title>
                <Paragraph>
                    Neither party hereto is liable for compensating the other party for any loss or 
                    damages it may incur due to any failure or delay in fulfilling the obligations 
                    under this Agreement as far as such failure or delay is caused by prohibition of 
                    export, refusal to issue export license, pandemic,  Act of God, war, blockade, 
                    embargoes, insurrection, mobilization or any other actions of Government 
                    authorities, riots, civil commotions, warlike conditions, strikes, lockout, 
                    shortage or control of power supply, plague or other epidemics, quarantine, fire, 
                    flood, tidal waves, typhoon, hurricane, cyclone, earthquake, lightning, explosion, 
                    or any other causes beyond the control of Seller or Buyer as long as such cause 
                    is present.    
                </Paragraph>
                <Title level={5}>10. SEVERABILITY</Title>
                <Paragraph>
                    Should any of the provisions hereof be held to be illegal, unenforceable or invalid 
                    or unenforceable by any court or other duly authorized organization, such 
                    illegality, unenforceability and invalidity shall not affect the legality, 
                    enforceability and validity of any of the remaining provisions hereof.     
                </Paragraph>
                <Title level={5}>11. GOVERNING LAW</Title>
                <Paragraph>
                    This Agreement shall conform to and be interpreted under the laws of India as to 
                    all matters including validity, interpretation and performance thereof.
                </Paragraph>
                <Title level={5}>12. ENTIRE AGREEMENT AND AMENDMENT</Title>
                <Paragraph>
                    <ol>
                        <li>
                            This Agreement supersedes all prior negotiations, written communications, 
                            understandings and agreements relating to the subject hereof between the 
                            parties hereto.
                        </li>
                        <li>
                            This Agreement may not be amended or altered in any way other than 
                            written agreement between duly authorized representatives of 
                            respective parties hereto after the execution date hereof.
                        </li>
                    </ol>
                </Paragraph>
            </div>
            <Footer />
        </>
    );
};
