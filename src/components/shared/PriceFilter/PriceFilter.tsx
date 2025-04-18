import React, { useState, useEffect } from 'react'
import s from './PriceFilter.module.scss'
import { RightArrow } from '../../svgs/svgs'

interface PriceFilterProps {
    noMargin?: boolean;
    onPriceChange?: (minPrice: number, maxPrice: number) => void;
    minPrice?: number;
    maxPrice?: number;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ 
    noMargin,
    onPriceChange,
    minPrice: initialMinPrice,
    maxPrice: initialMaxPrice
}) => {
    const [isShown, setShown] = useState(false)
    const [localMinPrice, setLocalMinPrice] = useState(initialMinPrice?.toString() || '')
    const [localMaxPrice, setLocalMaxPrice] = useState(initialMaxPrice?.toString() || '')

    useEffect(() => {
        setLocalMinPrice(initialMinPrice?.toString() || '')
        setLocalMaxPrice(initialMaxPrice?.toString() || '')
    }, [initialMinPrice, initialMaxPrice])

    const handlePriceChange = () => {
        if (onPriceChange) {
            const min = localMinPrice ? parseInt(localMinPrice) : 0
            const max = localMaxPrice ? parseInt(localMaxPrice) : 0
            if (!isNaN(min) && !isNaN(max)) {
                onPriceChange(min, max)
            }
        }
    }

    return (
        <div style={noMargin ? {padding: '0px', marginTop: "10px"} : {}} className={s.priceFilter}>
            <div onClick={() => setShown((prev) => !prev)} className={s.title}>
                <h3 className={isShown ? s.textActive : ''}>Цена <RightArrow /></h3>
            </div>
            <div className={`${s.inputs} ${isShown ? s.active : ''}`}>
                <input 
                    placeholder='От'
                    value={localMinPrice}
                    onChange={(e) => setLocalMinPrice(e.target.value)}
                    onBlur={handlePriceChange}
                    type="number"
                />
                <input 
                    placeholder='До'
                    value={localMaxPrice}
                    onChange={(e) => setLocalMaxPrice(e.target.value)}
                    onBlur={handlePriceChange}
                    type="number"
                />
            </div>
        </div>
    )
}

export default PriceFilter