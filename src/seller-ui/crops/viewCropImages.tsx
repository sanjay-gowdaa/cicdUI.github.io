import React, { useState } from 'react';
import { Button, Drawer, Image, Space, Typography } from 'antd';

const { Text } = Typography;

const ViewCropImages = (props: any) => {
    const { list } = props;
    const {crop_image_1} = list || [];
    const {crop_image_2} = list || [];
    const {crop_image_3} = list || [];
    const {crop_image_4} = list || [];
    const {crop_image_5} = list || [];

    const [drawerVisible, setDrawerVisible] = useState(false);
    
    return (
        <>
            <Button type="link" onClick={() => setDrawerVisible(true)} >
                Produce Photos
            </Button>
            <Drawer
                title="Produce Photos"
                closable={true}
                visible={drawerVisible}
                className="custom-view-crop-photos"
                placement="right"
                onClose={() => setDrawerVisible(false)}
            >
                {((crop_image_1 === undefined) && (crop_image_2 === undefined) && (crop_image_3 === undefined) && (crop_image_4 === undefined) && (crop_image_5 === undefined)) ?
                <Text>No photos uploaded</Text> : <Text>Click images to enlarge</Text>}
                <Image.PreviewGroup>
                    <Space direction="vertical" size="middle" align="center" >
                        {(crop_image_1 !== undefined) && <Image width={200} height={200} src={crop_image_1} /> }
                        {(crop_image_2 !== undefined) && <Image width={200} height={200} src={crop_image_2} /> }
                        {(crop_image_3 !== undefined) && <Image width={200} height={200} src={crop_image_3} /> }
                        {(crop_image_4 !== undefined) && <Image width={200} height={200} src={crop_image_4} /> }
                        {(crop_image_5 !== undefined) && <Image width={200} height={200} src={crop_image_5} /> }
                    </Space>
                </Image.PreviewGroup>
            </Drawer>
        </>
    )

};

export default ViewCropImages;