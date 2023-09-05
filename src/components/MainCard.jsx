import { Card, CardContent, CardHeader } from '@mui/material';
import { Typography } from 'antd';

export default function MainCard({ children, title }) {
  return (
    <>
      <Card>{children}</Card>
    </>
  );
}
