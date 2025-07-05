import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiPackage } from 'react-icons/fi';

function NavbarBuyer() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <Header>
            <Nav>
                <LogoContainer to="/home">
                    <Logo>ClickShop</Logo>
                </LogoContainer>

                <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </MenuButton>

                <NavItems isOpen={isMenuOpen}>
                    <NavLink to="/home" onClick={() => setIsMenuOpen(false)}>
                        <NavItem>Home</NavItem>
                    </NavLink>
                    <NavLink to="/products" onClick={() => setIsMenuOpen(false)}>
                        <NavItem>Products</NavItem>
                    </NavLink>
                    <NavLink to="/orders" onClick={() => setIsMenuOpen(false)}>
                        <NavItem>My Orders</NavItem>
                    </NavLink>
                    <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
                        <NavItem>About</NavItem>
                    </NavLink>
                </NavItems>

                <Actions>
                    <IconButton to="/cart">
                        <FiShoppingCart size={20} />
                        <IconLabel>Cart</IconLabel>
                    </IconButton>
                    <IconButton to="/profile">
                        <FiUser size={20} />
                        <IconLabel>Profile</IconLabel>
                    </IconButton>
                </Actions>
            </Nav>
        </Header>
    );
}

const Header = styled.header`
    background: ${theme.colors.background};
    box-shadow: ${theme.shadows.sm};
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
`;

const Nav = styled.nav`
    max-width: 1200px;
    margin: 0 auto;
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    @media (max-width: ${theme.breakpoints.sm}) {
        padding: ${theme.spacing.sm} ${theme.spacing.md};
    }
`;

const LogoContainer = styled(Link)`
    text-decoration: none;
    z-index: 2;
`;

const Logo = styled.h1`
    font-size: ${theme.typography.sizes.xl};
    font-weight: 700;
    color: ${theme.colors.primary};
    margin: 0;
    
    @media (max-width: ${theme.breakpoints.sm}) {
        font-size: ${theme.typography.sizes.lg};
    }
`;

const MenuButton = styled.button`
    display: none;
    background: none;
    border: none;
    color: ${theme.colors.text};
    cursor: pointer;
    padding: ${theme.spacing.sm};
    z-index: 2;

    @media (max-width: ${theme.breakpoints.md}) {
        display: block;
    }
`;

const NavItems = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xl};

    @media (max-width: ${theme.breakpoints.md}) {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${theme.colors.background};
        flex-direction: column;
        justify-content: center;
        transform: translateX(${props => props.isOpen ? '0' : '100%'});
        transition: transform 0.3s ease-in-out;
        z-index: 1;
        box-shadow: ${props => props.isOpen ? theme.shadows.lg : 'none'};
    }
`;

const NavItem = styled.span`
    color: ${theme.colors.text};
    font-size: ${theme.typography.sizes.base};
    font-weight: 500;
    transition: ${theme.transitions.default};

    &:hover {
        color: ${theme.colors.primary};
    }
    
    @media (max-width: ${theme.breakpoints.md}) {
        font-size: ${theme.typography.sizes.lg};
        margin: ${theme.spacing.sm} 0;
        padding: ${theme.spacing.md};
    }
`;

const Actions = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    z-index: 2;
    
    @media (max-width: ${theme.breakpoints.md}) {
        gap: ${theme.spacing.sm};
    }
    
    @media (max-width: ${theme.breakpoints.sm}) {
        gap: ${theme.spacing.xs};
    }
`;

const IconButton = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing.xs};
    color: ${theme.colors.text};
    text-decoration: none;
    transition: ${theme.transitions.default};
    padding: ${theme.spacing.xs};

    &:hover {
        color: ${theme.colors.primary};
    }
    
    @media (max-width: ${theme.breakpoints.sm}) {
        padding: ${theme.spacing.xs} ${theme.spacing.xs};
    }
`;

const IconLabel = styled.span`
    font-size: ${theme.typography.sizes.xs};
    font-weight: 500;
    
    @media (max-width: ${theme.breakpoints.sm}) {
        font-size: ${theme.typography.sizes.xs};
    }
`;

export default NavbarBuyer;