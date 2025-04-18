import React, { FC } from 'react'
import s from './PlatformChoose.module.scss'
import TextWithLines from '../TextWithLines/TextWithLines'
import PS4White from '../../../assets/images/ps4.png'
import PS4Orange from '../../../assets/images/ps4_orange.png'
import PS5Orange from '../../../assets/images/ps5_orange.png'
import PS5White from '../../../assets/images/ps5.png'
import { PS4Text, PS5Text } from '../../svgs/svgs'



interface PlatformChooseI {
    platform: string
    setPlatform: (platform: string) => void
}

const PlatformChoose: FC<PlatformChooseI> = ({platform, setPlatform}) => {
    return (
        <div className={s.PlatformChoose}>
            <TextWithLines text='Моя консоль' />
            <div className={s.btns}>
                <div onClick={() => setPlatform('PS4')} className={`${s.item} ${platform === 'PS4' ? s.active : ''}`}>
                    {platform === 'PS4' ? <img src={PS4Orange} className={s.ps4}/> : <img src={PS4White} className={s.ps4}/>}
                    <PS4Text />
                </div>
                <div onClick={() => setPlatform('PS5')} className={`${s.item} ${platform === 'PS5' ? s.active : ''}`}>
                    {platform === 'PS5' ? <img src={PS5Orange} className={s.ps5}/> : <img src={PS5White} className={s.ps5}/>}
                    <PS5Text />
                </div>
            </div>
            <p className={s.deskription}>Бот будет приоритетно предлагать игры для той версии консоли, что Вы выбрали</p>
        </div>
    )
}

export default PlatformChoose