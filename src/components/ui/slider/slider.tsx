import React, { useState, useRef, FC } from 'react'
import s from './slider.module.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
// import helldivers from '../../../assets/images/helldivers.png'
import { JCoin } from '../../svgs/svgs';
import { useNavigate } from 'react-router';

interface SliderItemProps {
  active: boolean;
  item: {
    id: number | string;
    title: string;
    currentPrice: number;
    oldPrice?: number;
    image: string;
  };
}

const SliderItem = ({ active, item }: SliderItemProps) => {
  const navigate = useNavigate()
  const [isDragging, setIsDragging] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault()
      return
    }
    navigate(`/game/${item.id}`)
  }

  return (
    <div 
      onClick={handleClick} 
      className={`${s.slide} ${active ? s.active : ''}`}
      onMouseDown={() => setIsDragging(false)}
      onMouseMove={() => setIsDragging(true)}
    >
      <img src={item.image} alt={item.title} draggable="false" />
      <h4>{item.title}</h4>
      <div className={s.price}>
        <p className={s.current_price}>{item.currentPrice} <JCoin /></p>
        {item.oldPrice && <p className={s.old_price}>{item.oldPrice}</p>}
      </div>
    </div>
  )
}

interface SliderComponentProps {
  items: {
    id: number | string;
    title: string;
    currentPrice: number;
    oldPrice?: number;
    image: string;
  }[];
}

const SliderComponent: FC<SliderComponentProps> = ({ items }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<Slider | null>(null);
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 1,
    speed: 300,
    arrows: false,
    dots: false,
    variableWidth: true,
    beforeChange: (_: any, next: number) => setActiveSlide(next),
    useCSS: true,
    slidesToScroll: 1,
    touchThreshold: 5,
    swipe: true,
    draggable: true,
    waitForAnimate: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "0",
          slidesToShow: 1,
          variableWidth: true
        }
      }
    ]
  };

  return (
    <div className={s.sliderWrapper}>
      <div className={s.slider}>
        <Slider ref={sliderRef} {...settings}>
          {items.map((item, index) => (
            <SliderItem
              key={item.id}
              active={activeSlide === index}
              item={item}
            />
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default SliderComponent