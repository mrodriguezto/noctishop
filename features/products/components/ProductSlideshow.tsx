import { Slide } from 'react-slideshow-image';
import styles from './ProductSlideshow.module.css';

type Props = {
  imgs: string[];
};

const ProductSlideshow = ({ imgs }: Props) => {
  return (
    <Slide easing="cubic" duration={5000} transitionDuration={200} indicators>
      {imgs.map(img => {
        return (
          <div key={img} className={styles['each-slide']}>
            <div
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
              }}
            />
          </div>
        );
      })}
    </Slide>
  );
};

export default ProductSlideshow;
