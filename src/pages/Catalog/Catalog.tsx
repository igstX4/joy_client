import React, { useState, useEffect, useRef, useCallback } from 'react'
import s from './Catalog.module.scss'
import SearchInput from '../../components/ui/search-input/searchInput'
import { FilterIcon } from '../../components/svgs/svgs'
import CustomSelect from '../../components/shared/CustomSelect/CustomSelect'
import Checkbox from '../../components/ui/checkbox/checkbox'
import OpenableBlock from '../../components/shared/OpenableBlock/OpenableBlock'
import CategoriesChoose from '../../components/shared/Categories/CategoriesChoose'
import PriceFilter from '../../components/shared/PriceFilter/PriceFilter'
import DonatePageItem from '../../components/shared/DontatePageItem/DonatePageItem'
import { Title } from '../../components/ui/title/title'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchCatalogProducts, updateFilters } from '../../store/slices/catalogSlice'
import { Loader } from '../../components/ui/Loader/Loader'
import debounce from 'lodash/debounce'

const platformOptions = ['PS4', 'PS5', 'PC'];
const dateOptions = [
    { label: 'Дата выхода - сначала старые', value: 'asc' },
    { label: 'Дата выхода - сначала новые', value: 'desc' },
    { label: 'По возрастанию цены', value: 'priceAsc' },
    { label: 'По убыванию цены', value: 'priceDesc' },
    { label: 'Сначала популярные', value: 'popular' }
];

// Добавляем маппинг категорий
const categoryMapping: { [key: string]: string } = {
    'sport': 'Спорт',
    'car': 'Гонки',
    'fighting': 'Файтинги',
    'popular': 'Популярное',
    'discount': 'Скидки',
    'preorder': 'Предзаказы',
    'new': 'Новинки'
};

