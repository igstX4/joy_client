import React, { FC } from 'react'
import s from './BuyHistory.module.scss'
import { CartItem } from '../Favourite/Favourite'
import wukongPhoto from '../../assets/images/wukongPhoto.png'
import { m } from 'framer-motion'
export interface ProductI {
  id: number
  title: string
  currentPrice: number
  oldPrice: number
  discount?: number
  img: string
  edition: string
  additionalInfo?: string[]
}

interface HistoryItemI {
  orderNumber: string
  date: string
  products: ProductI[]
}

const HistoryItem: FC<HistoryItemI> = ({ orderNumber, date, products }) => {
  return (
    <div className={s.historyItem}>
      <h2 className={s.orderNumber}>Номер заказа: {orderNumber}</h2>
      <h3>Дата и время: <span>{date}</span></h3>
      <div className={s.localItems}>
        {products.map((product) => (
          <CartItem 
            isHistory={true} 
            key={product.id} 
            id={String(product.id)} 
            productId={String(product.id)}
            title={product.title} 
            currentPrice={product.currentPrice} 
            oldPrice={product.oldPrice} 
            discount={product.discount ? String(product.discount) : undefined} 
            img={product.img} 
            edition={product.edition} 
            additionalInfo={product.additionalInfo}
          />
        ))}
      </div>
    </div>
  )
}
const mockData: HistoryItemI[] = [
  {
    orderNumber: '123456',
    date: '2023-10-01 12:34',
    products: [
      {
        id: 1,
        title: 'Product 1',
        currentPrice: 100,
        oldPrice: 150,
        discount: 50,
        img: wukongPhoto,
        edition: 'Standard',
        additionalInfo: ['Info 1', 'Info 2']
      },
      {
        id: 2,
        title: 'Product 2',
        currentPrice: 200,
        oldPrice: 250,
        discount: 50,
        img: wukongPhoto,
        edition: 'Deluxe',
        additionalInfo: ['Info 3', 'Info 4']
      }
    ]
  },
  {
    orderNumber: '789012',
    date: '2023-10-02 15:45',
    products: [
      {
        id: 3,
        title: 'Product 3',
        currentPrice: 300,
        oldPrice: 350,
        discount: 50,
        img: wukongPhoto,
        edition: 'Standard',
        additionalInfo: ['Info 5', 'Info 6']
      }
    ]
  }
];
const BuyHistory = () => {

  return (
    <div className={s.history}>
      <h1>История покупок</h1>
      <div className={s.items}>
        {mockData.map((item) => <HistoryItem key={item.orderNumber} orderNumber={item.orderNumber} date={item.date} products={item.products} />)}
      </div>
    </div>
  )
}

export default BuyHistory