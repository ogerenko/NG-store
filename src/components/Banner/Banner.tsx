import { Link } from 'react-router-dom';
import { useSwipe } from '../../hooks/useSwipe';
import './Banner.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

const slides = [
  {
    image: './img/banner-images/banner-phones.png',
    link: '/phones',
  },
  {
    image: './img/banner-images/banner-tablets.png',
    link: '/tablets',
  },
  {
    image: './img/banner-images/banner-accessories.png',
    link: '/accessories',
  },
];

export const Banner = () => {
  const [slidesOrder, setSlidesOrder] = useState([slides.length - 1, 0, 1]);

  const handleMoveSlidesLeft = () => {
    setSlidesOrder(prev => {
      const firstIndex = 0;
      const lastIndex = slides.length - 1;

      return prev.map(x => {
        if (x === firstIndex) {
          return lastIndex;
        }

        return x - 1;
      });
    });
  };

  const handleMoveSlidesRight = () => {
    setSlidesOrder(prev => {
      const lastIndex = slides.length - 1;

      return prev.map(x => {
        if (x === lastIndex) {
          return 0;
        }

        return x + 1;
      });
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleMoveSlidesRight();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const elementRef = useSwipe(handleMoveSlidesLeft, handleMoveSlidesRight);

  return (
    <div className="banner">
      <div className="carousel">
        <button
          className="carousel__button carousel__button--left"
          onClick={handleMoveSlidesLeft}
        />

        <div className="carousel__container" ref={elementRef}>
          {slides.map((slide, index) => (
            <Link to={slide.link} key={slide.image}>
              <img
                className={classNames('container__slide', {
                  'container__slide--active': index === slidesOrder[1],
                  'container__slide--prev': index === slidesOrder[0],
                  'container__slide--next': index === slidesOrder[2],
                })}
                src={slide.image}
              />
            </Link>
          ))}
        </div>

        <button
          onClick={handleMoveSlidesRight}
          className="carousel__button carousel__button--right"
        />
      </div>

      <div className="slide-indicators">
        {slides.map((_, index) => (
          <img
            key={index}
            src={
              index === slidesOrder[1]
                ? './img/icons-image/icon-count-active.svg'
                : './img/icons-image/icon-count-not-active.svg'
            }
          />
        ))}
      </div>
    </div>
  );
};
