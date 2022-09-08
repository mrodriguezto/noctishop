import { Grid, Card, CardContent, Typography, Box } from '@mui/material';

type Props = {
  title: string | number;
  subTitle: string;
  icon: React.ReactNode;
};

const SummaryTile = ({ title, subTitle, icon }: Props) => {
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card sx={{ display: 'flex', padding: '4px 6px' }} elevation={1}>
        <CardContent>
          {icon}
          <Box paddingLeft={0.3}>
            <Typography variant="h3">{title}</Typography>
            <Typography variant="caption" whiteSpace="pre-wrap">
              {subTitle}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SummaryTile;
