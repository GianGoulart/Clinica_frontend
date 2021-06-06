import { Helmet } from 'react-helmet';
import { Box } from '@material-ui/core';
import SettingsNotifications from 'src/components/settings/SettingsNotifications';
import SettingsPassword from 'src/components/settings/SettingsPassword';
// import CustomerList from './CustomerList';

const SettingsView = () => (
  <>
    <Helmet>
      <title>Settings | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      {/* <CustomerList /> */}
      <SettingsNotifications />
      <Box sx={{ pt: 3 }}>
        <SettingsPassword />
      </Box>
    </Box>
  </>
);

export default SettingsView;
