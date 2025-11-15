
export const getOptions = (lng = 'en', ns = 'translation') => {
    return {
      // debug: true,
      supportedLngs: ['en', 'es', 'hi', 'te'],
      fallbackLng: 'en',
      lng,
      fallbackNS: 'translation',
      defaultNS: 'translation',
      ns,
    };
  };