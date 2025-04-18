import React from 'react'
import s from './DonatePage.module.scss'
import SearchInput from '../../components/ui/search-input/searchInput'
import PriceFilter from '../../components/shared/PriceFilter/PriceFilter'
import { Title } from '../../components/ui/title/title'
import points from '../../assets/images/points.jpg'
import DonatePageItem from '../../components/shared/DontatePageItem/DonatePageItem'

const DonatePage = () => {
    const mockData = [
        {
          "id": 1,
          "title": "100 FC Points",
          "currentPrice": 920,
          "oldPrice": 1000,
          "image": points,
          "discount": 8
        },
        {
          "id": 2,
          "title": "500 FC Points",
          "currentPrice": 540,
          "oldPrice": 650,
          "image": points,
          "discount": 17
        },
        {
          "id": 3,
          "title": "1050 FC Points",
          "currentPrice": 1420,
          "oldPrice": 1500,
          "image": points,
          "discount": 5.33
        },
        {
          "id": 4,
          "title": "2800 FC Points",
          "currentPrice": 300,
          "oldPrice": 440,
          "image": points,
          "discount": 31.82
        }
      ]
  return (
    <div className={s.donatePage}>
        <SearchInput />
        <PriceFilter />
        <div className={s.lineWrapper}><div className={s.vertLine}/></div>
        <div className={s.margin}><Title text='Донат'/></div>
        <div className={s.list}>
            {
                mockData.map((item) => <DonatePageItem title={item.title} id={item.id} currentPrice={item.currentPrice} oldPrice={item.oldPrice} image={item.image} discount={item.discount} />)
            }
        </div>
    </div>
  )
}

export default DonatePage