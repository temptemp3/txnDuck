import { useEffect } from 'react';
import {
  FieldErrorMessage,
  FieldGroup,
  NumberField,
  ToggleField
} from '@/app/[lang]/components/form';
import { type TFunction } from 'i18next';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  MIN_TX_FEE,
  generalFormControlAtom,
  showFormErrorsAtom,
  tipContentClass,
  tipBtnClass,
  feeConditionalRequireAtom,
  storedTxnDataAtom,
  txnDataAtoms,
} from '@/app/lib/txn-data';
import { microalgosToAlgos } from 'algosdk';
import { defaultUseSugFee as defaultUseSugFeeAtom } from '@/app/lib/app-settings';

export default function Fee({ t }: { t: TFunction }) {
  const form = useAtomValue(generalFormControlAtom);
  return (
    <FieldGroup>
      <UseSugFeeInput t={t} />
      {!form.values.useSugFee && <FeeInput t={t} />}
    </FieldGroup>
  );
}

export function FeeInput({ t }: { t: TFunction }) {
  const form = useAtomValue(generalFormControlAtom);
  const showFormErrors = useAtomValue(showFormErrorsAtom);
  const feeCondReqGroup = useAtomValue(feeConditionalRequireAtom);
  return (<>
    <NumberField label={t('fields.fee.label')}
      name='fee'
      id='fee-input'
      tip={{
        content: t('fields.fee.tip'),
        btnClass: tipBtnClass,
        btnTitle: t('fields.more_info'),
        contentClass: tipContentClass
      }}
      required={true}
      requiredText={t('form.required')}
      inputInsideLabel={false}
      containerId='fee-field'
      containerClass='mb-5 max-w-xs'
      inputClass={((showFormErrors || form.touched.fee) &&
        (form.fieldErrors.fee || (!feeCondReqGroup.isValid && feeCondReqGroup.error)))
        ? 'input-error' : ''
      }
      afterSideLabel={t('algo_other')}
      min={microalgosToAlgos(MIN_TX_FEE)}
      step={0.000001}
      helpMsg={t('fields.fee.help_msg', { count: microalgosToAlgos(MIN_TX_FEE) })}
      value={form.values.fee as number ?? ''}
      onChange={(e) =>
        form.handleOnChange('fee')(e.target.value === '' ? undefined : parseFloat(e.target.value))
      }
      onFocus={form.handleOnFocus('fee')}
      onBlur={form.handleOnBlur('fee')}
    />
    {(showFormErrors || form.touched.fee) && form.fieldErrors.fee &&
      <FieldErrorMessage t={t}
        i18nkey={form.fieldErrors.fee.message.key}
        dict={form.fieldErrors.fee.message.dict}
      />
    }
    {(showFormErrors || form.touched.fee) && !feeCondReqGroup.isValid
      && feeCondReqGroup.error &&
      <FieldErrorMessage t={t}
        i18nkey={(feeCondReqGroup.error as any).message.key}
        dict={(feeCondReqGroup.error as any).message.dict}
      />
    }
  </>);
}

export function UseSugFeeInput({ t }: { t: TFunction }) {
  const form = useAtomValue(generalFormControlAtom);
  const storedTxnData = useAtomValue(storedTxnDataAtom);
  const defaultUseSugFee = useAtomValue(defaultUseSugFeeAtom);
  const setUseSugFee = useSetAtom(txnDataAtoms.useSugFee);
  const setFee = useSetAtom(txnDataAtoms.fee);

  useEffect(() => {
    if (storedTxnData?.useSugFee === undefined && !form.touched.useSugFee) {
      setUseSugFee(defaultUseSugFee);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[defaultUseSugFee, storedTxnData]);

  return (
    <ToggleField label={t('fields.use_sug_fee.label')}
      name='use_sug_fee'
      id='useSugFee-input'
      tip={{
        content: t('fields.use_sug_fee.tip'),
        btnClass: tipBtnClass,
        btnTitle: t('fields.more_info'),
        contentClass: tipContentClass
      }}
      inputInsideLabel={true}
      containerId='useSugFee-field'
      containerClass='mt-4 max-w-lg'
      inputClass='toggle-primary'
      labelClass='gap-3'
      value={!!form.values.useSugFee}
      onChange={(e) => {
        form.setTouched('useSugFee', true);
        form.handleOnChange('useSugFee')(e.target.checked);
        // Unset the fee if suggested fee is to be used
        if (e.target.checked) setFee(undefined);
      }}
    />
  );
}
