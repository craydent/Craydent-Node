import { AllTypes } from '../models/Generics';

export type ContainsValue = Array<AllTypes> | AllTypes;
export type ContainsObjectIterator<T, TValue> = (value: TValue, property: string, object: T) => boolean;
