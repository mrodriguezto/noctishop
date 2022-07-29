import useSWR, { SWRConfiguration } from 'swr';
import { IProduct } from 'types/products';

const useProducts = (path: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IProduct[]>(`/api${path}`, config);

  return {
    products: data || [],
    isLoading: !error && !data,
    error,
  };
};

export default useProducts;
