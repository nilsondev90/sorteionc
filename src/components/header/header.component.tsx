import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Chip,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom';

import { useContext } from 'react'
import { UserContext } from '../../contexts/user.contexts'

import { useAppSelector } from '../../hooks/redux.hooks'

// Firebase
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase.config'

import { logoutUser } from '../../store/toolkit/user/user.slice'

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sair",
    icon: PowerIcon,
    onclick: () => {
      const dispatch = useDispatch();
      const handleItemClick = () => {
        dispatch(logoutUser());
        signOut(auth);
        console.log("Usuário Desconectado!")
      };
      handleItemClick();
    }
  },
];

// profile menu component
const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const { isAuthenticated } = useContext(UserContext);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    signOut(auth);
    console.log("Usuário Desconectado!");
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <MenuItem
          onClick={closeMenu}
          className={`flex items-center gap-2 rounded`}
        >
          {React.createElement(UserCircleIcon, {
            className: `h-4 w-4`,
            strokeWidth: 2,
          })}
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color={"inherit"}
          >
            My Profile
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={closeMenu}
          className={`flex items-center gap-2 rounded`}
        >
          {React.createElement(Cog6ToothIcon, {
            className: `h-4 w-4`,
            strokeWidth: 2,
          })}
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color={"inherit"}
          >
            Edit Profile
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={closeMenu}
          className={`flex items-center gap-2 rounded`}
        >
          {React.createElement(InboxArrowDownIcon, {
            className: `h-4 w-4`,
            strokeWidth: 2,
          })}
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color={"inherit"}
          >
            Inbox
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={closeMenu}
          className={`flex items-center gap-2 rounded`}
        >
          {React.createElement(LifebuoyIcon, {
            className: `h-4 w-4`,
            strokeWidth: 2,
          })}
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color={"inherit"}
          >
            Help
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            closeMenu();
            handleLogout();
          }}
          className={`flex items-center gap-2 rounded`}
        >
          {React.createElement(PowerIcon, {
            className: `h-4 w-4`,
            strokeWidth: 2,
          })}
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color={"inherit"}
          >
            Sair
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}


const navListMenuItems = [
  {
    title: "Cliente",
    description: "Cadastrar / Listar / Alterar",
    icon: SquaresPlusIcon,
    link: "/cliente"
  },
  {
    title: "About Us",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
    link: "/about-us"
  },
  {
    title: "Blog",
    description: "Find the perfect solution for your needs.",
    icon: Bars4Icon,
    link: "/blog"
  },
  {
    title: "Services",
    description: "Learn how we can help you achieve your goals.",
    icon: SunIcon,
    link: "/services"
  },
  {
    title: "Support",
    description: "Reach out to us for assistance or inquiries",
    icon: GlobeAmericasIcon,
    link: "/support"
  },
  {
    title: "Contact",
    description: "Find the perfect solution for your needs.",
    icon: PhoneIcon,
    link: "/contact"
  },
  {
    title: "News",
    description: "Read insightful articles, tips, and expert opinions.",
    icon: NewspaperIcon,
    link: "/news"
  },
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: RectangleGroupIcon,
    link: "/products"
  },
  {
    title: "Special Offers",
    description: "Explore limited-time deals and bundles",
    icon: TagIcon,
    link: "/special-offers"
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  // Verificar se o usuário está autenticado
  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer
  )

  const handleItemClick = (link: string) => {
    if (isAuthenticated) {
      navigate(link);
      setIsMenuOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const renderItems = navListMenuItems.map(({ icon, title, description, link }, key) => (
    <MenuItem
      key={key}
      onClick={() => handleItemClick(link)}
      className="flex items-center gap-3 rounded-lg cursor-pointer"
    >
      <div className="flex items-center justify-center rounded-lg bg-blue-gray-50 p-2">
        {React.createElement(icon, {
          strokeWidth: 2,
          className: "h-6 text-gray-900 w-6",
        })}
      </div>
      <div>
        <Typography
          variant="h6"
          color="blue-gray"
          className="flex items-center text-sm font-bold"
        >
          {title}
        </Typography>
        <Typography
          variant="paragraph"
          className="text-xs font-medium text-blue-gray-500"
        >
          {description}
        </Typography>
      </div>
    </MenuItem>
  ));

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Recursos
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}


function NavList() {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
    //setIsMenuOpen(false);
    //setIsMobileMenuOpen(false);
  };
  // Verificar se o usuário está autenticado
  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer
  )
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem onClick={handleHomeClick} className="flex items-center gap-2 py-2 pr-4">Início</ListItem>
      </Typography>
      {
        isAuthenticated && ( // Se o usuário não estiver autenticado
          <NavListMenu />
        )
      }
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          Contato
        </ListItem>
      </Typography>
    </List>
  );
}

export function Header() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  // Verificar se o usuário está autenticado
  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer
  )

  console.log("Autenticado: " + isAuthenticated)

  const handleLogoClick = () => {
    navigate('/')
  }

  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/login')
  }
  const handleSignUpClick = () => {
    navigate('/sign-up')
  }




  return (
    <Navbar className="p-4 w-full bg-gray-100">
      <div className="w-full flex items-center justify-between text-blue-gray-900">
        <Typography
          onClick={handleLogoClick}
          as="a"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          Entregas Já
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden lg:flex items-center gap-2">
          {/* <Chip
            variant="ghost"
            color="green"
            size="sm"
            value="Online"
            icon={
              <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
            }
          /> */}
          {/* <Chip
            variant="ghost"
            color="red"
            size="sm"
            value="Offline"
            icon={
              <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-red-900 content-['']" />
            }
          /> */}

          {
            !isAuthenticated && ( // Se o usuário estiver autenticado
              <>
                <Button onClick={handleLoginClick} variant="text" size="sm" color="blue-gray">
                  Entrar
                </Button>
                <Button onClick={handleSignUpClick} variant="gradient" size="sm">
                  Cadastrar
                </Button>
              </>
            )
          }
          {
            isAuthenticated && ( // Se o usuário não estiver autenticado
              <ProfileMenu />
            )
          }

        </div>
        <div className="lg:hidden flex items-center">
          <ProfileMenu />
          <IconButton
            variant="text"
            color="blue-gray"
            className="ml-2"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Button onClick={handleLoginClick} variant="outlined" size="sm" color="blue-gray" fullWidth>
            Entrar
          </Button>
          <Button variant="gradient" size="sm" fullWidth>
            Cadastrar
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}
