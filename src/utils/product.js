/** @module product */

/**
 * Checks whether a similar product is in the cart
 * @param {Array} cart - The cart array
 * @param {Object} product - The product Object
 * @returns {boolean} true if there is the same product in the cart, not necessarily the same attributes,
 *  false otherwise
 */
export const isSimilarProductInCart = (cart, product) => {
  return cart.some(cartItem => cartItem.id === product.id)
}

/**
 * Checks whether product with exact same attributes is in cart
 * @param {Array} cart - The cart Array 
 * @param {Object} product - The product Object 
 * @returns {boolean} true if this exact product with exact same attributes is in the cart,
 *  false otherwise
 */
export const isInCart = (cart, product) => {

  const isInCart = cart.some((cartItem, index) => {
    let isEveryAttMatches
    if (cartItem.id === product.id) {
      // product in the cart; check if every attribute matches the product in the cart
      isEveryAttMatches = cart[index].chosenAttributes.every(
        cartChosenAttribute => {
          // find index of equivalent cart attribute in the product object
          const productChosenAttributeIndex =
            product.chosenAttributes.findIndex(
              productChosenAttribute =>
                productChosenAttribute.attributeID ===
                cartChosenAttribute.attributeID
            )
          // compare product attribute with the exact same cart attribute
          return (
            product.chosenAttributes[productChosenAttributeIndex].itemID ===
            cartChosenAttribute.itemID
          )
        }
      )
    }
    return isEveryAttMatches
  })

  return isInCart
}