const Catalog = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isContentVisible, setIsContentVisible] = useState<boolean>(true);
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useAppDispatch();
    const { products, isLoading, hasMore, filters } = useAppSelector(state => state.catalog);
    const lastElementRef = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver | null>(null);

    const lastProductRef = useCallback((node: HTMLDivElement) => {
        if (isLoading) return;
        
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                console.log('Loading more products...');
                const nextPage = (filters.page || 0) + 1;
                dispatch(updateFilters({ ...filters, page: nextPage }));
                dispatch(fetchCatalogProducts({
                    ...filters,
                    page: nextPage,
                    isNewSearch: false
                }));
            }
        }, {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        });

        if (node) {
            observer.current.observe(node);
        }
    }, [isLoading, hasMore, filters, dispatch]);

    // Применяем параметры из URL при первой загрузке
    useEffect(() => {
        const sort = searchParams.get('sort');
        const discount = searchParams.get('discount');
        const category = searchParams.get('category');
        const platform = searchParams.get('platform');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');

        const newFilters: any = { 
            page: 0,
            minPrice: minPrice ? Number(minPrice) : 0,
            maxPrice: maxPrice ? Number(maxPrice) : 100000000000000000000
        };
        
        if (sort) {
            newFilters.byDesc = sort === 'desc';
        }
        if (discount === 'true') {
            newFilters.byDiscount = true;
        }
        if (category) {
            newFilters.filterName = category;
        }
        if (platform) {
            newFilters.platform = platform.toUpperCase();
        }

        dispatch(updateFilters(newFilters));
        dispatch(fetchCatalogProducts({ ...newFilters, isNewSearch: true }));
    }, []);

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            dispatch(updateFilters({ name: value, page: 0 }));
            dispatch(fetchCatalogProducts({ ...filters, name: value, page: 0, isNewSearch: true }));
        }, 500),
        [filters]
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        debouncedSearch(value);
    };

    const handlePlatformChange = (platform: string | null) => {
        if (platform) {
            const newFilters = { ...filters, platform, page: 0 };
            dispatch(updateFilters(newFilters));
            dispatch(fetchCatalogProducts({ ...newFilters, isNewSearch: true }));
        }
    };

    const handleSortChange = (option: string | null) => {
        if (option) {
            const selectedOption = dateOptions.find(opt => opt.label === option);
            if (selectedOption) {
                const newFilters = { ...filters, page: 0 };

                // Определяем тип фильтрации
                if (selectedOption.value.includes('price')) {
                    newFilters.filterName = 'Price';
                    newFilters.byDesc = selectedOption.value === 'priceDesc';
                } else if (selectedOption.value === 'popular') {
                    newFilters.filterName = 'Popular';
                    newFilters.byDesc = true;
                } else {
                    newFilters.filterName = 'Date';
                    newFilters.byDesc = selectedOption.value === 'desc';
                }
                
                dispatch(updateFilters(newFilters));
                dispatch(fetchCatalogProducts({ ...newFilters, isNewSearch: true }));
            }
        }
    };

    const handleDiscountChange = (checked: boolean) => {
        const newFilters = { ...filters, byDiscount: checked, page: 0 };
        dispatch(updateFilters(newFilters));
        dispatch(fetchCatalogProducts({ ...newFilters, isNewSearch: true }));
    };

    const handlePriceChange = (minPrice: number, maxPrice: number) => {
        const newFilters = { 
            ...filters, 
            minPrice: minPrice || 0,
            maxPrice: maxPrice || 100000000000000000000,
            page: 0 
        };
        dispatch(updateFilters(newFilters));
        dispatch(fetchCatalogProducts({ ...newFilters, isNewSearch: true }));
    };

    const toggleCategory = (category: string) => {
        const filterName = Object.entries(categoryMapping).find(([_, value]) => value === category)?.[0] || '';
        const newFilters = { ...filters, filterName, page: 0 };
        dispatch(updateFilters(newFilters));
        dispatch(fetchCatalogProducts({ ...newFilters, isNewSearch: true }));
    };

    return (
        <div className={s.catalog}>
            <div style={{marginBottom: '15px'}} className={s.searchDiv}>
                <div  className={s.inputDiv}>
                    <SearchInput 
                        noMargin={true}
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                </div>
                <button 
                    className={`${s.filterBtn} ${isContentVisible ? '' : s.filled}`} 
                    onClick={() => setIsContentVisible(!isContentVisible)}
                >
                    <FilterIcon />
                </button>
            </div>
            <div className={`${s.content} ${isContentVisible ? s.visible : s.hidden}`}>
                <div className={s.selects}>
                    <CustomSelect 
                        type='platform' 
                        noMargin={true} 
                        options={platformOptions} 
                        onSelect={handlePlatformChange} 
                        placeholder='Платформа'
                    />
                    <CustomSelect 
                        type='date' 
                        noMargin={true} 
                        options={dateOptions.map(opt => opt.label)} 
                        onSelect={handleSortChange} 
                        placeholder='Выберите фильтр'
                    />
                </div>
                <div className={s.checkboxdiv}>
                    <Checkbox 
                        onChange={handleDiscountChange} 
                        checked={filters.byDiscount}
                    />
                    <p>Сначала со скидкой</p>
                </div>
                <OpenableBlock title='Категории'>
                    <CategoriesChoose 
                        toggleCategory={toggleCategory} 
                        activeCategories={[categoryMapping[filters.filterName] || '']}
                    />
                </OpenableBlock>
                <PriceFilter 
                    noMargin={true} 
                    onPriceChange={handlePriceChange}
                    minPrice={filters.minPrice}
                    maxPrice={filters.maxPrice}
                />
                <div className={s.margin}>
                    <Title noMargin={true} text='Каталог'/>
                </div>
            </div>
            <div className={s.list}>
                {products.map((item, index) => {
                    const isSecondToLast = index === products.length - 2;
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
                            key={`${item.productId}-${index}`}
                            ref={isSecondToLast ? lastProductRef : null}
                            notDonate={true}
                            title={item.name}
                            id={item.productId}
                            currentPrice={currentPrice}
                            oldPrice={oldPrice}
                            image={item.imageFilepath}
                            discount={discount}
                        />
                    );
                })}
                {isLoading && (
                    <div className={s.loader}>
                        <Loader />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Catalog;