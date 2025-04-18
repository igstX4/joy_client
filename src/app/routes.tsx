import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router";
import ChooseRegion from '../pages//ChooseRegion/ChooseRegion';
import GlobalLayout from "../components/layouts/GlobalLayout/GlobalLayout";
import MainPage from "../pages/MainPage/MainPage";
import DonatePage from "../pages/DonatePage/DonatePage";
import DetailedPage from "../pages/DetailedPage/DetailedPage";
import Catalog from "../pages/Catalog/Catalog";
import Profile from "../pages/Profile/Profile";
import Deposit from "../pages/Deposit/Deposit";
import Favourite from "../pages/Favourite/Favourite";
import Cart from "../pages/Cart/Cart";
import BuyHistory from "../pages/BuyHistory/BuyHistory";
import { Login } from "../pages/admin/Login/Login";
import { Registration } from "../pages/admin/Registration/Registration";
import { AdminLayout } from "../pages/admin/AdminLayout/AdminLayout";
import News from "../pages/admin/News/News";
import Prices from "../pages/admin/Prices/Prices";
import AddAdmins from "../pages/admin/AddAdmins/AddAdmins";
import Loyalty from "../pages/admin/Loyalty/Loyalty";
import Blacklist from "../pages/admin/Blacklist/Blacklist";
import GamesInSections from "../pages/admin/GamesInSections/GamesInSections";
import TransactionHistory from "../pages/admin/TransactionHistory/TransactionHistory";
import Donate from "../pages/admin/Donate/Donate";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../components/shared/PageTransition";
import { TelegramInitializer } from "../components/TelegramInitializer";
import { useAppSelector } from '../store/hooks';
import Cookies from 'js-cookie';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layouts/GlobalLayout/GlobalLayout';

const AnimatedRoutes = () => {
    const location = useLocation();
    const { user, isAuth } = useAppSelector(state => state.user);

    // Если пользователь не авторизован и не находится на странице региона,
    // перенаправляем на выбор региона
    if (!isAuth && Cookies.get('region') !== 'TRY' && Cookies.get('region') !== 'UAH' && location.pathname !== '/region') {
        return <Navigate to="/region" replace />;
    }

    return (
        <>
            <TelegramInitializer />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="region" element={
                        <PageTransition>
                            <ChooseRegion />
                        </PageTransition>
                    } />
                    <Route path="panel-login" element={<Login />} />
                    <Route path="panel-registration" element={<Registration />} />
                    <Route path="/" element={<GlobalLayout />}>
                        <Route path="" element={
                            <PageTransition>
                                <MainPage />
                            </PageTransition>
                        } />
                        <Route path="/donate" element={
                            <PageTransition>
                                <DonatePage />
                            </PageTransition>
                        } />
                        <Route path="/game/:productId" element={
                            <PageTransition>
                                <DetailedPage type="games" />
                            </PageTransition>
                        } />
                        <Route path="/donate/:id" element={
                            <PageTransition>
                                <DetailedPage type="donate" />
                            </PageTransition>
                        } />
                        <Route path="/subscription/:id" element={
                            <PageTransition>
                                <DetailedPage type="subscription" />
                            </PageTransition>
                        } />
                        <Route path="/catalog" element={
                            <PageTransition>
                                <Catalog />
                            </PageTransition>
                        }/>
                        <Route path="/profile" element={
                            <PageTransition>
                                <Profile />
                            </PageTransition>
                        }/>
                        <Route path="/deposit" element={
                            <PageTransition>
                                <Deposit />
                            </PageTransition>
                        }/>
                        <Route path="/favourite" element={
                            <PageTransition>
                                <Favourite />
                            </PageTransition>
                        }/>
                        <Route path="/cart" element={
                            <PageTransition>
                                <Cart />
                            </PageTransition>
                        }/>
                        <Route path="/history" element={
                            <PageTransition>
                                <BuyHistory />
                            </PageTransition>
                        }/>
                    </Route>
                    <Route path="panel" element={<AdminLayout />}>
                        <Route path="" element={
                            <PageTransition>
                                <News />
                            </PageTransition>
                        }/>
                        <Route path="news" element={
                            <PageTransition>
                                <News />
                            </PageTransition>
                        }/>
                        <Route path="prices" element={
                            <PageTransition>
                                <Prices />
                            </PageTransition>
                        }/>
                        <Route path="add-admins" element={
                            <PageTransition>
                                <AddAdmins />
                            </PageTransition>
                        }/>
                        <Route path="loyalty" element={
                            <PageTransition>
                                <Loyalty />
                            </PageTransition>
                        }/>
                        <Route path="transaction-history" element={
                            <PageTransition>
                                <TransactionHistory />
                            </PageTransition>
                        }/>
                        <Route path="blacklist" element={
                            <PageTransition>
                                <Blacklist />
                            </PageTransition>
                        }/>
                        <Route path="games-in-sections" element={
                            <PageTransition>
                                <GamesInSections />
                            </PageTransition>
                        }/>
                        <Route path="donate" element={
                            <PageTransition>
                                <Donate />
                            </PageTransition>
                        }/>
                    </Route>
                </Routes>
            </AnimatePresence>
        </>
    );
}

export const RoutesApp = () => {
    return (
        <BrowserRouter>
            <AnimatedRoutes />
        </BrowserRouter>
    );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: '/game/:productId',
        element: <DetailedPage type="games" />
      },
    ]
  }
]);