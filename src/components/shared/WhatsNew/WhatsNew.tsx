import React, { useState, useEffect, FC } from 'react';
import s from './WhatsNew.module.scss';
import img1 from '../../../assets/images/salesbg.jpg';
import img2 from '../../../assets/images/smallBaner1.jpg';
import img3 from '../../../assets/images/smallBaner2.jpg';
import img4 from '../../../assets/images/smallBaner3.jpg';
import img5 from '../../../assets/images/smallBaner4.jpg';

const images: string[] = [img1, img2, img3, img4, img5];

const WhatsNew: FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [fade, setFade] = useState<boolean>(false);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 3000); // Интервал переключения

        return () => clearInterval(interval);
    }, [activeIndex]);

    const handleNext = (): void => {
        setFade(true);
        setTimeout(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
            setFade(false);
        }, 500); // Длительность анимации
    };

    const handleClick = (index: number): void => {
        setFade(true);
        setTimeout(() => {
            setActiveIndex(index);
            setFade(false);
        }, 500); // Длительность анимации
    };

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div
                    className={`${s.imgContainer} ${fade ? s.fade : ''}`}
                    style={{
                        backgroundImage: `url(${images[activeIndex]})`,
                    }}
                >
                    <button className={s.detailsBtn}>Подробнее</button>
                </div>
                <div className={s.smallBanners}>
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`${s.thumbnail} ${
                                index === activeIndex ? s.active : ''
                            }`}
                            onClick={() => handleClick(index)}
                        >
                            <img src={img} alt={`Thumbnail ${index + 1}`} />
                            {index === activeIndex && (
                                <div className={s.progress}></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhatsNew;
