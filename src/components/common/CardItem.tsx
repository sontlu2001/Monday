import { Card, CardContent, Typography } from "@mui/material";
import { ICardItem } from "../../pages/borrower/interfaces/card";

export default function CardItem({
  title,
  value,
  color 
}: ICardItem) {
  return(
    <Card sx={{
      boxShadow: 'unset',
      border: `1px solid #D9D9D9`
    }}>
      <CardContent>
        <Typography sx={{ fontSize: 20, fontWeight: 500 }} variant="body1">
          {title}
        </Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 500, color: color }} variant="body2">
          {value}
        </Typography>
      </CardContent>
    </Card>
  )
  
};
