import React, { useState } from 'react';
import { Button, Drawer, Image, Typography } from 'antd';
import { isUndefined } from 'lodash';

import { CropListType } from './types';

const { Text } = Typography;

const ViewCropImages = (props: { list: CropListType, disablePhotos: boolean }) => {
    const { list, disablePhotos } = props;
    const { crop_image_1 } = list || [];
    const { crop_image_2 } = list || [];
    const { crop_image_3 } = list || [];
    const { crop_image_4 } = list || [];
    const { crop_image_5 } = list || [];

    const [drawerVisible, setDrawerVisible] = useState(false);

    return (
        <React.Fragment>
            <Button
                className='produce-photos'
                type='link'
                onClick={() => setDrawerVisible(true)}
                disabled={!disablePhotos &&
                    isUndefined(crop_image_1) &&
                    isUndefined(crop_image_2) &&
                    isUndefined(crop_image_3) &&
                    isUndefined(crop_image_4) &&
                    isUndefined(crop_image_5)
                }
            >
                Produce Photos
            </Button>
            <Drawer
                title='Produce Photos'
                closable={true}
                visible={drawerVisible}
                className='custom-view-crop-photos'
                placement='right'
                onClose={() => setDrawerVisible(false)}
            >
                {isUndefined(crop_image_1) &&
                    isUndefined(crop_image_2) &&
                    isUndefined(crop_image_3) &&
                    isUndefined(crop_image_4) &&
                    isUndefined(crop_image_5) &&
                    <Text>No photos uploaded</Text>
                }
                <Image.PreviewGroup>
                    {!isUndefined(crop_image_1) &&
                        <Image preview={false}
                            // width={200} height={200}
                            src={crop_image_1}
                        />
                    }
                    {!isUndefined(crop_image_2) &&
                        <Image preview={false}
                            // width={200} height={200}
                            src={crop_image_2}
                        />
                    }
                    {!isUndefined(crop_image_3) &&
                        <Image preview={false}
                            // width={200} height={200}
                            src={crop_image_3}
                        />
                    }
                    {!isUndefined(crop_image_4) &&
                        <Image preview={false}
                            // width={200} height={200}
                            src={crop_image_4}
                        />
                    }
                    {!isUndefined(crop_image_5) &&
                        <Image preview={false}
                            // width={200} height={200}
                            src={crop_image_5}
                        />
                    }
                </Image.PreviewGroup>
            </Drawer>
        </React.Fragment>
    );
};

export default ViewCropImages;
