import { Grid, styled } from '@mui/material';
import React from 'react';
import theme from '../../../theme';

interface HomeTemplateProps {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  content: React.ReactNode; 
}

const Container = styled(Grid)({
  width: '100%',
  height: '100%',
  margin: '-8px',
  padding: '0px',
  color: 'black',
  display: 'grid',
  gridTemplateColumns: 'minmax(70px, max-content) 1fr minmax(398px, max-content)',
  gridTemplateRows: 'minmax(60px, max-content) 1fr minmax(90px, max-content)',
  gridTemplateAreas: `
    "header header header"
    "sidebar content content"
    "sidebar content content"
  `,
});

const NavigationBar = styled(Grid)(({ sidebar }: { sidebar: React.ReactNode }) => ({
  gridArea: 'sidebar',
  border: sidebar ? 'none' : `1px solid ${theme.palette.grey[100]}`,
}));

const Header = styled(Grid)(({ header }: { header: React.ReactNode }) => ({
  gridArea: 'header',
  border: header ? 'none' : `1px solid ${theme.palette.grey[100]}`,
})); 

const ScrollableContent = styled(Grid)(({ scrollableContent }: { scrollableContent: React.ReactNode }) =>({
  gridArea: 'content',
  border: scrollableContent ? 'none' : `1px solid ${theme.palette.grey[100]}`,
  backgroundColor: theme.palette.structural.white
   
}));

const HomeTemplate = ({
  sidebar,
  header,
  content,
 
}: HomeTemplateProps) => {
  return (
    <Container>
      <NavigationBar data-testid="default-sidebar" sidebar={sidebar} className="sidebar">
        {sidebar}
      </NavigationBar>
      <Header header={header}  data-testid="default-header"  className="header">
        {header}
      </Header>
      <ScrollableContent scrollableContent={content}  data-testid="default-content"  className="maincontent">
        {content}
      </ScrollableContent> 
    </Container>
  );
};

export default HomeTemplate;
