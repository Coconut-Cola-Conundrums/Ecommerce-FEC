import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaCheckCircle } from 'react-icons/fa'

const ProductDescription = () => {
  const product = useSelector((state) => state.product);
  const {productInformation} = product;

  useEffect(() => {

  }, [product.id])

  return (
    // <div style={{left: "4vh", top: "5vh", position: "relative", width: "78vh"}}>
    <div style={{ width: "150%", display: "flex"}}>
      {productInformation.slogan ?
        <div style={{display: "flex"}}>
          <div style={{borderRight: "1px solid", display:"inline", paddingRight: "5vh", width: "56%"}}>
            <h2>{productInformation.slogan}</h2>
            <p>{productInformation.description}</p>
          </div>
          {productInformation.features &&
            // <div className="inlineBlock" style={{paddingLeft: "5vh", width: "30vh"}} id="features">
            <div style={{display: "inline", paddingLeft: "4vh", float: "right"}}>
            {productInformation.features.map((feature, index) =>
              <p key={index} data-testid="feature"><FaCheckCircle style={{marginRight: "0.5rem"}}/>{feature.feature}: {feature.value}</p>
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