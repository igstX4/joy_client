import { FC } from 'react';
import s from './title.module.scss'
import { Ball, Bolt, Calendar, Car, Coins, Discount, Trophy } from '../../svgs/svgs';
import { Fire } from '../../svgs/svgs';
interface TitleProps {
    text: string;
    noMargin?: boolean;
    type?: 'popular' | 'discount' | 'donate' | 'preorder' | 'new' | 'sport' | 'car' | 'fighting'
}
export const Title : FC<TitleProps> = ({text, noMargin, type}) => {
    const renderIcon = () => {
        switch (type) {
            case 'popular': return <Fire />
            case 'discount': return <Discount />
            case 'donate': return <Coins />
            case 'preorder': return <Calendar />
            case 'new': return <Bolt />
            case 'sport': return <Ball />
            case 'car': return <Car />
            case 'fighting': return <Trophy />
            default: return null
        }
    }
    return (
        <h1 style={noMargin ? {marginLeft: '0px'} : {}} className={s.title}>{text} {renderIcon()}</h1>
    );
};