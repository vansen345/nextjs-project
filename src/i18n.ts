'use client'

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/en';
import vi from './locales/vi/vi';

i18n.use(initReactI18next).init({
    lng: 'vi',
    resources: {
        vi: {
            translation: vi,
        },

        en: {
            translation: en,
        },
        // vi: {
        // translation: {
        //     time_today: 'Hôm nay',
        //     time_yesterday: 'Hôm qua',
        //     time_sunday: 'Chủ nhật',
        //     time_monday: 'Thứ hai',
        //     time_tuesday: 'Thứ ba',
        //     time_wednesday: 'Thứ tư',
        //     time_thursday: 'Thứ năm',
        //     time_friday: 'Thứ sáu',
        //     time_saturday: 'Thứ bảy',
        // }

        // }
    }
});

export default i18n;