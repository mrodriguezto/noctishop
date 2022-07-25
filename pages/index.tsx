import type { NextPage } from "next";
import { Typography } from "@mui/material";

import ShopLayout from "@/layout/ShopLayout";

const Home: NextPage = () => {
  return (
    <ShopLayout
      pageTitle={"Nocti-Shop"}
      pageDescription={"Encuentra los mejores productos"}
    >
      <Typography variant='h1' component='h1'>
        Tienda
      </Typography>

      <Typography variant='h2' sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
    </ShopLayout>
  );
};

export default Home;
