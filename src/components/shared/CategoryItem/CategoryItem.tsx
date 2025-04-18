// import React from 'react'
import s from './CategoryItem.module.scss'
import { Title } from '../../ui/title/title'
import SliderComponent from '../../ui/slider/slider'
import { FC } from 'react'
import { RightArrow } from '../../svgs/svgs'
import { useNavigate } from 'react-router'

interface GameItem {
  id: number | string;
  title: string;
  currentPrice: number;
  oldPrice?: number;
  discount?: string;
  image: string;
}

interface CategoryItemProps {
  title: string;
  type: string;
  items: GameItem[];
}

const CategoryItem: FC<CategoryItemProps> = ({title, type, items}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (type === 'donate') {
      navigate('/donate')
      return
    }

    const searchParams = new URLSearchParams()
    switch(type) {
      case 'popular':
        searchParams.set('sort', 'Сначала популярные')
        break
      case 'discount':
        searchParams.set('discount', 'true')
        break
      case 'preorder':
      case 'new':
        searchParams.set('sort', 'Дата выхода - сначала новые')
        break
      case 'sport':
      case 'car':
      case 'fighting':
        searchParams.set('category', type)
        break
    }
    
    navigate(`/catalog?${searchParams.toString()}`)
  }

  // Трансформируем данные для слайдера, убирая oldPrice если нет скидки
  const transformedItems = items.map(item => ({
    ...item,
    // Если нет скидки, не передаем oldPrice
    oldPrice: item.discount ? item.oldPrice : undefined
  }));

  return (
    <div className={s.category_item}>
      <Title text={title} type={type}/>
      <SliderComponent items={transformedItems} />
      <div className={s.btn_wrapper}>
        <button onClick={handleClick} className={s.show_more}>Показать еще <RightArrow /> </button>
      </div>
    </div>
  )
}

export default CategoryItem
