// export const formatTimeAgo = (dateString: string | Date): string => {
//     const now = new Date();
//     const date = new Date(dateString);
//     const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // seconds

//     if (diff < 60) return "Vừa xong";
//     if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
//     if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
//     if (diff < 604800) return `${Math.floor(diff / 86400)} ngày trước`;

//     return date.toLocaleDateString("vi-VN");
// };
import i18n from '@/i18n';

export const pad2 = (num: number) => {
    return num.toString().padStart(2, '0');
    // return String('0' + num).slice(-2);
}

export function formatPiepTime(dateString: string | Date): { val: string, mess: string } {
    if (!dateString) return { val: '', mess: 'time_just_now' };
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return { val: '', mess: 'time_just_now' };
    
    const t = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (t < 60) {
        return { val: '', mess: 'time_just_now' };
    } else if (t < 3600) {
        return { val: Math.floor((t % 3600) / 60).toString(), mess: 'time_minute_ago' };
    } else if (t < 24 * 3600) {
        return { val: Math.floor(t / 3600).toString(), mess: 'time_hour_ago' };
    } else if (t < 7 * 24 * 3600) {
        return { val: Math.floor(t / (24 * 3600)).toString(), mess: 'time_day_ago' };
    } else {
        const day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        return { val: pad2(day) + '/' + pad2(month) + '/' + pad2(year), mess: '%s' };
    }
}

export function getTimeText(dateString: string | Date): string {
    const { val, mess } = formatPiepTime(dateString);
    return mess === '%s' ? val : val ? `${val} ${i18n.t(mess)}` : i18n.t(mess);
}

export const formatDateWithType = (dateStr: string, format: string): string => {
    const date = new Date(dateStr);
    const year = pad2(date.getFullYear()),
        month = pad2(date.getMonth() + 1),
        day = pad2(date.getDate()),
        hours = pad2(date.getHours()),
        minutes = pad2(date.getMinutes()),
        seconds = pad2(date.getSeconds());
    return format.replace('yyyy', year).replace('MM', month).replace('dd', day).replace('hh', hours).replace('mm', minutes).replace('ss', seconds);
}

export function getDateName(dateStr: string) {
    const d = new Date(dateStr);
    const td = new Date();
    const week = ['time_sunday', 'time_monday', 'time_tuesday', 'time_wednesday', 'time_thursday', 'time_friday', 'time_saturday'];
    const s = Math.floor((td.getTime() - d.getTime()) / 1000);
    let val = pad2(d.getDate()) + '/' + pad2(d.getMonth() + 1) + '/' + d.getFullYear();
    let label = '';
    if (s < 7 * 24 * 60 * 60) {
        if (d.getDate() === td.getDate()) {
            val = '';
            label = 'time_today';
        } else if (d.getDate() + 1 === td.getDate()) {
            val = '';
            label = 'time_yesterday';
        } else if (td.getDate() - d.getDate() <= td.getDay()) {
            val = '';
            label = week[d.getDay()];
        }
    }
    return { val, label };
}

const timeLabels: Record<string, string> = {
    time_today: 'Hôm nay',
    time_yesterday: 'Hôm qua',
    time_sunday: 'Chủ nhật',
    time_monday: 'Thứ hai',
    time_tuesday: 'Thứ ba',
    time_wednesday: 'Thứ tư',
    time_thursday: 'Thứ năm',
    time_friday: 'Thứ sáu',
    time_saturday: 'Thứ bảy',
}