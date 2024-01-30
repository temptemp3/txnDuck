/** @file Declaration and initialization of validation rules */

import {
  number as YupNumber,
  string as YupString,
  mixed as YupMixed,
} from 'yup';
import { ADDRESS_LENGTH } from './constants';
 // Run setup for the locales for Yup (`Yup.setLocale()`)
import '@/app/lib/validation-set-locale';

/** Validation schema for wallet address */
export const addressSchema = YupString().trim().length(ADDRESS_LENGTH);
/** Validation schemea for asset/application IDs */
export const idSchema = YupNumber().min(1);

export {YupMixed, YupNumber, YupString};
