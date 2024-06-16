import React, { useState } from 'react';
import { Button, Drawer, Menu } from 'antd';
import { MenuOutlined } from "@ant-design/icons";
import {Link} from "react-router-dom";



const SidebarMenu: React.FC = () => {
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

    const showDrawer = () => {
        setDrawerVisible(true);
    }

    const closeDrawer = () => {
        setDrawerVisible(false);
    }

    const menuItems:{key: string, label: any}[] = [
        { key: '1', label: <Link to={'/applications'}>Главная</Link> },
        { key: '2', label: <Link to={'/employees'}>Сотрудники</Link> },
        { key: '3', label: <Link to={'/passengers'}>Пассажиры</Link> },
    ];

    // const handleMenuClick = (e: any) => {
    //     onMenuItemClick(e.key);
    //     closeDrawer();
    // }

    const menuItemsFormatted = menuItems.map(item => ({
        key: item.key,
        label: item.label,
    }));

    return (
        <>
            <Button type="primary" icon={<MenuOutlined />} onClick={showDrawer} />
            <Drawer
                title="Меню"
                placement="left"
                onClose={closeDrawer}
                open={drawerVisible}
            >
                <Menu
                    mode="inline"
                    items={menuItemsFormatted}
                    // onClick={handleMenuClick}
                >
                    {/*{menuItems.map(item => (*/}
                    {/*    <Menu.Item key={item.key}>{item.label}</Menu.Item>*/}
                    {/*))}*/}
                </Menu>
            </Drawer>
        </>
    );
}

export default SidebarMenu;
