import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './ProductsPage.scss';
import { Product } from '../../types/Product';
import { getPrepearedProducts } from '../../utils/getPrepearedProducts';
import { FilterForms } from '../../components/FilterForms';
import { ProductCard } from '../../components/ProductCard';
import { Pagination } from '../../components/Pagination';
import { capitalize } from '../../utils';
import { ProductType } from '../../types/ProductType';
import { StoreContext } from '../../context/StoreContext';
import { Loader } from '../../components/Loader';
import { ProductNotFound } from '../../components/ProductNotFound';
import { HistoryPath } from '../../components/HistoryPath';

type Props = {
  type: ProductType;
};

export const ProductsPage: React.FC<Props> = ({ type }) => {
  const { allProducts, isErrorOfLoading } = useContext(StoreContext);

  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get('page') || 1;
  const onPageParam = searchParams.get('onPage') || 8;

  const [productsType, setProductsType] = useState<Product[]>([]);
  const [visiblePhones, setVisiblePhones] = useState<Product[]>([]);

  useEffect(() => {
    setProductsType(allProducts.filter(product => product.category === type));
  }, [setProductsType, type, allProducts]);

  useEffect(() => {
    const allPhones = getPrepearedProducts(productsType, searchParams);

    if (!Number.isNaN(+onPageParam)) {
      const visibleOnPagePhones = allPhones.slice(
        (+pageParam - 1) * +onPageParam,
        +pageParam * +onPageParam,
      );

      setVisiblePhones(visibleOnPagePhones);
    } else {
      setVisiblePhones(allPhones);
    }
  }, [productsType, searchParams, onPageParam, pageParam]);

  return (
    <>
      <HistoryPath />

      {!!!productsType.length && !isErrorOfLoading ? (
        <div className="full-height-container">
          <Loader />
        </div>
      ) : (
        <>
          <h1 className="products-title">{capitalize(type)}</h1>

          <div className="products-amount">{`${productsType.length} models`}</div>

          <FilterForms />

          {!!!visiblePhones.length ? (
            <ProductNotFound />
          ) : (
            <div className="products-cards">
              {visiblePhones.map(product => (
                <ProductCard key={product.id} isDiscount product={product} />
              ))}
            </div>
          )}

          <Pagination products={productsType} />
        </>
      )}
    </>
  );
};
