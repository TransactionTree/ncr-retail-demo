import { getCatalogItems, getCatalogItemPricesByItemCodes, getCatalogItemAttributesByItemCodes } from '../../lib/catalog';

export default async function handler(req, res) {
  const catalogItems = await getCatalogItems();
  let items = catalogItems.data.pageContent;
  let itemsObject = {};
  let itemCodes = [];
  items.forEach((item) => {
    itemCodes.push({ "itemCode": item.itemId.itemCode });
    itemsObject[item.itemId.itemCode] = item;
  });
  const prices = await getCatalogItemPricesByItemCodes(req.query.id, itemCodes)
  prices.data.itemPrices.forEach((itemPrice) => {
    itemsObject[itemPrice.priceId.itemCode]['price'] = itemPrice;
  })
  const attributes = await getCatalogItemAttributesByItemCodes(req.query.id, itemCodes)
  console.log(attributes);
  attributes.data.itemAttributes.forEach((itemAttribute) => {
    itemsObject[itemAttribute.itemAttributesId.itemCode]['attributes'] = itemAttribute;
  })

  res.json(itemsObject);
}