import React, { FC } from 'react'
import s from './CategoriesChoose.module.scss'
import { Fire2Icon, DiscountIcon, CalendarIcon, BoltIcon, BallIcon, CarIcon, GunIcon, PlanetIcon, GamingIcon, GhostIcon, DrawingIcon, TrophyIcon } from '../../svgs/svgs'

interface CategoriesChooseI {
    toggleCategory: (category: string) => void,
    activeCategories: string[]
}

const CategoriesChoose: FC<CategoriesChooseI> = ({ toggleCategory, activeCategories }) => {
  const categories = [
    { icon: <Fire2Icon />, name: 'Популярное' },
    { icon: <DiscountIcon />, name: 'Скидки' },
    { icon: <CalendarIcon />, name: 'Предзаказы' },
    { icon: <BoltIcon />, name: 'Новинки' },
    { icon: <BallIcon />, name: 'Спорт' },
    { icon: <CarIcon />, name: 'Гонки' },
    { icon: <GunIcon />, name: 'Шутеры' },
    { icon: <PlanetIcon />, name: 'Приключения' },
    { icon: <GamingIcon />, name: 'Аркады' },
    { icon: <GhostIcon />, name: 'Хорроры' },
    { icon: <DrawingIcon />, name: 'Стратегии' },
    { icon: <TrophyIcon />, name: 'Файтинги' },
  ];
  // console.log(activeCategories, 'cas')
  return (
    <div className={s.categoriesGrid}>
      {categories.map((category, index) => (
        <div className={`${s.fullItem} ${activeCategories.includes(category.name) ? s.active : ''}`}>
        <div
          key={index}
          className={`${s.categoryItem}`}
          onClick={() => toggleCategory(category.name)}
        >
          {category.icon}
          
        </div>
        <span>{category.name}</span>
        </div>
      ))}
    </div>
  )
}

export default CategoriesChoose