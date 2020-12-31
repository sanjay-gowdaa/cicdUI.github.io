import React, { useState } from 'react';
import { Button, Drawer, Image, Skeleton, Space } from 'antd';

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
                Crop Photos
            </Button>
            <Drawer
                title="Crop Photos"
                closable={true}
                visible={drawerVisible}
                className="custom-view-crop-photos"
                placement="right"
                onClose={() => setDrawerVisible(false)}
            >
                <Image.PreviewGroup>
                    <Space direction="vertical" size="middle" align="center" >
                        {(crop_image_1 === undefined) ? <Skeleton.Image /> : <Image width={200} height={200} src={crop_image_1} /> }
                        {(crop_image_2 === undefined) ? <Skeleton.Image /> : <Image width={200} height={200} src={crop_image_2} /> }
                        {(crop_image_3 === undefined) ? <Skeleton.Image /> : <Image width={200} height={200} src={crop_image_3} /> }
                        {(crop_image_4 === undefined) ? <Skeleton.Image /> : <Image width={200} height={200} src={crop_image_4} /> }
                        {(crop_image_5 === undefined) ? <Skeleton.Image /> : <Image width={200} height={200} src={crop_image_5} /> }
                    </Space>
                </Image.PreviewGroup>
            </Drawer>
        </>
    )

};

export default ViewCropImages;