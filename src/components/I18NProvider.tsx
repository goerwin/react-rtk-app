import { ReactElement } from 'react';
import { IntlProvider } from 'react-intl';
import { useAppSelector } from '../redux/hooks';

export default function I18NProvider({ children }: { children: ReactElement }) {
  const locale = useAppSelector((state) => state.i18n.locale);
  const messages = useAppSelector((state) => state.i18n.messages);

  return (
    <IntlProvider messages={messages} locale={locale}>
      {children}
    </IntlProvider>
  );
}
