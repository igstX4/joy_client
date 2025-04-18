import React, { useState } from 'react';
import styles from './Prices.module.scss';

interface Tab {
  label: string;
  content: string;
}

const tabs: Tab[] = [
  { label: 'Наценка', content: 'Настройка наценки на товары' },
  { label: 'Подписки', content: 'Управление подписками' },
  { label: 'Цены на подписки', content: 'Настройка цен подписок' },
  { label: 'Скидки подписок', content: 'Управление скидками' },
];

interface PlanWithPrice {
  duration: string;
  value: string;
}

const plansData = {
  ukraine: {
    Essential: [
      { duration: '1 месяц', value: '20' },
      { duration: '3 месяца', value: '20' },
      { duration: '12 месяцев', value: '20' },
    ],
    Extra: [
      { duration: '1 месяц', value: '20' },
      { duration: '3 месяца', value: '20' },
      { duration: '12 месяцев', value: '20' },
    ],
    Deluxe: [
      { duration: '1 месяц', value: '20' },
      { duration: '3 месяца', value: '20' },
      { duration: '12 месяцев', value: '20' },
    ],
  },
  turkey: {
    Essential: [
      { duration: '1 месяц', value: '15' },
      { duration: '3 месяца', value: '15' },
      { duration: '12 месяцев', value: '15' },
    ],
    Extra: [
      { duration: '1 месяц', value: '15' },
      { duration: '3 месяца', value: '15' },
      { duration: '12 месяцев', value: '15' },
    ],
    Deluxe: [
      { duration: '1 месяц', value: '15' },
      { duration: '3 месяца', value: '15' },
      { duration: '12 месяцев', value: '15' },
    ],
  },
};

const Prices: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].label);

  const handleTabClick = (tabLabel: string) => {
    setActiveTab(tabLabel);
  };

  const renderPlansSection = (plans: typeof plansData.ukraine, isPriceTab: boolean = false) => (
    <>
      {Object.entries(plans).map(([planName, planDetails]) => (
        <section key={planName} className={styles.planSection}>
          <h2 className={styles.planTitle}>{planName}</h2>
          {planDetails.map((plan, index) => (
            <div key={index} className={styles.planItem}>
              <div className={styles.planDuration}>{plan.duration}</div>
              <input
                type="text"
                className={styles.discountInput}
                value={isPriceTab ? plan.value : `${plan.value}%`}
                onChange={(e) => {/* Add change handler */}}
              />
              <button className={styles.saveButton}>Сохранить</button>
            </div>
          ))}
        </section>
      ))}
    </>
  );

  const renderContent = () => {
    console.log('Rendering content:', plansData); // добавлено для отладки
    return (
      <div className={styles.contentWrapper}> {/* добавлен wrapper */}
        <div className={styles.countrySection}>
          <h1 className={styles.title}>Украина</h1>
          {renderPlansSection(plansData.ukraine, activeTab === 'Цены на подписки')}
        </div>
        
        <div className={styles.countrySection}>
          <h1 className={styles.title}>Турция</h1>
          {renderPlansSection(plansData.turkey, activeTab === 'Цены на подписки')}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.pricesContainer}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`${styles.tabButton} ${
              activeTab === tab.label ? styles.activeTab : ''
            }`}
            onClick={() => handleTabClick(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Prices;