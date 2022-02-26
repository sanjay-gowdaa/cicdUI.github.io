import React from 'react';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import mvp from '../static/assets/VbThree.png';
import foodExb from '../static/assets/VbTwo.jpg';
import academia from '../static/assets/VbFive.jpg';
const Updates = () => {
    const { Panel } = Collapse;

    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
    return (
        <div id='updates'>
            <h2>Updates</h2>
            <Collapse accordion
                bordered={false}
                // defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
            >
                <Panel id='mvp' header="Minimal Viable Product
  (27th December 2021)" key='1' className="site-collapse-custom-panel">
                    <div className='card'>
                        <img src={mvp}></img>
                        <p>VikasBandhu is live! We are glad to announce the availability of the Minimum Viable Product (MVP). The Pilot is available as a browser (https://vikasbandhu.in) and Android Application. This Pilot will be available towards field exposure, usage and feedback with Closed User Groups in select markets in Karnataka. This will help the buyers and sellers (Farmer self-help groups) to connect, engage and transact for win-win relationships</p>
                    </div>
                </Panel>
                <Panel id='foodExb' header="Techbharat 2022
  (5th January 2022)" key='2' className="site-collapse-custom-panel">
                <div className='card'>
                        <img src={foodExb}></img>
                        <p>We were selected to showcase our solution 'VikasBandhu' in the first Pre-Event “Food and Agri Tech exhibition” in Belagavi, Karnataka by Techbharat. The forum is using this opportunity to show case a vast array of exciting start-ups showcasing innovation and enable networking in the Agri tech space This is a three-fold event which continues in Bangalore in March and culminates in Mysore in May’21</p>
                    </div>
                </Panel>
                <Panel id='academia' header="Memorandum of Understanding(MOU)
  (21st December 2021)" key='3' className="site-collapse-custom-panel">
                <div className='card'>
                        <img src={academia}></img>
                        <p>The industry and academia collaboration is paramount and the need of the hour. We are glad to have signed a MOU with Sri Vidyanikethan Engineering College (SVEC) in the areas of the AI, Voice recognition, Big Data and Cloud first apps. This collaboration will be a win-win. The faculty and its students get the required exposure to the latest industry trends to apply their domain knowledge to solve cutting-edge real-life problems in AgriTech. SamparkBindhu will also attain critical mass needed to accelerate and fast pace its technology driven product lines</p>
                    </div>
                </Panel>
            </Collapse>
        </div>
    )
}

export default Updates;