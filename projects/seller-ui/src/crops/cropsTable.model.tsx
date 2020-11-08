import React from 'react';
import { Typography, Progress, Statistic, Button } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { CropModel } from '../store/sellerReducer/types';

const { Title } = Typography;
export const cropColumns = [
    {
      title: 'Crop',
      dataIndex: 'cropName',
      key: 'cropName',
      render: (cropName: string, record: CropModel) => {
        return (
          <>
            <Title level={5}>{cropName}</Title>
            <p>{record?.subCategory}</p>
          </>
        )
      } ,
    },
    {
      title: 'Grade',
      dataIndex: 'cropGrade',
      key: 'cropGrade',
    },
    {
      title: 'Qunatity Remaining',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number) => {
        return (
          <>
            <p>{quantity} qtl</p>
            <Progress percent={100} showInfo={false} />
          </>
        )
      }
    },
    {
      title: 'Price per qtl',
      dataIndex: 'pricePerQnt',
      key: 'pricePerQnt',
    },
    {
        title: 'Live APMC Rates per qtl',
        dataIndex: 'apmcRate',
        key: 'apmcRate',
        render: (apmcRate: number, record: CropModel) => {
          const {apmcRateChange}  = record
          const {difference, increase} = apmcRateChange
          const color = increase ? '#12805C' : '#E90000'
          return (
            <>
              <p>{apmcRate}</p>
              <Statistic
                value={difference}
                valueStyle={{ color, fontSize: '12px' }}
                prefix={ increase ? <CaretUpOutlined /> : <CaretDownOutlined />}
              />
            </>
          )
        }
    },
    {
        title: 'Intent To Sell',
        dataIndex: 'intentToSell',
        key: 'intentToSell',
        render: (intentToSell: boolean) => <p>{intentToSell ? 'Yes' : 'No'}</p>,
    },
    {
      title: 'Additional',
      key: 'termsAndConditions',
      dataIndex: 'termsAndConditions',
      render: (termsAndConditions: string) => {
        return (
          <>
          <div><a href={termsAndConditions} target='_blank'>Terms & Conditions</a></div>
          <div><a href={termsAndConditions} target='_blank'>Crop Photos</a></div>
          </>
        )
      }
    },
    {
      title: '',
      key: 'action',
      render: (text: string, record: CropModel) => {
        const {intentToSell} = record
        return (
          intentToSell  ? null : (
            <>
              <Button type="link" block>
                Edit
              </Button>
              <Button type="link" danger block>
                Delete
              </Button>
            </>
          )
        )
      },
    },
  ];