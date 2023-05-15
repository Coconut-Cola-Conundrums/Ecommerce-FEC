import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaCheckCircle } from 'react-icons/fa'

const ProductDescription = () => {
  const product = useSelector((state) => state.product);
  const {productInformation} = product;

  useEffect(() => {

  }, [product.id])
  console.log(product);
  return (
    <div style={{left: "4vh", top: "5vh", position: "relative", width: "78vh"}}>
      {productInformation.slogan ?
        <div className="wrapper" style={{padding: "1vh"}}>
          <div style={{borderRight: "1px solid", paddingRight: "5vh", paddingBottom: "5vh", }}>
            <h2>{productInformation.slogan}</h2>
            <p>{productInformation.description}</p>
          </div>
          {productInformation.features &&
            <div className="inlineBlock" style={{paddingLeft: "5vh", width: "30vh"}}>
            {productInformation.features.map((feature, index) =>
              <p key={index}><FaCheckCircle />{feature.feature}: {feature.value}</p>
              )}
            </div>
          }
        </div>
      : null
      }
    </div>
  )
}
export default ProductDescription