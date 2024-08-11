import { PlainObject } from 'types';
import isPlainObject from './isPlainObject';

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is ([] | PlainObject) {
  return isPlainObject(value) || isArray(value);
}

export default function isEqual(lhs: PlainObject, rhs: PlainObject) {
  // Сравнение количества ключей объектов и массивов
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      // Здесь value и rightValue может быть только массивом или объектом
      // И TypeScript это обрабатывает
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}
