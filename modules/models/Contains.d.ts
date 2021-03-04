import { AllTypes } from '../models/Generics';
export declare type ContainsValue = Array<AllTypes> | AllTypes;
export declare type ContainsObjectIterator<T, TValue> = (value: TValue, property: string, object: T) => boolean;
