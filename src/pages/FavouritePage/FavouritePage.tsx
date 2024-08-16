import './FavouritePage.scss';
import { ProductCard } from '../../components/ProductCard';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { HistoryPath } from '../../components/HistoryPath';

export const FavouritePage = () => {
  const { favouriteProducts } = useContext(StoreContext);

  return (
    <div className="favourite-page">
      <HistoryPath />

      <h1 className="favourite-title">Favourites</h1>

      {!!favouriteProducts.length && (
        <div className="favourite-amount">{`${favouriteProducts.length} models`}</div>
      )}

      {!!!favouriteProducts.length ? (
        <div className="favourite-page--is-empty" />
      ) : (
        <div className="products-cards product-cards--in-favourites">
          {favouriteProducts.map(product => (
            <ProductCard key={product.id} isDiscount product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
