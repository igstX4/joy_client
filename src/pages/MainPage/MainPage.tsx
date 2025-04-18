import { useState, useEffect } from 'react'
import SearchInput from '../../components/ui/search-input/searchInput'
import { Title } from '../../components/ui/title/title'
import WhatsNew from '../../components/shared/WhatsNew/WhatsNew'
import s from './MainPage.module.scss'
import CategoryItem from '../../components/shared/CategoryItem/CategoryItem'
import DonateItem from '../../components/shared/DonateItem/DonateItem'
// import psplus from '../../assets/images/psplus.jpg'
import TypeSelect from '../../components/shared/typeSelect/TypeSelect'
import SubscriptionItem from '../../components/shared/subscriptionItem/subscriptionItem'
// import DonatePageItem from '../../components/shared/DontatePageItem/DonatePageItem'
// import points from '../../assets/images/points.jpg'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getGameLayout, getSubscriptions } from '../../store/slices/productSlice'
import { Loader } from '../../components/ui/Loader/Loader'
import { ISubscription } from '../../types/product.types'
import { useNavigate } from 'react-router-dom'
import DonatePageItem from '../../components/shared/DontatePageItem/DonatePageItem'
import { fetchCatalogProducts, updateFilters } from '../../store/slices/catalogSlice'
import debounce from 'lodash/debounce'

interface SubscriptionItemData {
  id: string;
  currentPrice: number;
  oldPrice: number;
  image: string;
}

// const mockSubscriptionItems = [
//   {
//     id: 1,
//     currentPrice: 150,
//     oldPrice: 200,
//     image: psplus
//   },
//   {
//     id: 2,
//     currentPrice: 200,
//     oldPrice: 250,
//     image: psplus
//   },
//   {
//     id: 3,
//     currentPrice: 300,
//     oldPrice: 350,
//     image: psplus
//   }
// ];

const MainPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sections, subscriptions, isLoading } = useAppSelector(state => state.product);
  const { products, filters } = useAppSelector(state => state.catalog);
  const [type, setType] = useState<string>('games')
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showCatalog, setShowCatalog] = useState(false);

  useEffect(() => {
    if (type === 'games') {
      dispatch(getGameLayout());
    } else {
      dispatch(getSubscriptions());
    }
  }, [dispatch, type]);

  const handleFocus = () => {
    setIsSearchFocused(true);
    setShowCatalog(true);
    dispatch(updateFilters({ ...filters, page: 0 }));
    dispatch(fetchCatalogProducts({ ...filters, page: 0, isNewSearch: true }));
  };

  const handleBlur = () => {
    if (!searchText) {
      setIsSearchFocused(false);
      setShowCatalog(false);
    }
  };

  const handleBack = () => {
    setShowCatalog(false);
    setIsSearchFocused(false);
    setSearchText('');
    dispatch(updateFilters({ ...filters, name: '' }));
  };

  const debouncedSearch = debounce((value: string) => {
    dispatch(updateFilters({ ...filters, name: value, page: 0 }));
    dispatch(fetchCatalogProducts({ ...filters, name: value, page: 0, isNewSearch: true }));
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSearch(value);
  };

  const transformProducts = (products: any[]) => {
    return products.map(product => {
      let oldPrice = product.price;
      let currentPrice = product.jprice;

      if (product.discount) {
        const discountValue = parseInt(product.discount.replace(/[-%]/g, ''));
        oldPrice = Math.round(currentPrice / (1 - discountValue / 100));
      }

      return {
        id: product.productId,
        title: product.name,
        currentPrice: currentPrice,
        oldPrice: oldPrice,
        image: product.imageFilepath,
        discount: product.discount
      };
    });
  };

  // Функция для группировки подписок по секциям
  const groupSubscriptionsBySection = (subs: ISubscription[]): Record<string, SubscriptionItemData[]> => {
    return subs.reduce((acc, sub) => {
      if (!acc[sub.sectionName]) {
        acc[sub.sectionName] = [];
      }

      let oldPrice = sub.price;
      let currentPrice = sub.jprice;

      if (sub.discount) {
        const discountValue = parseInt(sub.discount.replace(/[-%]/g, ''));
        oldPrice = Math.round(currentPrice / (1 - discountValue / 100));
      }

      acc[sub.sectionName].push({
        id: sub.productId,
        currentPrice: currentPrice,
        oldPrice: oldPrice,
        image: sub.imagePath
      });
      return acc;
    }, {} as Record<string, SubscriptionItemData[]>);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={s.main}>
      <div className={s.searchDiv}>
        <SearchInput 
          onFocus={handleFocus} 
          onBlur={handleBlur} 
          noMargin={true}
          onChange={handleSearchChange} 
          value={searchText}
          showBackButton={showCatalog}
          onBack={handleBack}
        />
      </div>
      {!showCatalog ? (
        <div className={s.content}>
          <Title text='Что нового?' />
          <WhatsNew />
          <TypeSelect type={type} setType={(str: string) => setType(str)} />
          {type === 'games' ? 
          <>
            {sections.map((section) => (
              <CategoryItem 
                key={section.name}
                title={section.name}
                type={section.name.toLowerCase()}
                items={transformProducts(section.editions)}
              />
            ))}
            <DonateItem />
          </> 
          : 
          <div style={{display: 'flex', marginLeft: '20px', gap: '20px'}}>
            {Object.entries(groupSubscriptionsBySection(subscriptions)).map(([sectionName, items]) => (
              <SubscriptionItem 
                key={sectionName}
                title={sectionName}
                items={items}
              />
            ))}
          </div>
          }
        </div>
      ) : (
        <div className={s.catalogItems}>
          <div className={s.list}>
            {products.map((item) => {
              let currentPrice = Number(item.jprice);
              let oldPrice = undefined;
              let discount = undefined;
              
              if (item.discount) {
                const discountValue = parseInt(item.discount.replace(/[-%]/g, ''));
                oldPrice = Math.round(currentPrice / (1 - discountValue / 100));
                discount = discountValue;
              }
              
              return (
                <DonatePageItem 
                  key={item.productId}
                  id={item.productId}
                  notDonate={true}
                  title={item.name}
                  currentPrice={currentPrice}
                  oldPrice={oldPrice}
                  image={item.imageFilepath}
                  discount={discount}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default MainPage