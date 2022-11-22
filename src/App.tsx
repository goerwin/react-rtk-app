import { ChangeEvent, useState } from 'react';
import { FormattedDate, FormattedMessage, FormattedNumber } from 'react-intl';
import { actions } from './features/i18n/i18nSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';

// react-day-picker
import { formatDistance } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import dateFnLocaleEnUS from 'date-fns/locale/en-US';
import dateFnLocaleEs from 'date-fns/locale/es';
import dateFnLocaleRu from 'date-fns/locale/ru';
import dateFnLocaleAr from 'date-fns/locale/ar';
import dateFnLocaleZhCN from 'date-fns/locale/zh-CN';

// material ui x-date-pickers
import 'dayjs/locale/en';
import 'dayjs/locale/es';
import 'dayjs/locale/fr';
import 'dayjs/locale/ru';
import 'dayjs/locale/ar';
import 'dayjs/locale/zh-cn';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

function getDateFnLocale(locale: string) {
  switch (locale) {
    case 'es':
    case 'es-CO':
      return dateFnLocaleEs;
    case 'ru':
      return dateFnLocaleRu;
    case 'ar':
      return dateFnLocaleAr;
    case 'zh-CN':
      return dateFnLocaleZhCN;

    default:
      return dateFnLocaleEnUS;
  }
}

export default function App() {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.i18n.locale);
  const locales = useAppSelector((state) => state.i18n.locales);

  const localeDayPicker = getDateFnLocale(locale);
  const [date, setDate] = useState(new Date());

  const [dateDayJS, setDateDayJS] = useState<Dayjs | null>(dayjs(Date.now()));

  const handleLangChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.changeLocale(e.target.value));
  };

  return (
    <main>
      <p>navigator.language: {navigator.language}</p>

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
          id="home.welcomeMsg"
          defaultMessage="This is the default message {ts, date, ::yyyyMMdd}"
          values={{ ts: Date.now() }}
        />
      </p>

      <p>
        <FormattedDate
          value={Date.now()}
          year="numeric"
          month="long"
          day="numeric"
          weekday="long"
        />
      </p>

      <p>
        <FormattedNumber value={19} style="currency" currency="EUR" />
      </p>

      <p>
        <FormattedNumber value={30} style="currency" currency="USD" />
      </p>

      {/* <section>
        <DayPicker mode="single" selected={date} onSelect={setDate} />
      </section> */}

      <section>
        <h2>Material UI x-date-pickers</h2>

        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/DD/YYYY"
            value={dateDayJS}
            onChange={setDateDayJS}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </section>

      <section>
        <h2>React Day Picker</h2>

        <DayPicker
          mode="single"
          fromYear={2000}
          toYear={2025}
          // captionLayout="dropdown"
          locale={localeDayPicker}
          selected={date}
          onSelect={(date) => setDate(date!)}
        />

        <p>
          Relative time:{' '}
          {formatDistance(date, Date.now(), { locale: localeDayPicker, addSuffix: true })}
        </p>
      </section>

      <section>
        <h2>Native Date picker</h2>
        <input type="date" />
      </section>
    </main>
  );
}
