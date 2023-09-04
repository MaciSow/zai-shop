import { describe, expect } from '@jest/globals';
import { getCartWithNewItem, getCartWithoutItem } from '@/store/CartContext/cartUtils';
import { CartItem } from '@/store/CartContext/cartTypes';
import { faker } from '@faker-js/faker';

describe('Cart', () => {
  const getFakeCartItem = (): CartItem => ({
    id: faker.string.uuid(),
    count: 1,
    title: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
  });

  const getFakeInitialState = () =>
    faker.helpers.uniqueArray(
      getFakeCartItem,
      faker.number.int({
        min: 0,
        max: 15,
      }),
    );

  it(`should append if element doesn't exist`, () => {
    const initialState: CartItem[] = getFakeInitialState();
    const item = getFakeCartItem();

    const result = getCartWithNewItem(initialState, item);

    expect(result.at(-1)).toEqual(item);
  });

  it(`should append if element exist`, () => {
    const item = getFakeCartItem();
    const initialState: CartItem[] = [...getFakeInitialState(), item];

    const result = getCartWithNewItem(initialState, item);

    expect(result.length).toEqual(initialState.length);
    expect(result.at(-1)).toEqual({ ...item, count: item.count + 1 });
  });

  it(`should do nothing if element doesn't exist`, () => {
    const initialState: CartItem[] = getFakeInitialState();
    const item = getFakeCartItem();

    const result = getCartWithoutItem(initialState, item.id);
    const itemFromArray = result.find((arrItem) => arrItem.id === item.id);

    expect(result.length).toEqual(initialState.length);
    expect(itemFromArray).toBeUndefined();
  });

  it(`should remove from array`, () => {
    const item = getFakeCartItem();
    const initialState: CartItem[] = [...getFakeInitialState(), item];

    const result = getCartWithoutItem(initialState, item.id);
    const itemFromArray = result.find((arrItem) => arrItem.id === item.id);

    expect(result.length).toEqual(initialState.length - 1);
    expect(itemFromArray).toBeUndefined();
  });
});
