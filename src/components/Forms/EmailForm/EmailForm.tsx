import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { Trans, useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { cn } from '../../../utils/style';
import { checkIsEmailValid } from '../../../utils/validations';
import Button from '../../Button/Button';

type Props = {
  handleSubmit: (value: string) => void;
};

const EmailForm: FC<Props> = ({ handleSubmit }) => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);

  const { t } = useTranslation();

  const handleBlur = () => {
    const isValid = checkIsEmailValid(value);

    if (isValid) {
      setIsValidEmail(true);
      setError(null);
      return;
    }

    setError(t('error'));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const value = e.target.value;
    const isValid = checkIsEmailValid(value);

    if (isValid) {
      setIsValidEmail(true);
    }
    setValue(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(value);
  };

  return (
    <form
      onSubmit={onSubmit}
      className='flex h-full w-full max-w-[400px] flex-col justify-between gap-6'
    >
      <div className='flex flex-col items-center gap-8'>
        <div className='relative w-full'>
          <input
            type='email'
            className={cn(
              'w-full rounded-2xl border-2 border-[#36173d] bg-[#36173d] px-2 py-4 font-medium placeholder:text-[17px] placeholder:text-[rgba(196,200,204,0.5)] focus:border-transparent focus-visible:border-transparent',
              { 'border-red-600': error }
            )}
            placeholder={t('placeholder')}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {error && <p className='absolute text-sm text-red-600'>{error}</p>}
        </div>
        <p className='text-center text-[12px] font-medium text-[var(--secondary-color)]'>
          <Trans
            i18nKey='agreement'
            components={{
              privacyLink: (
                <NavLink
                  to='/'
                  className='text-[#eb2f9a]'
                >
                  Privacy policy
                </NavLink>
              ),
              termsLink: (
                <NavLink
                  to='/'
                  className='text-[#eb2f9a]'
                >
                  Terms of use
                </NavLink>
              ),
            }}
          ></Trans>
        </p>
      </div>
      <Button
        variant='primary'
        type='submit'
        className='w-full rounded-3xl p-2.5 font-extrabold hover:bg-[#e4229c]'
        disabled={!isValidEmail || !!error}
      >
        {t('button')}
      </Button>
    </form>
  );
};

export default EmailForm;
