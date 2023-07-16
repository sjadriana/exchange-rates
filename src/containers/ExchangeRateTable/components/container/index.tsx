import React, { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type PageProps = {
    children: ReactNode
}

const Page = ({ children }: PageProps) => {
    const { t } = useTranslation()
    const theme = createTheme({
        palette: {
            primary: { main: '#002C63', },
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <AppBar color="primary">
                <Toolbar>
                    <Typography variant="h6" component="div">
                        {t('general.welcome')}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Container>
                <Box
                    sx={{ my: 6 }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    {children}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Page