import { ChangeEvent } from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { actions } from './features/i18n/i18nSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';

export default function App() {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.i18n.locale);
  const locales = useAppSelector((state) => state.i18n.locales);

  const handleLangChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.changeLocale(e.target.value));
  };

  return (
    <main>
      <p>User locale: {navigator.language}</p>

      <p>
        Change locale:{' '}
        <select onChange={handleLangChange} value={locale}>
          <option value="">-</option>
          {locales.map((locale) => (
            <option key={locale} value={locale}>
              {locale}
            </option>
          ))}
        </select>
      </p>

      <p>
        <FormattedMessage
          id="welcomeMessage"
          defaultMessage="This is the default message {ts, date, ::yyyyMMdd}"
          values={{ ts: Date.now() }}
        />

        <br />

        <FormattedNumber value={19} style="currency" currency="EUR" />
      </p>
    </main>
  );
}
