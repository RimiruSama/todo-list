import React from 'react';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

const style = {
    color: 'white',
    borderWeight: '600',
    textDecoration: 'none',
    cursor: 'pointer'
}

const Header = () => {
    return (
        <div style={{ width: "100%", backgroundColor: '#343a3f' }}>
            <Container
                maxWidth='xl'
                sx={{ padding: '10px 0', display: 'flex', gap: '2rem', alignItems: 'center' }}
            >
                <Link 
                    variant="h3"
                    sx={style}
                >Todo List</Link>

                <Link 
                    variant="h5"
                    sx={style}
                >Home</Link>

                <Link 
                    variant="h5"
                    sx={style}
                >Todo List</Link>
            </Container>
        </div>
    );
};

export default Header;