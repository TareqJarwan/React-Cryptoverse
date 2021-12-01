import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

import icon from '../../images/cryptocurrency.png';

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setActiveMenu(screenSize > 768);
    }, [screenSize]);

    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={icon} size="large" />
                <Typography.Title level={2} className="logo">
                    <Link to="/">Cryptoverse</Link>
                </Typography.Title>
                <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
                    <MenuOutlined />
                </Button>
            </div>
            {activeMenu && (
                <Menu theme="dark">
                    <Menu.Item icon={<HomeOutlined />} key={1}>
                        <NavLink to="/">Home</NavLink>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />} key={2}>
                        <NavLink to="/cryptocurrencies">Cryptocurrencies</NavLink>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined />} key={3}>
                        <NavLink to="/exchanges">Exchanges</NavLink>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined />} key={4}>
                        <NavLink to="/news">News</NavLink>
                    </Menu.Item>
                </Menu>
            )}

        </div>
    )
}

export default Navbar
