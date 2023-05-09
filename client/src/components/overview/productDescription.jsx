import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ProductDescription = () => {
  const product = useSelector((state) => state.product);
  const {productInformation} = product;

  useEffect(() => {

  }, [product.id])

  return (
    <div>
      {productInformation.slogan ?
        <>
          <div className="wrapper">
            <div className="inlineBlock">
              <h2>{productInformation.slogan}</h2>
              <p>{productInformation.description}</p>

            </div>
            {productInformation.features &&
              <div className="verticleLine inlineBlock"></div>
            }
            {productInformation.features &&
              <div className="inlineBlock">
              {productInformation.features.map((feature, index) =>
                <p className="block" key={index}>{feature.feature} : {feature.value}</p>
                )}
              </div>
            }
          </div>
        </>
      : null
      }
    </div>
  )
}
export default ProductDescription