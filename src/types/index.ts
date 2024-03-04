export interface DetailScreenProps {
  route: {
    params: ProductProps;
  };
}

export interface ProductProps {
  product: ProductAPIResponseInterface;
}

export interface ProductAPIResponseInterface {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}
