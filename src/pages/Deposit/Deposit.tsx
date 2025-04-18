import React, { useState, useEffect } from 'react'
import s from './Deposit.module.scss'
import bgDeposit from '../../assets/images/bgDeposit.png'
import { JCoin } from '../../components/svgs/svgs'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getJoyDonations, getJoyPlusDonations } from '../../store/slices/productSlice'
import { Loader } from '../../components/ui/Loader/Loader'

const Deposit = () => {
    const dispatch = useAppDispatch();
    const { joyDonations, joyPlusDonations, isLoading } = useAppSelector(state => state.product);
    const [type, setType] = useState('rub')
    const [selectedItem, setSelectedItem] = useState<null | number>(null)

    useEffect(() => {
        dispatch(getJoyDonations());
        dispatch(getJoyPlusDonations());
    }, [dispatch]);

    const handleTypeChange = (newType: string) => {
        setType(newType);
        setSelectedItem(null);
    };

    const donations = type === 'rub' ? joyDonations : joyPlusDonations;

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className={s.deposit}>
            <div className={s.chooseType}>
                <div className={type === "rub" ? s.active : ""} onClick={() => handleTypeChange('rub')}>Купить за рубли</div>
                <div className={type === "joy+" ? s.active : ""} onClick={() => handleTypeChange('joy+')}>Купить за Joy+</div>
            </div>
            <div className={s.container}>
                <div className={s.titleDiv}>
                    <h2 className={s.containerTitle}>Самая разумная покупка - пополнить счет в Joy </h2>
                    <img src={bgDeposit} alt="deposit background" />
                </div>
                <div className={s.choosePack}>
                    <h4>Выберите пакет:</h4>
                    <div className={s.items}>
                        {donations.map((amount) => (
                            <div
                                key={amount}
                                className={`${s.item} ${selectedItem === amount ? s.activeItem : ''}`}
                                onClick={() => setSelectedItem(amount)}
                            >
                                {amount}<JCoin />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={s.balanceDiv}>
                    <h4>Баланс после пополнения</h4>
                    <p>{selectedItem || 0}<JCoin/></p>
                </div>
                <div className={s.wayToPay}>
                    <h4>Способы оплаты</h4>
                    <div className={s.way}>{type === 'rub' ? 'СБП' : 'Joy+'}</div>
                </div>
                <div className={s.confirmDiv}>
                    <button>Продолжить</button>
                    <p>1 Joy = 1 рубль. Joями все дешевле</p>
                </div>
            </div>
        </div>
    )
}

export default Deposit