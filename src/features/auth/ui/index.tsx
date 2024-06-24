import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'router/routes';
import { getToken } from 'store/userData';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { SignInForm } from './formSignIn';

import s from './auth.module.css';
import { styles } from './muiStyle';
import { SignUpForm } from './formSignUp';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const AuthForm = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const token = useSelector(getToken);

  if (token) return <Navigate to={ROUTES.PROFILE} />;

  return (
    <Box
      width={364}
      sx={{
        margin: '40px auto',
        backgroundColor: '#ffffff',
      }}
    >
      <div className={s.header}>
        <div className={s.title}>Hello, world!</div>
        <div className={s.subtitle}>{value ? 'Пройдите авторизацию' : 'Создайте аккаунт'}</div>
      </div>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Авторизация" {...a11yProps(0)} sx={styles.tab} />
          <Tab label="Регистрация" {...a11yProps(1)} sx={styles.tab} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <SignInForm />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SignUpForm />
      </CustomTabPanel>
    </Box>
  );
};
